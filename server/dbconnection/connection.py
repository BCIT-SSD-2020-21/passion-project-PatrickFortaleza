import pymongo
from dotenv import load_dotenv
load_dotenv()

import os

mongodb_client = pymongo.MongoClient
pymongo_errors = pymongo.errors.ServerSelectionTimeoutError


class DbContext():
  def __init__(self):
    self.__db_user = os.environ.get("DB_USERNAME")
    self.__db_password = os.environ.get("DB_PASSWORD")
    self.__mongo_uri = f"mongodb+srv://{self.__db_user}:{self.__db_password}@pynews.nzfri.mongodb.net/PyNews?retryWrites=true&w=majority"
    self.__context = None

#----------------------------------------
# Getter setter for attributes
#----------------------------------------
  @property
  def mongo_uri(self):
    return self.__mongo_uri

  @property
  def context(self):
    return self.__context

  @context.setter
  def context(self, contextObject):
    self.__context = contextObject
  
  def connect_to_db(self):
    try:
      print(self.mongo_uri)
      client = mongodb_client(self.mongo_uri)
      client.server_info()
      self.context = client
      print("Successfully established a connection to DB")
    except pymongo_errors as err:
      print(err)


Context = DbContext()
Context.connect_to_db()

  
