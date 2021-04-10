import requests
import time
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
url = "https://www.foxnews.com/"

driver.get(url)

try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located(
        (By.XPATH, "//main[@class='main-content']")))
finally:
    innerHTML = driver.execute_script(
        "window.scrollTo(0, document.body.scrollHeight-10000);var lenOfPage=document.body.scrollHeight;return document.body.innerHTML;")

    page_soup = BeautifulSoup(innerHTML, "html.parser")
    mainSection = page_soup.find("main", {"class": "main-content"})
    newsColumns = page_soup.find_all("div", {"class": "collection-spotlight"})

    articlesList = []
    for column in newsColumns:
        articles = column.find_all("article")
        for article in articles:
            try:
                h2 = article.find("h2", {"class": "title"})
                headline = h2.find("a")
                link = headline["href"]
                text = headline.get_text()

                article_ = {
                    "site": "6070628dbcdb9a31a261bb97",  # Hardcoded ObjectId
                    "headline": text,
                    "article_url": link,
                    "date": today
                }

                articlesList.append(article_)
            except Exception as e:
                print(f"error retrieving data: {e}")

    print(articlesList)
    driver.close()
