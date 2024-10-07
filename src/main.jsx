import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login} from './components/index.js'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPost.jsx'
import AddPost  from './pages/Addpost.jsx'
import EditPost from './pages/Editpost.jsx'
import Post from './pages/Post.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
         path:'/login',
         element:(
           <AuthLayout authentication = {false}>
            <Login/>
           </AuthLayout>
         )
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
     <RouterProvider router = {router}/>
    </Provider>
  </StrictMode>,
)
