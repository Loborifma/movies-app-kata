import React from 'react';
import { Col, Row } from 'antd';

import Movie from '../movie/Movie';

const MovieList = ({ items }) => {
  return (
    <Row gutter={[16, 18]}>
      {items.map((e) => {
        return (
          <Col span={12} key={e.id}>
            <Movie {...e} />
          </Col>
        );
      })}
    </Row>
  );
};

export default MovieList;
