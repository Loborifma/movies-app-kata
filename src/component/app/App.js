import React from 'react';
import { Space, App as AntdApp } from 'antd';

import MovieService from '../../services/MovieService';
import MovieList from '../movie-list/MovieList';
import SearchBar from '../search-bar/SearchBar';
import Navigation from '../navigation/Navigation';

import './App.css';

export default class App extends React.Component {
  movieService = new MovieService();

  state = {
    items: [],
    query: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getMovieList();
    }
  }

  onError = (err) => {};

  getMovieList = () => {
    this.movieService
      .getMoviesByKeyword(this.state.query)
      .then((res) => {
        this.setState({
          items: res.results,
        });
      })
      .catch((err) => this.onError(err));
  };

  debounce = (fn, ms) => {
    let timeout;
    return function () {
      const func = () => {
        fn.apply(this, arguments);
      };
      clearTimeout(timeout);
      timeout = setTimeout(func, ms);
    };
  };

  getQuery = (text) => {
    const keywords = text.replace(/\s\b/g, '+');

    this.setState({
      query: keywords,
    });
  };

  render() {
    const getQueryDebounced = this.debounce(this.getQuery, 400);

    return (
      <AntdApp className="app">
        <Space className="container" size={30} direction="vertical" align="center">
          <Space className="container" size={30} direction="vertical" align="center">
            <Navigation />
            <SearchBar getQueryDebounced={getQueryDebounced} />
          </Space>
          <MovieList items={this.state.items} />
        </Space>
      </AntdApp>
    );
  }
}
