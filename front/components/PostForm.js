import { Form, Input, Button, Modal, DatePicker, Radio, Segmented, Space, InputNumber } from 'antd';
import { daysInWeek } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import PostRoutesForm from './PostRoutesForm';
import { MinusCircleOutlined, PlusOutlined  } from '@ant-design/icons';
import SpotForm from './SpotForm';
import SpotInfoListView from './SpotInfoListView';
import { backUrl } from '../config/config';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [WhatModalOpen, setWhatModalOpen] = useState([]);
  const [isRadioOpen, setIsRadioOpen] = useState(false);
  const [text, onChangeText, setText] = useInput('');
  //const imageInput = useRef();
  const { RangePicker } = DatePicker;
  const [DateList, setDateList] = useState([]);

  const [spotOrder, onChangeSpotOrder, setSpotOrder] = useInput(0);
  const [spotName, onChangeSpotName, setSpotName] = useInput('');
  const [spotAddress, onChangeSpotAddress, setSpotAddress] = useInput('');
  const [spotMemo, onChangeSpotMemo, setSpotMemo] = useInput('');
  const [route, setRoute] = useState([]);
  const [isAddButton, setIsAddButton] = useState(false);

  const [spotId, setSpotId] = useState(0)
  const [spotList, setSpotList] = useState([])

  useEffect(() => {
    console.log(spotList)
  }, [spotList])

  const handleOnCreate = (spotInfo) => {
    setSpotList(spotList.concat({ spotOrder: spotId, spotName: spotInfo.spotName, spotAddress: spotInfo.spotAddress }))
    setSpotId(c => c + 1)
  }

  var Open = []
  var Route_List = []
  var Schedule_List = []

  const showModal = () => {
      setIsModalOpen(true);
  };

  const showModal2 = () => {
      setIsModal2Open(true);
  };

  const handleOk = () => {
      setIsModalOpen(false);
  }

  const handleOk2 = () => {
      setIsModal2Open(false);
  }

  const handleCancle = () => {
      setIsModalOpen(false);
  };

  const handleCancle2 = () => {
      setIsModal2Open(false);
  };

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);
  //여기서부터 시작하세요!!!
  const [title, onChangeTitle] = useInput('');
  const [mainTexts, onChangeMainTexts] = useInput('');

  const onSubmitForm = useCallback(() => {
    if (!mainTexts || !mainTexts.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p); //back에서 req.body.image
    });
    formData.append('title', title); 
    formData.append('content', mainTexts); //back에서 req.body.content
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [title, mainTexts, imagePaths]);
  
  //이미지 등록
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  
  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData(); //폼데이터는 멀티파티로 가능
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f); //키랑 값
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  //이미지제거
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  }, []); 
 //원영이 코드 추가
  var btDay = 0;
  var startDate;
  var endDate;
  var DateArray = [];

  const makeDateRadio = () => {
    console.log(btDay);
    var D = startDate;
    
    for(var i=0; i<btDay; i++) {
        DateArray.push([i, D.getFullYear(), D.getMonth()+1, D.getDate()]);
        Open.push(true);
        D.setDate(D.getDate() + 1);
    }
    DateArray = DateArray.reverse();

    console.log(DateArray);
    setDateList(DateArray);
    setWhatModalOpen(Open);
    setIsRadioOpen(true);
    
    console.log('Radio Open ' + Open);
    console.log('Radio WhatModalOpen ' + WhatModalOpen);
}

const handleOk3 = (v) => {
    Open = WhatModalOpen.slice()
    for(var i=0; i<Open.length; i++) {
        if(i==v[0]){
            Open[i] = false;
        }
    }
}

const handleCancle3 = (v) => {
    Open = WhatModalOpen.slice()
    console.log('캔슬 WhatModalOpen', WhatModalOpen);
    console.log('캔슬 Open', Open);
    for(var i=0; i<Open.length; i++) {
        if(i==v[0]){
            Open[i] = false;
        }
    }
    setWhatModalOpen(Open);
    console.log('Cancle', WhatModalOpen);
    console.log('현재 바뀐거', WhatModalOpen[v[0]]);
    console.log('v[0]', v[0]);
};

