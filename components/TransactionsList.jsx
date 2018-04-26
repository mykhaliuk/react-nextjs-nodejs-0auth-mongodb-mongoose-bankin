import React          from 'react'
import PropTypes      from 'prop-types'
import { withStyles } from 'material-ui/styles'
import moment         from 'moment'
import Typography     from 'material-ui/Typography'

import Transaction   from './Transactions'
import ListSubheader from "material-ui/List/ListSubheader"
import List, {
  ListItem,
  ListItemText,
  ListItemIcon
}                    from "material-ui/List"

const styles = theme => ( {
  root            : {
    width          : "100%",
    backgroundColor: '#FFF',
    position       : "relative",
    overflow       : "auto",
    height         : '65vh'
  },
  heading         : {
    fontSize: theme.typography.pxToRem( 15 )
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem( 15 ),
    color   : theme.palette.text.secondary
  },
  amount          : {
    paddingRight: `${theme.typography.pxToRem( 15 )} !important`
  },
  icon            : {
    verticalAlign: 'bottom',
    height       : 20,
    width        : 20
  },
  details         : {
    padding   : theme.typography.pxToRem( 24 ) + `!important`,
    paddingTop: 0 + `!important`
  },
  column          : {
    flexBasis: '50%'
  },
  date            : {
    textAlign    : 'right !important',
    padding      : `${theme.spacing.unit}px  ${theme.spacing.unit * 4}px 0 0 `
  },
  account         : {
    textAlign: 'left !important',
    padding  : `${theme.spacing.unit}px 0 0 ${theme.spacing.unit * 4}px`
  },
  helper          : {
    borderLeft: `2px solid ${theme.palette.divider}`
  },
  note            : {
    justifyContent: 'left !important',
    paddingLeft   : theme.typography.pxToRem( 20 ) + `!important`
  },
  link            : {
    color         : theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover'     : {
      textDecoration: 'underline'
    }
  },
  listSection     : {
    paddingLeft: 0
  },
  listGroupHeading: {
    textTransform: 'uppercase',
    padding: theme.spacing.unit * .6,
    backgroundColor: theme.palette.primary.listGroupHeading
  },
  ul              : {
    backgroundColor: "inherit",
    padding        : 0
  }
} )

class TransactionsList extends React.Component {
  getAccounts = () => {
    const {accounts} = this.props
    return accounts.map( account => ( {id: account._id.toString(), name: account.name} ) )
  }

  getDate = ( date ) => {
    const today = moment( new Date() ).endOf( 'day' )
    const yesterday = moment( new Date() ).add( -1, 'days' ).endOf( 'day' )

    if (moment( date ).add( 1, 'days' ).endOf( 'day' ) <= yesterday) return moment( date ).format( 'dddd Do MMM YYYY' )
    if (moment( date ).endOf( 'day' ) <= yesterday) return 'Yesterday'
    if (moment( date ).endOf( 'day' ) <= today) return 'Today'
    return moment( date ).format( 'Do MMM YYYY' )
  }

  render() {
    const {classes, transactions, account} = this.props
    let currentDate
    const filteredTransactions = !!transactions && !!account
      ? transactions.filter( tr => ( tr.account.toString() === account._id.toString() ) )
      : transactions

    return (
      !!filteredTransactions
        ? <List className={classes.root} subheader={<li />} dense={true}>
          {filteredTransactions.map( transaction => {
              if (transaction.creationDate !== currentDate) {
                currentDate = transaction.creationDate
                return ( <li key={transaction._id || transaction.name}>
                  <ul className={classes.listSection}>
                    <ListSubheader className={classes.listGroupHeading}>
                      <Typography variant="caption">{this.getDate( transaction.creationDate )}</Typography>
                    </ListSubheader>
                    {filteredTransactions
                      .filter( item => item.creationDate === currentDate )
                      .map( transaction => <Transaction key={`tr-${transaction._id || transaction.name}`} transaction={transaction} accounts={this.getAccounts()} /> )}
                  </ul>
                </li> )
              }
              return null
            }
          )}
        </List>
        : null
    )
  }
}

TransactionsList.propTypes = {
  classes     : PropTypes.object.isRequired,
  transactions: PropTypes.array,
  account     : PropTypes.object
}

export default withStyles( styles )( TransactionsList )
