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
    spotName: '블루보틀 삼청 카페',
    spotAddress: '대한민국 서울특별시 종로구 사직로 161 경복궁'
  },
  {
    spotOrder: 3,
    spotName: '명동교자 분점',
    spotAddress: '대한민국 서울특별시 종로구 사직로 161 경복궁'
  },
];

const data2 = [
  {
    spotOrder: 1,
    spotName: '롯데월드타워',
    spotAddress: '대한민국 서울특별시 종로구 사직로 161 경복궁'
  },
  {
    spotOrder: 2,
    spotName: '매드포갈릭',
    spotAddress: '대한민국 서울특별시 종로구 사직로 161 경복궁'
  },

];
const data3 = [
  {
    spotOrder: 1,
    spotName: '코엑스',
    spotAddress: '대한민국 서울특별시 종로구 사직로 161 경복궁'
  },
  {
    spotOrder: 2,
    spotName: '농민백암순대 본점',
    spotAddress: '대한민국 서울특별시 종로구 사직로 161 경복궁'
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