import React, { useCallback } from 'react';
import { Card, Avatar, Button, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { TeamOutlined, HeartOutlined, MessageOutlined, SolutionOutlined, BookOutlined  } from '@ant-design/icons';

import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = (post) => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  //const { post } = useSelector((state) => state.post);

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card>
            {/* <div style="display: flex; flex-direction: row; flex-wrap: nowrap"> */}
            <Card.Meta
                avatar={(
                      <Link href ={`/user/${me.id}`} prefetch= {false}>
                      <a><Avatar>{me.nickname[0]}</Avatar></a>
                      </Link>
                 )}
                title={me.nickname}
                />
                <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
            {/* </div> */}
            <Menu theme='white' mode="inline">
                <Menu.Item><Link href="/following"><a><HeartOutlined key="follwings"/> 팔로잉 {me.Followings.length}</a></Link></Menu.Item>
                <Menu.Item><Link href="/follower"><a><TeamOutlined key="follwings"/> 팔로워 {me.Followers.length}</a></Link></Menu.Item>
                <Menu.Item><Link href="/myposts"><a><SolutionOutlined key="twit"/> 게시글 {me.Posts.length}</a></Link></Menu.Item>
                {/* <Menu.Item><Link href="/comments"><a><MessageOutlined key="comments"/> 댓글 {me.Comments.length}</a></Link></Menu.Item>  */}
                <Menu.Item><Link href="/scrappedposts"><a><BookOutlined key="scraps"/> 저장됨 {me.Liked.length}</a></Link></Menu.Item>
            </Menu>
        </Card>
    // <Card
    //   actions={[
    //     <div key="twit"><Link href ={`/user/${me.id}`}><a>짹짹<br />{me.Posts.length}</a></Link></div>,
    //     <div key="followings"><Link href ="/profile"><a>팔로잉<br />{me.Followings.length}</a></Link></div>,
    //     <div key="followings"><Link href ="/profile"><a>팔로워<br />{me.Followers.length}</a></Link></div>,
    //   ]}
    // >
    //   <Card.Meta
    //     avatar={(
    //       <Link href ={`/user/${me.id}`} prefetch= {false}>
    //         <a><Avatar>{me.nickname[0]}</Avatar></a>
    //       </Link>
    //     )}
    //     title={me.nickname}
    //   />
    //   <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
    // </Card>
  );
};

export default UserProfile;

