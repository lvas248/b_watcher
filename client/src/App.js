import './Styles/App.css';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { refreshSession } from './Redux/Slices/sessionSlice';
import Navbar from './Layout/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup'
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshSession())
  }, [dispatch]);

  const session = useSelector( state => state.session)

  console.log('session: ', session)

  

  return (
    <div>

      <Navbar />

      <Switch>
        <Route path='/login'><Login /></Route>
        <Route path='/signup'><Signup /></Route>
        <Route path='/feed'>feed</Route>
        <Route path='/account'>account</Route>
      </Switch>

    </div>

  );
}

export default App;
