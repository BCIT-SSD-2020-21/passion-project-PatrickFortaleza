from dbconnection.connection import DbContext

Context = DbContext
MongoDbContext = Context().context

print(MongoDbContext)
