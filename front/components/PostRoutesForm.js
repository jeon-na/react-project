import { Form, Input, Button, Modal } from 'antd';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPost } from '../reducers/post';

const PostRoutesForm = () => {
    const imageInput = useRef();


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancle = () => {
        setIsModalOpen(false);
    };

    const onClickImageUpload = useCallback(()=> {
        imageInput.current.click();
    }, [imageInput.current]);

    const [title, onChangeTitle] = useInput('');
    const [mainTexts, onChangeMainTexts] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(title, mainTexts)
    }, [title, mainTexts]);

    return(
        <>
            <Modal 
                title="여행 루트" 
                open={true} 
                onOk={handleOk} 
                onCancel={handleCancle}
                footer={[
                ]}>
                <Form onFinish={onSubmitForm}>
                    <Form.Item>
                        <div>
                        <input type="file" multiple hidden ref={imageInput}/>
                        <Button onClick={onClickImageUpload}>+ 사진 업로드</Button> 
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button key="add trip route" type="button">여행 경로 추가</Button>,
                        <Button key="post" type="primary" htmlType="submit">게시</Button>
                    </Form.Item>
                </Form>
            </Modal>
        
        </>

    )
};

export default PostRoutesForm;