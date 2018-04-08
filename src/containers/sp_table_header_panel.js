import { connect } from 'react-redux';
import SpTableHeaderPanel from '../components/sp_table_header_panel';

const mapStateToProps = (state, ownProps) => {
  return {
    styleClasses: (state.filter.filter_id === ownProps.id) ?
      `${ownProps.styleClasses} filtered` : ownProps.styleClasses
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const SpTableHeaderPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpTableHeaderPanel);

export default SpTableHeaderPanelContainer;
