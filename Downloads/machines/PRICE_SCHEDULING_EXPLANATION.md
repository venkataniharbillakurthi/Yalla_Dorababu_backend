# Price Scheduling System - Complete Flow Explanation

## Overview
The price scheduling system allows admins to set temporary prices for products that automatically activate and deactivate based on scheduled dates. The system uses **Asia/Kolkata (IST)** timezone throughout.

---

## Architecture & Components

### 1. **Backend Configuration**

#### TimezoneConfig.java
```java
@Configuration
public class TimezoneConfig {
    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));
    }
}
```
**Purpose**: Sets the default JVM timezone to IST when the application starts.
**When it runs**: Automatically on application startup via `@PostConstruct`
**Why needed**: Ensures all `LocalDateTime.now()` calls use IST timezone

#### application.properties
```properties
serverTimezone=Asia/Kolkata
spring.jackson.time-zone=Asia/Kolkata
```
**Purpose**: 
- Database connection uses IST timezone
- Jackson JSON serialization uses IST for date formatting

---

### 2. **Database Schema**

#### Product Entity Fields
- `price` (BigDecimal): Current active price
- `scheduledPrice` (BigDecimal): The price to apply during scheduled period
- `priceStartDate` (LocalDateTime): When scheduled price should start (IST)
- `priceEndDate` (LocalDateTime): When scheduled price should end (IST)
- `originalPriceBeforeSchedule` (BigDecimal): Stores original price before scheduling

**Why `originalPriceBeforeSchedule`?**
- When scheduling starts, the current price might already be different
- We need to remember what price to revert to after scheduling ends
- This ensures we don't lose the original price if it was changed

---

### 3. **Price Scheduling Flow**

#### Step 1: Admin Sets Schedule (ProductForm.jsx)

**Location**: `frontend/src/components/Admin/ProductForm.jsx`

**Process**:
1. Admin fills in:
   - Scheduled Price (e.g., ₹15,000)
   - Start Date & Time (e.g., 2024-12-16 14:00)
   - End Date & Time (e.g., 2024-12-16 18:00)

2. **Date Conversion** (Lines 156-181):
   ```javascript
   // datetime-local input: "2024-12-16T14:00"
   // Append IST offset: "2024-12-16T14:00+05:30"
   // Convert to ISO: "2024-12-16T08:30:00.000Z" (UTC)
   ```
   **Why**: 
   - `datetime-local` input has no timezone info
   - We explicitly add IST offset (+05:30)
   - Backend receives ISO string representing IST time

3. **Form Submission**:
   ```javascript
   const productData = {
     scheduledPrice: 15000,
     priceStartDate: "2024-12-16T08:30:00.000Z", // IST time as UTC
     priceEndDate: "2024-12-16T12:30:00.000Z"
   };
   ```

---

#### Step 2: Backend Receives Request (ProductController.java)

**Location**: `backend/.../controller/ProductController.java`

**Process**:
1. Controller receives `ProductRequest` with scheduling fields
2. Jackson automatically deserializes ISO date strings to `LocalDateTime`
3. Since timezone is set to IST, dates are interpreted correctly

---

#### Step 3: Save to Database (ProductService.java - applyRequestToProduct)

**Location**: `backend/.../service/ProductService.java` (Lines 111-132)

**Code Flow**:
```java
if (request.getScheduledPrice() != null && 
    request.getPriceStartDate() != null && 
    request.getPriceEndDate() != null) {
    
    // Store original price if not already stored
    if (product.getOriginalPriceBeforeSchedule() == null) {
        product.setOriginalPriceBeforeSchedule(product.getPrice());
    }
    
    // Set scheduling fields
    product.setScheduledPrice(request.getScheduledPrice());
    product.setPriceStartDate(request.getPriceStartDate());
    product.setPriceEndDate(request.getPriceEndDate());
}
```

**Key Points**:
- **Original Price Storage**: Only stores if `originalPriceBeforeSchedule` is null
  - Prevents overwriting if schedule is updated
  - Ensures we always have the true original price

- **Price Not Changed Yet**: At this point, `product.price` still has the original value
  - Scheduled price will be applied later when products are fetched

---

#### Step 4: Automatic Price Application (ProductService.java - applyScheduledPriceChange)

**Location**: `backend/.../service/ProductService.java` (Lines 151-196)

**When it runs**: 
- Every time products are fetched:
  - `getAllProducts()` - Line 29
  - `getProductById()` - Line 38
  - `getProductBySlug()` - Line 45

