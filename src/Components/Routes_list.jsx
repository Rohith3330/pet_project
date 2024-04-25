import React from 'react';
import { Routes,Route, Navigate} from 'react-router-dom';
import LoginPage from './Login';
import { useRecoilState } from 'recoil';
import Nomatch from './Nomatch';
import Analytics from './Analytics';
import Calendarbox from './Calendar_box';
import Search from './Search';
import { User } from '../user_States/Atoms';

const Routeslist = () => {
    const [user, setUser] = useRecoilState(User);
  const handleLogin=(user)=>{
    setUser(user);
  }
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" replace />;
  };
  const getUser=()=>{
    return user
  }
  
    return (
        <div>
            <Routes>
                <Route path="/home" element={<ProtectedRoute><Calendarbox getuser={getUser}/></ProtectedRoute>}/>
                <Route path='/analytics' element={<ProtectedRoute> <Analytics/></ProtectedRoute>}/>
                <Route path='/Search' element={<ProtectedRoute><Search/></ProtectedRoute>}/>
                <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                <Route path='*' element={<Nomatch/>}/>
            </Routes>
        </div>
    );
};

export default Routeslist;