from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from app.dbcontext import connection
from bson import json_util, ObjectId
import json

# Establish connection
Context = connection.DbContext
MongoDbContext = Context().context
database = MongoDbContext.PyNews

# Db Collections
articles = database.articles
sites = database.sites
newsdata = database.newsdata


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={"*": {"origins": "*"}})
api = Api(app)


class NewsData(Resource):
    def get(self, date):
        aggregatedData = newsdata.aggregate([
            {
                "$match": {"date": date}
            },
            {
                "$lookup": {
                    "from": "articles",
                    "let": {"pid": "$articles"},
                    "pipeline": [
                        {"$match": {"$expr": {"$in": ["$_id", "$$pid"]}}},
                        {
                            "$project": {
                                "_id": "$_id",
                                "site": {"$toObjectId": "$site"},
                                "headline": "$headline",
                                "article_url": "$article_url",
                                "date": "$date"
                            }
                        },
                        {
                            "$lookup": {
                                "from": "sites",
                                "localField": "site",
                                "foreignField": "_id",
                                "as": "site"
                            }
                        }
                    ],
                    'as': 'articles'
                }
            }
        ])
        foundData = list(aggregatedData)[0]
        foundData = json.loads(json_util.dumps(foundData))
        return {"data": foundData}


api.add_resource(NewsData, "/news/<string:date>")
