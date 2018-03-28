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

const styles = theme => ({
  root            : {
    flexGrow: 1
  },
  heading         : {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color   : theme.palette.text.secondary
  },
  amount          : {
    paddingRight: `${theme.typography.pxToRem(15)} !important`
  },
  icon            : {
    verticalAlign: 'bottom',
    height       : 20,
    width        : 20
  },
  details         : {
    padding   : theme.typography.pxToRem(24) + `!important`,
    paddingTop: 0 + `!important`
  },
  column          : {
    flexBasis: '50%'
  },
  date            : {
    textAlign: 'right !important',
    padding  : `${theme.spacing.unit}px  ${theme.spacing.unit * 4}px 0 0 `
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
    paddingLeft   : theme.typography.pxToRem(20) + `!important`
  },
  link            : {
    color         : theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover'     : {
      textDecoration: 'underline'
    }
  }
})

class TransactionsList extends React.Component {
  state = {
    expanded: null
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  render() {
    const {classes} = this.props
    const {expanded} = this.state

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel0'} onChange={this.handleChange('panel0')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>Name Here</Typography>
              <Typography variant="caption">Category name goes here</Typography>
            </div>
            <Grid container className={classNames(classes.column, classes.amount)} alignItems='center' direction='row' justify='flex-end'>
              <Typography>€Amount</Typography>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Typography variant="caption" className={classNames(classes.column, classes.date)}>
              Debited on <br />
              <strong>25.03.2018</strong>
            </Typography>

            <Typography variant="caption" className={classNames(classes.column, classes.account, classes.helper)}>
              On the account <br />
              <strong>Account Name</strong>
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions className={classes.note}>
            <Typography variant="caption">
              Note Goes Here
            </Typography>
          </ExpansionPanelActions>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>Location</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>
              Barbados
            </div>
            <div className={classNames(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your destination of choice<br />
                <a href="#sub-labels-and-columns" className={classes.link}>
                  Learn more
                </a>
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

TransactionsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TransactionsList)