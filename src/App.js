import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Category from './pages/Category';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CreateListing from './pages/CreateListing';
import NavBar from './components/NavBar';
import Listing from './pages/Listing';
import {ToastContainer} from 'react-toastify';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoutes />} >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/category/:categoryName/:listingId" element={<Listing />} />
          <Route path="/contact/:landlordId" element={<Contact />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
        </Routes>
        <NavBar />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
