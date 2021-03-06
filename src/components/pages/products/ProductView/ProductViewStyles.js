export const styles = _theme => ({
  ProductPage: {
    padding: 20,
  },
  imageBlock: {

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    '& img': {
      maxWidth: '100%',
    },
  },
  detailItem: {
    marginTop: 22,
  },
  countContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inStock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
