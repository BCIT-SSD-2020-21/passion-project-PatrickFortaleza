from dbconnection.connection import DbContext
from scraper.scrapeNews import Scrapeth

# Establish connection
Context = DbContext
MongoDbContext = Context().context
database = MongoDbContext.PyNews

# Collections
articles = database.articles

Scrape = Scrapeth
articlesList = Scrape().articles

for articleItem in articlesList:
    result = articles.insert_one(articleItem)
    print(result)

# Insert Articles


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
