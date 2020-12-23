import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/styles'

const useStylesBootstrap = makeStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function BootstrapTooltip(props) {
  const { open } = props
  const [isOpen, setOpen] = useState(open)
  const classes = useStylesBootstrap()

  useEffect(() => {
    setTimeout(() => setOpen(false), 7000)
  }, [])

  return (
    <Tooltip
      onMouseEnter={() => {
        if (isOpen) {
          setOpen(false)
        }
      }}
      classes={classes}
      {...props}
      open={isOpen}
    />
  )
}

BootstrapTooltip.defaultProps = {
  open: false,
  placement: 'bottom',
}

BootstrapTooltip.propTypes = {
  open: PropTypes.bool,
  placement: PropTypes.string,
}
