import logo from './logo.svg';
import './App.css';
import LoginAndSignUp from './components/Auth/LoginAndSignUp';
import NavigationBar from './components/UserUI/NavigationBar';
import Home from './components/UserUI/Home';
import { Route, Routes ,Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Saved from './components/UserUI/Saved';
import ViewMyNotes from './components/UserUI/ViewMyNotes';
import EduHub from './components/UserUI/EduHub';
import Chat from './components/UserUI/Chat';

function App() {

   const login = useSelector((state) => state.Auth.isloggedIn);

  return <>
    <NavigationBar></NavigationBar>
    <Routes>
      {login && <Route path='/' element={<Home></Home>}></Route>}
       {login && <Route path='/chat' element={<Chat></Chat>}></Route>}
      {login && <Route path='/saved' element={<Saved></Saved>}></Route>}
      {login && <Route path='/saved/:id' element={<ViewMyNotes></ViewMyNotes>}></Route>}
      {login && <Route path='/EduHub' element={<EduHub></EduHub>}></Route>}
      {!login && <Route path='/login' element={<LoginAndSignUp></LoginAndSignUp>}></Route>}
       <Route path="*" element={<Navigate to={login ? "/" : "/login"} />} />
      </Routes>
  </>
}

export default App;
