import React                from 'react'
import PropTypes            from 'prop-types'
import {getBankAccountData} from '../lib/api/user'
import {CircularProgress}   from 'material-ui/Progress'
import {Tab}                from 'material-ui/Tabs'

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
      const accountData = await getBankAccountData(id)

      this.setState({
        accountData,
        isLoading: false,
        loaded   : true
      })
    }

    render() {
      const {accountData, isLoading} = this.state
      const {classes} = this.props

      return <WrappedComponent label={isLoading ? <CircularProgress style={{color: 'grey[500]'}} /> : accountData.name} {...this.props} />
    }
  }

}

export default GetTabContent(Tab)