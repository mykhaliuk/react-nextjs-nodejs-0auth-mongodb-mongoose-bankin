import React, {
  Fragment
}                    from 'react'
import PropTypes     from 'prop-types'
import {withStyles}  from 'material-ui/styles'
import Input, {
  InputLabel,
  InputAdornment
}                    from 'material-ui/Input'
import {FormControl} from 'material-ui/Form'

class InputNameTransaction extends React.Component {
  state = {
    key: ''
  }

  render() {
    const {onChange, classes, isError} = this.props

    return (
      <Fragment>
        <div>key: {this.state.key}</div>

        <FormControl fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id='name'
            error={!isError}
            autoFocus
            placeholder="Name of transaction"
            fullWidth
            inputProps={{
              'aria-label': 'Description'
            }}
            onChange={onChange('name')}
          />
        </FormControl>
      </Fragment>
    )
  }
}

InputNameTransaction.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default InputNameTransaction
