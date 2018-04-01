import React       from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import Document, {
  Head,
  Main,
  NextScript
}                  from 'next/document'

import getContext from '../lib/context'
import Styles     from '../css/index.scss'

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google" content="notranslate" />
        <meta name="theme-color" content="#1976D2" />
        <link
          rel="shortcut icon"
          href="/static/ic_account_balance_wallet_black_24dp/web/ic_account_balance_wallet_black_24dp_1x.png"
        />
        <style dangerouslySetInnerHTML={{__html: Styles}} />
      </Head>
      <body>
      <style>
      </style>
        <Main />
        <NextScript />
      </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = ({renderPage}) => {
  const pageContext = getContext()
  const page = renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ))

  return {
    ...page,
    pageContext,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: pageContext.sheetsRegistry.toString()
        }}
      />
    )
  }
}

export default MyDocument
