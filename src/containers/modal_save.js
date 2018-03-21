import { connect } from 'react-redux';
import ModalSave from '../components/modal_save';
import { baseUrl } from '../utils/env';
import { 
  JOB_HEADER_MASK,
  SKILLLINE_HEADER_MASK,
  encodeBase64url
} from '../utils/base64';

const mapStateToProps = (state, ownProps) => {
  const jobs = state.jobs;
  const skillLines = state.skill_lines;
  const owned = state.owned_points;
  const details = state.assigned_points.details;
  const presets = state.preset_points;

  const o = [];
  const a = [];
  jobs.forEach((job, jobIdx) => {

    o.push(
      presets.by_level.findIndex((v) => v.label === owned[job.id].by_level.label),
      presets.by_training.findIndex((v) => v.label === owned[job.id].by_training.label),
      presets.by_skillbooks.findIndex((v) => v.label === owned[job.id].by_skillbooks.label)
    );
    const skills = [];

    job.job_skill_lines.concat(job.weapon_skill_lines).forEach((skillLineId) => {
      const skillLineIdx = skillLines.findIndex((sl) => skillLineId === sl.id);

      if (details[job.id][skillLineId].nsp || details[job.id][skillLineId].msp) {
        skills.push(skillLineIdx | SKILLLINE_HEADER_MASK);
        if (details[job.id][skillLineId].nsp) {
          skills.push(details[job.id][skillLineId].nsp);
        }
        if (details[job.id][skillLineId].msp) {
          skills.push(details[job.id][skillLineId].msp);
        }
      }
    });

    if (skills.length) {
      a.push(JOB_HEADER_MASK | jobIdx);
      Array.prototype.push.apply(a, skills);
    }
  });

  const query = `?o=${encodeBase64url(new Uint8Array(o))}&a=${encodeBase64url(new Uint8Array(a))}`;
  return {
    url: baseUrl() + query
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
