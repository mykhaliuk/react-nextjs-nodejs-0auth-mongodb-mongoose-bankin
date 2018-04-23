import React, {
  Fragment,
  PureComponent
}                              from 'react'
import PropTypes               from 'prop-types'
import { DatePicker }          from 'material-ui-pickers'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import MomentUtils             from 'material-ui-pickers/utils/moment-utils'
import moment                  from 'moment'
import { withStyles }          from 'material-ui/styles'
import PermContactCalendar     from 'material-ui-icons/PermContactCalendar'
import KeyboardArrowLeft       from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight      from 'material-ui-icons/KeyboardArrowRight'

const styles = theme => ( {
  root     : {
    marginTop     : theme.spacing.unit * 2,
    display       : 'flex',
    justifyContent: 'stretch',
    alignItems    : 'stretch'
  },
  icon     : {
    color: theme.palette.primary + '!important'
  },
  iconHover: {
    margin   : theme.spacing.unit * 2,
    '&:hover': {
      color: theme.palette.secondary.light
    }
  }
} )

export class InputDateTransaction extends PureComponent {
  state = {
    selectedDate: moment()
  }

  handleDateChange = date => {
    const {onChange} = this.props
    const e = {target: {value: date}}

    this.setState( {selectedDate: date} )
    onChange( 'creationDate' )( e )

  }

  render() {
    const {classes} = this.props
    const {selectedDate} = this.state
    const LOCAL = 'en'

    moment.locale( LOCAL )

    return (
      <MuiPickersUtilsProvider utils={MomentUtils} moment={moment} locale={LOCAL}>
        <DatePicker
          className={classes.root}
          animateYearScrolling
          autoOk
          format="Do MMM YYYY"
          label="Pick the date"
          value={selectedDate}
          onChange={this.handleDateChange}
          keyboardIcon={<PermContactCalendar />}
          leftArrowIcon={<KeyboardArrowLeft />}
          rightArrowIcon={<KeyboardArrowRight />}
        />
      </MuiPickersUtilsProvider>
    )
  }
}

InputDateTransaction.propTypes = {
  onChange: PropTypes.func.isRequired,
  isError : PropTypes.bool
}

export default withStyles( styles )( InputDateTransaction )