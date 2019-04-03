import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from './getPageContext'

function withRoot(Component: any) {
  const x = class extends React.Component {
    muiPageContext: any

    constructor(props: any) {
      super(props)
      this.muiPageContext = getPageContext()
    }

    removeServerSideInjectedCss() {
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    componentDidMount() {
      this.removeServerSideInjectedCss()
    }

    render() {
      return (
        <JssProvider generateClassName={this.muiPageContext.generateClassName}>
          <MuiThemeProvider
            theme={this.muiPageContext.theme}
            sheetsManager={this.muiPageContext.sheetsManager}
          >
            <CssBaseline />
            <Component {...this.props} />
          </MuiThemeProvider>
        </JssProvider>
      )
    }
  }

  return x
}

export default withRoot
