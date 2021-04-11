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
# from pyvirtualdisplay import Display
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.chrome.options import Options
# ===================================

# ===================================
# FOR DEPLOYING, UNCOMMENT LINE(s) BELOW
# chromeOptions = Options()
# chromeOptions.add_argument('--no-sandbox')
# chromeOptions.add_argument('--headless')
# chromeOptions.add_argument('--disable-dev-shm-usage')
# ===================================

today = date.today().isoformat()


def scrape_nbc():
    try:
        # ===================================
        # FOR DEVELOPMENT, UNCOMMENT LINE BELOW
        driver = webdriver.Firefox()

        # ===================================
        # FOR DEPLOYING, UNCOMMENT LINE(s) BELOW
        # driver = webdriver.Chrome(executable_path="/home/pfteza/chromedriver", options=chromeOptions)
        # display = Display(visible=0, size=(800, 600))
        # display.start()
        # ===================================
        url = "https://www.nbcnews.com/"
        driver.get(url)
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

            driver.quit()
            # ===================================
            # FOR DEPLOYING, UNCOMMENT LINE BELOW
            # display.stop()
            return articlesList

    except Exception as e:
        driver.quit()
        print(f"error retrieving data: {e}")
        # ===================================
        # FOR DEPLOYING, UNCOMMENT LINE BELOW
        # display.stop()
