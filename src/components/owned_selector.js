import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

export default class OwnedSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    this.props.onChange && this.props.onChange(selected);
  }

  renderOption(option) {
    return(
      <div className='react-select-option'>
        <div className='label'>{option.label}</div>
        <div className='value'>({option.value})</div>
      </div>
    );
  }

  renderValue(option) {
    return(
      <div className='react-select-value'>
        <div className='label'>{option.label}</div>
        <div className='value'>({option.value})</div>
      </div>
    );
  }

  render() {
    if (!(this.props.options && this.props.onChange)) {
      return (
        <div className='react-select-dummy'>
          { this.renderValue(this.props.value) }
        </div>
      );
    } else {
      return (
        <ReactSelect
          options={this.props.options}
          onChange={this.handleChange}
          value={this.props.value}
          multi={false}
          removeSelected={false}
          searchable={false}
          clearable={false}
          optionRenderer={this.renderOption}
          valueRenderer={this.renderValue}
        />
      );
    }
  }
}
