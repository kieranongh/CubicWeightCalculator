import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  }
}))

const CalcDisplay = props => {
  const { calcProducts = [], category = ""} = props

  console.log(`calcProducts => `, calcProducts)
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h6">Calculated Cubic Weights</Typography>
      <Typography variant="subtitle1">Category: {category}</Typography>
      <List disablePadding>
        {calcProducts.map(product => (
          <ListItem className={classes.listItem} key={product.title}>
            <ListItemText
              primary={`${product.title}`}
            />
            <ListItemText
              primary={`Cubic Weight: ${product.cubicWeight}`}
              secondary={`( H: ${product.size.height}, W: ${product.size.width}, L: ${product.size.length} )`}
            />

          </ListItem>
        ))}
        <ListItem data-testid="total-items" className={classes.listItem}>
          <ListItemText primary="Total Weight" />
          <Typography data-testid="total-weight-value" variant="subtitle1" className={classes.total}>
            
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  )
}

export default CalcDisplay