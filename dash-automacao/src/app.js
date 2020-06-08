import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { LOGIN } from 'routes'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<LinearProgress />}>

      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
)

export default App
