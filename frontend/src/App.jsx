import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// components
import Shop from './components/Shop/Shop'

// pages
import PageContainer from './pages/PageContainer'

import './global.css'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageContainer />,
      children: [
        {
          path: "",
          element: <Shop />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
