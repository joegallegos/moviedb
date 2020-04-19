import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Elevation, Intent } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Movie.module.scss';

const KEY = process.env.REACT_APP_APIKEY;

const Movie = () => {
  const history = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const handleClick = () => {
    history.push('/');
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
        .then((res) => {
          const response = res.data;

          setMovie(response);
        })
        .catch((err) => {
          console.log('[fetchData]ror', err);
        });
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Card elevation={Elevation.FOUR} className={styles.movieCard}>
        <div className={styles.movieImage}>
          <img
            alt={movie.title}
            src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          />
        </div>
        <div className={styles.movieInfo}>
          <div>{movie.title}</div>
          <div>{movie.overview}</div>
          <Button
            className={styles.movieButton}
            small
            type="button"
            intent={Intent.PRIMARY}
            text="Go Back"
            onClick={handleClick}
          />
        </div>
      </Card>
    </div>
  );
};

export default Movie;
