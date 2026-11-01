import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes';
import { RouterProvider } from 'react-router-dom';
import Authcontextprovider from './context/auth';
import { Provider } from 'react-redux';
import { store } from './redux/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Authcontextprovider>
        <RouterProvider router={routes}/>
      </Authcontextprovider>
    </Provider>
  </StrictMode>,
)
