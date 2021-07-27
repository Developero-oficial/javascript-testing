import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import {Link} from 'react-router-dom'

import {Products} from '../../components/products'
import {ErrorMessage} from '../../components/errorMessage'
import {Layout} from '../../components/layout'
import {getProductsService} from '../../services/products-services'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  signoutButton: {
    marginLeft: 36,
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
}))

export const DashboardPage = () => {
  const classes = useStyles()
  const [products, setProducts] = React.useState([])
  const [isFetchingProducts, setIsFetchingProducts] = React.useState(true)
  const [isErrorFetchingProducts, setIsErrorFetchingProducts] =
    React.useState(false)

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getProductsService()

        const {products} = response.data

        setProducts(products)
        setIsErrorFetchingProducts(false)
      } catch (e) {
        console.log(e)
        setIsErrorFetchingProducts(true)
      } finally {
        setIsFetchingProducts(false)
      }
    }
    fetchOrders()
  }, [])

  const isErrorOnLoadProducts = !isFetchingProducts && isErrorFetchingProducts
  const isSuccessOnLoadProducts =
    !isFetchingProducts && !isErrorFetchingProducts
  const isEmptyOnLoadProducts =
    !isFetchingProducts && !isErrorFetchingProducts && products.length === 0

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/add-product"
            >
              Add new
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {isFetchingProducts && <CircularProgress data-testid="loading" />}
            {isErrorOnLoadProducts && (
              <ErrorMessage text="There was an error" />
            )}
            {isEmptyOnLoadProducts && <p>Empty</p>}
            {isSuccessOnLoadProducts && <Products data={products} />}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}
