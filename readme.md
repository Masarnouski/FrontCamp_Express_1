Application runs on localhost:3000
Available endpoints are 
For news
GET:
localhost:3000/news
localhost:3000/news/id
POST:
localhost:3000/news
PUT:
localhost:3000/news/id(need to have bearer token in headers)
DELETE:
localhost:3000/news/id(need to have bearer token in headers)
For user:
POST:
localhost:3000/users - to create new user
localhost:3000/users/login - to login with credentials
localhost:3000/users/me/logout(need to have bearer token in headers)
localhost:3000/users/me/logoutall(need to have bearer token in headers)
GET:
localhost:3000/users/me - to get user info(need to have bearer token in headers)

To use application, please, use localhost:3000/users to create new user
![postUser image](https://github.com/Masarnouski/FrontCamp_Express_1/blob/master/postUser.png)

You can get JWT Token from responce, and then do a request to delete article
![deleteUser image](https://github.com/Masarnouski/FrontCamp_Express_1/blob/master/deleteUser.png)
