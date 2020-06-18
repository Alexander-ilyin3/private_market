/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import PropTypes, { object, string } from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MinimalTabs from 'components/parts/tabs/MinimalTabs'
import MinimalTab from 'components/parts/tabs/MinimalTab'
import Avatar from '@material-ui/core//Avatar'
import RoomOutlined from '@material-ui/icons/RoomOutlined'
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined'
import CardTravelOutlinedIcon from '@material-ui/icons/CardTravelOutlined'
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined'

import UserEdit from './UserEdit'
import RenderManagers from './RenderManagers'

const managers = [
  {
    photo: 'https://adminca.com.ua/assets/img/users/u6.jpg',
    name: 'Игорь',
    status: 0,
    description: 'Lorem Ipsum is simply dummy',
  },
  {
    photo: 'https://adminca.com.ua/assets/img/users/u11.jpg',
    name: 'Василий',
    status: 1,
    description: 'Lorem Ipsum is simply dummy',
  },
  {
    photo: 'https://adminca.com.ua/assets/img/users/u10.jpg',
    name: 'София',
    status: 0,
    description: 'Lorem Ipsum is simply dummy',
  },
  {
    photo: 'https://adminca.com.ua/assets/img/users/u2.jpg',
    name: 'Катерина',
    status: 0,
    description: 'Lorem Ipsum is simply dummy',
  },
  {
    photo: 'https://adminca.com.ua/assets/img/users/u5.jpg',
    name: 'Михаил',
    status: 1,
    description: 'Lorem Ipsum is simply dummy',
  },
]

const detailsLabels = {
  customerName: 'Имя',
  customerLastname: 'Фамилия',
  customerPosition: 'Должность',
  city: 'Город',
  address: 'Адрес',
  customerWebsite: 'Сайт',
  customerPhone: 'Телефон',
  customerEmail: 'Email',
}

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

Item.defaultProps = {
  value: '',
  name: '',
}

Item.propTypes = {
  value: string,
  name: string,
}

const TabManagers = () => (
  <Paper>
    <RenderManagers managers={managers} />
  </Paper>
)

const UserView = ({ classes, customer, getProfile }) => {
  useEffect(() => {
    getProfile()
  }, [getProfile])

  const [popupOpened, setPopupOpened] = useState(false)
  const [tab, setTab] = useState(0)

  const {
    city = '',
    houseNumber = '',
    street = '',
    officeNumber = '',
    customerName,
    customerLastname,
    avatar = '',
  } = customer

  const address = []
  street && address.push(street)
  houseNumber && address.push(houseNumber)
  officeNumber && address.push(officeNumber)
  return (
    <Paper>
      {popupOpened && (
        <UserEdit
          open={popupOpened}
          onClose={() => setPopupOpened(false)}
          onOk={() => getProfile()}
          user={customer}
        />
      )}
      <div className={classes.avatarBlock}>
        <Avatar src={avatar} className={classes.avatar} />
        <div>
          <Typography variant='h5'>{customerName} {customerLastname}</Typography>
          <div className={classes.statusRow}>
            <span className={classes.statusWithIcon}><RoomOutlined />{city}</span>
            <span className={classes.statusWithIcon}><DateRangeOutlinedIcon />12.04.2018</span>
          </div>
          <div className={classes.statusRow}>
            <span className={classes.statusWithIcon}><CardTravelOutlinedIcon />Партнер</span>
            <span className={classes.statusWithIcon}><GradeOutlinedIcon />Статус Vip</span>
          </div>
        </div>
      </div>
      <div>
        <MinimalTabs value={tab} onChange={(_e, tab) => setTab(tab)}>
          <MinimalTab label='ОБЩЕЕ' />
          <MinimalTab label='МЕНЕДЖЕРЫ' />
        </MinimalTabs>
      </div>
      {tab === 0 && (
        <Grid container spacing={4} style={{ padding: 16 }}>
          <Grid item sm={12} md={12} lg={6}>
            <Paper elevation={1}>
              <div className='padded'>
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
                    onClick={() => setPopupOpened(true)}
                    size='small'
                    style={{ height: 31, padding: '6px 16px' }}
                  >
                    Изменить
                  </Button>
                </div>
                {Object.keys(detailsLabels).map(key => (
                  <Item
                    key={key}
                    name={detailsLabels[key]}
                    value={(key === 'address') ? address.join(', ') : customer[key]}
                  />
                ))}
              </div>
            </Paper>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Paper elevation={1}>
              <div className='padded'>
                <Typography
                  component='div'
                  variant='h6'
                >
                  МЕНЕДЖЕРЫ
                </Typography>
                <div>
                  <RenderManagers managers={managers} />
                </div>
              </div>
            </Paper>
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

UserView.defaultProps = {
  customer: {},
}

UserView.propTypes = {
  classes: object.isRequired,
  customer: object,
  getProfile: PropTypes.func.isRequired,
}

export default UserView
