import { BrowserRouter } from "react-router-dom"
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Pages/Login'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    </React.StrictMode>,
)
