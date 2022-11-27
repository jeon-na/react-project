import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import ImagesZoom from './ImagesZoom';
import PostCard2 from './PostCard2';

const PostListImages = ({ images, post }) => {
  console.log("Images", images)
  console.log("data", post)
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  useEffect(() => {
    // 이거는 에러! console.log(image[0])
    if(images && images.length > 0){
        console.log(images[0])
    }
}, [images])

return(
    <>
      <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} width={150} height={150} />
      {showImagesZoom && <PostCard2 post={post} onClose={onClose} />}
    </>
  )
}

PostListImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostListImages;