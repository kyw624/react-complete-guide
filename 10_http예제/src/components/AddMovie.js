import React, { useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function handleSubmit(event) {
    event.preventDefault();

    // could add validation here...
    const title = titleRef.current.value;
    const openingText = openingTextRef.current.value;
    const releaseDate = releaseDateRef.current.value;

    if (
      title.trim() === '' ||
      openingText.trim() === '' ||
      releaseDate.trim() === ''
    ) {
      console.log('Error! 입력값 검증 오류');
      return;
    }

    const movie = {
      title,
      openingText,
      releaseDate,
    };

    props.onAddMovie(movie);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
