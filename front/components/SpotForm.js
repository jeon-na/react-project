import { Col, Row, Input } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';


const ButtonWrapper = styled.button`
box-shadow:inset 0px -3px 7px 0px #29bbff;
   background:linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);
   background-color:#2dabf9;
   border-radius:3px;
   border:1px solid #ffffff;
   display:inline-block;
   cursor:pointer;
   color:#ffffff;
   font-family:Arial;
   font-size:15px;
   padding:3px 18px;
   text-decoration:none;
   text-shadow:0px 1px 0px #263666;
`;

function SpotForm({ onCreate = (v) => console.log(v) }) {
    const [spotName, setSpotName] = useState("")
    const [spotAddress, setSpotAddress] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onCreate({ spotName: spotName, spotAddress: spotAddress })
        setSpotName("")
        setSpotAddress("")
    }

    return (
        <form onSubmit={handleSubmit} style={{
            padding: '8px',
            margin: '8px'
        }}>
            <Row gutter={24}>
            <Col span={16}>
            <Input.Group>
            <Row gutter={12}>
                <Col span={24}>
                    <Input type="text" value={spotName} name="spotName" placeholder="여행지 명" onChange={e => setSpotName(e.target.value)}/>
                </Col> 
            {/* <input type="text" value={spotName} name="spotName" placeholder="여행지 명" onChange={e => setSpotName(e.target.value)} /> */}
                {/* <Col span={16}>
                    <Input type="text" value={spotAddress} name="spotAddress" placeholder="여행지 주소" onChange={e => setSpotAddress(e.target.value)} />
                </Col> */}
            {/* <input type="text" value={spotAddress} name="spotAddress" placeholder="여행지 주소" onChange={e => setSpotAddress(e.target.value)} /> */}
            </Row>
            </Input.Group>
            </Col>
            <Col span={8}>
            <ButtonWrapper type="submit">
                추가
            {/* <button type="submit"> 추가 </button> */}
            </ButtonWrapper>
            </Col>
            </Row>
            
        </form>
    );
}

export default SpotForm;