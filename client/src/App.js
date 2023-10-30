import './Styles/App.css';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { refreshSession } from './Redux/Slices/sessionSlice';
import { getAllBirds } from './Redux/Slices/birdSlice';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './Layout/Navbar';
import PostForm from './Pages/Post/PostForm';
import Feed from './Pages/Feed/Feed';
import BirdMap from './Pages/BirdMap/BirdMap';
// import Landing2 from './Pages/Landing/Landing2';
import Landing from './Pages/Landing/Landing'
import Account2 from './Pages/Account/Account2';
import Login from './Pages/Landing/Login';
import Signup from './Pages/Landing/Signup'
import PostEditForm from './Pages/Post/PostEditform';

function App() {

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(refreshSession())
    // .then(res => {
    //   if(res.meta.requestStatus === 'fulfilled') history.push('/feed')
    // })
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(getAllBirds())
  }, [dispatch]);

  return (
    <div className='bg-slate-200'>

      <Navbar />

      <Switch>

        <Route exact path='/'><Landing /></Route>

        <Route path='/feed/:id?'><Feed /></Route>
        <Route path='/map/:id?'><BirdMap /></Route>
        <Route path='/post/'><PostForm /></Route>
        <Route path='/edit_post/:id'><PostEditForm /></Route>
        <Route path='/account'><Account2 /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/signup'><Signup /></Route>
        
        

      </Switch>

    </div>

  );
}

export default App;
