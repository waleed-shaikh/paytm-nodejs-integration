import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Success from './component/Success';
import Failure from './component/Failure';
import Paytm from './file/paytm/Paytm';

function App() {
  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
          {/* ZaakPay*/}
          <Route exact path="/" element={<Paytm />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/failure' element={<Failure />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
