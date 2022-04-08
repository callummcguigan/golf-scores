import Router from "next/router";

function PublishedScore(props) {

    

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

        router.replace('/ViewScores')

    }         

        return (
            <tr>
                <td>{props.player}</td>
                <td>{props.course}</td>
                <td>{props.date}</td>
                <td>{props.score}</td>
                <td>{props.greens}</td>
                <td>{props.fairways}</td>
                <td>{props.putts}</td>
            </tr>
        );
}

export default PublishedScore;