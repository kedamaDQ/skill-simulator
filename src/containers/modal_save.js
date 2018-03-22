import { connect } from 'react-redux';
import ModalSave from '../components/modal_save';
import { baseUrl } from '../utils/env';
import { 
  JOB_MASK,
  SKILLLINE_MASK,
  NSP_MASK,
  MSP_MASK,
  encodeBase64url
} from '../utils/base64';

const mapStateToProps = (state, ownProps) => {
  const jobs = state.jobs;
  const skillLines = state.skill_lines;
  const owned = state.owned_points;
  const details = state.assigned_points.details;
  const presets = state.preset_points;

  const o = [];   // owned
  const ah = [];  // assigned header
  const ad = [];  // assigned data
  jobs.forEach((job, jobIdx) => {
    o.push(
      presets.by_level.findIndex((v) => v.label === owned[job.id].by_level.label),
      presets.by_training.findIndex((v) => v.label === owned[job.id].by_training.label),
      presets.by_skillbooks.findIndex((v) => v.label === owned[job.id].by_skillbooks.label)
    );

    const headers = [jobIdx | JOB_MASK];
    const datas = [];
    job.job_skill_lines.concat(job.weapon_skill_lines).forEach((skillLineId) => {
      const skillLineIdx = skillLines.findIndex((sl) => skillLineId === sl.id);

      if (details[job.id][skillLineId].nsp || details[job.id][skillLineId].msp) {
        let type = 0;

        if (details[job.id][skillLineId].nsp) {
          type |= NSP_MASK;
          datas.push(details[job.id][skillLineId].nsp);
        }
        if (details[job.id][skillLineId].msp) {
          type |= MSP_MASK;
          datas.push(details[job.id][skillLineId].msp);
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
    url: `${baseUrl()}/?${query}`
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const ModalSaveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSave);

export default ModalSaveContainer;
