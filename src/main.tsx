import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StartUp } from './start-up.tsx';

import './index.css'
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartUp />,
  },
  {
    path: "game",
    element: <App />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
