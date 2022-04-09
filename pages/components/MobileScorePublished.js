

function MobileScore(props) {

        return (
            <div className="mobileScore center">
                <p>{props.course} | {props.date}</p>
                <p>{props.player} | Score: {props.score}</p>
                <p>Greens: {props.greens}</p>
                <p>Fairways: {props.fairways}</p>
                <p>Putts: {props.putts}</p>
            </div>
        )    
}

export default MobileScore;