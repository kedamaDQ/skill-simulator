import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { components } from 'react-select';

const OwnedSelector = (props) => {

  const handleChange = (selected) => {
    props.onChange && props.onChange(selected);
  };

  const customLabel = (label, value, showValue = true) => {
    return(
      <div className='react-select-owned__custom-label'>
        <div className='react-select-owned__custom-label__label'>{label}</div>
        <div className={`react-select-owned__custom-label__value${ (showValue) ? '' : '--hidden' }`}>{value}</div>
      </div>
    );
  }

  const SingleValue = (selectProps) => {
    const { label, value } = selectProps.data;
    return(
      <components.SingleValue {...{
        ...selectProps,
        children: customLabel(label, value, props.showValue)
      }} />
    );
  };

  const Option = (selectProps) => {
    const { label, value } = selectProps;
    return(
      <components.Option {...{
        ...selectProps,
        children: customLabel(label, value, props.showValue)
      }} />
    );
  };

  return (
    <ReactSelect
      components={{ SingleValue, Option }}
      options={props.options}
      value={props.value}
      onChange={handleChange}
      isMulti={false}
      isSearchable={false}
      isClearable={false}
      blurInputOnSelect={true}
      menuShouldBlockScroll={false}
      minMenuHeight={100}
      maxMenuHeight={200}
      menuPlacement='bottom'
      className='react-select-owned'
      classNamePrefix='react-select-owned'
    />
  );
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
  onChange: PropTypes.func,
  showValue: PropTypes.bool.isRequired
};

export default OwnedSelector;
