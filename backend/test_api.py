import unittest
import json
from backendapi import app, db
from models import Product, User, AdminUser

class FlaskAPITests(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_database.db'
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_register_user(self):
        response = self.app.post('/register', json={
            'username': 'testuser',
            'password': 'testpass'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('User registered successfully', response.json['message'])

    def test_login_user(self):
        # First, register a user
        self.app.post('/register', json={
            'username': 'testuser',
            'password': 'testpass'
        })
        # Then, try to log in
        response = self.app.post('/login', json={
            'username': 'testuser',
            'password': 'testpass'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', response.json)

    def test_get_products(self):
        # First, create a test user and log in
        self.app.post('/register', json={
            'username': 'testuser',
            'password': 'testpass'
        })
        login_response = self.app.post('/login', json={
            'username': 'testuser',
            'password': 'testpass'
        })
        access_token = login_response.json['access_token']

        # Then, test the get_products endpoint
        response = self.app.get('/products', headers={
            'Authorization': f'Bearer {access_token}'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_create_product(self):
        # First, create an admin user and log in
        self.app.post('/admin/register', json={
            'username': 'adminuser',
            'email': 'admin@example.com',
            'password': 'adminpass'
        })
        login_response = self.app.post('/admin/login', json={
            'username': 'adminuser',
            'email': 'admin@example.com',
            'password': 'adminpass'
        })
        access_token = login_response.json['access_token']

        # Then, test the create_product endpoint
        response = self.app.post('/products', json={
            'title': 'Test Product',
            'description': 'This is a test product',
            'price': 9.99
        }, headers={
            'Authorization': f'Bearer {access_token}'
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json['title'], 'Test Product')

if __name__ == '__main__':
    unittest.main()