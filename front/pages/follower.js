import React, { useEffect, useCallback, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import useSWR from 'swr';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { backUrl } from '../config/config';

const fetcher = (url) => axios.get(url, {withCredentials: true}).then((result) => result.data);

const Follower = () => {
    const { me } = useSelector((state) => state.user);
    const [ followersLimit, setFollowersLimit] =useState(3);

    const { data: followersData, error: followerError } = useSWR(`${backUrl}/user/followers?limit=${followersLimit}`, fetcher); //팔로워 리스트들이 data에 들어있다.sLimit}`, fetcher);

    useEffect(() => {
        if (!(me && me.id)) {
            Router.push('/');
        }
    }, [me && me.id]);

    const loadMoreFollowers = useCallback(() => {
      setFollowersLimit((prev) => prev+3); //기존꺼보다 3올려주기
    }, []);

    if(followerError){
      console.error(followerError);
      return <div>팔로워 로딩 중 에러가 발생합니다.</div>;
    }
  
    if (!me) {
      return '내 정보 로딩중...';
    }

    return (
        <>
            <Head>
                <title>내 팔로워 | </title>
            </Head>
            <AppLayout>
            <NicknameEditForm />
            <FollowList header="followerlist" data={followersData} onClickMore= {loadMoreFollowers} loading= {!followersData && !followerError}/>
                {/* <FollowList header='followerlist' data={me.Followers}/> */}
            </AppLayout>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async(context) => {
  const cookie = context.req ? context.req.headers.cookie: ''; //서버에 쿠키 전달
  axios.defaults.headers.Cookie = ''; //쿠키 공유 문제 해결
  if(context.req && cookie) { 
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Follower;