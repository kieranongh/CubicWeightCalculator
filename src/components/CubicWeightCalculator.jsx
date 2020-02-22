import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import UrlForm from './UrlForm'
import CalcDisplay from './CalcDisplay'
import { fetchProducts } from '../utils'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2)
  },
}))

const INITIAL_BASE = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com"
const INITIAL_RELATIVE_URL = "/api/products/1"
const INITIAL_CATEGORY = "Air Conditioners"

const CubicWeightCalculator = () => {
  const classes = useStyles()
  const [baseUrl, setBaseUrl] = React.useState(INITIAL_BASE)
  const [relativeUrl, setRelativeUrl] = React.useState(INITIAL_RELATIVE_URL)
  const [category, setCategory] = React.useState(INITIAL_CATEGORY)
  const [calcProducts, setCalcProducts] = React.useState([])
  const [error, setError] = React.useState(null)

  const calculateCubicWeights = async () => {
    try {
      const products = await fetchProducts(baseUrl, relativeUrl, category)
      setCalcProducts(products)
    }
    catch(error) {
      console.log(error)
      setError(error.message)
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.layout}>
        <div className={classes.paper} style={{ textAlign: "center" }}>
          <Typography variant="h4">Cubic Weight Calculator</Typography>
        </div>
        <Grid container justify="center" spacing={3}>
          {error && (
            <Grid item xs={12}>
              <Paper className={classes.paper} style={{ textAlign: "center" }}>
                <Typography color="error">{error}</Typography>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <UrlForm
                baseUrl={baseUrl}
                setBaseUrl={setBaseUrl}
                relativeUrl={relativeUrl}
                setRelativeUrl={setRelativeUrl}
                category={category}
                setCategory={setCategory}
                calculateCubicWeights={calculateCubicWeights}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <CalcDisplay
                category={category}
                calcProducts={calcProducts}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default CubicWeightCalculator