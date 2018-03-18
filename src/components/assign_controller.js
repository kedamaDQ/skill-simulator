import React from 'react';
import PropTypes from 'prop-types';
import AssignControllerButton from './assign_controller_button';
import AssignControllerIndicator from './assign_controller_indicator';

export const ASSIGN_MAX = 9999;
export const ASSIGN_MIN = -9999;

export default class AssignController extends React.PureComponent {

  static propTypes = {
    job: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    skillLine: PropTypes.shape({
      id: PropTypes.string.isRequired,
      max_points: PropTypes.number.isRequired
    }).isRequired,
    selfAssigned: PropTypes.shape({
      nsp: PropTypes.number.isRequired,
      msp: PropTypes.number.isRequired
    }).isRequired,
    skillTotalAssigned: PropTypes.shape({
      nsp: PropTypes.number.isRequired,
      msp: PropTypes.number.isRequired
    }).isRequired,
    jobOwned: PropTypes.shape({
      nsp: PropTypes.number.isRequired,
      msp: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired,
    jobAssigned: PropTypes.shape({
      nsp: PropTypes.number.isRequired,
      msp: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(change) {
    this.props.onClick && this.props.onClick(change);
  }

  render() {
    return(
      <div className='assign-controller'>
        <div className='assign-controller__indicator-outer'>
          <div className='assign-controller__title'>{this.props.display}</div>
          <AssignControllerIndicator
            label={'使用'}
            value={this.props.assigned}
          />
          <AssignControllerIndicator
            label={'残り'}
            value={this.props.remained}
          />
        </div>
        <div className='assign-controller__buttons-outer'>
          <AssignControllerButton
            value={ASSIGN_MIN}
            display='全消'
            onClick={this.handleClick}
            styleClasses={this.props.buttonStyleClasses}
          />
          <AssignControllerButton
            value={-10}
            display='-10'
            onClick={this.handleClick}
            styleClasses={this.props.buttonStyleClasses}
          />
          <AssignControllerButton
            value={-1}
            display='-1'
            onClick={this.handleClick}
            styleClasses={this.props.buttonStyleClasses}
          />
          <AssignControllerButton
            value={1}
            display='+1'
            onClick={this.handleClick}
            styleClasses={this.props.buttonStyleClasses}
          />
          <AssignControllerButton
            value={10}
            display='+10'
            onClick={this.handleClick}
            styleClasses={this.props.buttonStyleClasses}
          />
          <AssignControllerButton
            value={ASSIGN_MAX}
            display='全振'
            onClick={this.handleClick}
            styleClasses={this.props.buttonStyleClasses}
          />
        </div>
      </div>
    );
  }
}