const onChangeDate = (range) => {
  const Date1 = range[0].format();
  const Date2 = range[1].format();

  var year1 = Date1.substring(0, 4);
  var year2 = Date2.substring(0, 4);
  var month1 = Date1.substring(5, 7);
  var month2 = Date2.substring(5, 7);
  var day1 = Date1.substring(8, 10);
  var day2 = Date2.substring(8, 10);

  startDate = new Date(year1, month1-1, day1);
  endDate = new Date(year2, month2-1, day2);

  var btMs = endDate.getTime() - startDate.getTime();
  btDay = btMs / (1000*60*60*24) + 1;
  

  console.log('start date', Date1);
  console.log('end date', Date2);
  console.log('start date', startDate);
  console.log('end date', endDate);
  console.log('day', btDay)
}

  const setSchdule = useCallback(() => {
      handleCancle2();
  });

  const onFinish = (values) => {
      console.log('Received values of form:', values);
  }

  const onSubmit = useCallback((v) => {
      // dispatch(addPost(text));
      // console.log(spotOrder, spotName, spotAddress, spotMemo)
      // setSpotList([]);
  }, []);

  const onPrint = useCallback(() => {
      // dispatch(addPost(text));
      console.log(spotOrder, spotName, spotAddress, spotMemo)
      console.log(JSON.stringify({spotOrder, spotName, spotAddress, spotMemo}))
      Route_List.push([spotOrder, spotName, spotAddress, spotMemo])
      setRoute(Route_List)
      console.log(Route_List)
      console.log(route)
      setIsAddButton(true);

  }, [spotOrder, spotName, spotAddress, spotMemo]);

  const ClearList = useCallback((v) => {
    var O = []

    console.log('DateList', DateList.length)

    for(var i=0; i<3; i++) {
        if(i<=v[0]) {
            O.push(false)
        } else {
            O.push(true)
        }
    }
    console.log('v', v[0])
    console.log('O', O)
    setWhatModalOpen(O);
    setSpotList([]);

    }, []);

  return (
    <>
    <Button block onClick={showModal}>+ 내 여행 게시글 작성하기</Button>
    <Modal 
        title="게시글 작성하기" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancle}
        footer={[
        ]}>
        <Form onFinish={onSubmitForm}>
        <Form.Item><Input value={title} onChange={onChangeTitle} style={{margin: '5px 0px'}} placeholder="게시글 제목을 입력하세요" /></Form.Item>
        <Form.Item><Input.TextArea value={mainTexts} style={{margin: '5px 0px'}} onChange={onChangeMainTexts} maxLength={140} placeholder="게시글 본문을 작성하세요." /></Form.Item>
        <Form.Item>
          <div>
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <Button onClick={onClickImageUpload}>+ 사진 업로드</Button> 
          </div>
          <div>
          {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
          {/* <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} /> */}
          { <img src={v.replace(/\/thumb\//,'/origianl/')} style={{ width: '200px' }} alt={v} /> }
          <div>
          <Button onClick={onRemoveImage(i)}>제거</Button>
          </div>
          </div>
           ))}
          </div> 
        </Form.Item>
        <Form.Item>
          <Button key="add trip route" type="button" onClick={showModal2}>여행 경로 추가</Button>,
          <Button key="post" type="primary" htmlType="submit">게시</Button>
        </Form.Item>
      </Form>
    </Modal>
    <>
      <Modal 
          title="여행 루트" 
          open={isModal2Open} 
          onOk={handleOk2} 
          onCancel={handleCancle2}
          footer={[
          ]}>
          <Form onFinish={onSubmitForm}>
            <Form.Item>
              <RangePicker size="middle" onChange={onChangeDate}/>
            </Form.Item>
            <Form.Item>
              <Button key="post" type="button" onClick={makeDateRadio}>날짜 설정</Button>
            </Form.Item>
            <Form.Item>
              <Button key="post" type="primary" onClick={setSchdule}>일정 등록</Button>
            </Form.Item>
          </Form>
      </Modal>
    </>
    <>
      {isRadioOpen && DateList.map((v) => <Modal 
          title={v[1]+'년 '+v[2]+'월 '+v[3]+'일'} 
          open={WhatModalOpen[v[0]]} 
          onOk={() => handleOk3(v)} 
          onCancel={()=>handleCancle3(v)}
          footer={[
          ]}>
          <Form name="routesForm" onFinish={onSubmit}>
          <SpotForm onCreate={(spotInfo) => handleOnCreate(spotInfo)} />
              <SpotInfoListView spotList={spotList} />
                  <Form.Item>
                      <Button type="button" onClick={() => ClearList(v)}>
                        Submit
                      </Button>
                  </Form.Item>
          </Form>
        </Modal>)}
      </>  
    </>
  )
};

export default PostForm;