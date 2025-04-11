import { useEffect, useState } from "react";
import { fetchImages } from "./services/unsplashAPI";

import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchImages(query, page);
        setImages((prev) => [...prev, ...data.results]);
        setLoadMore(data.total > page * 12);
        if (data.results.length === 0) {
          setError(true);
          toast.error("Зображень не знайдено!");
        }
        if (page > 1) {
          setTimeout(() => {
            window.scrollBy({
              top: window.innerHeight - 100,
              behavior: "smooth",
            });
          }, 300);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      getImages();
    }
  }, [query, page]);

  const handleChangeQuery = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      <Toaster position="top-right" reverseOrder={false} />

      {error && <ErrorMessage />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />

      {loadMore && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {loadMore && isLoading && <Loader />}
    </div>
  );
};

export default App;
