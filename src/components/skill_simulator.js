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
    preOwnedDatas: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired,
    preAssignedHeaders: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired,
    preAssignedDatas: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  storageAvailable() {
    if (window.localStorage) {
      const storage = window.localStorage;
      try {
        const testData = '__test_data__';
        storage.setItem(testData, testData);
        storage.removeItem(testData);
        return true;
      } catch (e) {
        return e instanceof DOMException && (
          e.code === 22 ||
          e.code === 1014 ||
          e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
        ) && storage.length !== 0;
      }
    } else {
      return false;
    }
  }

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
        <HeaderNavigationContainer
          storageAvailable={this.storageAvailable()}
        />
        <SpTableContainer />
        <ModalContainer />
      </div>
    );
  }
}
