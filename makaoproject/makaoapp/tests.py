from django.test import TestCase, Client
from unittest.mock import patch
from django.http import JsonResponse

class FirebaseInteractionTest(TestCase):
    def setUp(self):
        self.client = Client()

    @patch('makaoproject.firebase.firebase_db.child')
    def test_get_data_from_firebase(self, mock_firebase_child):
        mock_firebase_child.return_value.get.return_value = {"key": "value"}
        response = self.client.get('/your-get-data-url/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {"key": "value"})

    @patch('makaoproject.firebase.firebase_db.child')
    def test_write_data_to_firebase(self, mock_firebase_child):
        response = self.client.post('/your-write-data-url/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {"message": "Data written successfully"})

    @patch('makaoproject.firebase.db.collection')
    def test_some_view(self, mock_firestore_collection):
        mock_firestore_collection.return_value.get.return_value = [
            MockDocument(id='123', data={'name': 'John Doe'})
        ]
        response = self.client.get('/your-some-view-url/')
        self.assertEqual(response.status_code, 200)
        # Add more assertions as needed

class MockDocument:
    def __init__(self, id, data):
        self.id = id
        self.data = data

    def to_dict(self):
        return self.data

# Create your tests here.