**Code Flow**:

```java
private void applyScheduledPriceChange(Product product) {
    // Check if scheduling is configured
    if (product.getScheduledPrice() != null && 
        product.getPriceStartDate() != null && 
        product.getPriceEndDate() != null) {
        
        // Get current time in IST
        ZoneId istZone = ZoneId.of("Asia/Kolkata");
        LocalDateTime now = LocalDateTime.now(istZone);
        LocalDateTime startDate = product.getPriceStartDate();
        LocalDateTime endDate = product.getPriceEndDate();
        
        // Ensure original price is stored
        if (product.getOriginalPriceBeforeSchedule() == null) {
            product.setOriginalPriceBeforeSchedule(product.getPrice());
            productRepository.save(product);
        }
        
        // CASE 1: Current time is WITHIN scheduled period
        if ((now.isAfter(startDate) || now.isEqual(startDate)) && 
            (now.isBefore(endDate) || now.isEqual(endDate))) {
            // Apply scheduled price
            if (!product.getPrice().equals(product.getScheduledPrice())) {
                product.setPrice(product.getScheduledPrice());
                productRepository.save(product);
            }
        } 
        // CASE 2: Current time is BEFORE start date
        else if (now.isBefore(startDate)) {
            // Use original price
            if (product.getOriginalPriceBeforeSchedule() != null && 
                !product.getPrice().equals(product.getOriginalPriceBeforeSchedule())) {
                product.setPrice(product.getOriginalPriceBeforeSchedule());
                productRepository.save(product);
            }
        }
        // CASE 3: Current time is AFTER end date
        else if (now.isAfter(endDate)) {
            // Revert to original price
            if (product.getOriginalPriceBeforeSchedule() != null) {
                product.setPrice(product.getOriginalPriceBeforeSchedule());
            }
            // Clear all scheduling fields
            product.setScheduledPrice(null);
            product.setPriceStartDate(null);
            product.setPriceEndDate(null);
            product.setOriginalPriceBeforeSchedule(null);
            productRepository.save(product);
        }
    }
}
```

**Detailed Explanation**:

1. **Time Comparison**:
   - Uses `LocalDateTime.now(istZone)` to get current IST time
   - Compares with stored `startDate` and `endDate` (also in IST)

2. **Case 1: Active Period** (Lines 167-173):
   - **Condition**: `now >= startDate && now <= endDate`
   - **Action**: Sets `product.price = scheduledPrice`
   - **Why check `!product.getPrice().equals(...)`?**
     - Avoids unnecessary database writes
     - Only updates if price hasn't been applied yet

3. **Case 2: Before Start** (Lines 176-181):
   - **Condition**: `now < startDate`
   - **Action**: Sets `product.price = originalPriceBeforeSchedule`
   - **Why needed**: 
     - If schedule was updated, price might have been changed
     - Ensures original price is shown before schedule starts

4. **Case 3: After End** (Lines 184-193):
   - **Condition**: `now > endDate`
   - **Action**: 
     - Reverts to original price
     - **Clears all scheduling fields** (important!)
     - This prevents the method from running again for this product

---

#### Step 5: Display in Admin Panel (ProductsList.jsx)

**Location**: `frontend/src/components/Admin/ProductsList.jsx`

**New Features Added**:

1. **Price Schedule Column** (New table column):
   - Shows schedule status (Active/Upcoming/Expired)
   - Displays scheduled price
   - Shows start and end dates in IST format

2. **Helper Functions**:

   **formatISTDate()** (Lines 7-20):
   ```javascript
   // Converts ISO date string to IST formatted string
   // Example: "2024-12-16T08:30:00.000Z" → "16 Dec 2024, 02:00 PM IST"
   ```

   **getScheduleStatus()** (Lines 22-40):
   ```javascript
   // Determines current status:
   // - 'upcoming': Schedule not started yet
   // - 'active': Schedule is currently active
   // - 'expired': Schedule has ended
   ```

