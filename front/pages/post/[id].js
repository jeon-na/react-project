//post/[id].js
import { useRouter } from "next/router";
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { useSelector } from "react-redux";
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import Head from "next/dist/next-server/lib/head";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state)=> state.post);

  //if(router.isFallback){
   // return <div>로딩중.....</div>
 // }
  return(
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} /> 
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nataemap.co.kr/favicon.ico'} />
        <meta property="og:url" content={`https://nataemap.co.kr/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

//export async function getStaticPaths() {
///  return {
//    paths: [
//     { params: {id: '1'}},
//      { params: {id: '2'}},
//      { params: {id: '3'}},
//    ],
//    fallback: true,
//  };
//}

export const getServerSideProps = wrapper.getServerSideProps(async(context) => {
  const cookie = context.req ? context.req.headers.cookie: ''; //서버에 쿠키 전달
  axios.defaults.headers.Cookie = ''; //쿠키 공유 문제 해결
  if(context.req && cookie) { 
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST, //단일 게시물 불러온다.
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;