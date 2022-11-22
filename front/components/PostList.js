import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Avatar, Image } from 'antd';
import FollowButtonInList from './FollowButtonInList';


const PostList = ({myPosts, totalPosts}) => {
    const myPostsId = myPosts.find((v) => v.id === totalPosts.id)

    return (
        <Image.PreviewGroup>
            {/* {totalPosts.map((v)=> {
                <Image width={150} height={150} src={v.Images[0].src} />
            })} */}
            <Image width={150} height={150} src={totalPosts[0].Images[0].src} />
            <Image width={150} height={150} src={totalPosts[1].Images[0].src} />
            <Image width={150} height={150} src={totalPosts[2].Images[0].src} />
        </Image.PreviewGroup>
    )
};

PostList.propTypes = {
    myPosts: PropTypes.array.isRequired,
    totalPosts: PropTypes.array.isRequired,
};

export default PostList;