import { Children } from "react"
import Layout from "../pages/Layout"
import { createBrowserRouter } from "react-router-dom"
import Signup from "../pages/signup"
import Userinfo from "../pages/userinfo";
import Members from "../pages/member_management";
import Project from "../pages/Projects";
import Tasks from "../pages/Task";
import Home from "../pages/home";


const routes=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/signup',
                element:<Signup/>,
            },
            {
                path:'/userinfo',
                element:<Userinfo/>,
            },
            {
                path:'/member_management',
                element:<Members/>
            },
            {
                path:'/project',
                element:<Project/>
            },
            {
                path:'/Tasks/:taskid',
                element:<Tasks/>
            },
            {
                path:'/',
                element:<Home/>
            }
        ]
    }

])


export default routes;