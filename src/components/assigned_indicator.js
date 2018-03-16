import React from 'react';
import PropTypes from 'prop-types';

export default class AssignedIndicator extends React.PureComponent {

  static propTypes = {
    display: PropTypes.string.isRequired,
    numerator: PropTypes.number.isRequired,
    denominator: PropTypes.number.isRequired,
    styleClasses: PropTypes.string.isRequired,
    numeratorStyleClasses: PropTypes.string.isRequired,
    denominatorStyleClasses: PropTypes.string.isRequired
  };

  render() {
    return(
      <dl className={this.props.styleClasses}>
        <dt>{this.props.display}</dt>
        <dd>
          <span className={this.props.numeratorStyleClasses}>{this.props.numerator}</span>
          <span className={this.props.denominatorStyleClasses}>/ {this.props.denominator}</span>
        </dd>
      </dl>
    );
  }
}
