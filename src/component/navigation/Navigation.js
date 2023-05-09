import React from 'react';
import { Menu } from 'antd';

import './Navigation.css';

export default class Navigation extends React.Component {
  items = [
    { label: 'Search', key: 'search' },
    { label: 'Rated', key: 'rated' },
  ];

  state = {
    current: 'search',
  };

  changeCurrent = (evt) => {
    this.setState({
      current: evt.key,
    });
  };

  render() {
    return (
      <Menu
        className="navigation"
        onClick={this.changeCurrent}
        selectedKeys={this.state.current}
        mode="horizontal"
        items={this.items}
      />
    );
  }
}
