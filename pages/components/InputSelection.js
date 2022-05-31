import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ScoreInput from "./ScoreInput";
import FullScoreInput from "./FullScoreInput";

function InputSelection() {
  const [simpleOrFull, setSimpleOrFull] = useState("");

  function simpleHandler() {
    setSimpleOrFull("simple");
  }
  function fullHandler() {
    setSimpleOrFull("full");
  }
  function backHandler() {
    setSimpleOrFull("");
  }

  if (simpleOrFull === "") {
    return (
      <div className="container">
        <p>
          Would you like to enter a simple score, or a full round including
          stats?
        </p>

        <Button onClick={simpleHandler}>Simple</Button>
        <Button onClick={fullHandler}>Full Round</Button>
      </div>
    );
  } else if (simpleOrFull === "simple") {
    return (
      <div className="container">
        <Button onClick={backHandler}>Back</Button>
        <ScoreInput />
      </div>
    );
  } else if (simpleOrFull === "full") {
    return (
      <div className="container">
        <Button onClick={backHandler}>Back</Button>
        <FullScoreInput />
      </div>
    );
  }
}

export default InputSelection;
