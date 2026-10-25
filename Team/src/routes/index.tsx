import { Children } from "react"
import Layout from "../components/navbar"
import { createBrowserRouter } from "react-router-dom"
import Signup from "../pages/signup"



const routes=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/signup',
                element:<Signup/>,
            }
        ]
    }

])


export default routes;