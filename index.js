require("dotenv").config();

const express = require('express');
const app = express();
const port = 3000;

const admin = require('firebase-admin');
const serviceAccount = require('./klofrox.json');



const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});
  
const database = admin.database();

app.get('/', async (req, res) => {
    // Rastgele bir ID oluşturun
    const randomId = database.ref().push().key;
  
    // Oluşturulan ID ile birlikte veriyi Realtime Database'e ekleyin
    await database.ref(`users/${randomId}`).set({
      message: 'Merhaba, Express! Firebase ID: ' + randomId,
    });
  
    res.send('Merhaba, Express! Firebase ID: ' + randomId);
});
  
app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});
  
