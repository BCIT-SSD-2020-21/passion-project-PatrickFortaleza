import pymongo
from dotenv import load_dotenv
load_dotenv()

import os
username = os.environ.get("DB_USERNAME")
password = os.environ.get("DB_PASSWORD")
mongo_uri = f"mongodb+srv://{username}:{password}@pynews.nzfri.mongodb.net/PyNews?retryWrites=true&w=majority"
print(mongo_uri)

mongodb_client = pymongo.MongoClient
pymongo_errors = pymongo.errors.ServerSelectionTimeoutError

try:
  client = mongodb_client(mongo_uri)
  client.server_info()
  print("Established a connection to DB.")
except pymongo_errors as err:
  print(err)