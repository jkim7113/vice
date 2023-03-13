import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Main from './Main';
import Category from './Category';
import Item from './Item';
import Pages from './Pages';
import Login from './Login';
import Newsletter from './static_components/Newsletter';
import Footer from './Footer';
import ErrorPage from './static_components/ErrorPage';
import AdminPanel from './AdminPanel';

function App() {
  const currentLocation = useLocation();
  const background = currentLocation?.state?.background;

  return (
    <div className="App">
        <Navbar />
        <div id="center-flexbox">
          <Routes location={background ? background : currentLocation}>
            <Route exact path="/" element={<Main />} />
            <Route path="/categories/:category" element={<Category />}/>
            <Route path="/items/:id" element={<Item />}/>
            <Route path="/pages/:page" element={<Pages />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/newsletter-modal" element={<Newsletter />}/>
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="*" element={<ErrorPage type={404} />} />
          </Routes>
          { background && ( //For Modal components
              <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/newsletter-modal" element={<Newsletter />}/>
              </Routes>
            )
          }
        </div>
        <Footer />
    </div>
  );
}

export default App;