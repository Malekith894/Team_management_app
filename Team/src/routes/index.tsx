import { Children } from "react"
import Layout from "../pages/Layout"
import { createBrowserRouter } from "react-router-dom"
import Signup from "../pages/signup"
import Userinfo from "../pages/userinfo";
import Members from "../pages/member_management";
import Project from "../pages/Projects";

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
            }
        ]
    }

])


export default routes;