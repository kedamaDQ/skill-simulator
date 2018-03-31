import React from 'react';
import PropTypes from 'prop-types';
import AssignedIndicatorContainer from '../containers/assigned_indicator';
import NspControllerContainer from '../containers/nsp_controller';
import MspControllerContainer from '../containers/msp_controller';
import Selector from './selector';

const ModalAssign = (props) => {

  const formatItems = () => {
    const { selfAssigned, skillTotalAssigned, skillLine: {skills} } = props;
    const otherAssigned = skillTotalAssigned.nsp - selfAssigned.nsp;

    return skills.map((skill) => {
      const styleClasses = [];
      let isClickable = false;
      let value = 0;

      if (skill.points <= otherAssigned) {
        styleClasses.push('disabled');
        isClickable = false;
        value = 0;
      } else if (skill.points <= otherAssigned + selfAssigned.msp) {
        styleClasses.push('msp-assigned');
        isClickable = false;
        value = 0;
      } else if (skill.points <= skillTotalAssigned.nsp + selfAssigned.msp) {
        styleClasses.push('nsp-assigned');
        isClickable = true;
        value = skill.points - (otherAssigned + selfAssigned.msp);
      } else {
        styleClasses.push('unassigned');
        isClickable = true;
        value = skill.points - (otherAssigned + selfAssigned.msp);
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
          numerator={props.skillTotalAssigned.nsp}
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
    selfAssigned,
    skillTotalAssigned,
    jobOwned,
    jobAssigned
  } = props;

  return(
    <div className='modal-assigned'>
      <div className='modal-assigned__controller'>
        <div>
          <AssignedIndicatorContainer
            size='large'
            display={`${job.display_short} - ${skillLine.display}`}
            numerator={skillTotalAssigned.nsp + selfAssigned.msp}
            denominator={skillLine.max_points}
          />
          { renderSkillAssignedIndicator() }
        </div>
        <NspControllerContainer
          jobId={jobId}
          skillLineId={skillLineId}
          skillLineMax={skillLine.max_points}
          selfAssigned={selfAssigned}
          skillTotalAssigned={skillTotalAssigned}
          jobOwned={jobOwned}
          jobAssigned={jobAssigned}
          buttonStyleClasses='nsp'
          display='スキルポイント'
        />
        <MspControllerContainer
          jobId={jobId}
          skillLineId={skillLineId}
          skillLineMax={skillLine.max_points}
          selfAssigned={selfAssigned}
          skillTotalAssigned={skillTotalAssigned}
          jobOwned={jobOwned}
          jobAssigned={jobAssigned}
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
  job: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  skillLine: PropTypes.shape({
    id: PropTypes.string.isRequired,
    max_points: PropTypes.number.isRequired,
    skills: PropTypes.arrayOf(PropTypes.shape({
      display: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired
    }).isRequired).isRequired
  }).isRequired,
  selfAssigned: PropTypes.shape({
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  skillTotalAssigned: PropTypes.shape({
    nsp: PropTypes.number.isRequired,
    msp: PropTypes.number.isRequired
  }).isRequired
};

export default ModalAssign;
