import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Check } from '@material-ui/icons/'
import {
    Paper,
    Typography,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        height: '200px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bage: {
        margin: 10,
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        padding: 11,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                    <Check color='primary' fontSize='large' />
                </div>
                <div style={{ display: 'inline-block' }}>
                    <Typography
                        style={{fontWeight: '500'}}
                        color='primary'
                    >
                        Спасибо!
                    </Typography>
                    <Typography
                        color='primary'
                    >
                        После активации вашей учетной записи нашим менеджером, вам на почту придет подтверждение
                </Typography>
                </div>
            </Paper>
        </div>
    );
}

export default withStyles(styles)(AfterReg);