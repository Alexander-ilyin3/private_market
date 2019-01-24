import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccountCircleIcon from '@material-ui/icons/PersonOutlineOutlined';
import MaskedInput from 'react-text-mask';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';

import {apiBaseURL} from '../../config';

function MaskedPhone(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['+', '3', '8', '(', '0', /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

const styles = theme => ({
    signup: {
        maxWidth: 450,
        margin: '100px auto 50px',
        minHeight: 200,
        '&>*': {
            height: '100%',
        }
    },
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

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                isValid: false,
                errMsg: 'слишком короткое имя',
            },
            phone: {
                value: '+38(0  )   -  -  ',
                isValid: false,
                errMsg: 'введите корректный номер',
            },
            url: {
                value: '',
                isValid: false,
                errMsg: 'некорректный url',
            },
            email: {
                value: '',
                isValid: false,
                errMsg: 'Некорректный email',
            },
            password: {
                value: '',
                isValid: false,
                errMsg: 'Пароль не соответствует требованиям',
            },
            repeatPassword: {
                value: '',
                isValid: false,
                errMsg: 'Пароли не совпадают',
            },
            agree: false,
            isChecked: false,
            isValid: false,
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
            case 'name':
                valid = (value.length > 2);
                break;
            case 'phone':
                console.log(value)
                valid = !!value.match(/\+38\(0\d\d\)\d\d\d-\d\d-\d\d/);
                console.log(valid)
                break;
            case 'url':
                valid = !!value.match(/\w+\.\w{2}/);
                break;
            case 'email':
                valid = !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                errMsg = 'Некорректный email';
                break;
            case 'password':
                valid = !!value.match(/(?=^.{8,}$)^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/);
                break;
            case 'repeatPassword':
                valid = (value === this.state.password.value);
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
            currentState.isValid = (
                currentState.name.isValid &&
                currentState.phone.isValid &&
                currentState.url.isValid &&
                currentState.email.isValid &&
                currentState.password.isValid &&
                currentState.repeatPassword.isValid &&
                currentState.agree
            );
            return currentState;
        });
        console.log(this.state.isValid)
    }

    handleSign = (e) => {
        const { name, phone, url, email, password, isValid } = this.state;

        e.preventDefault();
        this.setState({ isChecked: true });
        this.validateForm();
        if (this.state.isValid) {  // u can't declare "isValid" in top of this function, because function "validateForm" updating "isValid" async and at the moment of spreading state in top of function, it's value can ba different
            // this.setState(state => {
            //     console.log(123)
            //     state.email.errMsg = 'Данный емейл уже используется';
            //     state.email.isValid = false;
            //     state.isValid = false;
            //     return state;
            // });
            // axios.post(`${apiBaseURL}signup`).then(resp => {
            //     if (/*resp.data.msg == 'this email alredy used'*/ true) {
            //         this.setState(state => {
            //             state.email.errMsg = 'Данный емейл уже используется';
            //             state.email.isValid = false;
            //             return state;
            //         });
            //     }
            // });
            
        }
        return false;
    }

    render() {
        const { classes } = this.props;
        const { isValid, isChecked, name, url, phone, email, password, repeatPassword, agree } = this.state;
        return (
            <div>
                <Paper elevation={5} square className={classes.signup}>
                    <div className={classes.head}>
                        <Avatar className={classes.avatar} component='span' children={
                            <AccountCircleIcon />
                        } />
                    </div>
                    <Card className={classes.card}>
                        <form onSubmit={this.handleSign}>
                            <CardHeader
                                classes={{ title: classes.title }}
                                title="РЕГИСТРАЦИЯ"
                            />
                            <CardContent>
                                <TextField
                                    error={isChecked && !isValid && name.errMsg && !name.isValid}
                                    value={name.value}
                                    onInput={(event) => { this.handleInput('name', event.target.value) }}
                                    variant='outlined'
                                    fullWidth
                                    margin="normal"
                                    placeholder='Имя'
                                    label='Имя'
                                    helperText={isChecked && !isValid && !name.isValid && name.errMsg}
                                />
                                <TextField
                                    error={isChecked && !isValid && phone.errMsg && !phone.isValid}
                                    value={phone.value}
                                    onInput={(event) => { this.handleInput('phone', event.target.value) }}
                                    variant='outlined'
                                    fullWidth
                                    margin="normal"
                                    placeholder='Телефон'
                                    label='Телефон'
                                    InputProps={{
                                        inputComponent: MaskedPhone,
                                    }}
                                    helperText="Номер в формате +38(0xx)xxx-xx-xx"
                                />
                                <TextField
                                    error={isChecked && !isValid && url.errMsg && !url.isValid}
                                    value={url.value}
                                    onInput={(event) => { this.handleInput('url', event.target.value) }}
                                    variant='outlined'
                                    fullWidth
                                    margin="normal"
                                    placeholder='Сайт'
                                    label='Сайт'
                                    helperText={isChecked && !isValid && !url.isValid && url.errMsg}
                                />
                                <TextField
                                    error={isChecked && !isValid && email.errMsg && !email.isValid}
                                    value={email.value}
                                    onInput={(event) => { this.handleInput('email', event.target.value) }}
                                    variant='outlined'
                                    fullWidth
                                    margin="normal"
                                    placeholder='Емел'
                                    label='Емейл'
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
                                    placeholder='Пароль'
                                    label='Пароль'
                                    helperText={isChecked && !isValid && !password.isValid && password.errMsg}
                                />
                                <TextField
                                    error={isChecked && !isValid && repeatPassword.errMsg && !repeatPassword.isValid}
                                    value={repeatPassword.value}
                                    onInput={(event) => { this.handleInput('repeatPassword', event.target.value) }}
                                    variant='outlined'
                                    fullWidth
                                    margin="normal"
                                    type='password'
                                    placeholder='Подтверждение пароля'
                                    label='Подтверждение пароля'
                                    helperText={isChecked && !isValid && !repeatPassword.isValid && repeatPassword.errMsg}
                                />
                                <FormControlLabel
                                    checked={agree}
                                    control={
                                        <Checkbox
                                            color='primary'
                                            onChange={(event) => {
                                                this.setState({ agree: event.target.checked });
                                                this.validateForm();
                                            }}
                                        />
                                    }
                                    label='Я принимаю условия сотрудничества и даю согласие на оработку моих персональных данных'
                                />
                                {(isChecked && !isValid && !agree) && <FormHelperText margin='dense' error>Вы должны принять условия</FormHelperText>}
                                <Button
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    type='submit'
                                    style={{ marginTop: 20 }}
                                >
                                    Зарегистрироваться
                                </Button>
                            </CardContent>
                        </form>
                    </Card>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(SignUp);
