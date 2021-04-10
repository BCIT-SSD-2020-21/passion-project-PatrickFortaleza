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
url = "https://www.cbsnews.com/us/"

driver.get(url)

try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located(
        (By.XPATH, "//section[@id='component-topic-us']")))
finally:
    innerHTML = driver.execute_script(
        "window.scrollTo(0, document.body.scrollHeight-10000);var lenOfPage=document.body.scrollHeight;return document.body.innerHTML;")

    page_soup = BeautifulSoup(innerHTML, "html.parser")
    mainSection = page_soup.find("section", {"id": "component-topic-us"})
    newsColumns = page_soup.find_all(
        "div", {"class": "component__item-wrapper"})

    articlesList = []
    for column in newsColumns:
        articles = column.find_all("article")
        for article in articles[:5]:
            try:
                link = article.find("a")["href"]
                text = article.find("h4").get_text()
                text = re.sub("\s\s", "", text)

                article_ = {
                    "site": "6072168fa55796cad11d99ea",  # Hardcoded ObjectId
                    "headline": text,
                    "article_url": link,
                    "date": today
                }

                articlesList.append(article_)
            except Exception as e:
                print(f"error retrieving data: {e}")

    print(articlesList)
    driver.close()
