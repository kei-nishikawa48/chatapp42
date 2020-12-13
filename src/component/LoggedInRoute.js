import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthService'

const LoggedInRoute = ({ component: Component, ...rest }) => {
  const user = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
            <Redirect to={'/login'} />
          )
      }
    />
  )
}

export default LoggedInRoute

// const App = () => {
//   const item="text"
//   return (
//     <List item={item}/>
//   );
// }

// export default App;


// const List = ({item:ITEM}) => {
//   props={item:"text"}
//   return (
//   <h1>{ITEM}</h1>
//   );
// }

// export default List;