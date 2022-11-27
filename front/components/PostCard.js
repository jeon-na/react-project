import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  RetweetOutlined, PictureTwoTone, ScheduleOutlined, ScheduleTwoTone, 
  PictureOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';
import styled from 'styled-components';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import PostRoutes from './PostRoutes';

import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST, 
  RETWEET_REQUEST, UPDATE_POST_REQUEST } from '../reducers/post';

const Title = styled.div`
    margin: 10px 10px;
    font-weight: bold;
`;

const Icons = styled.div`
    display: flex;
    fontSize: 30px;
    margin: 5px 10px;

`;
moment.locale('ko'); //한글로 바꿔주기

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  //const [liked, setLiked] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  const [editMode, setEditMode] = useState(false);
  
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [pictureOrRoute, setPictureOrRoute] = useState(true);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(()=> {
    setEditMode(false);
  },[]);

  //게시글 수정
  const onChangePost = useCallback((editText)=> () => {
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: post.id,
        content: editText,
      },
    });
  },[post]);
  //좋아요
  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  //좋아요취소
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onTogglePictureOrRoute = useCallback(() => {
    setPictureOrRoute((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        // cover={post.Images[0] && <PostImages images={post.Images} />}
        title={[<Avatar style={{margin:'0px 15px 0px 0px'}}>{post.User.nickname[0]}</Avatar>,
                    post.User.nickname,
                ]}
                extra={id && <FollowButton post={post} />}
        cover={[ 
          <Icons>
              {pictureOrRoute 
              ? <PictureTwoTone twoToneColor="#9c9c9c" style={{fontSize: '25px', color: '#9f9f9f', margin: '5px 5px 0px 0px'}} onClick={onTogglePictureOrRoute} />
              :<PictureOutlined style={{fontSize: '25px', color: '#9f9f9f', margin: '5px 5px 0px 0px'}} onClick={onTogglePictureOrRoute}/>}
              {pictureOrRoute 
              ? <ScheduleOutlined style={{fontSize: '25px', color: '#9f9f9f', margin: '5px 5px 0px 0px'}} onClick={onTogglePictureOrRoute}/>
              : <ScheduleTwoTone twoToneColor="#9c9c9c" style={{fontSize: '25px', color: '#9f9f9f' , margin: '5px 5px 0px 0px' }} onClick={onTogglePictureOrRoute} />}
          </Icons>,
          <Title>{'제목 : ' + post.title}</Title>,
          <div>
              {pictureOrRoute
              ? post.Images[0] && <PostImages images={post.Images} />
              : <PostRoutes/>}
          </div>
          ]}
        actions={[
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>} 
                      {/* retweetid 바꿈 */}
                      <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>
        ]}
        //title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        
      > 
        {/* 리트윗게시물 */}
        {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <div style={{float: 'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={(
                  <Link href ={`/user/${post.Retweet.User.id}`} prefetch={false}>
                    <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} onChangePost= {onChangePost} onCancelUpdate={onCancelUpdate}/>}
              />
            </Card>
          )
          : (
            <>
              <div style={{float: 'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                // avatar={(
                //   <Link href ={`/user/${post.User.id}`} prefetch={false}> 
                //     <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                //   </Link>
                //)}
                //title={post.User.nickname}
                description={pictureOrRoute && <PostCardContent editMode ={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} postData={post.content} />}
              />
            </>
          )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href ={`/user/${item.User.id}`} prefetch={false}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Schedules: PropTypes.arrayOf(PropTypes.object), //추가
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
