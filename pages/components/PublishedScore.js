import Router from "next/router";

function PublishedScore(props) {

    

    const router = Router;
    

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