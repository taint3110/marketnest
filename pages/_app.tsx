import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import CustomApp from 'components/pages/CustomApp/customApp'
import { Provider } from 'mobx-react'
import type { AppProps } from 'next/app'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import './styles.scss'

const App = (props: AppProps) => {
  const { Component, pageProps, router } = props
  return (
    <Provider>
      <CustomApp pageProps={pageProps} Component={Component} router={router} />
    </Provider>
  )
}

export default App
