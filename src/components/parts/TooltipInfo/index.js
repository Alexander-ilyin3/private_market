import React, { useState } from 'react'
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
}

BootstrapTooltip.propTypes = {
  open: PropTypes.bool,
}
