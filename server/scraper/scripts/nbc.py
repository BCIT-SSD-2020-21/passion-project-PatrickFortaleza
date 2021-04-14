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


def scrape_nbc():
    print("attempt scrape nbc")
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
        url = "https://www.nbcnews.com/"
        print("attempt start driver")
        driver.get(url)
        print("success start driver")
        try:
            WebDriverWait(driver, 5).until(EC.presence_of_element_located(
                (By.XPATH, "//div[@class='layout-grid-item']")))
        finally:
            innerHTML = driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight-10000);var lenOfPage=document.body.scrollHeight;return document.body.innerHTML;")

            page_soup = BeautifulSoup(innerHTML, "html.parser")
            mainSection = page_soup.find("section", {"class": "pkg-index-1"})
            newsColumns = mainSection.find_all(
                "div", {"class": "multi-up__article"})

            articlesList = []
            for column in newsColumns:
                articles = column.find_all("article")
                for article in articles:
                    try:
                        link = article.find("a")["href"]
                        info = article.find(
                            "div", {"class": "tease-card__info"})
                        text = info.find(
                            "span", {"class": "tease-card__headline"}).getText()
                        # text = article.find("h3", {"class": "headline"}).get_text()
                        # text = re.sub("\t", "", text)
                        # text = re.sub("\n", "", text)

                        article_ = {
                            "site": "6073591a220e8618cb695684",  # Hardcoded ObjectId
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
            print("finish scrape nbc")
            return articlesList

    except Exception as e:
        if driver is not None:
            driver.close()
        if display is not None:
            display.stop()
        print(f"error retrieving data: {e}")
