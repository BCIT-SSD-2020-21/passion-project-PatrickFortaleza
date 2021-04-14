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


def scrape_cnn():
    print("attempt scrape cnn")
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
        url = "https://www.cnn.com/"
        print("attempt start driver")
        driver.get(url)
        print("success start driver")
        try:
            WebDriverWait(driver, 10).until(EC.presence_of_element_located(
                (By.XPATH, "//section[@id='homepage1-zone-1']")))
        finally:
            innerHTML = driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight-10000);var lenOfPage=document.body.scrollHeight;return document.body.innerHTML;")

            page_soup = BeautifulSoup(innerHTML, "html.parser")
            mainSection = page_soup.find(
                "section", {"id": "homepage1-zone-1"})
            newsColumns = mainSection.find_all(
                "div", {"class": "column"})

            articlesList = []
            for column in newsColumns[:3]:
                articles = column.find_all("article")
                for article in articles[:3]:
                    try:
                        h3 = article.find(
                            "h3", {"class": "cd__headline"})
                        headline = h3.find("a")
                        link = headline["href"]
                        text = headline.get_text()

                        article_ = {
                            "site": "6070628dbcdb9a31a261bb97",  # Hardcoded ObjectID
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
            print("finish scrape cnn")
            return articlesList

    except Exception as e:
        if driver is not None:
            driver.close()
        if display is not None:
            display.stop()
        print(f"error retrieving data: {e}")
