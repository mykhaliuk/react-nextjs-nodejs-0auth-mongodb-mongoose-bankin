import React     from 'react'
import PropTypes from 'prop-types'
import Loader    from 'react-loaders'

export default function Spinner({scale, active}) {

  return <Loader type="line-scale-pulse-out-rapid"
                 style={{transform: `scale(${scale})`}}
                 active={active}
  />
}

Spinner.defaultProps = {
  scale : 0.6,
  active: false
}

Spinner.propTypes = {
  scale : PropTypes.number,
  active: PropTypes.bool
}
