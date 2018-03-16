import React from 'react';
import PropTypes from 'prop-types';
import HeaderNavigationContainer from '../containers/header_navigation';
import SpTableContainer from '../containers/sp_table';
import ModalContainer from '../containers/modal';
import { versionString } from '../version';
import '../styles/skill-simulator.css';

export default class SkillSimulator extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetchInitialState: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchInitialState();
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div>
          <h1>DQ10 スキルシミュレーター by foresdon.jp (v{ versionString() })</h1>
          <div style={{clear: 'both', padding: '100px 20px'}}>nowloading...</div>
        </div>
      );
    }
    return (
      <div className="skill-simulator">
        <HeaderNavigationContainer />
        <SpTableContainer />
        <ModalContainer />
      </div>
    );
  }
}
