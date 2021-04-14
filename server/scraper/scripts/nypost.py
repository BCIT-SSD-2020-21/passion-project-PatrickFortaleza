import requests
import time
import re
from datetime import date
from bs4 import BeautifulSoup

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium import webdriver

# ===================================
# FOR DEPLOYING, UNCOMMENT LINE(s) BELOW
from pyvirtualdisplay import Display
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
# ===================================

# ===================================
# FOR DEPLOYING, UNCOMMENT LINE(s) BELOW
options = Options()
options.headless = True
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("--window-size=1920,1080")
options.add_argument('--disable-gpu')
options.log.level = "TRACE"
# ===================================

today = date.today().isoformat()


def scrape_nypost():
    print("attempt scrape nypost")
    driver = None
    display = None
    try:
        # ===================================
        # FOR DEVELOPMENT, UNCOMMENT LINE BELOW
        # driver = webdriver.Firefox()

        # ===================================
        # FOR DEPLOYING, UNCOMMENT LINE(s) BELOW
        print("attempt initialize driver")
        print("attempt start display")
        display = Display(visible=0, size=(1920, 1080))
        display.start()
        print("successful start display")
        driver = webdriver.Firefox(
            executable_path="/home/pfteza/geckodriver", options=options)
        print("successful initialization of driver")
        # ===================================
        url = "https://nypost.com/"
        print("attempt start driver")
        driver.get(url)
        print("success start driver")

        try:
            WebDriverWait(driver, 10).until(EC.presence_of_element_located(
                (By.XPATH, "//div[@id='home-page-wrapper']")))
        finally:
            innerHTML = driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight-10000);var lenOfPage=document.body.scrollHeight;return document.body.innerHTML;")

            page_soup = BeautifulSoup(innerHTML, "html.parser")
            mainSection = page_soup.find("div", {"id": "home-page-wrapper"})
            newsColumns = mainSection.find_all(
                "div", {"class": "home-page-section-stories-wrapper"})

            articlesList = []
            for column in newsColumns[:3]:
                articles = column.find_all("article", {"class": "top-story"})
                for article in articles[:5]:
                    try:
                        link = article.find("a")["href"]
                        text = article.find(
                            "h3", {"class": "headline"}).get_text()
                        text = re.sub("\t", "", text)
                        text = re.sub("\n", "", text)

                        article_ = {
                            "site": "60721d26a55796cad11d99ec",  # Hardcoded ObjectId
                            "headline": text,
                            "article_url": link,
                            "date": today
                        }

                        articlesList.append(article_)
                    except Exception as e:
                        print(f"error retrieving data: {e}")

            driver.close()
            # ===================================
            # FOR DEPLOYING, UNCOMMENT LINE BELOW
            display.stop()
            print("finish scrape cbs")
            return articlesList

    except Exception as e:
        if driver is not None:
            driver.close()
        if display is not None:
            display.stop()
        print(f"error retrieving data: {e}")
