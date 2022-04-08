import PublishedScores from "../components/PublishedScores";
import { MongoClient } from 'mongodb'
import Navbar from "../components/Navbar";
import AuthContext from "../../store/auth-context";
import {useContext } from 'react';

function ViewScores(props) {

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn

    return (
        <div>
            <Navbar />

            {(isLoggedIn && (
            <PublishedScores scores={props.publishedScores}/>
            ))}
            
        </div>
    );
}

export async function getStaticProps() {

    
    const client = await MongoClient.connect('mongodb+srv://callum:callum123@cluster0.5gwwa.mongodb.net/golfapp?retryWrites=true&w=majority');
    const db = client.db();
    const scoresCollection = db.collection('scores');

    const scores = await scoresCollection.find().sort({ date: 1 }).toArray();
    const publishedScores = await scoresCollection.find( { published: "yes" } ).sort({ date: 1 }).toArray();
    

    client.close();

    return {
        props: {
            scores: scores.map((score) => ({
                score: score.score,
                greens: score.greens,
                fairways: score.fairways,
                putts: score.putts,
                course: score.course,
                date: score.date,
                id: score._id.toString(),
                user: score.userID
            })),
            publishedScores: publishedScores.map((score) => ({
                score: score.score,
                greens: score.greens,
                fairways: score.fairways,
                putts: score.putts,
                course: score.course,
                date: score.date,
                id: score._id.toString(),
                user: score.userID,
                player: score.player
            }))


        },

        revalidate: 1,
    };



}



export default ViewScores;