import React              from 'react'
import Grid               from 'material-ui/Grid'
import Typography         from 'material-ui/Typography'
import {withStyles}       from 'material-ui/styles'
import {CircularProgress} from 'material-ui/Progress'

import formatMoney from '../lib/formatMoney'

const styles = theme => ({
  root   : {
    backgroundColor: theme.palette.background.paper,
    padding        : 0 + 'important'
  },
  caption: {
    textTransform: 'uppercase',
    paddingBottom: theme.typography.pxToRem(20) + `!important`
  }
})

const TotalAmount = ({transactions, classes}) => {
  let sum = 0

  transactions && transactions.forEach(transaction => {
    sum += transaction.amount
  })

  return (
    <Grid item className={classes.root} xs={12}>
      <Typography variant="display2" align='right'>
        {transactions === null ? <CircularProgress /> : sum.formatMoney()}
      </Typography>
      <Typography className={classes.caption} variant="caption" align="right">
        total balance
      </Typography>
    </Grid>
  )
}

export default withStyles(styles)(TotalAmount)
