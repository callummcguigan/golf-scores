import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const data = req.body.data;
  const id = req.body.id;
  const hole = req.body.hole.toString();
  const client = await MongoClient.connect(
    "mongodb+srv://callum:callum123@cluster0.5gwwa.mongodb.net/golfapp?retryWrites=true&w=majority"
  );
  const db = client.db();
  const jobsCollection = db.collection("fullstat");
  const result = jobsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { [hole]: data } }
  );

  return res.json();
}

export default handler;
