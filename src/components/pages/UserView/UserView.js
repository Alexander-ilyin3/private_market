/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import { object } from 'prop-types'
import {
  Paper,
  // Avatar,
  // Card,
  // CardHeader,
  // CardContent,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Grid,
  Button,

} from '@material-ui/core'

import UserEdit from './UserEdit'

const Item = (props) => {
  const { value, name } = props
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant='subtitle1'>
          {`${name}:`}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {value}
      </Grid>
    </Grid>
  )
}

const TabManagers = () => (
  <Grid container spacing={8}>
    <Grid item sm={12} md={12}>
      <Paper />
    </Grid>
  </Grid>
)

class UserView extends Component {
  static propTypes = {
    classes: object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 0,
      openPopup: false,
    }
  }

  componentDidMount() {
    const { getProfile } = this.props
    getProfile()
  }

  // handleFetchUser = () => {
  //   getProfile().then((userData) => {
  //     this.setState({ customer: userData })
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  handlePopupOpen = () => {
    this.setState({ openPopup: true })
  }

  handlePopupClose = () => {
    this.setState({ openPopup: false })
  }

  handlePopupOk = () => {
    const { getProfile } = this.props
    getProfile()
  }

  handleChangeTab = (event, tab) => {
    this.setState({ tab })
  }

  render() {
    const { classes, customer } = this.props
    const { tab, openPopup } = this.state
    const {
      city = '',
      houseNumber = '',
      street = '',
      officeNumber = '',
      customerPhone = '',
      customerPosition = '',
      customerWebsite = '',
      customerEmail = '',
      customerLastname = '',
      customerName = '',
    } = customer

    const address = []
    city && address.push(city)
    street && address.push(street)
    houseNumber && address.push(houseNumber)
    officeNumber && address.push(officeNumber)
    return (
      <Paper>
        {openPopup && (
        <UserEdit
          open={openPopup}
          onClose={this.handlePopupClose}
          onOk={this.handlePopupOk}
          user={customer}
        />
        )}
        <AppBar
          className={classes.tabsBar}
          color='primary'
          position='static'
        >
          <Tabs value={tab} onChange={this.handleChangeTab}>
            <Tab label='ОБЩЕЕ' />
            <Tab label='МЕНЕДЖЕРЫ' />
          </Tabs>
        </AppBar>
        {tab === 0 && (
          <Grid container spacing={4} style={{ padding: 16 }}>
            <Grid item sm={12} md={12} lg={6}>
              <div className={classes.headreWuthBtn}>
                <Typography
                  component='div'
                  variant='h6'
                  paragraph
                >
                  ОСНОВНАЯ ИНФОРМАЦИЯ
                </Typography>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={this.handlePopupOpen}
                  size='small'
                  style={{ height: 31, padding: '6px 16px' }}
                >
                  Изменить
                </Button>
              </div>
              {customerName && (
              <Item
                name='Имя'
                value={customerName}
              />
              )}
              {customerLastname && (
              <Item
                name='Фамилия'
                value={customerLastname}
              />
              )}
              {customerPosition && (
              <Item
                name='Должность'
                value={customerPosition}
              />
              )}

              {address.join(', ') && (
              <Item
                name='Адрес'
                value={address.join(', ')}
              />
              )}
              {customerWebsite && (
              <Item
                name='Сайт'
                value={customerWebsite}
              />
              )}
              {customerPhone ? (
                <Item
                  name='Телефон'
                  value={customerPhone}
                />
              ) : null}
              {customerEmail && (
              <Item
                name='Email'
                value={customerEmail}
              />
              )}
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Typography
                component='div'
                variant='h6'
              >
                МЕНЕДЖЕРЫ
              </Typography>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Paper />
            </Grid>
          </Grid>
        )}
        {tab === 1 && <TabManagers />}
        {/* </CardContent>

            </Card> */}
      </Paper>
    )
  }
}

export default UserView
