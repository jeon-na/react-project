import { Col, Row, Input } from 'antd';
import { useState } from 'react';
import styled, { isStyledComponent } from 'styled-components';
import Autocomplete from "react-google-autocomplete";



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

const InputWrapper = styled(Autocomplete)`
box-sizing: border-box;
margin: 0;
padding: 4px 11px;
color: rgba(0,0,0,.88);
font-size: 14px;
line-height: 1.5714285714285714;
list-style: none;
font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
position: relative;
display: inline-block;
width: 100%;
min-width: 0;
background-color: #fff;
background-image: none;
border-width: 1px;
border-style: solid;
border-color: #d9d9d9;
border-radius: 6px;
transition: all .2s;
}
`

function SpotForm({ onCreate = (v) => console.log(v) }) {
    const [spotOrder, setSpotOrder] = useState(1);
    const [spotName, setSpotName] = useState("")
    const [spotAddress, setSpotAddress] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onCreate({ spotOrder: spotOrder, spotName: spotName, spotAddress: spotAddress})
        setSpotName("")
        setSpotAddress("")
        setSpotOrder(c => c + 1)
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
            <>
            <InputWrapper
                    apiKey={"secret"}
                    style={{ width: "90%" }}
                    onPlaceSelected={(place) => {
                        console.log(place['formatted_address']);
                        setSpotAddress(place['formatted_address']);
                    }}
                    fields ={["formatted_address", "name", "place_id"]} 
                    options={{
                        types: ['tourist_attraction', 'museum', 'shopping_mall', 'bakery', 'amusement_park'],
                        componentRestrictions: { country: "kr" },
                    }}
                    defaultValue=""
                />
                {/* </InputWrapper> */}
            </>
            
        </form>
    );
}

export default SpotForm;