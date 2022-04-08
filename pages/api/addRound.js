import { MongoClient } from 'mongodb'

async function handler(req, res){

    const data = req.body;
    const client = await MongoClient.connect('mongodb+srv://callum:callum123@cluster0.5gwwa.mongodb.net/golfapp?retryWrites=true&w=majority');
    const db = client.db();
    const jobsCollection = db.collection('scores');
    const result = await jobsCollection.insertOne(data);
    console.log(result);
    client.close();
    
    return res.json();

}

export default handler;