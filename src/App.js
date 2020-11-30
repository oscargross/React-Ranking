import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useLayoutEffect, useState } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Menu from './pages/NavPagesControl'
import Firebase from './services/firebaseConnect'
import Wellcome from './pages/Wellcome'


export default function App() {

  const [user, setUser] = useState(null)

  useLayoutEffect(() => {
    Firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user !== null) {
          setUser(user.uid)
        } else {
          setUser(null)
        }
      })


  }, [])

  const PrivateRoute = ({ component: Component }) => {
    return <Route
      render={(props => {
        let con = sessionStorage.getItem('uuid');
        
        if (con) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: "/" }} />
        }
      })}
    />
  }
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/signUp" component={SignUp} />
        <PrivateRoute path="/menu" component={Menu} />
        <PrivateRoute path="/wellcome" component={Wellcome} />
      </Switch>

    </HashRouter>
  )
}