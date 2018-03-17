import React from 'react';
import PropTypes from 'prop-types';
import AssignedIndicatorPanel from './assigned_indicator_panel';
import NspControllerContainer from '../containers/nsp_controller';
import MspControllerContainer from '../containers/msp_controller';
import Selector from './selector';

export default class ModalAssign extends React.PureComponent {

  static propTypes = {
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

  constructor(props) {
    super(props);
    this.handleClickSelector = this.handleClickSelector.bind(this);
  }

  formatItems() {
    const {selfAssigned, skillTotalAssigned, skillLine: {skills}} = this.props;
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

  handleClickSelector(points) {
    this.props.onChange(this.props.job.id, this.props.skillLine.id, { nsp: points });
  }

  render() {
    const {
      job,
      skillLine,
      selfAssigned,
      skillTotalAssigned,
      jobOwned,
      jobAssigned
    } = this.props;

    return(
      <div className='input-modal-assigned'>
        <AssignedIndicatorPanel
          job={job}
          skillLine={skillLine}
          selfAssigned={selfAssigned}
          skillTotalAssigned={skillTotalAssigned}
          jobOwned={jobOwned}
          jobAssigned={jobAssigned}
        />
        <NspControllerContainer
          job={job}
          skillLine={skillLine}
          selfAssigned={selfAssigned}
          skillTotalAssigned={skillTotalAssigned}
          jobOwned={jobOwned}
          jobAssigned={jobAssigned}
        />
        <Selector
          items={this.formatItems()}
          onClick={this.handleClickSelector}
        />
        <MspControllerContainer
          job={job}
          skillLine={skillLine}
          selfAssigned={selfAssigned}
          skillTotalAssigned={skillTotalAssigned}
          jobOwned={jobOwned}
          jobAssigned={jobAssigned}
        />
      </div>
    );
  }
}
