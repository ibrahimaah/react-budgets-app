import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'
import { BudgetsProvider } from './contexts/BudgetsContext'; 

import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  ,
)


