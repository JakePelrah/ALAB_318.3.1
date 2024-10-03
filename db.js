import { MongoClient } from "mongodb";

MongoClient.connect('mongodb://localhost:5432/db', (err, client) => {
    if (err) throw err

    const db = client.db('users')

    db.collection('user').find().toArray((err, result) => {
        if (err) throw err
        console.log(result)
    })
})