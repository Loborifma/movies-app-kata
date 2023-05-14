import React, { Fragment } from 'react';
import { List, Pagination } from 'antd';

import Movie from '../Movie/Movie';

export default class MovieList extends React.Component {
  render() {
    const { items, currentWidth, totalItems, getPage, currentPage } = this.props;
    const rowSize = currentWidth <= 768 ? 1 : 2;

    const pagination = items.toString() ? (
      <Pagination
        showSizeChanger={false}
        defaultCurrent={currentPage}
        pageSize={20}
        total={totalItems}
        onChange={getPage}
      />
    ) : null;

    return (
      <Fragment>
        <List
          className="movie__list"
          grid={{ gutter: [16, 18], column: rowSize }}
          dataSource={items}
          renderItem={(item) => {
            return (
              <List.Item key={item.id}>
                <Movie {...item} />
              </List.Item>
            );
          }}
        />
        {pagination}
      </Fragment>
    );
  }
}
