import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login';
import AddStock from './components/AddStock/AddStock';
import ForgotPassword from './components/forgotPassword/forgotPassword';
import AllList from './components/AllList/AllList';
import Transfer from './components/Transfer/modal';
import { Provider } from 'react-redux';
import store from './Store/store';
import Display from './components/Display/DisplayModal';
import TransferList from './components/Transfer/TransferList';
import DisplayList from './components/Display/DisplayList';
import OrderList from './components/Order/OrderList';
import DailySummaryComponent from './components/DailySummery/DailySum';
import DamagedProducts from './components/Damage/DamageList';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/add-stock" element={<AddStock />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/AllList" element={<AllList />} />
          <Route path="/Transfer" element={<Transfer />} />
          <Route path="/Display" element={<Display />} />
          <Route path="/TransferList" element={<TransferList />} />
          <Route path="/DisplayList" element={<DisplayList />} />
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/daily-summery" element={<DailySummaryComponent />} />
          <Route path="/DamagedProductList" element={<DamagedProducts />} />







          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
