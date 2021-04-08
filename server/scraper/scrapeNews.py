import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver

# PATH = "/Users/patrickfortaleza/Desktop/driver/geckodriver"
driver = webdriver.Firefox()
driver.get("https://www.cnn.com/")

PAUSE_TIME = 1.5

time.sleep(PAUSE_TIME)
innerHTML = driver.execute_script(
    "window.scrollTo(0, document.body.scrollHeight-10000);var lenOfPage=document.body.scrollHeight;return document.body.innerHTML;")

page_soup = BeautifulSoup(innerHTML, "html.parser")
topSection = page_soup.find("section", {"id": "homepage1-zone-1"})
newsColumns = topSection.find_all("div", {"class": "column"})

for column in newsColumns:
    articles = column.find_all("article")
    for article in articles:
        h3 = article.find("h3", {"class": "cd__headline"})
        headline = h3.find("a")
        link = headline["href"]
        text = headline.get_text()
        print(f"link: {link}")
        print(f"text: {text}")


print(newsColumns)

# Closes tab
driver.close()

# # Closes entire browser
# driver.quit()

# page = requests.get("https://www.cnn.com/", timeout=None)
# pageHTML = page.content

# soup = BeautifulSoup(pageHTML, 'html.parser')

# topSection = soup.find_all("section")
# print(topSection)
# urls = [
#   "https://www.usatoday.com/",
#   "https://www.foxnews.com/",
#   "https://www.cnn.com/"
# ]
