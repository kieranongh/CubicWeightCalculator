import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
    border: 1,
    display: "flex",
    flexDirection: "column",
  },
  total: {
    fontWeight: '700',
  }
}))

const CalcDisplay = props => {
  const { calcProducts = [], category = ""} = props

  const classes = useStyles()
  
  return (
    <React.Fragment>
      <Typography variant="h6">Calculated Cubic Weights</Typography>
      {calcProducts.length > 0 && ( 
        <>
          <Typography variant="subtitle1">Category: {category}</Typography>
          <List disablePadding>
            {calcProducts.map(product => (
              <React.Fragment key={product.uuid}>
              <Divider />
              <ListItem className={classes.listItem} alignItems="flex-start">
                <ListItemText
                  primary={`${product.title}`}
                  primaryTypographyProps={{
                    color: "primary",
                    variant: "subtitle1"
                  }}
                />
                <ListItemText
                  primary={`Cubic Weight: ${product.cubicWeight}`}
                  primaryTypographyProps={{
                    variant: "subtitle2"
                  }}
                  secondary={`( H: ${product.size.height}, W: ${product.size.width}, L: ${product.size.length} )`}
                />

              </ListItem>
              </React.Fragment>
            ))}
            <ListItem data-testid="total-items" className={classes.listItem}>
              <ListItemText primary="Total Weight" />
              <Typography data-testid="total-weight-value" variant="subtitle1" className={classes.total}>
                
              </Typography>
            </ListItem>
          </List>
        </>
      )}
    </React.Fragment>
  )
}

export default CalcDisplay