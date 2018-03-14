import React from 'react';
import HeaderNavigationContainer from '../containers/header_navigation';
import SpTableContainer from '../containers/sp_table';
import InputModalContainer from '../containers/modal';
import '../styles/skill-simulator.css';

export default class SkillSimulator extends React.Component {
  componentWillMount() {
    this.props.fetchInitialState();
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div>
          <h1>DQ10 スキルシミュレーター by foresdon.jp</h1>
          <div style={{clear: 'both', padding: '100px 20px'}}>nowloading...</div>
        </div>
      );
    }
    return (
      <div className="skill-simulator">
        <HeaderNavigationContainer />
        <SpTableContainer />
        <InputModalContainer />
      </div>
    );
  }
}
