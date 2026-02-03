# Price Scheduling Fixes & Complete Explanation

## Issues Fixed

### 1. **Date Conversion Issues**
**Problem**: Dates were not being converted correctly between frontend (datetime-local) and backend (IST).

**Fix Applied**:
- Frontend now properly converts datetime-local input to IST timezone before sending
- Uses format: `YYYY-MM-DDTHH:mm:00+05:30` to explicitly specify IST
- Backend receives ISO string and parses it correctly

**Code Location**: `frontend/src/components/Admin/ProductForm.jsx` (Lines 177-230)

### 2. **Date Display Issues**
**Problem**: Dates were not displaying correctly in IST format in admin panel.

**Fix Applied**:
- Updated `formatISTDate()` function to properly convert UTC dates to IST
- Added IST timezone offset calculation
- Displays dates with "IST" suffix for clarity

**Code Location**: `frontend/src/components/Admin/ProductsList.jsx` (Lines 5-29)

### 3. **Schedule Status Calculation**
**Problem**: Status calculation was incorrect due to timezone issues.

**Fix Applied**:
- Fixed timezone offset calculations in `getScheduleStatus()`
- Properly converts UTC dates to IST for comparison
- Handles all three states: upcoming, active, expired

**Code Location**: `frontend/src/components/Admin/ProductsList.jsx` (Lines 31-60)

### 4. Debug Logging
**Problem**: No visibility into why scheduling wasn't working.

**Fix Applied**:
- Added comprehensive debug logging in `applyScheduledPriceChange()`
- Logs current time, start date, end date, and all price values
- Logs which condition is being executed
- Helps identify timezone or date comparison issues

**Code Location**: `backend/src/main/java/com/example/machines/service/ProductService.java` (Lines 195-250)

---

## Complete Code Flow Explanation

### **Step 1: Admin Sets Schedule**

**File**: `frontend/src/components/Admin/ProductForm.jsx`

1. Admin enters:
   - Scheduled Price: `15000`
   - Start Date: `2024-12-16T14:00` (datetime-local input)
   - End Date: `2024-12-16T18:00`

2. **Date Conversion** (Lines 182-230):
   ```javascript
   // Input: "2024-12-16T14:00" (timezone-naive, treated as IST)
   // Convert to: "2024-12-16T14:00:00+05:30" (explicit IST)
   // Then to ISO: "2024-12-16T08:30:00.000Z" (UTC representation of IST time)
   ```

3. **Form Submission**:
   ```javascript
   {
     scheduledPrice: 15000,
     priceStartDate: "2024-12-16T08:30:00.000Z", // IST 14:00 as UTC
     priceEndDate: "2024-12-16T12:30:00.000Z"    // IST 18:00 as UTC
   }
   ```

---

### **Step 2: Backend Receives & Saves**

**File**: `backend/src/main/java/com/example/machines/service/ProductService.java`

1. **applyRequestToProduct()** (Lines 111-150):
   - Receives `ProductRequest` with scheduling fields
   - Jackson deserializes ISO strings to `LocalDateTime` (in IST due to TimezoneConfig)
   - Stores `originalPriceBeforeSchedule` if not already set
   - Saves scheduling fields to product

---

### **Step 3: Product Fetch Triggers Price Application**

**File**: `backend/src/main/java/com/example/machines/service/ProductService.java`

**When**: Every time `getAllProducts()`, `getProductById()`, or `getProductBySlug()` is called

**Method**: `applyScheduledPriceChange()` (Lines 184-250)

**Process**:

1. **Check if scheduling exists**:
   ```java
   if (product.getScheduledPrice() != null && 
       product.getPriceStartDate() != null && 
       product.getPriceEndDate() != null)
   ```

2. **Get current IST time**:
   ```java
   ZoneId istZone = ZoneId.of("Asia/Kolkata");
   LocalDateTime now = LocalDateTime.now(istZone);
   LocalDateTime startDate = product.getPriceStartDate();
   LocalDateTime endDate = product.getPriceEndDate();
   ```

3. **Debug logging** (Lines 195-201):
   ```java
   System.out.println("Current IST Time: " + now);
   System.out.println("Start Date: " + startDate);
   System.out.println("End Date: " + endDate);
   ```

4. **Three possible conditions**:

   **A. Within Scheduled Period** (Lines 203-220):
   ```java
   if (now >= startDate && now <= endDate) {
       // Apply scheduled price
       product.setPrice(product.getScheduledPrice());
   }
   ```

   **B. Before Start Date** (Lines 222-230):
   ```java
   else if (now < startDate) {
       // Use original price
       product.setPrice(product.getOriginalPriceBeforeSchedule());
   }
   ```

   **C. After End Date** (Lines 232-250):
   ```java
   else if (now > endDate) {
       // Revert to original price
       product.setPrice(product.getOriginalPriceBeforeSchedule());
       // Clear all scheduling fields
       product.setScheduledPrice(null);
       product.setPriceStartDate(null);
       product.setPriceEndDate(null);
       product.setOriginalPriceBeforeSchedule(null);
   }
   ```

---

### **Step 4: Display in Admin Panel**

**File**: `frontend/src/components/Admin/ProductsList.jsx`

1. **Price Schedule Column** (Lines 216-241):
   - Shows current schedule status (Active/Upcoming/Expired)
   - Displays scheduled price
   - Shows date range in IST format

---

## Testing the Fixes

### Test 1: Verify Date Conversion
1. Open browser console
2. Set a schedule in admin panel
3. Check console logs for:
   ```
   Start date conversion: { input: "...", istString: "...", isoString: "..." }
   End date conversion: { input: "...", istString: "...", isoString: "..." }
   ```

### Test 2: Verify Backend Processing
1. Check backend console logs when fetching products
2. Look for:
   ```
   === Price Scheduling Check for Product ID: X ===
   Current IST Time: 2024-12-16T14:30:00
   Start Date: 2024-12-16T14:00:00
   End Date: 2024-12-16T18:00:00
   Status: WITHIN scheduled period - Applying scheduled price
   ```

### Test 3: Verify Price Application
1. Set schedule with start time 2 minutes from now
2. Check product price (should be original)
3. Wait until start time
4. Refresh products list
5. Check product price (should be scheduled price)
6. Check backend logs to confirm status change

---

## Common Issues & Solutions

### Issue: Dates showing wrong time
**Solution**: 
- Check `formatISTDate()` function
- Verify IST offset calculation (5.5 hours = 19800000 milliseconds)
- Check browser console for date conversion logs

### Issue: Price not changing
**Solution**:
1. Check backend console logs
2. Verify current IST time vs start/end dates
3. Ensure `applyScheduledPriceChange()` is being called
4. Check if dates are being saved correctly in database

---

## Summary of All Changes

✅ **Fixed date conversion** - Properly handles IST timezone
✅ **Fixed date display** - Shows dates in IST format
✅ **Fixed status calculation** - Correctly determines schedule status
✅ **Added debug logging** - Helps troubleshoot issues
✅ **Updated timezone config** - Uses Asia/Kolkata throughout

The system should now work correctly with IST timezone!

