import React          from 'react'
import Grid           from 'material-ui/Grid'
import Typography     from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import classNames     from 'classnames'

import formatMoney from '../lib/formatMoney'
import Spinner     from './Spinner'

const styles = theme => ( {
  root           : {
    backgroundColor: theme.palette.background.paper,
    padding        : 0
  },
  negativeBalance: {
    color: theme.palette.secondary.amount
  },
  caption        : {
    fontWeight   : 100,
    textTransform: 'uppercase',
    paddingBottom: theme.typography.pxToRem( 20 ) + `!important`
  }
} )

const TotalAmount = ( {transactions, classes, account} ) => {  //todo: proptypes
  let sum = 0
  if (!!transactions) {
    if (account) {
      transactions
        .filter( tr => ( tr.account.toString() === account._id.toString() ) )
        .forEach( transaction => {sum += transaction.amount} )
    } else {
      transactions.forEach( transaction => {sum += transaction.amount} )
    }
  }

  return (
    <Grid item className={classes.root} xs={12}>
      <Typography variant="display2" align='right' className={classNames( sum < 0 ? classes.negativeBalance : '' )}>
        {transactions === null ? <Spinner scale={.8} active /> : sum.formatMoney()}
      </Typography>
      <Typography className={classes.caption} variant="caption" align="right">
        {!account ? 'total balance' : 'balance'}
      </Typography>
    </Grid>
  )
}

export default withStyles( styles )( TotalAmount )
