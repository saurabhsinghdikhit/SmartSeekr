import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/owl.carousel/dist/assets/owl.carousel.min.css';
import '../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './components/Admin/AdminContext';
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";


const root = ReactDOM.createRoot(document.getElementById('root'));
Kommunicate.init("1e94a4e87a31c0a6415b31d6704530274", {
    automaticChatOpenOnNavigation: true,
    popupWidget: true
  });
root.render(
    <BrowserRouter>
        <AdminProvider>
            <App />
        </AdminProvider>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
