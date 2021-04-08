import os
import pymongo
from dotenv import load_dotenv
load_dotenv()


mongodb_client = pymongo.MongoClient
pymongo_errors = pymongo.errors.ServerSelectionTimeoutError


class DbContext():
    def __init__(self):
        self.__db_user = os.environ.get("DB_USERNAME")
        self.__db_password = os.environ.get("DB_PASSWORD")
        self.__mongo_uri = f"mongodb+srv://{self.__db_user}:{self.__db_password}@pynews.nzfri.mongodb.net/PyNews?retryWrites=true&w=majority"
        self.__context = None

        def establish_context():
            try:
                client = mongodb_client(self.mongo_uri)
                client.server_info()
                self.__context = client
                print("Successfully established a connection to DB")
            except pymongo_errors as err:
                print(err)

        establish_context()


# ----------------------------------------
# Getter setter for attributes
# ----------------------------------------

    @property
    def mongo_uri(self):
        return self.__mongo_uri

    @property
    def context(self):
        return self.__context


# Context = DbContext()
# c = Context.context
# print(c)
