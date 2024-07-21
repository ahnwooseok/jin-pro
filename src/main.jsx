import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <SnackbarProvider maxSnack={3} autoHideDuration={1700}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                          }}
        >
            <BrowserRouter history={history} >
                <App />
            </BrowserRouter>
        </SnackbarProvider>
    </RecoilRoot>

)