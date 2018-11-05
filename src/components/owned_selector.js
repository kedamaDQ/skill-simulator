import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const OwnedSelector = (props) => {

  const handleChange = (selected) => {
    props.onChange && props.onChange(selected);
  };

  const renderOption = (option) => {
    return(
      <div className='react-select-option'>
        <div className='label'>{option.label}</div>
        <div className='value'>({option.value})</div>
      </div>
    );
  };

  const renderOptionWithoutValue = (option) => {
    return(
      <div className='react-select-option--without-value'>
        <div className='label'>{option.label}</div>
        <div className='value'></div>
      </div>
    );
  };

  const renderValue = (option) => {
    return(
      <div className='react-select-value'>
        <div className='label'>{option.label}</div>
        <div className='value'>({option.value})</div>
      </div>
    );
  };

  const renderValueWithoutValue = (option) => {
    return(
      <div className='react-select-value--without-value'>
        <div className='label'>{option.label}</div>
        <div className='value'></div>
      </div>
    );
  };

  if (!(props.options && props.onChange)) {
    return (
      <div className='react-select-dummy'>
        { renderValue(this.props.value) }
      </div>
    );
  } else {
    return (
      <ReactSelect
        options={props.options}
        onChange={handleChange}
        value={props.value}
        multi={false}
        removeSelected={false}
        searchable={false}
        clearable={false}
        optionRenderer={(props.showValue) ? renderOption : renderOptionWithoutValue}
        valueRenderer={(props.showValue) ? renderValue : renderValueWithoutValue}
      />
    );
  }
}

OwnedSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired),
  value: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }),
  onChange: PropTypes.func
};

export default OwnedSelector;
