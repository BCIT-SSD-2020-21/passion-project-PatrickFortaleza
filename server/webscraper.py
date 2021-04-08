from dbconnection.connection import DbContext

Context = DbContext
MongoDbContext = Context().context
database = MongoDbContext.PyNews


testObj = {
    "title": "Test Title",
    "data": [
        100,
        200,
        300
    ]
}

articles = database.articles
result = articles.insert_one(testObj)
print(result)
print(f"One test object: {result.inserted_id}")
