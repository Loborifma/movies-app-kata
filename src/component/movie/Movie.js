import React from 'react';

import MovieInfo from '../movie-info/MovieInfo';

import './Movie.css';

export default class Movie extends React.Component {
  data = [
    { label: 'Action', id: 1 },
    { label: 'Drama', id: 2 },
  ];

  roundToHalf = (num) => {
    const numWithHalf = Math.ceil(num) - 0.5;
    if (num >= numWithHalf && num !== num + 1) {
      return numWithHalf;
    }
    return Math.floor(num);
  };

  getCorrectDate = (date) => {
    return date.split('-');
  };

  render() {
    const {
      poster_path: posterPath,
      vote_average: voteAverage,
      release_date: releaseDate,
      ...anotherProps
    } = this.props;

    const vote = this.roundToHalf(voteAverage);
    const date = this.getCorrectDate(releaseDate);

    return (
      <section className="movie">
        <div className="movie__card">
          <div className="movie__cover">
            <img src={'https://image.tmdb.org/t/p/original' + posterPath} alt="poster" />
          </div>
          <MovieInfo {...anotherProps} vote={vote} date={date} data={this.data} />
        </div>
      </section>
    );
  }
}
