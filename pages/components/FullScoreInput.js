import Button from "react-bootstrap/Button";
import { useRef, useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import HoleStatInput from "./HoleStatInput";
import AuthContext from "../../store/auth-context";
import ScoreInput from "./ScoreInput";
import ScoreInputFull from "./ScoreInputFull";

function FullScoreInput(props) {
  const [nineHoles, setNineHoles] = useState(false);
  const [eighteenHoles, setEighteenHoles] = useState(false);
  const [roundId, setRoundId] = useState("");
  const [userId, setID] = useState();
  const [playerName, setPlayer] = useState();

  const [greensHit, setGreensHit] = useState(0);
  const [fairwaysHit, setFairwaysHit] = useState(0);
  const [putts, setPutts] = useState(0);

  const authCtx = useContext(AuthContext);

  const n = 9;
  const m = 18;

  function nineHoleHandler() {
    let data = {
      player: userId,
    };

    onNewScore(data);

    setNineHoles(true);
  }

  function eighteenHoleHandler() {
    let data = {
      player: userId,
    };

    onNewScore(data);

    setEighteenHoles(true);
  }

  async function onNewScore(data) {
    const response = await fetch("/api/fullStat", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => {
        setRoundId(jsonRes.message);
      });
  }

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAhtJKjKn1JstR6g8QT221oxblZOUv2rkQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (authCtx.isLoggedIn) {
          const checkName = data.users[0].localId;
          const playerName = data.users[0].displayName;

          if (checkName != undefined) {
            setID(data.users[0].localId);
            setPlayer(data.users[0].displayName);
          } else {
            SetID("No Display Name Set, Manage Account To Set A Name");
          }
        }
      });
  });

  function greensHitChild() {
    setGreensHit(greensHit + 1);
  }

  function fairwaysHitChild() {
    setFairwaysHit(fairwaysHit + 1);
  }

  function puttsChild(i) {
    setPutts(putts + parseInt(i));
  }
  if (nineHoles == false && eighteenHoles == false) {
    return (
      <div className="container">
        <div>
          <Button onClick={nineHoleHandler}>9 Holes</Button>
          <Button onClick={eighteenHoleHandler}>18 Holes</Button>
        </div>
      </div>
    );
  } else if (nineHoles == true) {
    return (
      <div className="container">
        <div>
          {[...Array(n)].map((e, i) => (
            <HoleStatInput
              holeNo={i}
              roundId={roundId}
              greensParent={greensHitChild}
              fairwaysParent={fairwaysHitChild}
              puttsParent={puttsChild}
              key={i}
            />
          ))}
          <ScoreInputFull g={greensHit} f={fairwaysHit} p={putts} />
        </div>
      </div>
    );
  } else if (eighteenHoles == true) {
    return (
      <div className="container">
        <div>
          {[...Array(m)].map((e, i) => (
            <HoleStatInput
              holeNo={i}
              roundId={roundId}
              greensParent={greensHitChild}
              fairwaysParent={fairwaysHitChild}
              puttsParent={puttsChild}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default FullScoreInput;
