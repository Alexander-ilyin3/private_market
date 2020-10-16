import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Check from '@material-ui/icons/Check'

const EmailConfirm = ({
  location,
  conFirmEmail,
  history,
  classes,
}) => {
  const token = location.search.slice(location.search.indexOf('=') + 1)
  const [receivedResp, setReceivedResp] = useState(false)
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    conFirmEmail(token).then((res) => {
      setReceivedResp(true)
      if (res === true) {
        setLogged(true)
        setTimeout(() => {
          history.push('/')
        }, 3000)
      }
    })
  }, [token, conFirmEmail])


  return (
    <div className={classes.root}>
      {!receivedResp && (
        <>
          <Skeleton animation='wave' height={30} width='80%' />
          <Skeleton animation='wave' height={30} width='80%' />
          <Skeleton animation='wave' height={30} width='80%' />
        </>
      )}
      {logged && (
        <>
          <Paper
            square
            className={classes.bage}
          >
            <div style={{ display: 'inline-block', padding: 5, paddingRight: 15 }}>
              <Check color='secondary' fontSize='large' />
            </div>
            <div style={{ display: 'inline-block' }}>
              <Typography
                color='secondary'
              >
                Ваш почтовый ящик подтвержден успешно.
                Через 3 секунд вы будете перенаправлены на <Link to='/' className={classes.link}>основную страницу</Link>
              </Typography>
            </div>
          </Paper>
        </>
      )}
    </div>
  )
}


EmailConfirm.propTypes = {
  location: PropTypes.object.isRequired,
  conFirmEmail: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default EmailConfirm
