import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/PersonOutlineOutlined';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import {apiBaseURL} from '../../config';

const styles = theme => ({
    login: {
        maxWidth: 900,
        margin: '100px auto 50px',
        minHeight: 200,
        '&>*': {
            height: '100%',
        }
    },
    noAcc: {
        backgroundColor: theme.palette.primary.main,
        padding: '1.5rem 3rem',
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    // entrance: {
    //     height: '100%',
    // },
    head: {
        position: 'relative',
    },
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        margin: 'auto',
        position: 'relative',
        top: '-30px',
        borderRadius: '50%',
        boxShadow: theme.shadows[5],
        '&>*': {
            fontSize: 35,
        }
    },
    card: {
        borderRadius: 0,
        boxShadow: theme.shadows[0],
        padding: 25,
    },
    title: {
        textAlign: 'center',
    }
});

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                isValid: false,
                errMsg: 'Некорректный email',
            },
            password: {
                value: '',
                isValid: false,
                errMsg: 'Слишком короткий пароль',
            },
            remember: false,
            isValid: false,
            isChecked: false,
        }
    }
    handleInput = (field, value) => {
        this.setState(state => {
            state[field].value = value;

            return state;
        });
        this.validateField(field, value);
        this.validateForm();
    }
    validateField = (field, value) => {
        let valid = false;
        let errMsg = '';
        switch (field) {
            case 'email':
                valid = !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                errMsg = 'Некорректный email';
                break;
            case 'password':
                valid = !!value.match(/\s*([\w]{6,})\s*/);
                errMsg = 'Слишком короткий пароль';
                break;
        }
        this.setState((currentState) => {
            currentState[field].isValid = valid;
            errMsg && (currentState[field].errMsg = errMsg);
            return currentState;
        });
    }
    validateForm = () => {
        this.setState(currentState => {
            currentState.isValid = (currentState.email.isValid && currentState.password.isValid);
            return currentState;
        });
    }
    handleSign = (e) => {
        const { email, password, remember } = this.state;
        e.preventDefault();
        this.setState({ isChecked: true });
        this.validateForm();
        if (this.state.isValid) {  // u can't declare "isValid" in top of this function, because function "validateForm" updating "isValid" async and at the moment of spreading state in top of function, it's value can ba different
            axios.post(apiBaseURL + 'login', {
                email: email,
                password: password,
                remember: remember,
            }).then(response => {
                return response;
            }).then(json => {
                console.log(json)
                if ('OK' === json.statusText) {
                    let userData = {
                        id: json.data.id,
                        token: json.data.accessToken,
                        expireAt: json.data.expires_at,
                        email: email.value,
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in reducer

                    this.props.onLogin(appState);
                    this.props.history.push('/kudato');
                }
            }).catch(error => {

                if (error.response) {
                    console.log(error.response, 222)
                    const msg = error.response.statusText;
                    this.setState(currentState => {
                        currentState.email.isValid = false;
                        currentState.email.errMsg = msg;
                        currentState.isValid = false;
                        currentState.password.isValid = false;
                        currentState.password.errMsg = msg;
                        currentState.isValid = false;
                        return currentState;
                    });
                }
            });
        }
    }
    render() {
        const { classes } = this.props;
        const { email, password, remember, isValid, isChecked } = this.state;
        return (

            <div>
                <Paper elevation={5} square className={classes.login}>
                    <Grid container>
                        <Grid item md={6} sm={12} className={classes.entrance}>
                            <div className={classes.head}>
                                <Avatar className={classes.avatar} component='span' children={
                                    <AccountCircleIcon />
                                } />
                            </div>
                            <Card className={classes.card}>
                                <form onSubmit={this.handleSign}>
                                    <CardHeader
                                        classes={{ title: classes.title }}
                                        title="ВХОД"
                                    />
                                    <CardContent>
                                        <TextField
                                            error={isChecked && !isValid && email.errMsg && !email.isValid}
                                            value={email.value}
                                            onInput={(event) => { this.handleInput('email', event.target.value) }}
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            type='email'
                                            placeholder='Email'
                                            helperText={isChecked && !isValid && !email.isValid && email.errMsg}
                                        />
                                        <TextField
                                            error={isChecked && !isValid && password.errMsg && !password.isValid}
                                            value={password.value}
                                            onInput={(event) => { this.handleInput('password', event.target.value) }}
                                            variant='outlined'
                                            fullWidth
                                            margin="normal"
                                            type='password'
                                            placeholder='Password'
                                            helperText={isChecked && !isValid && !password.isValid && password.errMsg}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color='primary'
                                                        checked={remember}
                                                        onChange={(event) => this.setState({ remember: event.target.checked })}
                                                    />
                                                }
                                                label="Запомнить"
                                            />
                                            <Link to='forgotpwd' style={{ textDecoration: 'none' }}>
                                                <Typography
                                                    color='primary'
                                                    variant='caption'
                                                >Забыли пароль?
                                            </Typography>
                                            </Link>
                                        </div>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            fullWidth
                                            type='submit'
                                        >
                                            Войти
                                        </Button>
                                    </CardContent>
                                </form>
                            </Card>
                        </Grid>
                        <Grid item md={6} sm={12} className={classes.noAcc}>
                            <div>
                                <Typography
                                    variant='h4'
                                    color='inherit'
                                    paragraph={true}
                                    style={{ marginBottom: '3rem' }}
                                > Нет аккаута? </Typography>
                                <Typography
                                    variant='inherit'
                                    color='inherit'
                                    paragraph={true}
                                >
                                    Зарегистриуйтесь и получите следующие преимущества.
                                    <br />
                                    Minim dolor in amet nulla laboris enim dolore.
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='inherit'
                                    paragraph={true}
                                    noWrap={true}
                                >
                                    <Typography
                                        color='secondary'
                                        paragraph={false}
                                        component='span'
                                        style={{ display: 'inline-block', verticalAlign: 'middle' }}
                                    >
                                        <CheckIcon />
                                    </Typography>
                                    Lorem Ipsum dolar set.
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='inherit'
                                    paragraph={true}
                                    noWrap={true}
                                >
                                    <Typography
                                        color='secondary'
                                        paragraph={false}
                                        component='span'
                                        style={{ display: 'inline-block', verticalAlign: 'middle' }}
                                    >
                                        <CheckIcon />
                                    </Typography>
                                    Lorem Ipsum dolar set.
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='inherit'
                                    paragraph={true}
                                    noWrap={true}
                                >
                                    <Typography
                                        color='secondary'
                                        paragraph={false}
                                        component='span'
                                        style={{ display: 'inline-block', verticalAlign: 'middle' }}
                                    >
                                        <CheckIcon />
                                    </Typography>
                                    Lorem Ipsum dolar set.
                                </Typography>
                                <Link to='register' style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant='outlined'
                                        color='secondary'
                                    >Регистрация</Button>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </div>

        );
    }
}

export default connect(
    state => ({
        loginData: state.loginData,
    }),
    dispath => ({
        onLogin: (loginData) => {
            dispath({ type: 'LOG_IN', payload: loginData });
            // getData({ url: /*url to fetch user data*/null }).then(response => {
            //     let userData = response.data;
            //     if(loginData.user.role === 'courier') userData = response.data.response;

            //     userData.avatar = userData.pictureUrl;
            //     dispath({ type: 'USER_DATA', payload: userData});
            // });
        }
    }),
)(withRouter(withStyles(styles)(SignIn)));