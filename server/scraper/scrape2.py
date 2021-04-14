import requests
import time
import re
from datetime import date
from bs4 import BeautifulSoup

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium import webdriver

from pyvirtualdisplay import Display
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options

options = Options()
options.headless = True

today = date.today().isoformat()

driver = webdriver.Firefox(
    executable_path="/home/pfteza/geckodriver", options=options)
print("attempt start display")
display = Display(visible=0, size=(800, 600))
display.start()
print("successful start display")

url = "https://www.cnn.com/"
print("attempt start driver")
driver.get(url)
print("success start driver")
print(driver.title)

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
        for article in articles[:5]:
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
    print(articlesList)
