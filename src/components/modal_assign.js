import React from 'react';
import PropTypes from 'prop-types';
import AssignedIndicatorPanel from '../components/assigned_indicator_panel';
import AssignControlPanelContainer from '../containers/assign_control_panel';
import Selector from './selector';

export default class ModalAssign extends React.PureComponent {

  static propTypes = {
    job: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    skillLine: PropTypes.shape({
      id: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.shape({
        display: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired
      }).isRequired).isRequired
    }).isRequired,
    skillLineMax: PropTypes.number.isRequired,
    selfAssigned: PropTypes.number.isRequired,
    totalAssigned: PropTypes.number.isRequired,
    assigned: PropTypes.number.isRequired,
    owned: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleClickSelector = this.handleClickSelector.bind(this);
  }

  formatItems() {
    const {selfAssigned, totalAssigned, skillLine: {skills}} = this.props;
    const otherAssigned = totalAssigned - selfAssigned;

    return skills.map((skill) => {
      const styleClasses = [];
      let isClickable = false;
      let value = 0;

      if (skill.points <= otherAssigned) {
        styleClasses.push('disabled');
        isClickable = false;
        value = 0;
      } else if (skill.points <= totalAssigned) {
        styleClasses.push('assigned');
        isClickable = true;
        value = skill.points - otherAssigned;
      } else {
        styleClasses.push('unassigned');
        isClickable = true;
        value = skill.points - otherAssigned;
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
    this.props.onChange(this.props.job.id, this.props.skillLine.id, points);
  }

  render() {
    const {
      skillLine,
      skillLineMax,
      selfAssigned,
      totalAssigned,
      job,
      assigned,
      owned,
      remaining
    } = this.props;

    return(
      <div className='input-modal-assigned'>
        <AssignedIndicatorPanel
          skillLine={skillLine}
          skillLineMax={skillLineMax}
          selfAssigned={selfAssigned}
          totalAssigned={totalAssigned}
          job={job}
          assigned={assigned}
          owned={owned}
        />
        <AssignControlPanelContainer
          job={job}
          skillLine={skillLine}
          selfAssigned={selfAssigned}
          totalAssigned={totalAssigned}
          skillLineMax={skillLineMax}
          remaining={remaining}
        />
        <Selector
          items={this.formatItems()}
          onClick={this.handleClickSelector}
        />
      </div>
    );
  }
}
