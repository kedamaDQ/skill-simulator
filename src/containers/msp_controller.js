import { connect } from 'react-redux';
import
  AssignController,
  {
    ASSIGN_MAX,
    ASSIGN_MIN
  } from '../components/assign_controller';
import { updateAssigned } from '../actions/assigned_points';

const mapStateToProps = (state, ownProps) => {
  return {
    assigned: ownProps.selfAssigned.msp,
    remained: ownProps.jobOwned.msp - ownProps.jobAssigned.msp
  };
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
        msp: jobOwned.msp - jobAssigned.msp
      };

      const assigned = {}
      if (addend === ASSIGN_MIN) {
        assigned.msp = 0;
      } else if (addend === ASSIGN_MAX) {
        if (jobRemained.msp > 0) {
          const preTotalAssigned = skillTotalAssigned.nsp + selfAssigned.msp + jobRemained.msp;
          if (preTotalAssigned <= skillLine.max_points) {
            assigned.msp = selfAssigned.msp + jobRemained.msp;
          } else {
            if (selfAssigned.nsp >= preTotalAssigned - skillLine.max_points) {
              assigned.nsp = selfAssigned.nsp - (preTotalAssigned - skillLine.max_points);
              assigned.msp = selfAssigned.msp + jobRemained.msp;
            } else {
              assigned.nsp = 0;
              assigned.msp = selfAssigned.msp + (skillLine.max_points - skillTotalAssigned.nsp);
            }
          }
        } else {
          assigned.msp = selfAssigned.msp;
        }
      } else {
        if (addend > jobRemained.msp) {
          assigned.msp = selfAssigned.msp + jobRemained.msp;
        } else {
          assigned.msp = selfAssigned.msp + addend;
        }

        const preTotalAssigned = skillTotalAssigned.nsp + assigned.msp;
        if (preTotalAssigned > skillLine.max_points) {
          if (selfAssigned.nsp >= preTotalAssigned - skillLine.max_points) {
            assigned.nsp = selfAssigned.nsp - (preTotalAssigned - skillLine.max_points);
          } else {
            assigned.nsp = 0;
            assigned.msp = skillLine.max_points - skillTotalAssigned;
          }
        }
        if (assigned.msp < 0) {
          assigned.msp = 0;
        }
      }
      dispatch(updateAssigned(job.id, skillLine.id, assigned));
    }
  };
};

const MspController = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignController);

export default MspController;
