import { connect } from 'react-redux';
import AssignControlPanel from '../components/assign_control_panel';
import {
  updateAssignedPoints
} from '../actions/assigned_points';

const MIN_ASSIGN = 0;
const MAX_ASSIGN = 299;

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onButtonClick: (change) => {
      const {
        job,
        skillLine,
        selfAssigned,
        totalAssigned,
        skillLineMax,
        remaining
      } = ownProps;

      let assigned = 0;
      if (change === -999) {
        assigned = 0;
      } else if (change === 999) {
        if (totalAssigned > skillLineMax) {
          if (totalAssigned - selfAssigned >= skillLineMax) {
            assigned = 0;
          } else {
            assigned = skillLineMax - (totalAssigned - selfAssigned);
          }
        } else if (totalAssigned === skillLineMax) {
          assigned = selfAssigned;
        } else {
          if (remaining > 0) {
            if (remaining + totalAssigned >= skillLineMax) {
              console.log(totalAssigned);
              assigned = skillLineMax - (totalAssigned - selfAssigned);
            } else {
              assigned = remaining + selfAssigned;
            }
          } else {
            assigned = (remaining + selfAssigned < 0) ? 0 : remaining + selfAssigned;
          }
        }
      } else {
        assigned = selfAssigned + change;
        assigned =
          (assigned > MAX_ASSIGN) ? MAX_ASSIGN :
          (assigned < MIN_ASSIGN) ? MIN_ASSIGN : assigned;
      }

      dispatch(updateAssignedPoints(job.id, skillLine.id, assigned));
    }
  };
};

const AssignControlPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignControlPanel);

export default AssignControlPanelContainer;
