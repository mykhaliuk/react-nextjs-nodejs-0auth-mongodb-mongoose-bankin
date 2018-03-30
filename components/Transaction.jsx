import React          from 'react'
import PropTypes      from 'prop-types'
import {withStyles}   from 'material-ui/styles'
import classNames     from 'classnames'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions
}                     from 'material-ui/ExpansionPanel'
import Typography     from 'material-ui/Typography'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Divider        from 'material-ui/Divider'
import Grid           from 'material-ui/Grid'
import moment         from 'moment'

import formatMoney from '../lib/formatMoney'

const styles = theme => ({
  heading       : {
    fontSize  : theme.typography.pxToRem(16),
    fontWeight: 300
  },
  category      : {
    fontSize: theme.typography.pxToRem(13)
    // paddingLeft: theme.typography.pxToRem(15)
  },
  amount        : {
    fontWeight  : 400,
    fontSize    : theme.typography.pxToRem(16),
    paddingRight: `${theme.typography.pxToRem(15)} !important`
  },
  amountPositive: {
    color: theme.palette.primary.amount + '!important'
  },
  details       : {
    padding   : theme.typography.pxToRem(24) + `!important`,
    paddingTop: 0 + `!important`
  },
  column        : {
    flexBasis: '50%'
  },
  date          : {
    textAlign: 'right !important',
    padding  : `${theme.spacing.unit}px  ${theme.spacing.unit * 4}px 0 0 `
  },
  account       : {
    textAlign: 'left !important',
    padding  : `${theme.spacing.unit}px 0 0 ${theme.spacing.unit * 4}px`
  },
  helper        : {
    borderLeft: `2px solid ${theme.palette.divider}`
  },
  note          : {
    justifyContent: 'left !important',
    paddingLeft   : theme.typography.pxToRem(20) + `!important`
  },
  dateSplitter  : {

  }
})

class Transaction extends React.Component {
  render() {
    const {handleChange, expanded, transaction, classes} = this.props

    return (
      <ExpansionPanel expanded={expanded === transaction._id.toString()} onChange={handleChange(transaction._id.toString())}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>{transaction.name}</Typography>
            <Typography variant="caption" className={classes.category}>Category: {transaction.category}</Typography>
          </div>
          <Grid container className={classes.column} style={{padding: 0}}
                alignItems='center'
                direction='row'
                justify='flex-end'
          >
            <Typography className={classNames(classes.amount, transaction.amount > 0 ? classes.amountPositive : '')}>{transaction.amount.formatMoney()}</Typography>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography variant="caption" className={classNames(classes.column, classes.date)}>
            {transaction.amount < 0 ? 'Debited' : 'Credited'} on<br />
            <strong>{moment(transaction.creationDate).format('Do MMM YYYY')}</strong>
          </Typography>
          <Typography variant="caption" className={classNames(classes.column, classes.account, classes.helper)}>
            On account <br />
            <strong>{transaction.account.name}</strong>
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions className={classes.note}>
          <Typography variant="caption">
            {transaction.note ? transaction.note : `Why wouldn't you type something here?`}
          </Typography>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}

Transaction.propTypes = {
  transaction : PropTypes.object.isRequired,
  expanded    : PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

export default withStyles(styles)(Transaction)

