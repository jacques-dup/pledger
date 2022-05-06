import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Home, Admin, Login, MyPledges, Register } from './pages';
import { Header, ManagePledgesList } from './components';
import { PrintPage } from './pages/PrintPage';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pledges" element={<MyPledges />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/print/pledges" element={<PrintPage>
            <ManagePledgesList print />
          </PrintPage>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
