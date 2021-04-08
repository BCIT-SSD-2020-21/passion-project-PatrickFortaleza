from dbconnection.connection import DbContext

# Establish connection
Context = DbContext
MongoDbContext = Context().context
database = MongoDbContext.PyNews

# Collections
articles = database.articles


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
