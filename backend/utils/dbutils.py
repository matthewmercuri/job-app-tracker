from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()


def connect_to_db():
    mongo_env = os.environ['MONGO_URI']
    client = MongoClient(mongo_env)
    db = client.jobapps.jobapps
    return db
