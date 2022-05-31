import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";

function HoleStatInput(props) {
  const [green, setGreen] = useState("");
  const [fairway, setFairway] = useState("");
  const [putts, setPutts] = useState("");
  const [puttDist, setPuttDist] = useState("");
  const [completed, setCompleted] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [missedGreen, setMissedGreen] = useState(false);

  const [upnDown, setUpnDown] = useState("N/A");

  const holeNumber = props.holeNo;
  const roundId = props.roundId;

  function handler(e) {
    e.preventDefault();
    setCompleted(true);
    setButtonState(true);

    const data = {
      [holeNumber]: {
        green: green,
        upndown: upnDown,
        fairway: fairway,
        putts: putts,
        puttDist: puttDist,
      },
    };
    if (green === "Hit") {
      props.greensParent();
    }
    if (fairway === "Hit") {
      props.fairwaysParent();
    }
    props.puttsParent(putts);
    updateHoleInfo(data);
  }

  async function updateHoleInfo(data) {
    const response = await fetch("/api/updateHoleInfo", {
      method: "POST",
      body: JSON.stringify({ id: props.roundId, data: data, hole: holeNumber }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function handlerGreen(e) {
    console.log(e);
    setGreen(e);

    if (e != "Hit") {
      setMissedGreen(true);
    } else {
      setMissedGreen(false);
    }
  }

  return (
    <div className="container">
      <p>
        Hole {holeNumber + 1}{" "}
        <span className={completed !== true ? "hidden" : ""} id={holeNumber}>
          : Complete
        </span>
      </p>
      <Form onSubmit={handler}>
        <p>Did you hit the green?</p>
        <Form.Control
          required
          as="select"
          onChange={(e) => handlerGreen(e.target.value)}
        >
          <option value="">Select From Dropdown</option>
          <option value="Hit">Hit</option>
          <option value="Long">Long</option>
          <option value="Short">Short</option>
          <option value="Left">Left</option>
          <option value="Right">Right</option>
        </Form.Control>

        {missedGreen && (
          <div>
            <Form.Control
              required
              as="select"
              onChange={(e) => setUpnDown(e.target.value)}
            >
              <option value="">Did you get up and down?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </div>
        )}

        <p>Did you hit the fairway?</p>
        <Form.Control
          required
          as="select"
          onChange={(e) => setFairway(e.target.value)}
        >
          <option value="">Select From Dropdown</option>
          <option value="Hit">Hit</option>
          <option value="Left">Left</option>
          <option value="Right">Right</option>
          <option value="null">N/A</option>
        </Form.Control>

        <p>How many putts did you have?</p>
        <Form.Control
          required
          as="select"
          onChange={(e) => setPutts(e.target.value)}
        >
          <option value="">Select From Dropdown</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Control>

        <Form.Label htmlFor="inputPassword5">
          How long was the putt you holed in feet?
        </Form.Label>
        <Form.Control
          required
          type="number"
          id="puttDist"
          onChange={(e) => setPuttDist(e.target.value)}
        />
        <Button type="submit" disabled={buttonState} className="scoreButton">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default HoleStatInput;
