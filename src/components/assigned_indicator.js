import React from 'react';

export default class AssignedIndicator extends React.PureComponent {
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
