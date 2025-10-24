import express from "express";
const app = express();
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import firebaseConfig from "./FireBaseConfig.js";
import cors from "cors";
import bodyParser from "body-parser";

app.use(cors());
app.use(bodyParser.json());

import { readFileSync } from 'fs'
const serviceAccount = JSON.parse(
readFileSync(new URL('./serviceAccountKey.json', import.meta.url), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const collection = db.collection('SmartDrops-Waiting-list')

dotenv.config();
const port = process.env.PORT || 3000

app.get('/list', async(req, res) => {

  const db = admin.firestore()

  try {
      
    const snapshot = await db.collection('SmartDrops-Waiting-list').get()
    console.log('number of docs found:', snapshot.size)
    if (snapshot.empty) {
      console.log('No documents found.')
      return res.status(404).json({ message: 'No list found' })
    }

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log('Data:', data)
    res.json(data)

  } catch (error) {
    
    res.status(500).send(error)

  }

})

app.post('/list', upload.single('Name'), async(req, res) => {
  try {
  
    const file = req.file
    const body = req.body

    await collection.add(body)

    console.log("Data sent to Firestore:", req.body)
    console.log("Uploaded file info:", req.file)
    console.log("Data saved to Firestore with ID:", collection.id);
    res.status(201).json({ id: collection.id });
    res.send({})

  } catch (error) {
    
    console.error('Error adding user:', error.message)
    res.status(500).json({ error: error.message})
  
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

