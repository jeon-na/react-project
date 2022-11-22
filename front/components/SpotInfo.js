import { useEffect } from "react";

function SpotInfo({ info = {spotName: "N/A", spotAddress: "N/A" } }) {

    useEffect(() => {
        console.log("SpotInfo component created")
    }, [])

    return (
        <div style={{
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }}>
            <div><b>{info.spotName}</b></div>
            <div>{info.spotAddress}</div>
        </div>
    );
}

export default SpotInfo