import React, { useCallback, useState } from 'react';
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { List, Segmented, Avatar, Tabs } from 'antd';
import Map from './Map';

const data = [
  {
    spotOrder: 1,
    spotName: '경복궁',
    spotAddress: '대한민국 서울특별시 종로구 사직로 161 경복궁'
  },
  {
    spotOrder: 2,
    spotName: '안국 노티드 카페',
    spotAddress: '대한민국 서울특별시 종로구 북촌로 6-3'
  },
  {
    spotOrder: 3,
    spotName: '명동 지하쇼핑센터',
    spotAddress: '대한민국 서울특별시 중구 퇴계로 124'
  },
  
];

const data2 = [
  {
    spotOrder: 1,
    spotName: '롯데월드타워',
    spotAddress: '대한민국 서울특별시 송파구 올림픽로 300'
  },
  {
    spotOrder: 2,
    spotName: '석촌호수',
    spotAddress: '대한민국 서울특별시 송파구 잠실6동'
  },

];
const data3 = [
  {
    spotOrder: 1,
    spotName: '코엑스',
    spotAddress: '대한민국 서울특별시 강남구 영동대로 513'
  },
  {
    spotOrder: 2,
    spotName: '마이아트 뮤지엄',
    spotAddress: '대한민국 서울특별시 강남구 테헤란로 518'
  },

];

const PostRoutes = ({ schedules }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    useEffect(() => {
      console.log(schedules);
  }, [])

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);
    
    return (
        <>

<Tabs defaultActiveKey="1" style={{padding: '20px'}}>
<Tabs.TabPane tab={'1일차'} key={1}>
    <List
    style={{padding: '10px'}}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar size="small" shape="square" style={{ backgroundColor: '#87d068' }}>{item.spotOrder}</Avatar>}
          title={item.spotName}
          description={item.spotAddress}
        />
      </List.Item>
    )}
  />
    </Tabs.TabPane>
    <Tabs.TabPane tab="2일차" key="2">
          <List
    style={{padding: '10px'}}
    itemLayout="horizontal"
    dataSource={data2}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar size="small" shape="square" style={{ backgroundColor: '#87d068' }}>{item.spotOrder}</Avatar>}
          title={item.spotName}
          description={item.spotAddress}
        />
      </List.Item>
    )}
  />
    </Tabs.TabPane>
    <Tabs.TabPane tab="3일차" key="3">
      <List
    style={{padding: '10px'}}
    itemLayout="horizontal"
    dataSource={data3}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar size="small" shape="square" style={{ backgroundColor: '#87d068' }}>{item.spotOrder}</Avatar>}
          title={item.spotName}
          description={item.spotAddress}
        />
      </List.Item>
    )}
  />
    </Tabs.TabPane> 
  {/* {schedules.map((v)=>(
    <Tabs.TabPane tab={v.Key + '일차'} key={v.Key}>
          <List
          style={{padding: '10px'}}
          itemLayout="horizontal"
          dataSource={v.Schedule}
          renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar size="small" shape="square" style={{ backgroundColor: '#87d068' }}>{item.spotOrder}</Avatar>}
          title={item.spotName}
          description={item.spotAddress}
        />
      </List.Item>
    )}
  />
    </Tabs.TabPane>
  ))} */}
    </Tabs>

        </>
    )
};

PostRoutes.propTypes = {
    numberOfTrip: PropTypes.number.isRequired,
    TripDates: PropTypes.arrayOf(PropTypes.object),
}

export default PostRoutes;