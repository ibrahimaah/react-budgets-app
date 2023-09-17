import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BudgetsProvider } from './contexts/BudgetsContext';
import { ThemeProvider } from 'react-bootstrap';

import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
 //<React.StrictMode>
  <ThemeProvider dir="rtl">
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </ThemeProvider> 
  //</React.StrictMode>
  ,
)


