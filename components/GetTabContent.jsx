import React     from 'react'
import PropTypes from 'prop-types'
import userAPI   from '../lib/api/user'
import Spinner   from './Spinner'
import {Tab}     from 'material-ui/Tabs'

function GetTabContent(WrappedComponent) {

  return class TabWithData extends React.Component {
    static propTypes = {
      id: PropTypes.string.isRequired
    }

    state = {
      accountData: null,
      isLoading  : true,
      loaded     : false
    }

    async componentDidMount() {

      const {id} = this.props
      const accountData = await userAPI.getBankAccountData(id)

      this.setState({
        accountData,
        isLoading: false,
        loaded   : true
      })
    }

    render() {
      const {accountData, isLoading} = this.state
      const {classes} = this.props

      return <WrappedComponent label={isLoading ? <Spinner active /> : accountData.name} {...this.props} />
    }
  }

}

export default GetTabContent(Tab)