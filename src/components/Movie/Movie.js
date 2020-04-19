import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Elevation, Intent, Spinner } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Movie.module.scss';

const KEY = process.env.REACT_APP_APIKEY;

const Movie = () => {
  const history = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    history.push('/');
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
        .then((res) => {
          const response = res.data;

          setMovie(response);
          setLoading(false);
        })
        .catch((err) => {
          console.log('[fetchData]ror', err);
        });
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.spinner}>
        <Spinner intent="primary" />
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <Card elevation={Elevation.FOUR} className={styles.movieCard}>
        <div className={styles.movieImage}>
          <img
            alt={movie.title}
            src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          />
        </div>
        <div className={styles.movieInfo}>
          <div className={styles.movieTitle}>{movie.title}</div>
          <span className={styles.movieReleaseDate}>{movie.release_date}</span>
          <div>{movie.overview}</div>
          <div className={styles.movieButton}>
            <Button
              small
              type="button"
              intent={Intent.PRIMARY}
              text="Go Back"
              onClick={handleClick}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Movie;
