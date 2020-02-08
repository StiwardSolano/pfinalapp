import React from 'react';
import PropTypes from 'prop-types';
import 'react-rater/lib/react-rater.css';
import '../styles/react-raterReco.css';

const Reco = (props) => {
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
  return <div className={`react-rater-reco ${className}`} {...crossProps}><span>☝</span></div>
}

Reco.defaultProps = {
  willBeActive: false,
  isActive: false,
  isActiveHalf: false,
  isDisabled: false
}

Reco.propTypes = {
  isActive: PropTypes.bool,
  isActiveHalf: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool
}

export default Reco