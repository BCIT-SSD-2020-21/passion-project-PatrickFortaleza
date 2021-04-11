import requests
import time
import re
from datetime import date
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# FOR DEVELOPMENT: (LOCAL)
driver = webdriver.Firefox()

today = date.today().isoformat()
articles = []
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
    newsColumns = page_soup.find_all(
        "div", {"class": "multi-up__article"})

    articlesList = []
    for column in newsColumns:
        articles = column.find_all("article")
        for article in articles:
            try:
                link = article.find("a")["href"]
                info = article.find("div", {"class": "tease-card__info"})
                text = info.find(
                    "span", {"class": "tease-card__headline"}).getText()
                # text = article.find("h3", {"class": "headline"}).get_text()
                # text = re.sub("\t", "", text)
                # text = re.sub("\n", "", text)

                article_ = {
                    "site": "60721d26a55796cad11d99ec",  # Hardcoded ObjectId
                    "headline": text,
                    "article_url": link,
                    "date": today
                }

                articlesList.append(article_)
            except Exception as e:
                print(f"error retrieving data: {e}")

    print(articlesList)
    driver.close()
