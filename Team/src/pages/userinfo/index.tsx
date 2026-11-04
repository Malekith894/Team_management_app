import { useSelector } from "react-redux"
import { useractions } from "../../redux/slices/userslices"
import styles from "./userinfo.module.css";
import { useContext } from "react";
import { Authcontext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { TbUser } from "react-icons/tb";


type userinfo={
    name:string;
    age:string;
    place_of_birth:string;
    phone_number:string;
    role:string;
    email?:string;
}


function Userinfo(){
    
    const {setauth}=useContext(Authcontext)
    const userinfo=useSelector(state => (state as {user:userinfo}).user)
    const navigate=useNavigate()

    function handlelogout(){
        setauth(false);
        localStorage.removeItem("Userinfo");
        navigate('/')
    }

    return(
        <div className="bg-white flex flex-1 min-h-[94.8vh] items-center justify-center  ">
            <div className={styles.wrapper}>
                <div className="flex gap-3 flex-col">
                    <div className="flex items-start">
                        <h2 className="text-black font-bold">My profile</h2>
                    </div>
                    <div className="flex flex-row gap-1">
                        <div className="bg-gray-200 rounded-4xl w-[60px] h-[60px] justify-center items-center flex ">
                            <TbUser size={40}/>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="font-bold">{userinfo.role}</p>
                            <p className="text-xs">{userinfo.email}</p>
                        </div>
                    </div>
                    <div className="bg-gray-400 mx-auto w-[600px] h-[2px] flex items-center ">

                    </div>
                    <div className="flex items-center text-black font-bold">
                        Personal information
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between">
                            <p>Full name:</p>
                            <p>{userinfo.name}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>age</p>
                            <p>{userinfo.age}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>place of birth</p>
                            <p>{userinfo.place_of_birth}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Phone number</p>
                            <p>{userinfo.phone_number}</p>
                        </div>
                    </div>
                    <div className="bg-gray-400 mx-auto w-[600px] h-[2px] flex items-center ">

                    </div>
                    <div className="flex flex-row justify-evenly">
                        <button className="w-[105px] h-[40px] rounded-[6px] bg-gray-300 font-bold text-red-700" onClick={handlelogout}>Log out</button>
                    
                    
                        <button className="w-[105px] h-[40px] rounded-[6px] bg-gray-300 font-bold text-emerald-700" onClick={() => navigate("/signup")}>Edit profile</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
/*
<div className="flex flex-col items-start gap-[30px] pl-4">
                    <div>
                        <p>name: {userinfo.name}</p>
                    </div>
                    <div>
                        <p>age: {userinfo.age}</p>
                    </div>
                    <div>
                        <p>place of birth: {userinfo.place_of_birth}</p>
                    </div>
                    <div>
                        <p>phone number: {userinfo.phone_number}</p>
                    </div>
                    <div>
                        {userinfo.email ? <p>Email:  {userinfo.email}</p> : "Not provided "}
                    </div>
                    <div>
                        <p>Role in the company: {userinfo.role}</p>
                    </div>
                </div>
                <div>
                    <button className="w-[80px] h-[40px] rounded-[6px] bg-white text-black" onClick={handlelogout}>Log out</button>
                </div>
                */
{


}
export default Userinfo;