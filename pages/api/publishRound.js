import { MongoClient, ObjectId } from 'mongodb'

async function handler(req, res){

    
    const data = req.body;
    const client = await MongoClient.connect('mongodb+srv://callum:callum123@cluster0.5gwwa.mongodb.net/golfapp?retryWrites=true&w=majority');
    const db = client.db();
    const jobsCollection = db.collection('scores');
    const result = jobsCollection.updateOne(
        {"_id": ObjectId(data)}, 
        { $set: { "published": "yes"} }
        )
    

    return res.json();

}

export default handler;