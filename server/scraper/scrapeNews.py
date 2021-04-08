import requests
import time
from datetime import date
from bs4 import BeautifulSoup
from selenium import webdriver

url = "https://www.cnn.com/"
driver = webdriver.Firefox()
driver.get(url)

today = date.today().isoformat()

PAUSE_TIME = 1.5

time.sleep(PAUSE_TIME)
innerHTML = driver.execute_script(
    "window.scrollTo(0, document.body.scrollHeight-10000);var lenOfPage=document.body.scrollHeight;return document.body.innerHTML;")

page_soup = BeautifulSoup(innerHTML, "html.parser")
topSection = page_soup.find("section", {"id": "homepage1-zone-1"})
newsColumns = topSection.find_all("div", {"class": "column"})

articlesList = []
for column in newsColumns:
    articles = column.find_all("article")
    for article in articles[:5]:
        try:
            h3 = article.find("h3", {"class": "cd__headline"})
            headline = h3.find("a")
            link = headline["href"]
            text = headline.get_text()

            article_ = {
                "site": url,
                "headline": text,
                "article_url": link,
                "date": today
            }

            articlesList.append(article_)
        except Exception as e:
            print(f"error retrieving data: {e}")

print(articlesList)
# Closes tab
driver.close()

# urls = [
#   "https://www.usatoday.com/",
#   "https://www.foxnews.com/",
#   "https://www.cnn.com/"
# ]
