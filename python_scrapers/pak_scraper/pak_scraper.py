from bs4 import BeautifulSoup
import requests
import json
import math

departments = ['pantry', 'fresh-foods-and-bakery', 'baby-toddler-and-kids', 'beer-cider-and-wine', 'chilled-frozen-and-desserts', 'drinks', 'personal-care', 'baby-toddler-and-kids', 'kitchen-dining-and-household']

products_output = []

for department in departments:

    page = 1

    page_num = 2


    while page <= page_num:
        html_doc = requests.get('https://www.paknsaveonline.co.nz/category/{}?pg={}'.format(department, page)).content

        soup = BeautifulSoup(html_doc, 'html.parser')

        if page == 1:
            page_num_container = soup.find("div", {"class": "fs-product-filter__item u-color-half-dark-grey u-hide-down-l"}).text
            split = page_num_container.split(" ")
            products_num = split[5]
            page_num = math.ceil(int(products_num) / 20)
    

        containers = soup.find_all("div", {'class':'fs-product-card'})


        for container in containers:

            product = {}

            footer = container.find("div", {"class":"js-product-card-footer fs-product-card__footer-container"})

            data = footer.get("data-options")

            data = json.loads(data)

            product["productName"] = data["productName"]

            product['price'] = data['ProductDetails']['PricePerItem']

            product['volumeSize'] = container.find("p", {"class": "u-color-half-dark-grey u-p3"}).text
            
            img = container.find("div", {"class": "fs-product-card__product-image"})

            product['img'] = img.get('data-src-s')

            products_output.append(product)

        page = page + 1
    



with open('full_products_pak.json', 'w', encoding='utf-8') as f:
    json.dump(products_output, f, ensure_ascii=False, indent=4)


