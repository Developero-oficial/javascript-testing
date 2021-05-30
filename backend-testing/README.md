# Backend Testing

Develop the next endpoints:

```
GET: /users'
GET: /users/:uid
POST: /users
PUT: /users/:uid
DELETE: /users/:uid
```

##Pre requisites

Experience with:

- Node JS
- Express JS

CLI:

Store new user.

```
curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "john", "address": "fake address", "age": "20", "uid": "abc"}' \
    http://localhost:3001/users
```

Get all users.

```
curl -X GET http://localhost:3001/users
```

Get user by uid.

```
curl -X GET http://localhost:3001/users/{id}
```

Update user by uid.

```
curl -X PUT -H "Content-Type: application/json" \
    -d '{"name": "john", "address": "fake address", "age": "20"}' \
    http://localhost:3001/users/{id}
```

Remove user by uid.

```
curl -X DELETE http://localhost:3001/users/{id}
```
