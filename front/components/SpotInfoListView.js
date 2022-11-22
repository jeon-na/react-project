import SpotInfo from "./SpotInfo";
import { useEffect } from "react";
import { List, Segmented, Avatar } from 'antd';

function SpotInfoListView({ spotList = [] }) {

    var cnt = 1

    useEffect(() => {
        console.log("SpotInfoListView component");
    }, [])


    return (
        // <div>
        //     {spotList.map(spot => (<SpotInfo key={spot.id} info={spot} />))}
        // </div>
        <List
        style={{padding: '20px'}}
        itemLayout="horizontal"
        dataSource={spotList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size="small" shape="square" style={{ backgroundColor: '#87d068' }}>{cnt++}</Avatar>}
              title={item.spotName}
            />
          </List.Item>
        )}
      />
    );
}

export default SpotInfoListView