import Router from "next/router";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function Score(props) {



    const router = Router;
    async function deleteRound() {

        console.log(props.id)

        const response = await fetch('/api/deleteRound', {
            method: 'POST',
            body: JSON.stringify(props.id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.reload()

    }

    async function publishRound() {

        console.log(props.id)

        const response = await fetch('/api/publishRound', {
            method: 'POST',
            body: JSON.stringify(props.id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        handleShow();
        props.fetchData;

    }

    async function unpublishRound() {

        console.log(props.id)

        const response = await fetch('/api/unpublishRound', {
            method: 'POST',
            body: JSON.stringify(props.id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        props.fetchData;
        window.location.reload()

    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        window.location.reload()
    }

    const handleShow = () => setShow(true);

    console.log(props.published)


    if (props.user == props.localUser) {

        return (
            <tr>
                <td>{props.course}</td>
                <td>{props.date}</td>
                <td>{props.score}</td>
                <td>{props.greens}</td>
                <td>{props.fairways}</td>
                <td>{props.putts}</td>
                {(props.published == "yes" && (
                    <td><button onClick={unpublishRound}>Unpublish?</button></td>
                ))}
                {(props.published == "no" && (
                    <td><button onClick={publishRound}>Publish?</button></td>
                ))}
                <td><button onClick={deleteRound}>Delete?</button></td>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Score Published!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Score successfully published for all to see!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        );
    } else {
        return null;
    }
}

export default Score;