import React from "react";
import { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../../store/auth-context";

function Stat(props) {
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

  useEffect(() => {
    props.message.map((e, i) => {
      const x = Object.keys(e).length;
      for (let index = 0; index < x - 2; index++) {
        let greens = e[index][index].green;
        let fairway = e[index][index].fairway;
        if (greens === "Hit") {
          setTotalGreens(totalGreens + 1);
        } else if (greens === "Short") {
          greensShort = greensShort + 1;
        } else if (greens === "Long") {
          greensLong = greensLong + 1;
        } else if (greens === "Left") {
          greensLeft = greensLeft + 1;
        } else if (greens === "Right") {
          greensRight = greensRight + 1;
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
  }, []);

  function handler() {
    console.log(props.message);
    console.log(props.user);
    console.log(totalFairways);
    console.log(totalGreens);
  }

  return (
    <div>
      <div>
        <button onClick={handler}></button>
        Holes Played: {holes}
      </div>
      <div>
        <p>Greens Hit: {totalGreens}</p>
        <p>Greens Short: {totalGreensShort}</p>
        <p>Greens Long: {totalGreensLong}</p>
        <p>Greens Left: {totalGreensLeft}</p>
        <p>Greens Right: {totalGreensRight}</p>
      </div>

      <div>
        <p>Fairways Hit: {totalFairways}</p>
        <p>Fairways Left: {totalFairwaysLeft}</p>
        <p>Fairways Right: {totalFairwaysRight}</p>
      </div>

      <div>
        <p>Total Putts: {totalPutts}</p>
        <p>Average Putts Per Hole: {(totalPutts / holes).toFixed(1)}</p>
        <p>Total Putt Footage Holed: {totalPuttDist}</p>
        <p>Average Putt Made Distance: {(totalPuttDist / holes).toFixed(1)}</p>
      </div>
    </div>
  );
}

export default Stat;
