import React from 'react';
import { Input } from 'antd';

import './SearchBar.css';

export default class SearchBar extends React.Component {
  render() {
    return (
      <Input
        className="search-bar"
        placeholder="Type yo search..."
        onChange={(e) => {
          this.props.getQueryDebounced(e.target.value);
        }}
        aria-label="Search bar"
      />
    );
  }
}
