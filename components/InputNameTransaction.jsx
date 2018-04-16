import React, {Fragment}   from 'react'
import PropTypes           from 'prop-types'
import Input, {InputLabel} from 'material-ui/Input'
import {FormControl}       from 'material-ui/Form'

class InputNameTransaction extends React.Component {

  render() {
    const {onChange, isError, next} = this.props
    let isTouched = false

    return (
      <Fragment>
        <FormControl fullWidth>
          <InputLabel htmlFor="title">{!isError && 'Name must contain at least 3 symbols'}</InputLabel>
          <Input
            id='title'
            type='text'
            error={!isError}
            autoFocus
            placeholder="Name of transaction"
            fullWidth
            inputProps={{
              'aria-label': 'Description'
            }}
            onChange={onChange('name')}
            onBlur={next}
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
