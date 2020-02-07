import React from 'react';
import PropTypes from 'prop-types';
import 'react-rater/lib/react-rater.css';

const Cross = (props) => {
  const crossProps = Object.assign({}, props)
  const nameMap = {
    isDisabled: 'is-disabled',
    isActive: 'is-active',
    isActiveHalf: 'is-active-half',
    willBeActive: 'will-be-active'
  }
  const className = Object.keys(nameMap)
        // eslint-disable-next-line 
        .filter(prop => (delete crossProps[prop], props[prop]))
        .map(prop => nameMap[prop])
        .join(' ')
  return <div className={`react-rater-cross ${className}`} {...crossProps}>✘</div>
}

Cross.defaultProps = {
  willBeActive: false,
  isActive: false,
  isActiveHalf: false,
  isDisabled: false
}

Cross.propTypes = {
  isActive: PropTypes.bool,
  isActiveHalf: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool
}

export default Cross