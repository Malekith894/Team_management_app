import { Link } from "react-router-dom";
import { Authcontext } from "../../context/auth";
import { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { ImHome } from "react-icons/im";


function Navbar(){

    const {auth}=useContext(Authcontext);


    return(
        <div className="bg-mist-500 h-[50px] pt-1.5 w-full text-white flex flex-row justify-around rounded-[2px]">
            <div className="text-xl">
                ⚜Teams⚜
            </div>
            { auth==true ?
                <div className="flex flex-row gap-8">
                    <Link to='/member_management'><p>Members</p></Link>
                    <Link to='/project'><p>Projects</p></Link>
                </div> : null
            }
            <div className="flex flex-row gap-4">
                <Link to='/'>
                    <ImHome size={25}/>
                </Link>
                {auth==true ? <Link to='/userinfo'> <FiUser size={25}/> </Link> :<Link to='/signup'> <p>Sign up</p> </Link>}
                    
            </div>
        </div>
    )
}

export default Navbar;