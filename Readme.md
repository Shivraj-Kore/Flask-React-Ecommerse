# E-Commerce Website

## In this project there are two files Backend and Frontend

- Backend is done in Flask , Frontend is done in React Js

## To Initialize the project , first create a virtual envoirnment so that dependencies are not installed on your device

Make Virtual Envoirnment and acctivate it using following commands:

```
python -m venv myvenv
cd myvenv
.\Scripts\activate
```

In the active virtual envoirnment , git clone the project

```
git clone https://github.com/Shivraj-Kore/Flask-React-Ecommerse.git
cd .\Flask-React-Ecommerse\
```

After this , **install** all the **Backend dependenciesas** follows:

```
cd .\backend\
pip install Flask , Flask-Bcrypt , Flask-JWT-Extended , Flask-Cors , Flask-SQLAlchemy
python .\backendapi.py
```

#### In a ***seperate Terminal*** again activate the virtual envoirnment :

**Install** all the **Frontend dependenciesas** follows:

```
cd .\myvenv\
.\Scripts\activate
cd .\Flask-React-Ecommerse\frontend\
npm i
npm i react-router-dom
npm run dev
```

Now that both frontend and backend servers are running , you can see the GUI on wrb on :

- [localhost](http://localhost:5174/)

### To use the website , make an admin registration user , then admin login using the same user and add a few products .

### Then logout , register a non-admin user and then login again to see the web page.

### -------------------------------------------------------------------------------------------------

##### To just test the backend apis , use a service such as postman and then use the following requests:

--

```
//POST http://localhost:5000/register , login
{
    "username": "testuser",
    "password": "password123"
}
```

```
//POST http://localhost:5000/admin/register , login
{
    "username": "adminuser",
    "email": "admin@example.com",
    "password": "adminpass123"
}
```

```
//POST http://localhost:5000/products (POST for add products) 
//PUT http://localhost:5000/products/1 (PUT for updating product with id:1)
{
    "title": "New Product",
    "description": "This is a new product description",
    "price": 29.99
}
```

```
//DELETE http://localhost:5000/products/1 (To delete product with id:1) 
```
