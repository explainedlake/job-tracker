import undetected_chromedriver as uc
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def scrape_wework_stealth(url: str) -> dict:
    options = uc.ChromeOptions()
    options.headless = False  # type: ignore
    #options.add_argument("--headless=new")
    options.add_argument("--start-minimized")
    options.add_argument("--window-position=10000,10000")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = uc.Chrome(options=options)

    try:
        driver.get(url)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "lis-container__job__content__description"))
        )

        soup = BeautifulSoup(driver.page_source, "html.parser")

        # ✅ Title
        title_tag = soup.find("h2", class_="lis-container__header__hero__company-info__title")
        title = title_tag.get_text(strip=True) if title_tag else "Unknown Title"

        # ✅ Company (from <h3> inside company info div)
        company_div = soup.find("div", class_="lis-container__job__sidebar__companyDetails__info__title")
        company_tag = company_div.find("h3") if company_div else None # type: ignore
        company = company_tag.get_text(strip=True) if company_tag else "Unknown" # type: ignore

        # ✅ Description
        desc_tag = soup.find("div", class_="lis-container__job__content__description")
        description = desc_tag.get_text(separator="\n", strip=True) if desc_tag else "No description found."

        return {
            "title": title,
            "company": company,
            "description": description
        }

    finally:
        driver.quit()

