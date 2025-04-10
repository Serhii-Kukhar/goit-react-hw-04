import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={s.list}>
      {images.map((img) => (
        <ImageCard key={img.id} image={img} onClick={() => onImageClick(img)} />
      ))}
    </ul>
  );
};

export default ImageGallery;
