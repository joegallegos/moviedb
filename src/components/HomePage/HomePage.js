import React, { useEffect, useState } from 'react';
import { Button, Card, Elevation, Intent } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './HomePage.module.scss';
require('dotenv').config();

const KEY = process.env.REACT_APP_APIKEY;

const HomePage = (id) => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchData = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`)
      .then((res) => {
        const response = res.data.results.map((item) => {
          const id = item.id;
          const popularity = item.popularity;
          const voteCount = item.vote_count;
          const title = item.title;
          const release = item.release_date;
          const overview = item.overview;
          const posterPath = item.poster_path;

          return {
            id,
            popularity,
            voteCount,
            title,
            release,
            overview,
            posterPath,
          };
        });
        setMovies(response);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    setOpen({ ...id, show: !open });
  };

  return (
    <div className={styles.root}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.movie}>
          <Card elevation={Elevation.FOUR} className={styles.movieCard}>
            <div className={styles.movieImage}>
              <img
                alt={movie.title}
                src={`http://image.tmdb.org/t/p/w342/${movie.posterPath}`}
              />
            </div>
            <div className={styles.movieInfo}>
              <div>{movie.title}</div>
              <div>Popularity: {movie.popularity}</div>
              <div>Vote Count: {movie.voteCount}</div>
              <div>Release Date: {movie.release}</div>
              <Link to={`/movie/${movie.id}`}>
                <Button
                  className={styles.movieButton}
                  small
                  type="button"
                  intent={Intent.PRIMARY}
                  text="Details"
                  onClick={handleClick}
                />
              </Link>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
