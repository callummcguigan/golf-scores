
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

function MobileScore(props) {
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
            <div className="mobileScore center">
                <p>{props.course} | {props.date}</p>
                <p>Score: {props.score}</p>
                <p>Greens: {props.greens}</p>
                <p>Fairways: {props.fairways}</p>
                <p>Putts: {props.putts}</p>
                <div className="center">
                    {(props.published == "yes" && (
                        <Button onClick={unpublishRound} className="mobileButton">Unpublish?</Button>
                    ))}
                    {(props.published == "no" && (
                        <Button onClick={publishRound} className="mobileButton">Publish?</Button>
                    ))}
                </div>
                <div className="center">
                    <Button onClick={deleteRound} className="mobileButton">Delete?</Button>
                </div>
    
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
            </div>
        )
    } else {
        return null
    }
    
}

export default MobileScore;