import React                 from 'react'
import PropTypes             from 'prop-types'
import { withStyles }        from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import {
  FormControl,
  FormHelperText
}                            from 'material-ui/Form'
import Select                from 'material-ui/Select'

const styles = theme => ( {
  root       : {
    display : 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin    : theme.spacing.unit,
    display   : 'flex',
    // justifyContent: 'stretch',
    alignItems: 'stretch'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
} )

class SelectAccount extends React.Component {
  state = {
    account: this.props.accounts[ 0 ].id
  }

  handleChange = async ( e ) => {
    const {onChange} = this.props
    onChange( 'account' )( e )
    await this.setState( {
      account: e.target.value
    } )
  }

  render() {
    const {classes, accounts, next, value} = this.props

    return (
      <FormControl className={classes.formControl}>
        <Select
          native
          value={this.state.account}
          onChange={this.handleChange}
          onBlur={next}
          className={classes.selectEmpty}
        >
          {accounts.map( account => <option key={account.id} value={account.id}>{account.name}</option> )}
        </Select>
        <FormHelperText>Choose appropriate bank account</FormHelperText>
      </FormControl>
    )
  }
}

SelectAccount.propTypes = {
  classes : PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired
}

export default withStyles( styles )( SelectAccount )