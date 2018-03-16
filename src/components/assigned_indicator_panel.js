import React from 'react';
import PropTypes from 'prop-types';
import AssignedIndicatorContainer from '../containers/assigned_indicator';

export default class AssignedIndicatorPanel extends React.PureComponent {

  static propTypes = {
    job: PropTypes.shape({
      display_short: PropTypes.string.isRequired,
      job_skill_lines: PropTypes.array.isRequired
    }),
    skillLine: PropTypes.shape({
      id: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired
    }),
    skillLineMax: PropTypes.number.isRequired,
    selfAssigned: PropTypes.number.isRequired,
    totalAssigned: PropTypes.number.isRequired,
    assigned: PropTypes.number.isRequired,
    owned: PropTypes.number.isRequired
  };

  renderSkillAssignedIndicator() {
    if (this.props.job.job_skill_lines.includes(this.props.skillLine.id)) {
      return null;
    } else {
      return (
        <AssignedIndicatorContainer
          size='small'
          display={this.props.skillLine.display}
          numerator={this.props.totalAssigned}
          denominator={this.props.skillLineMax}
        />
      );
    }
  }

  render() {
    return(
      <div className='assigned-indicator-panel'>
        <AssignedIndicatorContainer
          size='large'
          display={`${this.props.job.display_short} - ${this.props.skillLine.display}`}
          numerator={this.props.selfAssigned}
          denominator={this.props.skillLineMax}
        />
        <AssignedIndicatorContainer
          size='small'
          display={this.props.job.display_short}
          numerator={this.props.assigned}
          denominator={this.props.owned}
        />
        {
          this.renderSkillAssignedIndicator()
        }
      </div>
    );
  }
}
