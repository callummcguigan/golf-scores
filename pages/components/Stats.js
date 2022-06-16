import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../../store/auth-context";
import { useEffect, useContext, useState } from "react";
import { VictoryPie } from "victory-pie";

function Stats(props) {
  const [scores, setScores] = useState([]);
  const authCtx = useContext(AuthContext);
  const [idOfUser, setID] = useState();

  const [holes, setHoles] = useState(0);

  let holesComp = 0;

  const [totalGreens, setTotalGreens] = useState(0);
  const [totalGreensLong, setTotalGreensLong] = useState(0);
  const [totalGreensShort, setTotalGreensShort] = useState(0);
  const [totalGreensLeft, setTotalGreensLeft] = useState(0);
  const [totalGreensRight, setTotalGreensRight] = useState(0);

  let greensHit = 0;
  let greensLong = 0;
  let greensShort = 0;
  let greensLeft = 0;
  let greensRight = 0;

  const [totalUpNDown, setTotalUpNDown] = useState(0);
  const [totalTries, setTotalTries] = useState(0);

  let upNDown = 0;
  let tries = 0;

  const [totalFairways, setTotalFairways] = useState(0);
  const [totalFairwaysLeft, setTotalFairwaysLeft] = useState(0);
  const [totalFairwaysRight, setTotalFairwaysRight] = useState(0);

  let fairHit = 0;
  let fairLeft = 0;
  let fairRight = 0;

  const [totalPutts, setTotalPutts] = useState(0);

  let putts = 0;

  const [totalPuttDist, setTotalPuttDist] = useState(0);

  let puttDist = 0;

  const [greensTotalHit, setGreensTotalHit] = useState(0);
  const [fairwaysTotalHit, setFairwaysTotalHit] = useState(0);
  const [greensTotalMissed, setGreensTotalMissed] = useState(0);
  const [fairwaysTotalMissed, setFairwaysTotalMissed] = useState(0);

  const [fairwayData, setFairwayData] = useState([]);

  useEffect(() => {
    console.log(props.userId);
    if (!props.userId) return;
    fetchData();
  }, [props.userId]);

  const fetchData = async () => {
    fetch("/api/getStats")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.message.map((e, i) => {
          const x = Object.keys(e).length;
          console.log(e.player === props.userId);
          if (x > 2) {
            if (e.player === props.userId) {
              for (let index = 0; index < x - 2; index++) {
                if (e[index] !== undefined) {
                  let greens = e[index][index].green;
                  let fairway = e[index][index].fairway;
                  let attempt = e[index][index].upndown;
                  if (greens === "Hit") {
                    greensHit = greensHit + 1;
                  } else if (greens === "Short") {
                    greensShort = greensShort + 1;
                  } else if (greens === "Long") {
                    greensLong = greensLong + 1;
                  } else if (greens === "Left") {
                    greensLeft = greensLeft + 1;
                  } else if (greens === "Right") {
                    greensRight = greensRight + 1;
                  }

                  if (attempt === "Yes") {
                    upNDown = upNDown + 1;
                    tries = tries + 1;
                  } else if (attempt === "No") {
                    tries = tries + 1;
                  }

                  if (fairway === "Hit") {
                    fairHit = fairHit + 1;
                  } else if (fairway === "Left") {
                    fairLeft = fairLeft + 1;
                  } else if (fairway === "Right") {
                    fairRight = fairRight + 1;
                  }

                  putts = putts + parseFloat(e[index][index].putts);
                  puttDist = puttDist + parseFloat(e[index][index].puttDist);

                  holesComp = holesComp + 1;
                }
              }
            }
          }
        });
        setHoles(holesComp);

        setTotalGreens(greensHit);
        setTotalGreensLong(greensLong);
        setTotalGreensShort(greensShort);
        setTotalGreensLeft(greensLeft);
        setTotalGreensRight(greensRight);

        setTotalFairways(fairHit);
        setTotalFairwaysLeft(fairLeft);
        setTotalFairwaysRight(fairRight);

        setTotalPutts(putts);
        setTotalPuttDist(puttDist);

        setTotalUpNDown(upNDown);
        setTotalTries(tries);

        setScores(data.message);
      });
  };

  if (holes > 0) {
    return (
      <div className="container">
        <div>
          <h2>Holes Played To Date: {holes}</h2>
        </div>

        <div className="stat_container">
          <div className="greens">
            <p>Greens Hit: {totalGreens}</p>
            <p>Greens Short: {totalGreensShort}</p>
            <p>Greens Long: {totalGreensLong}</p>
            <p>Greens Left: {totalGreensLeft}</p>
            <p>Greens Right: {totalGreensRight}</p>
          </div>

          <div className="shortgame">
            <p>Up and Down Attempts: {totalTries}</p>
            <p>Successful: {totalUpNDown}</p>
            <p>Unsuccessful: {totalTries - totalUpNDown}</p>
          </div>

          <div className="fairways">
            <p>Fairways Hit: {totalFairways}</p>
            <p>Fairways Left: {totalFairwaysLeft}</p>
            <p>Fairways Right: {totalFairwaysRight}</p>
          </div>

          <div className="putts">
            <p>Total Putts: {totalPutts}</p>
            <p>Average Putts Per Hole: {(totalPutts / holes).toFixed(1)}</p>
            <p>Total Putt Footage Holed: {totalPuttDist}</p>
            <p>
              Average Putt Made Distance : {(totalPuttDist / holes).toFixed(1)}{" "}
              feet
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>No Full Scores Added</h1>
      </div>
    );
  }
}

export default Stats;
