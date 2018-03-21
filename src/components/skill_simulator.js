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
    fetchInitialState: PropTypes.func.isRequired,
    preOwnedDatas: PropTypes.object.isRequired,
    preAssignedHeaders: PropTypes.object.isRequired,
    preAssignedDatas: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.fetchInitialState(
      this.props.preOwnedDatas,
      this.props.preAssignedHeaders,
      this.props.preAssignedDatas
    );
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
