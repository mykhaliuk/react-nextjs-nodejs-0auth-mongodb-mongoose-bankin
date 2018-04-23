import React          from 'react'
import PropTypes      from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText
}                     from "material-ui/List"
import Collapse       from "material-ui/transitions/Collapse"
import ExpandLess     from "material-ui-icons/ExpandMore"
import ExpandMore     from "material-ui-icons/ChevronRight"
import Tooltip        from 'material-ui/Tooltip'

import classNames from 'classnames'
import Typography from 'material-ui/Typography'
import Divider    from 'material-ui/Divider'
import Grid       from 'material-ui/Grid'
import moment     from 'moment'

import getIcon from '../lib/getIcon'

const styles = theme => ( {
  heading       : {
    fontSize  : theme.typography.pxToRem( 16 ),
    fontWeight: 300
  },
  category      : {
    fontSize: theme.typography.pxToRem( 13 )
    // paddingLeft: theme.typography.pxToRem(15)
  },
  amount        : {
    fontWeight: 400,
    fontSize  : theme.typography.pxToRem( 16 ),
    // paddingRight: `${theme.typography.pxToRem(0)} !important`,
    margin    : '10px 0 0 0 '
  },
  amountPositive: {
    color: theme.palette.primary.amount + '!important'
  },
  details       : {
    padding   : theme.typography.pxToRem( 24 ) + `!important`,
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
    flexBasis     : '100%',
    justifyContent: 'left !important',
    paddingLeft   : theme.typography.pxToRem( 20 ) + `!important`,
    padding       : `${theme.typography.pxToRem( 20 )} 0 ${theme.typography.pxToRem( 10 )} 0`
  },
  listItem      : {
    padding: '8px 0 '
  },
  subListItem   : {
    padding: '0 0 8px 0 '
  },
  divider       : {
    margin: '0 20px'
  },
  noPadding     : {
    padding: '0 !important'
  },
  icon          : {
    // color : 'red',
    fontSize: '1rem',
    margin  : '4px 0 0 10px !important'
  },
  iconWrapper   : {
    width       : '2rem',
    height      : '2rem',
    borderRadius: '50%'
  }
} )

class Transactions extends React.Component {
  state = {open: false}

  handleClick = () => {
    this.setState( {open: !this.state.open} )
  }

  getBankAccountName = id => {
    const {accounts} = this.props

    return accounts.filter( account => account.id === id )[ 0 ].name
  }

  render() {
    const {accounts, handleChange, expanded, transaction, classes} = this.props

    return (
      <div>
        <ListItem button className={classes.listItem} onClick={this.handleClick}>
          <div className={classes.iconWrapper} style={{backgroundColor: '#FFF'}}>
            <ListItemIcon className={classes.icon} style={{color: transaction.category.color}}>
              {getIcon( transaction.category )}
            </ListItemIcon>
          </div>
          <ListItemText inset primary={
            <Grid container justify='space-between'>
              <Grid item xs={7} sm={9}>
                <Typography noWrap className={classes.heading}>{transaction.name}</Typography>
                <Typography variant="caption" className={classes.category}>{transaction.category.name}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classNames( classes.amount, transaction.amount > 0 ? classes.amountPositive : '' )}>{transaction.amount.formatMoney()}</Typography>
              </Grid>
            </Grid>

          } />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state.open}
          timeout={300}
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItem button className={classes.subListItem}>
              <ListItemText className={classes.noPadding} inset primary={
                <Grid container>
                  <Typography variant="caption" className={classNames( classes.column, classes.date )} xs={3}>
                    {transaction.amount < 0 ? 'Debited' : 'Credited'} on<br />
                    <strong>{moment( transaction.creationDate ).format( 'Do MMM YYYY' )}</strong>
                  </Typography>
                  <Typography variant="caption" className={classNames( classes.account, classes.helper )}>
                    On account <br />
                    <strong>{this.getBankAccountName( transaction.account )}</strong>
                  </Typography>
                  <Typography noWrap variant="caption" className={classes.note}>
                    {transaction.note ? transaction.note : `Why wouldn't you type something here?`}
                  </Typography>
                </Grid>
              } />
            </ListItem>
          </List>
        </Collapse>
        <Divider className={classes.divider} light />
      </div>
    )
  }
}

Transactions.propTypes = {
  transaction: PropTypes.object.isRequired,
  expanded   : PropTypes.string
}

export default withStyles( styles )( Transactions )

