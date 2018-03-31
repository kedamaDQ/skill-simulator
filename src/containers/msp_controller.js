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
        jobId,
        skillLineId,
        skillLineMax,
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
          if (preTotalAssigned <= skillLineMax) {
            assigned.msp = selfAssigned.msp + jobRemained.msp;
          } else {
            if (selfAssigned.nsp >= preTotalAssigned - skillLineMax) {
              assigned.nsp = selfAssigned.nsp - (preTotalAssigned - skillLineMax);
              assigned.msp = selfAssigned.msp + jobRemained.msp;
            } else {
              assigned.nsp = 0;
              assigned.msp = selfAssigned.msp + (skillLineMax- skillTotalAssigned.nsp);
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
        if (preTotalAssigned > skillLineMax) {
          if (selfAssigned.nsp >= preTotalAssigned - skillLineMax) {
            assigned.nsp = selfAssigned.nsp - (preTotalAssigned - skillLineMax);
          } else {
            assigned.nsp = 0;
            assigned.msp = skillLineMax- skillTotalAssigned;
          }
        }
        if (assigned.msp < 0) {
          assigned.msp = 0;
        }
      }
      dispatch(updateAssigned(jobId, skillLineId, assigned));
    }
  };
};

const MspController = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignController);

export default MspController;
