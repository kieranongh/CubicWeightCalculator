import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import UrlForm from './UrlForm'
// import CalcDisplay from './CalcDisplay'

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

const INITIAL_URL = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1"
const INITIAL_CATEGORY = "Air Conditioner"

const CubicWeightCalculator = () => {
  const classes = useStyles()
  const [inputUrl, setInputUrl] = React.useState(INITIAL_URL)
  const [category, setCategory] = React.useState(INITIAL_CATEGORY)
  const [calcDisplayData, setCalcDisplayData] = React.useState([])
  const [error, setError] = React.useState(null)

  const calculateCubicWeights = () => {

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
                inputUrl={inputUrl}
                setInputUrl={setInputUrl}
                category={category}
                setCategory={setCategory}
                calculateCubicWeights={calculateCubicWeights}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              {/* <CalcDisplay
                calcDisplayData={calcDisplayData}
              /> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default CubicWeightCalculator