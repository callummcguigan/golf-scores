
import PublishedScore from "./PublishedScore";
import Averages from "./Averages";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../store/auth-context';
import { useEffect, useContext, useState } from 'react';


function PublishedScores(props) {

    const authCtx = useContext(AuthContext)
    const [idOfUser, setID] = useState();
    let rounds = 0;

    useEffect(() => {
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAhtJKjKn1JstR6g8QT221oxblZOUv2rkQ",
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            return res.json();

        }).then(data => {
            try {
            const checkID = data.users[0].localId;
            } catch (e) {
                console.log("error")
            }

            if (checkID != undefined) {
                setID(data.users[0].localId);
            } else {
                setID('No Display Name Set, Manage Account To Set A Name');
            }

        })
    })

    let calcAverageScore = 0;
    let calcAverageGreens = 0;
    let calcAverageFairways = 0;
    let calcAveragePutts = 0;

    return (
        <div className="container">

            <h3>Scores</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Greens</th>
                        <th>Fairways</th>
                        <th>Putts</th>
                    </tr>
                </thead>
                <tbody>
                    {props.scores && props.scores.map((score, key) => (
                        <PublishedScore
                            key={key}
                            score={score.score}
                            greens={score.greens}
                            fairways={score.fairways}
                            putts={score.putts}
                            course={score.course}
                            date={score.date}
                            id={score.id}
                            user={score.user}
                            localUser={idOfUser}
                            player={score.player}
                        />))}
                </tbody>
            </Table>

            {props.scores.forEach(score => {
                    calcAverageScore = calcAverageScore + parseFloat(score.score)
                    calcAverageGreens = calcAverageGreens + parseFloat(score.greens)
                    calcAverageFairways = calcAverageFairways + parseFloat(score.fairways)
                    calcAveragePutts = calcAveragePutts + parseFloat(score.putts)
                    rounds = rounds + 1;
            })}
            <Averages averages={rounds} avgScore={calcAverageScore / rounds } avgGreens={calcAverageGreens / rounds} avgFairways={calcAverageFairways / rounds} avgPutts={calcAveragePutts / rounds} />

        </div>
    );
}

export default PublishedScores;