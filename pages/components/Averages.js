import { VictoryPie } from "victory-pie";



function Averages(props) {

    const fairwayData = [
        { x: ((props.avgFairways / 15) * 100).toFixed(2) + "%", y: (props.avgFairways / 14) * 100 },
        { x: (100 - ((props.avgFairways / 15) * 100).toFixed(2)) + "%", y: (100 - ((props.avgFairways / 14) * 100)) },
    ];
    const greensData = [
        { x: ((props.avgGreens / 18) * 100).toFixed(2) + "%", y: (props.avgGreens / 18) * 100 },
        { x: (100 - ((props.avgGreens / 18) * 100).toFixed(2)) + "%", y: (100 - ((props.avgGreens / 18) * 100)) },
    ];

    return (
        <div>
            <div className="container">
                <p>Rounds Played:  {props.averages}</p>
                <p>Average Score: {props.avgScore}</p>
                <p>Average Putts: {props.avgPutts}</p>
            </div>

            <div className="pieChart">
                <div className="pieChartCol">
                    <p>Fairways</p>
                <VictoryPie
                    data={fairwayData}
                    colorScale={["green", "red"]}
                    radius={100}
                />
                </div>
                <div className="pieChartCol">
                    <p>Greens</p>
                <VictoryPie
                    data={greensData}
                    colorScale={["green", "red"]}
                    radius={100}
                />
                </div>
            </div>
        </div>
    );
}

export default Averages;