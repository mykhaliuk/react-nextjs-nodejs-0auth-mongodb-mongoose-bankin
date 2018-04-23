import React          from 'react'
import PropTypes      from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField      from 'material-ui/TextField'
import {
  FormGroup,
  FormControlLabel
}                     from 'material-ui/Form'
import Switch         from 'material-ui/Switch'
import notify         from '../lib/notifier'

const styles = theme => ( {
  container     : {
    display   : 'flex',
    flexWrap  : 'wrap',
    paddingTop: theme.spacing.unit * 3
  },
  textFieldInput: {
    borderRadius   : 4,
    backgroundColor: theme.palette.common.white,
    border         : '1px solid #ced4da',
    fontSize       : 16,
    padding        : '10px 12px',
    // width: 'calc(100% - 24px)',
    transition     : theme.transitions.create( [ 'border-color' ] ),
    '&:focus'      : {
      borderColor: theme.palette.primary.main
    }
  }
} )

class InputNoteTransaction extends React.Component {
  handleSwitch = e => {
    const {onSwitch, isHidden} = this.props
    onSwitch( 'hidden' )( {target: {value: !isHidden}} )
  }

  render() {
    const {classes, isHidden, onChange, value} = this.props

    return (
      <div className={classes.container}>
        <TextField
          placeholder="Your note here"
          type='text'
          fullWidth
          multiline
          rows={2}
          onChange={onChange}
          InputProps={{
            disableUnderline: true,
            classes         : {
              input: classes.textFieldInput
            }
          }}
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={isHidden}
                onChange={this.handleSwitch}
                value="hidden"
                color="primary"
              />
            }
            label={isHidden ? "Transaction is hidden" : "Hide transaction"}
          />
        </FormGroup>
      </div>
    )
  }

}

InputNoteTransaction.propTypes = {
  classes : PropTypes.object.isRequired,
  isHidden: PropTypes.bool.isRequired
}

export default withStyles( styles )( InputNoteTransaction )
