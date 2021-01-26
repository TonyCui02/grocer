import pymongo
import pprint
import json




# writing to mongodb
client = pymongo.MongoClient('mongodb+srv://Tony_Cui:123@cluster0.zae2y.mongodb.net/grocer?retryWrites=true&w=majority')
db = client['grocer']

# This is the products Collection (table)
products_count = db.countproducts
products_pak = db.pakproducts


def insertCount():
    with open('./count_scraper/test.json', 'r', encoding='utf-8') as f:

        # clear old data
        products_count.delete_many({})


        # products_dict is the json file as a python list of dicts
        products_list = json.load(f)
        
        print(len(products_list))

        # This is a document (an item in the list)
        
        x = products_count.insert_many(products_list, ordered=False)

        # query = products.insert_many(products_list)

        print(products_count.count())

def insertPak():
    with open('./pak_scraper/full_products_pak.json', 'r', encoding='utf-8') as f:


        # products_dict is the json file as a python list of dicts
        products_list = json.load(f)
        
        print(len(products_list))

        # This is a document (an item in the list)
        x = products_pak.insert_many(products_list)

        # query = products.insert_many(products_list)

        print(db.products_pak.count())


if __name__ == "__main__":
    insertCount()