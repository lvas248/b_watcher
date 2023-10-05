import './Styles/App.css';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { refreshSession } from './Redux/Slices/sessionSlice';
import Navbar from './Layout/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup'
import Post from './Pages/Post/Post';
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshSession())
  }, [dispatch]);

  return (
    <div className=''>

      <Navbar />

      <Switch>
        <Route path='/login'><Login /></Route>
        <Route path='/signup'><Signup /></Route>
        <Route path='/feed'>feed</Route>
        <Route path='/post'><Post /></Route>

        <Route path='/account'>account</Route>
      </Switch>

    </div>

  );
}

export default App;
