from flask import Flask
from .dbcontext import connection

# Establish connection
Context = connection.DbContext
MongoDbContext = Context().context
database = MongoDbContext.PyNews

# Collections
articles = database.articles
sites = database.sites
newsdata = database.newsdata

app = Flask(__name__)


@app.route('/')
def index():
    return "<h1>Welcome</h1>"
