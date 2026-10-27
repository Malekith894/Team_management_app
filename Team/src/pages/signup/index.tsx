import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./sign.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../../context/auth";


type submition={
    email?:string;
    name:string;
    phone_number:string;
    role:string;
}

function Signup(){
    
    const {auth,setauth}=useContext(Authcontext);


    const schema=yup.object({
        name:yup.string().required(),
        email:yup.string().email(),
        phone_number:yup.string().required().min(11),
        role:yup.string().required()
    });

    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(schema)})
    const navigate=useNavigate();

    function onsubmit(values:submition){
        console.log(values)
        setauth(true)
        navigate('/')
    }

    return(
        <div className="flex flex-1  bg-white items-center min-h-[90vh] justify-center">
            <div className={styles.wrapper}>
                <form className="flex flex-col gap-1 mt-4 " onSubmit={handleSubmit(onsubmit)}>
                <h1>Welcome to TEAMS</h1>
                    <div className="flex flex-col mt-2 ">
                        <label htmlFor="name" className="flex items-start">Full Name</label>
                        <input id="name" className="border rounded-sm" {...register("name")}/>
                        <span className="block h-5 overflow-hidden text-red-600 text-sm leading-5">{errors.name?.message}</span>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="flex items-start">Email</label>
                        <input id="email" placeholder="ar@gmail.com" {...register("email")} className="border rounded-[4px]"/>
                        
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="phone_number" className="flex items-start">Mobile number</label>
                        <input id="phone_number" placeholder="+98912" {...register("phone_number")} className="border rounded-[4px]"/>
                        <span className="block h-5 overflow-hidden text-red-600 text-sm leading-5">{errors.phone_number?.message}</span>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="role" className="flex items-start">Team role</label>
                        <input id="role" className="border rounded-[4px]" {...register("role")}/>
                        <span className="block h-5 overflow-hidden text-red-600 text-sm leading-5">{errors.role?.message}</span>
                    </div>
                    <div className="flex justify-center items-end-safe">
                        <button type="submit" className="bg-gray-300 h-[40px] w-[70px] rounded-xl">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;