import { connect } from 'react-redux';
import SpPanel from '../components/sp_panel';
import { openModalAssign } from '../actions/modal';

const mapStateToProps = (state, ownProps) => {
  return {
    styleClasses: 'assigned',
    display: ownProps.assigned
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { job, skillLine } = ownProps;
  return {
    onClick: (position) => {
      dispatch(openModalAssign(position, job, skillLine));
    }
  };
}

const AssignedSpPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpPanel);

export default AssignedSpPanelContainer;
