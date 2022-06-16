import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";

function ScoreInputFull(props) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const [userId, setID] = useState();
  const [playerName, setPlayer] = useState();

  const score = useRef();
  const greens = useRef();
  const fairways = useRef();
  const putts = useRef();
  const courseName = useRef();
  const date = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    router.push("/ViewScores");
  };
  const handleShow = () => {
    setShow(true);
  };

  let localID = "";

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
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    localID = authCtx.id;
    console.log(localID);
    const inputData = {
      score: score.current.value,
      greens: props.g,
      fairways: props.f,
      putts: props.p,
      course: courseName.current.value,
      date: date.current.value,
      userID: userId,
      published: "no",
      player: playerName,
    };

    score.current.value = "";
    courseName.current.value = "";
    date.current.value = "";
    onNewJob(inputData);
    console.log(inputData);
    handleShow();
  }

  async function onNewJob(data) {
    const response = await fetch("/api/addRound", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="container">
      <h1>Round Details</h1>

      <Form onSubmit={submitHandler} className="form">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Course Name"
            ref={courseName}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="date"
            placeholder="Date Played"
            ref={date}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="Score"
            ref={score}
            min="18"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Score Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>Score successfully added to database!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ScoreInputFull;
