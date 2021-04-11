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
url = "https://www.cnn.com/"

driver.get(url)

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
        for article in articles[:1]:
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

    print(articlesList)
    driver.close()
