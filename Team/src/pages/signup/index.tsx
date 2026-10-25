import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./sign.module.css";

function Signup(){
    
    return(
        <div className="flex flex-1 bg-white  items-center justify-center">
            <div className={styles.wrapper}>
                <form>
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input id="name"/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email"/>
                    </div>
                    <div>
                        <label htmlFor="mobilenum">Mobile number</label>
                        <input id="mobilenum"/>
                    </div>
                    <div>
                        <label htmlFor="role">Team role</label>
                        <input id="role"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;