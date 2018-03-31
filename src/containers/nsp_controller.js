import { connect } from 'react-redux';
import
  AssignController,
  {
    ASSIGN_MAX,
    ASSIGN_MIN
  } from '../components/assign_controller';
import {
  updateAssigned
} from '../actions/assigned_points';

const MIN_ASSIGN = 0;
const MAX_ASSIGN = 299;

const mapStateToProps = (state, ownProps) => {
  return {
    assigned: ownProps.selfAssigned.nsp,
    remained: ownProps.jobOwned.nsp - ownProps.jobAssigned.nsp
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onClick: (addend) => {
      const {
        jobId,
        skillLineId,
        skillLineMax,
        selfAssigned,
        skillTotalAssigned,
        jobOwned,
        jobAssigned
      } = ownProps;
      const jobRemained = {
        nsp: jobOwned.nsp - jobAssigned.nsp
      };

      const assigned = {};
      if (addend === ASSIGN_MIN) {
        assigned.nsp = 0;
      } else if (addend === ASSIGN_MAX) {
        const totalAssigned = skillTotalAssigned.nsp + selfAssigned.msp;
        if (jobRemained.nsp > 0) {
          const preTotalAssigned = totalAssigned + jobRemained.nsp;
          if (preTotalAssigned > skillLineMax) {
            assigned.nsp = selfAssigned.nsp + (skillLineMax - totalAssigned);
          } else {
            assigned.nsp = selfAssigned.nsp + jobRemained.nsp;
          }
        } else {
          if (totalAssigned > skillLineMax) {
            assigned.nsp = skillLineMax- (totalAssigned - selfAssigned.nsp);
          } else {
            assigned.nsp = selfAssigned.nsp + jobRemained.nsp;
          }
          if (assigned.nsp < 0) {
            assigned.nsp = 0;
          }
        }
      } else {
        assigned.nsp = selfAssigned.nsp + addend;
        if (assigned.nsp < MIN_ASSIGN) {
          assigned.nsp = MIN_ASSIGN;
        } else if (assigned.nsp > MAX_ASSIGN) {
          assigned.nsp = MAX_ASSIGN;
        }
      }
      dispatch(updateAssigned(jobId, skillLineId, assigned));
    }
  };
};

const NspControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignController);

export default NspControllerContainer;
