import React from 'react';
import { enGB } from 'date-fns/locale';
import { Space, Typography, Rate } from 'antd';
import { format } from 'date-fns';

import './MovieInfo.css';

const MovieInfo = ({ title, date, data, overview, vote }) => {
  const { Text, Title, Paragraph } = Typography;

  return (
    <div className="movie__info">
      <Space size={10} direction="vertical">
        <Title level={3} style={{ fontSize: 20, margin: 0 }}>
          {title}
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {format(new Date(...date), 'MMMM dd, yyyy', { locale: enGB })}
        </Text>
        <ul className="movie__genre">
          {data.map((e) => {
            return <span key={e.id}>{e.label}</span>;
          })}
        </ul>
        <Paragraph ellipsis={{ rows: 4 }} style={{ fontSize: 12 }}>
          {overview}
        </Paragraph>
        <Rate className="movie__rate" disabled allowHalf count={10} value={vote} />
      </Space>
    </div>
  );
};

export default MovieInfo;
