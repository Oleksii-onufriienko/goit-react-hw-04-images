import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

const IMAGE_PER_PAGE = 12;

export function App () {
  const [imgSearch, setImgSearch] = useState('');
  const [imgArray, setImgArray] = useState([]);
  const [page, setPage] = useState(1);
  const [modalShow, setModalShow] = useState(-1);
  const [loadSpiner, setLoadSpiner] = useState(false);

  const handleSubmit = ({ imgQuery } ) => {
    setImgSearch(imgQuery);
    setPage(1);
    setImgArray([]);
  }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  }

  useEffect(() => {
    const query = `https://pixabay.com/api/?q=${imgSearch}&page=${page}&key=31033465-5993d082d5a9a4a2e6778e4ca&image_type=photo&orientation=horizontal&per_page=${IMAGE_PER_PAGE}`;
    if (imgSearch === '') return;
    getImage(query);
  },[imgSearch,page]);

  const getImage = async (query) => {
    setLoadSpiner(true);
      await axios
      .get(query)
       .then(result => {
         if (result.data.hits.length === 0) return;
         setImgArray(prevState => [...prevState, ...result.data.hits]);
        return;
      })
      .catch(e => {
        return;
      });
    setLoadSpiner(false);
  }

  const handleModal = (e) => {
    setModalShow(Number(e.target.dataset.index));
  }

  const handleMyCloseModal = () => {
    setModalShow(-1);
  }

  const handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) { 
      handleMyCloseModal();
    }
  }


    return (
      <>
        <Searchbar handleSubmit={handleSubmit} />
        {imgArray.length > 0 &&
          <ImageGallery>
            {imgArray.map((e, i)=> {
              return (
                <ImageGalleryItem key={e.id} src={e.webformatURL} alt={e.tags} index={i} handleModal={handleModal} />
              );
            })}
          </ImageGallery>
        }
        {imgArray.length >= IMAGE_PER_PAGE && !loadSpiner &&
          <Button handleLoadMore={handleLoadMore} />
        }
        {loadSpiner && 
          <Loader 
          height="80" 
          width="80" 
          radius="9"
          color="#3f51b5" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
           />
        }
        {modalShow > -1 &&
          <Modal src={imgArray[modalShow].largeImageURL}
            alt={imgArray[modalShow].tags}
            handleMyCloseModal={handleMyCloseModal}
            handleBackDropClick={handleBackDropClick}
          />}
      </>
    );
};
