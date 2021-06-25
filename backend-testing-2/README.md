# Backend Testing 2

Develop the next endpoints:

```
GET: /products'
GET: /products/:uid
POST: /products
PUT: /products/:uid
DELETE: /products/:uid
```

##Pre requisites

Experience with:

- Node JS
- Express JS

CLI:

Store new product.

```
curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "my product", "size": "1", "description": "fake description"}' \
    http://localhost:8080/products
```

Get all products.

```
curl -X GET http://localhost:3001/products
```

Get product by uid.

```
curl -X GET http://localhost:3001/products/{uid}
```

Update product by uid.

```
curl -X PUT -H "Content-Type: application/json" \
    -d '{"name": "my product updated", "size": "2", "description": "updated"}' \
    http://localhost:3001/users/{id}
```

Remove product by uid.

```
curl -X DELETE http://localhost:3001/products/{uid}
```
