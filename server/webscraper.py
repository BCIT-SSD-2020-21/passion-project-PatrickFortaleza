from dbconnection.connection import DbContext
from scraper.scrapeNews import Scrapeth
from datetime import date

# Establish connection
Context = DbContext
MongoDbContext = Context().context
database = MongoDbContext.PyNews

# Collections
articles = database.articles
sites = database.sites
newsdata = database.newsdata

Scrape = Scrapeth
articlesList = Scrape().articles

print(articlesList)
# existingNewsData = newsdata.find_one({"date": date.today().isoformat()})

# if existingNewsData is None:

#     newsData = {
#         "date": date.today().isoformat(),
#         "articles": []
#     }

#     for articleItem in articlesList:
#         articleResult = articles.insert_one(articleItem)
#         articleObjectId = articleResult.inserted_id
#         newsData["articles"].append(articleObjectId)

#     res = newsdata.insert_one(newsData)
#     print(newsData)


# ======================================
# Testing - uncomment to test insertion
# ======================================
# testObj = {
#     "title": "Test Title",
#     "data": [
#         100,
#         200,
#         300
#     ]
# }

# articles = database.articles
# result = articles.insert_one(testObj)
# print(result)
