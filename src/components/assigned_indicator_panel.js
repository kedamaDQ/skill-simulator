import React from 'react';
import AssignedIndicatorContainer from '../containers/assigned_indicator';

export default class AssignedIndicatorPanel extends React.PureComponent {

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
