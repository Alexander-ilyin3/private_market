import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Paper,
  Grid,
  Typography,
  Chip,
  Button,
  TextField,
} from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'

import { productsCategoriesPath } from 'config/routes'

export default class ProductView extends Component {
  componentDidMount() {
    const { getData, match } = this.props
    const { id } = match.params
    getData(id)
  }

  render() {
    const { classes, product = {} } = this.props
    const { data = {} } = product
    const {
      barcode,
      category_name,
      image,
      name,
      price,
    } = data
    return (
      <Paper className={classes.ProductPage}>
        <Typography variant='h5'>
          {name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item sm={12} md={4}>
            <div className={classes.imageBlock}>
              <img alt='Здесь должна была быть картинка' src={image} />
            </div>
          </Grid>
          <Grid item sm={12} md={8}>
            <Grid container spacing={3} className={classes.detailItem}>
              <Grid item xs={12} sm={7}>
                <Typography>Цена:</Typography>
                <Typography variant='h4'>{price}</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography>Артикул:</Typography>
                <Typography variant='caption'>{barcode}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.detailItem}>
              <Typography> Категории: </Typography>
              <Chip
                component={Link}
                label={category_name}
                color='primary'
                to={`${productsCategoriesPath}?category=${category_name}`}
              />
            </Grid>
            <Grid item sm={12} md={8} className={classes.detailItem}>
              <Typography>Описние:</Typography>
              <Typography>Здесь когда ни будь будет описание</Typography>
            </Grid>
            <Grid container className={classes.detailItem}>
              <Grid item sm={8} xs={12}>
                <Typography><CheckCircle fontSize='large' color='primary' /> В наличии</Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <div className={classes.countContainer}>
                  <TextField
                    variant='outlined'
                    type='number'
                    InputProps={{
                      endAdornment: <Button variant='contained' color='primary' className={classes.toOrderButon}>В заказ</Button>,
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

ProductView.propTypes = {
  classes: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  product: PropTypes.object,
}

ProductView.defaultProps = {
  product: {},
}
