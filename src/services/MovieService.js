export default class MovieService {
  async getResource(url, keyword, page) {
    const res = await fetch(url + `?api_key=084b079915b8295e44cf4e8c5bf1f16b&query=${keyword}&page=${page}`);

    if (!res.ok) {
      throw new Error('Ошибка при выполнении запроса');
    }
    return await res.json();
  }

  getMoviesByKeyword(keyword, page) {
    return this.getResource('https://api.themoviedb.org/3/search/movie', keyword, page);
  }
}
