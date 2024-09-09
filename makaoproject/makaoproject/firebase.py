import os
import firebase_admin
from firebase_admin import credentials, db

# Load the Service Account Key from the environment variable
firebase_cred_path = os.getenv('FIREBASE_CRED_PATH')

if not firebase_cred_path:
    raise Exception("FIREBASE_CRED_PATH environment variable not set")

# Initialize Firebase
cred = credentials.Certificate(firebase_cred_path)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://makao-project-default-rtdb.firebaseio.com/'
})

# Access Firebase Realtime Database
firebase_db = db.reference()
