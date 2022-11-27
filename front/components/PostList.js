import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Avatar, Image } from 'antd';
import { useDispatch } from 'react-redux';
import PostListImages from './PostListImages';

const PostList = ({header, data, loading}) => {
    const dispatch = useDispatch();
    //console.log(data)
    console.log("postlist", data)
    
    return (
        <>
        { data
            ? (
                <Image.PreviewGroup>
                    { data.map((v) => 
                        <PostListImages images={v.Images}  post={v}/>
                    )}
                </Image.PreviewGroup>
            ) : (
                null
            )
        }
        </>
    )
};

PostList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default PostList;