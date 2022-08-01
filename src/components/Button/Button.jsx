import s from './Button.module.css';

function Button({ onLoadMore }) {
  return (
    <button className={s.Button} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
}

export default Button;
