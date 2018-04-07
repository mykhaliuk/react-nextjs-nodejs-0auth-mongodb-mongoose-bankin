import React    from 'react'
import * as Ico from 'mdi-material-ui'

export const getIcon = ({icon}) => {
  return Ico[icon]()

}

export default getIcon