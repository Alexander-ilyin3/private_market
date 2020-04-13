import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Check } from '@material-ui/icons/'
import {
  Paper,
  Typography,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { signInPath } from 'config/routes';


function RecoverySuccess(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper
        square
        className={classes.bage}
      >
        <div style={{ display: 'inline-block', padding: 5, paddingRight: 15 }}>
          <Check color='secondary' fontSize='large' />
        </div>
        <div style={{ display: 'inline-block' }}>
          <Typography
            style={{ fontWeight: '500' }}
            color='secondary'
          >
            Успешно!
          </Typography>
          <Typography
            color='secondary'
          >
            Инструкции для восстановления пароля были отправлены на ваш почтовый ящик
          </Typography>
        </div>
      </Paper>
      <Typography
        color='primary'
        paragraph
        variant='subtitle1'
        align='center'
      >
        <Link to={signInPath} className={classes.link}>Страница авторизации</Link>
      </Typography>
    </div>
  );
}

export default RecoverySuccess
