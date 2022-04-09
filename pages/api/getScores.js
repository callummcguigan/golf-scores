import { MongoClient, ObjectId } from 'mongodb'

export default async (req, res) => {

    const client = await MongoClient.connect('mongodb+srv://callum:callum123@cluster0.5gwwa.mongodb.net/golfapp?retryWrites=true&w=majority');
    const db = client.db();
    const scoresCollection = db.collection('scores');

    const scores = await scoresCollection.find().sort({ date: 1 }).toArray();
    
    
    return res.json({
        message: JSON.parse(JSON.stringify(scores)),
        success: true,
    });

}