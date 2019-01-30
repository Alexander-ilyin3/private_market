import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography,
} from '@material-ui/core';

const styles = theme => ({

});

function AfterReg(props) {
    const { classes } = props;
    return (
        <Paper>
            <Typography>
                'Регистрация завершена. На вашу почту были отправлены дальнейшие инструкции'
            </Typography>
        </Paper>
    );
}

export default withStyles(styles)(AfterReg);