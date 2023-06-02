import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// components
import Shop from './components/Shop/Shop'
import Cart from './components/Cart/Cart'
import History from './components/History/History'
import Coupon from './components/Coupon/Coupon'

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
        },
        {
          path: "coupon",
          element: <Coupon />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
