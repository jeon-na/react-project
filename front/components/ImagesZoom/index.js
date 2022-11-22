import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Slick from 'react-slick';
import { Overlay, Global, Header, CloseBtn, ImgWrapper, Indicator, SlickWrapper } from './styles';
//import { Overlay, Global } from './styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    
//     <Overlay>
//       <Global />
//      <Header>
//         <h1>상세 이미지</h1>
//         <CloseBtn onClick={onClose}>X</CloseBtn>
//       </Header>
//       <SlickWrapper>
//         <div>
//           <Slick
//             initialSlide={0}
//             beforeChange={(slide) => setCurrentSlide(slide)}
//             infinite
//             arrows={false}
//             slidesToShow={1}
//             slidesToScroll={1}
//           >
//             {images.map((v) => (
//               <ImgWrapper key={v.src}>
//                   <img src={`http://localhost:3065/${v.src}`} alt={v.src} />  
// {/* //                <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src} /> */}
//               </ImgWrapper>
//            ))}
//           </Slick>
//           <Indicator>
//             <div>
//               {currentSlide + 1}
//               {' '}
//               /
//               {images.length}
//             </div>
//           </Indicator>
//         </div>
//       </SlickWrapper>
//     </Overlay>
//   );
// };


   <div>
     <Global />
       <Slick
           dots={true}
           initialSlide={0}
           afterChange={(slide) => setCurrentSlide(slide)}
           infinite
           arrows={false}
           slidesToShow={1}
           slidesToScroll={1}
         >
           {images.map((v) => (
           <ImgWrapper key={v.src}>
             {/* <img src={`http://localhost:3065/${v.src}`} alt={v.src} /> */}
             { <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src} /> }
             </ImgWrapper>
               ))}
       </Slick>
     </div>
   )
 }

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;