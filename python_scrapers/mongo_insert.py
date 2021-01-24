from pymongo import MongoClient
import pprint
import json




client = MongoClient()

# This is the master db
db = client.master_db

# This is the products Collection (table)
products_count = db.products_count
products_pak = db.products_pak



with open('scrapers/count_scraper/full_products_count.json', 'r', encoding='utf-8') as f:


    # products_dict is the json file as a python list of dicts
    products_list = json.load(f)
    
    print(len(products_list))

    # This is a document (an item in the list)
    
    x = products_count.insert_many(products_list)

    # query = products.insert_many(products_list)

    print(db.products_count.count())

with open('scrapers/pak_scraper/full_products_pak.json', 'r', encoding='utf-8') as f:


    # products_dict is the json file as a python list of dicts
    products_list = json.load(f)
    
    print(len(products_list))

    # This is a document (an item in the list)
    
    x = products_pak.insert_many(products_list)

    # query = products.insert_many(products_list)

    print(db.products_pak.count())


