import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes';
import { RouterProvider } from 'react-router-dom';
import Authcontextprovider from './context/auth';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Authcontextprovider>
      <RouterProvider router={routes}/>
    </Authcontextprovider>
  </StrictMode>,
)
