import { connect } from 'react-redux';
import SpTableHeaderPanel from '../components/sp_table_header_panel';

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const SpTableHeaderPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpTableHeaderPanel);

export default SpTableHeaderPanelContainer;
