import React from 'react';
import PropTypes from 'prop-types';
import AssignedIndicatorContainer from '../containers/assigned_indicator';
import NspControllerContainer from '../containers/nsp_controller';
import MspControllerContainer from '../containers/msp_controller';
import Selector from './selector';

const ModalAssign = (props) => {

  const formatItems = () => {
    const { assignedByJob, totalAssignedForSkill, skillLine: {skills} } = props;
    const otherAssigned = totalAssignedForSkill.nsp - assignedByJob.nsp;

    return skills.map((skill) => {
      const styleClasses = [];
      let isClickable = false;
      let value = 0;

      if (skill.points <= otherAssigned) {
        styleClasses.push('disabled');
        isClickable = false;
        value = 0;
      } else if (skill.points <= otherAssigned + assignedByJob.msp) {
        styleClasses.push('msp-assigned');
        isClickable = false;
        value = 0;
      } else if (skill.points <= totalAssignedForSkill.nsp + assignedByJob.msp) {
        styleClasses.push('nsp-assigned');
        isClickable = true;
        value = skill.points - (otherAssigned + assignedByJob.msp);
      } else {
        styleClasses.push('unassigned');
        isClickable = true;
        value = skill.points - (otherAssigned + assignedByJob.msp);
      }

      return({
        styleClasses: styleClasses.join(' '),
        key: skill.points,
        display: (
          <div>
            <span className='selector__name'>{skill.display}</span>
            <span className='selector__points'>({skill.points})</span>
          </div>
        ),
        isClickable,
        value
      });
    });
  }

  const renderSkillAssignedIndicator = () => {
    if (props.job.job_skill_lines.includes(props.skillLineId)) {
      return null;
    } else {
      return (
        <AssignedIndicatorContainer
          size='small'
          display={props.skillLine.display}
          numerator={props.totalAssignedForSkill.nsp}
          denominator={props.skillLine.max_points}
        />
      );
    }
  };

  const {
    jobId,
    skillLineId,
    job,
    skillLine,
    assignedByJob,
  } = props;

  return(
    <div className='modal-assigned'>
      <div className='modal-assigned__controller'>
        <div>
          <AssignedIndicatorContainer
            size='large'
            display={`${job.display_short} - ${skillLine.display}`}
            numerator={assignedByJob.nsp + assignedByJob.msp}
            denominator={skillLine.max_points}
          />
          { renderSkillAssignedIndicator() }
        </div>
        <NspControllerContainer
          jobId={jobId}
          skillLineId={skillLineId}
          buttonStyleClasses='nsp'
          display='スキルポイント'
        />
        <MspControllerContainer
          jobId={jobId}
          skillLineId={skillLineId}
          buttonStyleClasses='msp'
          display='マスタースキルポイント'
        />
      </div>
      <div className='modal-assigned__selector'>
        <Selector
          items={formatItems()}
          onClick={props.onSelectorClick}
        />
      </div>
    </div>
  );
}

ModalAssign.propTypes = {
  jobId: PropTypes.string.isRequired,
  skillLineId: PropTypes.string.isRequired,
  job: PropTypes.object.isRequired,
  skillLine: PropTypes.shape({
    max_points: PropTypes.number.isRequired,
    skills: PropTypes.arrayOf(PropTypes.shape({
      display: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired
    }).isRequired).isRequired
  }).isRequired,
  assignedByJob: PropTypes.shape({
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  totalAssignedForSkill: PropTypes.shape({
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired
  }).isRequired
};

export default ModalAssign;
