import './Styles/App.css';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { refreshSession } from './Redux/Slices/sessionSlice';
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

  const posts = useSelector( state => state.post.entity)
  const birds = useSelector( state => state.bird.entity)
  const loggedIn = useSelector( state => state.session.loggedIn)
  
  console.log('posts: ', posts) 
  console.log('birds: ',birds)
  console.log('LoggedIn: ',loggedIn)
  
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
