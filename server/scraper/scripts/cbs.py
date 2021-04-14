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
# ===================================

today = date.today().isoformat()


def scrape_cbs():
    print("attempt scrape cbs")
    driver = None
    display = None
    try:
        # ===================================
        # FOR DEVELOPMENT, UNCOMMENT LINE BELOW
        # driver = webdriver.Firefox()

        # ===================================
        # FOR DEPLOYING, UNCOMMENT LINE(s) BELOW
        driver = webdriver.Firefox(
            executable_path="/home/pfteza/geckodriver", options=options)
        print("attempt start display")
        display = Display(visible=0, size=(800, 600))
        display.start()
        print("successful start display")
        # ===================================
        url = "https://www.cbsnews.com/us/"
        print("attempt start driver")
        driver.get(url)
        print("success start driver")
        try:
            WebDriverWait(driver, 10).until(EC.presence_of_element_located(
                (By.XPATH, "//section[@id='component-topic-us']")))
        finally:
            innerHTML = driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight-10000);var lenOfPage=document.body.scrollHeight;return document.body.innerHTML;")

            page_soup = BeautifulSoup(innerHTML, "html.parser")
            mainSection = page_soup.find(
                "section", {"id": "component-topic-us"})
            newsColumns = mainSection.find_all(
                "div", {"class": "component__item-wrapper"})

            articlesList = []
            for column in newsColumns[:3]:
                articles = column.find_all("article")
                for article in articles[:5]:
                    try:
                        link = article.find("a")["href"]
                        text = article.find("h4").get_text()
                        text = re.sub("\s\s", "", text)
                        text = re.sub("\n", "", text)

                        article_ = {
                            "site": "6072168fa55796cad11d99ea",  # Hardcoded ObjectId
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
