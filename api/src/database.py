from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
import os

class MongoDBConnection:
    def __init__(self):
        self.username = os.getenv('MONGO_INITDB_ROOT_USERNAME')
        self.database = os.getenv('MONGO_INITDB_DATABASE')
        self.password = os.getenv('MONGO_INITDB_ROOT_PASSWORD')
        self.host = 'db'
        self.port = 27017

        uri = f'mongodb://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}?authSource=admin'

        self.client = AsyncIOMotorClient(uri)
        self.db = self.client[self.database]

    def close(self):
        if self.client:
            self.client.close()

def get_db():
    conn = MongoDBConnection()
    try:
        yield conn.db
    finally:
        conn.client.close()
