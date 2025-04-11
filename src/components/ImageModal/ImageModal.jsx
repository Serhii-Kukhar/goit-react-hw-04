import Modal from "react-modal";
import { useEffect } from "react";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      overlayClassName={s.overlay}
      className={s.modalContent}
    >
      <img
        className={s.modalImage}
        src={image.urls.regular}
        alt={image.alt_description}
      />
      <h3>🖤 {image.likes}</h3>
      <h3>{image.alt_description}</h3>
      <p> {image.user.name}</p>
    </Modal>
  );
};

export default ImageModal;
