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
    selfAssigned: PropTypes.shape({
      nsp: PropTypes.number.isRequired,
      msp: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired,
    skillTotalAssigned: PropTypes.shape({
      nsp: PropTypes.number.isRequired,
      msp: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired
  };

  renderSkillAssignedIndicator() {
    if (this.props.job.job_skill_lines.includes(this.props.skillLine.id)) {
      return null;
    } else {
      return (
        <AssignedIndicatorContainer
          size='small'
          display={this.props.skillLine.display}
          numerator={this.props.skillTotalAssigned.nsp}
          denominator={this.props.skillLine.max_points}
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
          numerator={this.props.skillTotalAssigned.nsp + this.props.selfAssigned.msp}
          denominator={this.props.skillLine.max_points}
        />
        <AssignedIndicatorContainer
          size='small'
          display={this.props.job.display_short}
          numerator={this.props.jobAssigned.nsp}
          denominator={this.props.jobOwned.nsp}
        />
        {
          this.renderSkillAssignedIndicator()
        }
      </div>
    );
  }
}
