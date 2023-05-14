import React from 'react';
import { enGB } from 'date-fns/locale';
import { Space, Typography, Rate } from 'antd';
import { format } from 'date-fns';

import './Movie.css';

const MovieInfo = ({ title, date, data, overview, vote }) => {
  const { Text, Paragraph } = Typography;
  const correctDate = format(new Date(...date), 'MMMM dd, yyyy', { locale: enGB });

  const roundToHalf = (num) => {
    const numWithHalf = Math.ceil(num) - 0.5;
    if (num >= numWithHalf && num !== num + 1) {
      return numWithHalf;
    }
    return Math.floor(num);
  };

  const defineRateColor = (num) => {
    const color = { borderColor: '' };

    if (num < 5) {
      color.borderColor = 'red';
      return color;
    }
    if (num < 8) {
      color.borderColor = '#E9D100';
      return color;
    }
    color.borderColor = 'green';
    return color;
  };

  return (
    <div className="movie__info">
      <Space size={8} direction="vertical">
        <h3 className="movie__title">{title}</h3>
        <Text className="movie__release-date" type="secondary">
          {correctDate}
        </Text>
        <ul className="movie__genre">
          {data.map((e) => {
            return <span key={e.id}>{e.label}</span>;
          })}
        </ul>
        <Paragraph className="movie__overview" ellipsis={{ rows: 3 }}>
          {overview}
        </Paragraph>
        <Rate className="movie__rate" disabled allowHalf count={10} value={roundToHalf(vote)} />
        <div className="movie__rate-round" style={defineRateColor(vote)}>
          <span>{vote.toFixed(1)}</span>
        </div>
      </Space>
    </div>
  );
};

export default MovieInfo;
