import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Check } from '@material-ui/icons/'
import {
    Paper,
    Typography,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
        height: '200px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    bage: {
        margin: 10,
        marginBottom: 30,
        borderLeft: `4px solid ${theme.palette.secondary.main}`,
        padding: 11,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        textDecoration: 'none',
        '&:visited': {
            color: theme.palette.primary.main,
        }
    }
});

function AfterReg(props) {
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
                <Link to='/' className={classes.link}>Страница авторизации</Link>
            </Typography>
        </div>
    );
}

export default withStyles(styles)(AfterReg);