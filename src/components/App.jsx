import { Component } from "react";
import axios from 'axios';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

// import { ThreeDots } from 'react-loader-spinner'

export class App extends Component {
  state = {
    imgSearch: '',
    imgArray: [],
    page: 1,
    modalShow: -1,
    loadSpiner: false,
  }

  handleSubmit = async ({ imgSearch }) => {
    this.loadToggle();
    this.setState({imgSearch});
    
    await this.getImg(imgSearch, 1).then(result => {
      this.setState({ imgArray: [...result.data.hits], page: 1, imgSearch });
    }).catch(e => {
      this.setState({ imgArray: [], page: 1, imgSearch: '' });
    });
    this.loadToggle();
  }

  handleLoadMore = async () => {
    const { imgSearch, page } = this.state;
    this.loadToggle();
    await this.getImg(imgSearch,page+1).then(result => {
      this.setState(prevState => (
        { imgArray: [...prevState.imgArray,...result.data.hits], page: prevState.page +1 }
      ));
      }).catch(e => { 
          this.setState({ imgArray: [], page: 1, imgSearch: ''});
      });
    this.loadToggle();
  }

  handleModal = (e) => {

    this.setState({ modalShow:  Number(e.target.dataset.index)});
  }

  handleCloseModal = () => {
    this.setState({modalShow: -1})
  }

  handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.handleCloseModal();
    }
  }

  loadToggle = () => {
    this.setState(prevState => {
      return { loadSpiner: !prevState.loadSpiner }
    })
  }

  getImg(imgSearch, page) {
    const query = `https://pixabay.com/api/?q=${imgSearch}&page=${page}&key=31033465-5993d082d5a9a4a2e6778e4ca&image_type=photo&orientation=horizontal&per_page=12`;
     return axios
      .get(query)
       .then(result => {
        if (result.data.hits.length === 0) return {};
        return result;
      })
      .catch(e => {
        return {};
      });
  }

  render() {
    const { imgArray, modalShow, loadSpiner } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        {imgArray.length > 0 &&
          <ImageGallery>
            {imgArray.map((e, i)=> {
              return (
                <ImageGalleryItem key={e.id} src={e.webformatURL} alt={e.tags} index={i} handleModal={ this.handleModal} />
              );
            })}
          </ImageGallery>
        }
        {imgArray.length > 11 && !loadSpiner &&
          <Button handleLoadMore={this.handleLoadMore} />
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
            handleCloseModal={this.handleCloseModal}
            handleBackDropClick={this.handleBackDropClick}
          />}

      </>
    );
  }
};
