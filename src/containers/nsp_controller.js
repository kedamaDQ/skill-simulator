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
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onClick: (addend) => {
      const {
        job,
        skillLine,
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
        if (jobRemained.nsp > 0) {
          const totalAssigned = skillTotalAssigned.nsp + selfAssigned.msp;
          const preTotalAssigned = totalAssigned + jobRemained.nsp;
          if (preTotalAssigned > skillLine.max_points) {
            assigned.nsp = selfAssigned.nsp + (skillLine.max_points - totalAssigned);
          } else {
            assigned.nsp = selfAssigned.nsp + jobRemained.nsp;
          }
        } else {
          assigned.nsp = selfAssigned.nsp + jobRemained.nsp;
        }
      } else {
        assigned.nsp = selfAssigned.nsp + addend;
        if (assigned.nsp < MIN_ASSIGN) {
          assigned.nsp = MIN_ASSIGN;
        } else if (assigned.nsp > MAX_ASSIGN) {
          assigned.nsp = MAX_ASSIGN;
        }
      }
      dispatch(updateAssigned(job.id, skillLine.id, assigned));
    }
  };
};

const NspControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignController);

export default NspControllerContainer;