3. **Visual Display**:
   - **Active**: Green text with "Scheduled (Active)"
   - **Upcoming**: Blue text with "Scheduled (Not Started)"
   - **Expired**: Gray text with "Scheduled (Expired)"
   - Shows scheduled price and date range

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ADMIN SETS SCHEDULE (ProductForm.jsx)                    │
│    - Input: Scheduled Price, Start Date, End Date            │
│    - Convert: datetime-local → ISO with IST offset          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. BACKEND RECEIVES (ProductController.java)                │
│    - Deserializes JSON to ProductRequest                     │
│    - Dates parsed as LocalDateTime (IST)                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. SAVE TO DATABASE (ProductService.applyRequestToProduct)   │
│    - Store originalPriceBeforeSchedule                       │
│    - Save scheduledPrice, priceStartDate, priceEndDate      │
│    - product.price still has original value                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. PRODUCT FETCHED (getAllProducts/getProductById)           │
│    - Calls applyScheduledPriceChange()                       │
│    - Compares current IST time with schedule                 │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. PRICE APPLICATION LOGIC (applyScheduledPriceChange)       │
│                                                              │
│    ┌──────────────────────────────────────┐                │
│    │ NOW < START_DATE                      │                │
│    │ → Use originalPriceBeforeSchedule    │                │
│    └──────────────────────────────────────┘                │
│                                                              │
│    ┌──────────────────────────────────────┐                │
│    │ START_DATE ≤ NOW ≤ END_DATE          │                │
│    │ → Use scheduledPrice                 │                │
│    └──────────────────────────────────────┘                │
│                                                              │
│    ┌──────────────────────────────────────┐                │
│    │ NOW > END_DATE                        │                │
│    │ → Revert to originalPriceBeforeSchedule│                │
│    │ → Clear all scheduling fields        │                │
│    └──────────────────────────────────────┘                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. RESPONSE SENT TO FRONTEND                                 │
│    - ProductResponse includes current price                  │
│    - Includes scheduling fields for admin display             │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. DISPLAY IN ADMIN PANEL (ProductsList.jsx)                 │
│    - Shows current price (already applied)                    │
│    - Shows schedule status and details                       │
│    - Color-coded status indicators                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. **Why Apply on Fetch, Not on Save?**
- **Real-time accuracy**: Price is always correct when viewed
- **Automatic cleanup**: Expired schedules are cleared automatically
- **No cron jobs needed**: Works on-demand

### 2. **Why Store originalPriceBeforeSchedule?**
- **Price might change**: Original price could be updated after scheduling is set
- **Accurate reversion**: Ensures we revert to the correct original price
- **Prevents data loss**: Never lose track of what the original price was

### 3. **Why Clear Fields After End Date?**
- **Performance**: Prevents unnecessary checks on expired schedules
- **Data cleanup**: Keeps database clean
- **Clear state**: Makes it obvious schedule has ended

### 4. **Why Use IST Timezone?**
- **User location**: Target audience is in India
- **Consistency**: All dates in same timezone
- **Clarity**: No confusion about timezone conversions

---

## Testing Checklist

### Test Case 1: Set Future Schedule
1. Set scheduled price with start date 5 minutes from now
2. **Expected**: Product shows original price
3. Wait until start time
4. **Expected**: Product shows scheduled price

### Test Case 2: Active Schedule
1. Set schedule that's currently active
2. **Expected**: Product immediately shows scheduled price

### Test Case 3: Expired Schedule
1. Set schedule with end date in the past
2. **Expected**: Schedule is cleared, original price shown

### Test Case 4: Update Schedule
1. Set a schedule
2. Update the schedule with new dates
3. **Expected**: Original price is preserved, new schedule applied

### Test Case 5: Clear Schedule
1. Set a schedule
2. Clear all scheduling fields
3. **Expected**: Original price restored, all fields cleared

---

## Troubleshooting

### Issue: Price not changing at scheduled time
**Check**:
1. Server timezone is IST
2. Database timezone is IST
3. Dates are being saved correctly
4. `applyScheduledPriceChange` is being called

### Issue: Wrong timezone displayed
**Check**:
1. `TimezoneConfig` is loaded
2. `formatISTDate()` function is correct
3. Browser timezone doesn't affect display (we format explicitly)

### Issue: Original price lost
**Check**:
1. `originalPriceBeforeSchedule` is being set
2. Not being cleared prematurely
3. Database field exists and has value

---

## Summary

The price scheduling system is a **reactive system** that:
- ✅ Automatically applies scheduled prices when products are fetched
- ✅ Handles all time periods (before, during, after)
- ✅ Cleans up expired schedules automatically
- ✅ Preserves original prices correctly
- ✅ Uses IST timezone consistently
- ✅ Provides clear admin visibility

The system is **event-driven** (runs on product fetch) rather than **time-driven** (no cron jobs), making it simpler and more reliable.

