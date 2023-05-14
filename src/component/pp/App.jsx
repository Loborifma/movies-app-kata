import React from 'react';
import { Space, App as AntdApp } from 'antd';
import _ from 'lodash';

import MovieService from '../../services/MovieService';
import MovieList from '../MovieList/MovieList';
import SearchBar from '../SearchBar/SearchBar';
import Navigation from '../avigation/Navigation';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

import './App.css';

export default class App extends React.Component {
  movieService = new MovieService();

  errMessage = 'Произошла ошибка, но мы стараемся ее исправить)';

  state = {
    items: [],
    totalItems: null,
    page: 1,
    query: '',
    screenWidth: window.innerWidth,
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.setDimension);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getMovieList();
    }
    if (prevState.page !== this.state.page) {
      this.getMovieList();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setDimension);
  }

  setDimension = _.throttle(() => {
    this.setState({
      screenWidth: window.innerWidth,
    });
  }, 500);

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  };

  getMovieList = () => {
    this.movieService
      .getMoviesByKeyword(this.state.query, this.state.page)
      .then((res) => {
        this.setState({
          items: res.results,
          totalItems: res['total_results'],
          isLoading: false,
          isError: false,
        });
      })
      .catch(this.onError);
  };

  getPage = (page, pageSize) => {
    this.setState({
      page: page,
      isLoading: true,
    });
  };

  getQuery = (text) => {
    const keywords = text.replace(/\s\b/g, '+');

    this.setState({
      query: keywords,
      isLoading: true,
    });
  };

  render() {
    const { isLoading, isError, items, screenWidth, totalItems, page } = this.state;

    const getQueryDebounced = _.debounce(this.getQuery, 400);

    const hasData = !(isError || isLoading);

    const error = isError ? <Error message={this.errMessage} /> : null;
    const loading = isLoading ? <Spinner /> : null;
    const content = hasData ? (
      <MovieList
        items={items}
        currentPage={page}
        currentWidth={screenWidth}
        getPage={this.getPage}
        totalItems={totalItems}
      />
    ) : null;

    return (
      <AntdApp className="app">
        <Space className="container" size={30} direction="vertical" align="center">
          <Space className="container" size={30} direction="vertical" align="center">
            <Navigation />
            <SearchBar getQueryDebounced={getQueryDebounced} />
          </Space>
          {loading}
          {error}
          {content}
        </Space>
      </AntdApp>
    );
  }
}
