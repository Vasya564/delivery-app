import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// components
import Shop from './components/Shop/Shop'
import Cart from './components/Cart/Cart'
import History from './components/History/History'

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
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "history",
          element: <History />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
