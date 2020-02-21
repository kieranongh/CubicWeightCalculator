import React from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'

const UrlForm = props => {
  const {
    inputUrl = "", setInputUrl,
    category = "", setCategory,
    calculateCubicWeights
  } = props

  const handleInputUrl = event => {
    setInputUrl("inputUrl", event.target.value)
  }

  const handleCategory = event => {
    setCategory("category", event.target.value)
  }

return (
  <React.Fragment>
    <Typography variant="h6">Input</Typography>
    <Grid container
      direction="column"
      spacing={2}
    >
      <Grid item xs={12}>
        <TextField
          id="url"
          label="Input URL"
          multiline
          fullWidth
          value={inputUrl}
          onChange={handleInputUrl}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="category"
          label="Category"
          fullWidth
          value={category}
          onChange={handleCategory}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container
          justify="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={calculateCubicWeights}
          >
            Calculate Cubic Weights
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
  )
}

export default UrlForm