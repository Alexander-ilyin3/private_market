import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Paper,
  Grid,
  Typography,
  Chip,
} from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import Error from '@material-ui/icons/Error'
import Cancel from '@material-ui/icons/Cancel'

import { productsPath } from 'config/routes'
import ToOrderInput from 'components/parts/FormParts/ToOrderInput'
import { addProduct } from 'services/cart/cartService'
import { checkAccessByLevel } from 'config/roles'

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
      vendor_code,
      category_name,
      image,
      name,
      price,
      individual_price,
      category_id,
      status,
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
              <Grid item xs={12} sm={7} className={classes.priceRow}>
                {checkAccessByLevel(2) && (
                  <div>
                    <Typography>Цена:</Typography>
                    <Typography variant='h4'>{individual_price}</Typography>
                  </div>
                )}
                <div>
                  <Typography>РЦЦ:</Typography>
                  <Typography variant='h4'>{price}</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography>Артикул:</Typography>
                <Typography>{vendor_code}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.detailItem}>
              <Typography> Категория: </Typography>
              <Chip
                component={Link}
                label={category_name}
                color='primary'
                to={`${productsPath}?category_id=${category_id}`}
              />
            </Grid>
            <Grid item sm={12} md={8} className={classes.detailItem}>
              <Typography>Описание:</Typography>
              <Typography>Здесь когда ни будь будет описание</Typography>
            </Grid>
            <Grid container className={classes.detailItem}>
              <Grid item sm={8} xs={12}>
                <Typography className={classes.inStock}>
                  {status === 1 && <><CheckCircle fontSize='large' color='secondary' /> В наличии</>}
                  {status === 2 && <><Error fontSize='large' className='warning' /> Заканчивается</>}
                  {status === 3 && <><Cancel fontSize='large' color='error' /> Нет в наличии</>}
                </Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <div className={classes.countContainer}>
                  <ToOrderInput buttonColor='primary' buttonContent='В заказ' onAdd={(count) => { addProduct({ count, product: data }) }} />
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
