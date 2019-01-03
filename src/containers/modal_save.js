import { connect } from 'react-redux';
import ModalSave from '../components/modal_save';
import { baseUrl } from '../utils/env';
import { closeModal } from '../actions/modal';
import { loadOwnedPoints } from '../actions/owned_points';
import { loadAssigned } from '../actions/assigned_points';
import { 
  JOB_MASK,
  SKILLLINE_MASK,
  NSP_MASK,
  MSP_MASK,
  encodeBase64url
} from '../utils/base64';

const mapStateToProps = (state, ownProps) => {
  const {
    indices,
    jobs,
    preset_points: presets
  } = state.skill_simulator;
  const {
    owned_points: owned,
    assigned_points: { details },
  } = state;

  const o = [];   // owned
  const ah = [];  // assigned header
  const ad = [];  // assigned data
  indices.jobs.forEach((jobId, jobIdx) => {
    o.push(
      presets.by_level[jobs[jobId].presets_by_level].findIndex((v) => v.label === owned[jobId].by_level.label),
      presets.by_training[jobs[jobId].presets_by_training].findIndex((v) => v.label === owned[jobId].by_training.label),
      presets.by_skillbooks[jobs[jobId].presets_by_skillbooks].findIndex((v) => v.label === owned[jobId].by_skillbooks.label)
    );

    const headers = [jobIdx | JOB_MASK];
    const datas = [];
    jobs[jobId].job_skill_lines.concat(
      jobs[jobId].weapon_skill_lines
    ).forEach((skillLineId) => {
      const skillLineIdx = indices.skill_lines.findIndex((sId) => {
        return sId === skillLineId;
      });

      if (details[jobId][skillLineId].nsp || details[jobId][skillLineId].msp) {
        let type = 0;

        if (details[jobId][skillLineId].nsp) {
          type |= NSP_MASK;
          datas.push(details[jobId][skillLineId].nsp);
        }
        if (details[jobId][skillLineId].msp) {
          type |= MSP_MASK;
          datas.push(details[jobId][skillLineId].msp);
        }
        headers.push(skillLineIdx | SKILLLINE_MASK, type);
      }
    });

    if (datas.length) {
      Array.prototype.push.apply(ah, headers);
      Array.prototype.push.apply(ad, datas);
    }
  });

  const query =
    `o=${encodeBase64url(o)}` +
    `&ah=${encodeBase64url(ah)}` +
    `&ad=${encodeBase64url(ad)}`;
  return {
    url: `${baseUrl()}/?${query}`,
    owned,
    details
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadFromLocalStorage: ({ owned, details }) => {
      dispatch(loadOwnedPoints(owned));
      dispatch(loadAssigned(details));
      dispatch(closeModal());
    }
  };
};

const ModalSaveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSave);

export default ModalSaveContainer;
