import os
import time
import shutil
import uuid
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

app = FastAPI(title="Social Media Automation API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],  # React dev server ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def find_element_fallback(driver, selectors, wait_time=10):
    for by, sel in selectors:
        try:
            element = WebDriverWait(driver, wait_time).until(EC.presence_of_element_located((by, sel)))
            return element
        except:
            continue
    raise Exception("❌ Element not found with any of the provided selectors.")

def click_element_fallback(driver, selectors, wait_time=10):
    for by, sel in selectors:
        try:
            element = WebDriverWait(driver, wait_time).until(EC.element_to_be_clickable((by, sel)))
            element.click()
            return
        except:
            continue
    print("⚠️ Clickable element not found.")

def login_to_instagram(username, password):
    options = Options()
    options.add_argument("--start-maximized")
    driver = webdriver.Chrome(service=webdriver.chrome.service.Service(ChromeDriverManager().install()), options=options)
    driver.get("https://www.instagram.com/accounts/login/")

    username_field = find_element_fallback(driver, [
        (By.CSS_SELECTOR, 'input[aria-label="Phone number, username, or email"]'),
        (By.NAME, 'username'),
        (By.XPATH, '//input[contains(@name, "username")]')
    ])
    username_field.send_keys(username)

    password_field = find_element_fallback(driver, [
        (By.CSS_SELECTOR, 'input[aria-label="Password"]'),
        (By.NAME, 'password'),
        (By.XPATH, '//input[contains(@name, "password")]')
    ])
    password_field.send_keys(password + Keys.RETURN)

    time.sleep(5)

    try:
        click_element_fallback(driver, [
            (By.XPATH, '//div[text()="Not now" and @role="button"]'),
            (By.XPATH, '//button[text()="Not Now"]')
        ], wait_time=15)
    except:
        pass

    return driver

def open_post_window(driver):
    click_element_fallback(driver, [
        (By.CSS_SELECTOR, 'svg[aria-label="New post"]'),
        (By.CSS_SELECTOR, 'div[aria-label="New post"]'),
        (By.XPATH, '//div[text()="Create"]')
    ])
    time.sleep(2)

    click_element_fallback(driver, [
        (By.XPATH, '//*[text()="Post" or contains(text(), "Post")]'),
        (By.XPATH, '//button[text()="Post"]')
    ])
    time.sleep(2)

def upload_image_or_video(driver, file_paths):
    try:
        file_input = find_element_fallback(driver, [
            (By.CSS_SELECTOR, 'input[type="file"]'),
            (By.XPATH, '//input[@type="file"]')
        ])
        file_input.send_keys("\n".join(file_paths))
    except:
        pass

    time.sleep(10)

    try:
        click_element_fallback(driver, [
            (By.XPATH, "//button[text()='OK']"),
            (By.XPATH, '//div[text()="OK"]')
        ], wait_time=5)
    except:
        print("Popup not found, continuing...")

    for _ in range(2):
        click_element_fallback(driver, [
            (By.XPATH, '//div[text()="Next"]'),
            (By.XPATH, '//button[text()="Next"]')
        ])
        time.sleep(5)

def add_caption(driver, caption_text):
    try:
        caption_field = find_element_fallback(driver, [
            (By.CSS_SELECTOR, "div[aria-label='Write a caption...'][contenteditable='true']"),
            (By.XPATH, "//div[contains(text(),'Write a caption')]"),
        ])
        caption_field.click()
        caption_field.send_keys(caption_text)
        time.sleep(1)
    except Exception as e:
        print(f"⚠️ Caption failed: {e}")

def set_share_preferences(driver, share_to_threads=True, share_to_facebook=False):
    try:
        toggles = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, 'input[type="checkbox"][role="switch"]')))

        def toggle_action(index, desired):
            if toggles[index].is_selected() != desired:
                toggles[index].click()
                try:
                    if desired:
                        click_element_fallback(driver, [(By.XPATH, "//button[text()='Share this post']")])
                    else:
                        click_element_fallback(driver, [(By.XPATH, "//button[text()=\"Don't share this post\"]")])
                except:
                    pass

        toggle_action(0, share_to_threads)
        time.sleep(2)
        toggle_action(1, share_to_facebook)
        time.sleep(2)
    except:
        pass

def share_post(driver):
    click_element_fallback(driver, [
        (By.XPATH, '//div[text()="Share"]'),
        (By.XPATH, '//button[text()="Share"]')
    ])
    time.sleep(30)

@app.get("/")
async def root():
    return {"message": "Social Media Automation API is running!", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "instagram-automation"}

@app.post("/post-to-instagram/")
async def post_to_instagram(
    username: str = Form(...),
    password: str = Form(...),
    caption: str = Form(""),
    share_to_threads: bool = Form(False),
    share_to_facebook: bool = Form(False),
    files: list[UploadFile] = File(...)
):
    upload_dir = f"temp_uploads_{uuid.uuid4().hex}"
    os.makedirs(upload_dir, exist_ok=True)
    file_paths = []

    try:
        # Save uploaded files
        for i, file in enumerate(files):
            file_path = os.path.join(upload_dir, f"upload_{i}.{file.filename.split('.')[-1]}")
            with open(file_path, "wb") as f:
                f.write(await file.read())
            file_paths.append(os.path.abspath(file_path))

        # Start automation
        driver = login_to_instagram(username, password)
        open_post_window(driver)
        upload_image_or_video(driver, file_paths)
        add_caption(driver, caption)
        set_share_preferences(driver, share_to_threads, share_to_facebook)
        share_post(driver)

        return JSONResponse(content={"message": "✅ Successfully posted to Instagram."})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    finally:
        try:
            driver.quit()
        except:
            pass
        shutil.rmtree(upload_dir, ignore_errors=True)
