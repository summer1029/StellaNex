import Home from './UI/Home';
import LoginForm from './Component/LoginForm';
import Register from './Component/Register';
// import MovieDetail from './UselessFile/MovieDetail';
// import MovieDetail_toastfy from './UselessFile/MovieDetail_toastfy';
// import MovieInfo from './Component/MovieInfo';
import MemberUpdatePage from './Component/MemberUpdateForm';
import MemberDeletePage from './Component/MemberDeleteForm';
import 'react-toastify/dist/ReactToastify.css';
// import MovieInfo_modified from './Component/MovieInfo_modified';
import MovieInfo_renew from './Component/MovieInfo_renew';
import Admin from './Component/Admin';
import Nav from './UI/Nav';
import UserInfoPage from './Component/UserInfoPage';

import { RecoilRoot } from 'recoil';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transitionBounce
        />
        <Routes>
          {/* <Route path='/' element={<MainMenu />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='Nav' element={<Nav />} />

          <Route path='/Admin' element={<Admin />} />
          <Route path='/User/:writerId' element={<UserInfoPage />} />

          <Route path='/Login' element={<LoginForm />} />
          <Route path='/Register' element={<Register />} />

          {/* <Route path="/movie/:index" Component={MovieDetail} /> */}
          {/* <Route path="/movieInfo/:index" Component={MovieInfo} />  */}
          {/* <Route path="/movieInfo/:index" Component={MovieInfo_modified} /> */}
          <Route path="/movieInfo/:index" Component={MovieInfo_renew} />

          <Route path='/memberUpdate' element={<MemberUpdatePage />} />
          <Route path='/memberDelete' element={<MemberDeletePage />} />

        </Routes>
      </BrowserRouter>
    </RecoilRoot>

  );
}

export default App;
