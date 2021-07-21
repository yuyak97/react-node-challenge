## Version Info

- node v14.15.1
- npm v6.14.8
- nodemon ^2.0.12
- mysql2 ^2.2.5
- jsonwebtoken ^8.5.1

## Usage

### Build Setup

```
# install dependencies
$ npm install

# serve with hot reload at localhost:5000 or localhost:{process.env.APP_PORT}
$ npm start
```

### Database setup

Change the port number if you start mysql database on the other port.
I develop on the port 3306.

```
mysql -uroot -h127.0.0.1 --port
use {database name}

# create USER table
CREATE TABLE user (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar(50) NOT NULL, coin int NOT NULL DEFAULT 20, PRIMARY KEY(id));
```

### The structure of user table

+----------+-------------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+----------------+
| id | int | NO | MUL | NULL | auto_increment |
| name | varchar(50) | NO | | NULL | |
| email | varchar(50) | NO | | NULL | |
| password | varchar(50) | NO | | NULL | |
| coin | int | YES | | 20 | |
+----------+-------------+------+-----+---------+----------------+

## End point

### user

- GET: /api/users

You can get all users information from database. The endpoint return an array of users.

- POST: /api/users

You can create a new user. You have to send the json body in a request.
ex)

```
{
    "name": "test"
    "email": "test@test.test",
    "password": "test",
}
```

- GET: /api/users/profile

You can get information of a login user who has a cookie which name is jwt,
This endpoint returns an object

ex)

```
{
    "name": "name",
    "email": "test@test.test",
    "coin": 20
}
```

### game

- GET: /api/game/

This endpoint provides a game result for a login user and updates the coin column of the user table.
If a user doesn't have a jwt cookie, this endpoint returns an error.

ex)

```
{
    "result": [
        "apple",
        "banana",
        "banana"
    ],
    "wonCoin": 5,
    "totalUserCoin": 28
}
```
