import React, { useEffect, useCallback, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import useSWR from 'swr';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { backUrl } from '../config/config';
import PostList from '../components/PostList';

const fetcher = (url) => axios.get(url, {withCredentials: true}).then((result) => result.data);

const ScrappedPosts = () => {
    const { me } = useSelector((state) => state.user);
    const { data: scrappedPosts, error: scrappedPostError } = useSWR(`${backUrl}/posts/related`, fetcher);
    console.log("scarppeddata", scrappedPosts)

    useEffect(() => {
        if (!(me && me.id)) {
            Router.push('/');
        }
    }, [me && me.id]);

    // 로그인 안한 상태에서 프로필 클릭 안되게
    if (!me) {
        return null;
    }

    return (
        <>
            <Head>
                <title>저장됨 | </title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                  {<PostList header="scrappedPostslist" data={scrappedPosts} loading ={!scrappedPosts && !scrappedPostError} /> }
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
export default ScrappedPosts;