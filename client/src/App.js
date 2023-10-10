import './Styles/App.css';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { refreshSession } from './Redux/Slices/sessionSlice';
import { getAllBirds } from './Redux/Slices/birdSlice';

import Navbar from './Layout/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup'
import PostForm from './Pages/Post/PostForm';
import Feed from './Pages/Feed/Feed';
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshSession())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBirds())
  }, [dispatch]);

  return (
    <div className=''>

      <Navbar />

      <Switch>
        <Route path='/login'><Login /></Route>
        <Route path='/signup'><Signup /></Route>
        <Route path='/feed'><Feed /></Route>
        <Route path='/post'><PostForm /></Route>

        <Route path='/account'>account</Route>
      </Switch>

    </div>

  );
}

export default App;
