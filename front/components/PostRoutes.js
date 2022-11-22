import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Segmented, Avatar, Tabs } from 'antd';
import Map from './Map';

const data = [
  {
    order: 1,
    spot: '경복궁',
  },
  {
    order: 2,
    spot: '블루보틀',
  },
  {
    order: 3,
    spot: '명동교자',
  },
];

const data2 = [
  {
    order: 1,
    spot: '롯데월드타워',
  },
  {
    order: 2,
    spot: '매드포갈릭',
  },
  {
    order: 3,
    spot: '석촌 호수',
  },
];
const data3 = [
  {
    order: 1,
    spot: '코엑스',
  },

  {
    order: 2,
    spot: '카페 뮬라',
  },

];


const PostRoutes = ({ schedules }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);
    
    return (
        <>

<Tabs defaultActiveKey="1" style={{padding: '20px'}}>
    <Tabs.TabPane tab="221121 1일차" key="1">
    <List
    style={{padding: '10px'}}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar size="small" shape="square" style={{ backgroundColor: '#87d068' }}>{item.order}</Avatar>}
          title={item.spot}
        />
      </List.Item>
    )}
  />
    </Tabs.TabPane>
    <Tabs.TabPane tab="221122 2일차" key="2">
          <List
    style={{padding: '10px'}}
    itemLayout="horizontal"
    dataSource={data2}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar size="small" shape="square" style={{ backgroundColor: '#87d068' }}>{item.order}</Avatar>}
          title={item.spot}
        />
      </List.Item>
    )}
  />
    </Tabs.TabPane>
    <Tabs.TabPane tab="221123 3일차" key="3">
      <List
    style={{padding: '10px'}}
    itemLayout="horizontal"
    dataSource={data3}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar size="small" shape="square" style={{ backgroundColor: '#87d068' }}>{item.order}</Avatar>}
          title={item.spot}
        />
      </List.Item>
    )}
  />
    </Tabs.TabPane>
  </Tabs>
        </>
    )
};

PostRoutes.propTypes = {
    numberOfTrip: PropTypes.number.isRequired,
    TripDates: PropTypes.arrayOf(PropTypes.object),
}

export default PostRoutes;