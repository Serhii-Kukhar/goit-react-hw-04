import s from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={s.button} onClick={onClick}>
      LoadMore
    </button>
  );
};

export default LoadMoreBtn;
