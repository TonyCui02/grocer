import requests
import json
import pymongo

departments = ['meat-seafood', 'fruit-veg', 'fridge-deli', 'bakery', 'frozen', 'pantry', 'beer-wine', 'drinks', 'health-beauty', 'household', 'baby-child', 'pet']

products_output = []

for department in departments:

    headers = {
        'authority': 'shop.countdown.co.nz',
        'pragma': 'no-cache',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36',
        'content-type': 'application/json',
        'accept': 'application/json, text/plain, */*',
        'cache-control': 'no-cache',
        'x-requested-with': 'OnlineShopping.WebApp',
        'request-id': '|d99a667157664139bb2435b190eda682.c30ccf4caa5e4c86',
        'expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://shop.countdown.co.nz/shop/browse/pantry',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': '_ga=GA1.3.1485236692.1605814985; _gcl_au=1.1.314498940.1605814985; _vwo_uuid_v2=D8DBEEFF4C5A39815EE41DFF7FBB81B66|fbda99d3e459025f9a97ca5074bf502f; _hjid=eb4ad9ce-2130-4c9f-b4a8-6ccdbd287622; _fbp=fb.2.1605814986401.866075596; gig_bootstrap_3_-SfMo7rbUCn0p7mhjsDfYu8T5axQEv6QEEK9Edz5fo-fZombWKJzRgCf1-js9O2g=login_ver3; cd_user_id=175e2082aa5ab3-06d0c7b0d56ef9-930346c-1fa400-175e2082aa6a99; ai_user=trFfE|2020-11-19T19:43:19.590Z; gig_bootstrap_3_PWTq_MK-V930M4hDLpcL_qqUx224X_zPBEZ8yJeX45RHI-uKWYQC5QadqeRIfQKB=login_ver3; kampyle_userid=a906-77f7-5bee-b2c6-9d73-7876-0d27-a621; _gcl_aw=GCL.1605990361.Cj0KCQiAkuP9BRCkARIsAKGLE8VZajpCzwLCwyNR-szJXzaOIBV9CkIyUFEtHQHQaIA5QEJm4y3qDy8aAm3UEALw_wcB; _gcl_dc=GCL.1605990361.Cj0KCQiAkuP9BRCkARIsAKGLE8VZajpCzwLCwyNR-szJXzaOIBV9CkIyUFEtHQHQaIA5QEJm4y3qDy8aAm3UEALw_wcB; _gac_UA-10765339-11=1.1605990362.Cj0KCQiAkuP9BRCkARIsAKGLE8VZajpCzwLCwyNR-szJXzaOIBV9CkIyUFEtHQHQaIA5QEJm4y3qDy8aAm3UEALw_wcB; _gac_UA-10765339-1=1.1605990363.Cj0KCQiAkuP9BRCkARIsAKGLE8VZajpCzwLCwyNR-szJXzaOIBV9CkIyUFEtHQHQaIA5QEJm4y3qDy8aAm3UEALw_wcB; _gaexp=GAX1.3.BsO3xe2bQESvf9UoMrAbiA.18686.0; dtid=2:uAeaRUNH9OizwxR0B1wrgCnMXeuoOXx1f0amATQ0yJG7GHvqYN0kc3oq/d0rvA4X4IDG4UFXMuMOKnOsQW2SEltmXRTNfGFrZg5z7DkLlDAVxAiNxQuq7hnJQZmZ8AIyQfI=; _gid=GA1.3.2099694731.1607684309; cw-lrkswrdjp=dm-Courier,f-9538,a-734,s-0; _fbc=fb.2.1607754483600.IwAR31bsSHbQSiH2hlf-17lp18Ho7TXGCGI17JMutS0LjDWx3TWv29zujYBdg; _hjTLDTest=1; ARRAffinity=c2dba6f1a343c8b908c4c09af49d7b98f09d8a609f95e791c930db34ec6d2ef1; ARRAffinitySameSite=c2dba6f1a343c8b908c4c09af49d7b98f09d8a609f95e791c930db34ec6d2ef1; ASP.NET_SessionId=lxip0azizequdgsemkz0f0rn; cw-laie=5dfc9078c26d47c89abba95c69581c8e; cw-arjshtsw=o65f11a768784475385951a375d486d38oweloxucl; _gat_UA-10765339-1=1; AKA_A2=A; ai_sessioncw-=fgg5T|1607804670106|1607804768236.245; _dc_gtm_UA-10765339-1=1; akavpau_vpshop=1607805067~id=6ac01f9b38057af296a06f6e3724c029; _dc_gtm_UA-10765339-11=1; _hjIncludedInSessionSample=0; outbrain_cid_fetch=true; kampyleUserSession=1607804770991; kampyleUserSessionsCount=19; kampyleSessionPageCounter=1',
    }

    params = (
        ('dasFilter', 'Department;;{};false'.format(department)),
        ('target', 'browse'),
    )





    page = 1

    page_num = 10

    # last page = 104
    while page <= page_num:
        response = requests.get('https://shop.countdown.co.nz/api/v1/products?dasFilter=Department%3B%3B{}%3Bfalse&target=browse&page={}'.format(department, page), headers=headers, params=params)

        print(response)
        raw_data = response.json()

        if page == 1:
            page_num = raw_data['products']['totalItems'] // 48 + 1

        items = raw_data['products']['items']

        for item in items:
            if item['type'] != 'PromoTile':

                product = {}
                product['id'] = item['sku']
                product['name'] = item['name']
                product['price'] = str(item['price']['salePrice'])
                product['priceMode'] = item['unit']
                product['volumeSize'] = item['size']['volumeSize']
                product['img'] = item['images']['big']

                products_output.append(product)


        page = page + 1

    

with open('test.json', 'w', encoding='utf-8') as f:
    json.dump(products_output, f, ensure_ascii=False, indent=4)

