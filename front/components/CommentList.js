//commentlist 파일 추가
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { PictureTwoTone, ScheduleOutlined, ScheduleTwoTone, PictureOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

import { REMOVE_POST_REQUEST } from '../reducers/post';
import styled from 'styled-components';
import PostRoutes from './PostRoutes';

const Title = styled.div`
    margin: 10px 10px;
    font-weight: bold;
`;

const Icons = styled.div`
    display: flex;
    fontSize: 30px;
    margin: 5px 10px;

`;

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { removePostLoading } = useSelector((state) => state.post);
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [pictureOrRoute, setPictureOrRoute] = useState(true);

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev); //true를 false로 false를 true로 만드는 코드
    }, []);

    const onTogglePictureOrRoute = useCallback(() => {
        setPictureOrRoute((prev) => !prev);
    }, []);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        })
    }, []);
    const { me } = useSelector((state) => state.user);
    const id = me?.id;
    
    return ( 
            <div>
                <List 
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                    renderItem={(item) => (
                        <li>
                            <Comment
                                author={item.User.nickname}
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                content={item.content}
                            />
                        </li>
                    )}
                />
            </div>       
    )
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
};

export default PostCard;