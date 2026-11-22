import styles from "./members.module.css"
import { BiSolidUserPlus } from "react-icons/bi";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { memberactions } from "../../redux/slices/memberslice";
import { LiaTrashAlt } from "react-icons/lia";
import { IoPeople } from "react-icons/io5";
import { HiBriefcase } from "react-icons/hi";
import { HiClipboardCheck } from "react-icons/hi";

interface memberinfo{
    id:number;
    name:string;
    role:string;
    duty:string;
}


function Members(){

    const dispatch=useDispatch()
    //an interface just after the usestate always suffices
    const [member,setmember]=useState<memberinfo>(
        {
            id:Math.random(),
            name:'',
            role:'',
            duty:'',
        }
    )
    
    const [memberlist,setmemberlist]=useState<memberinfo[]>(JSON.parse(localStorage.getItem("member") || "[]") )
    useEffect(function(){
        localStorage.setItem("member",JSON.stringify(memberlist))
    },[memberlist]);

    function handlemember(){
        if(!member.duty || !member.name || !member.role){
            alert("please fill in the blanks")
            return;
        }

        setmemberlist([...memberlist,member])
        dispatch(memberactions.addmember(member))
        setmember({
            id:Math.random(),
            name:'',
            role:'',
            duty:''
        })
    }

    

    const [crole,setcrole]=useState('')

    const filteredlist=memberlist.filter(function(item){
        if(crole.length==0){
            return item;
        } else{
            return item.role.toLowerCase().includes(crole.toLowerCase());
        }
    })

    const roles= new Set();
    memberlist.forEach(function(item){
        roles.add(item.role.toLocaleLowerCase())
    })
    
    return(
        <div className="bg-white flex flex-1 min-h-[90vh]">
            <div className={styles.wrapper}>
                <div className={styles.content1}>
                    <p className="text-sm">PEOPLE/TEAM MANAGEMENT</p>
                    <h1 className="font-bold text-xl">Team members</h1>
                    <p className="text-xs">Manage your people, roles, and responsibilities in one place.</p>
                    <div className="flex flex-row gap-2 w-[100%] mt-3">
                        <div className="flex-1 h-[140px] bg-blue-50 rounded-[8px] p-2 flex items-start flex-col justify-between">
                            <IoPeople size={25}/>
                            <p className="text-xl">{memberlist.length}</p>
                            <p>Total members</p>
                        </div>
                        <div className="flex-1 h-[140px] bg-blue-50 rounded-[8px] p-2 flex items-start flex-col justify-between">
                            <HiBriefcase size={25}/>
                            <p className="text-xl">{roles.size}</p>
                            <p>Unique roles</p>
                        </div>
                        <div className="flex-1 h-[140px] bg-blue-50 rounded-[8px] p-2 flex items-start flex-col justify-between">
                            <HiClipboardCheck size={25}/>
                            <p className="text-xl">{memberlist.length}</p>
                            <p>Assigned duties</p>
                        </div>
                    </div>
                    <div className={styles.addmember}>
                        <div className="flex flex-row ">
                            <BiSolidUserPlus size={25}/>
                            <p> Add a new member</p>
                        </div>
                        <p className="mt-3 text-sm items-start flex">Enter the employee's information below.</p>
                        <div className="flex flex-col gap-3 mt-3">
                            <div className="flex flex-col">
                                <label className="flex items-start"> Full name</label>
                                <input className="rounded-[11px] w-[95%] border-1 p-0.5"
                                placeholder="e.g.Ali Ahmadi" onChange={(e) => setmember({...member,name:e.target.value})} value={member.name}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="flex items-start"> Company role</label>
                                <input className="rounded-[11px] w-[95%] border-1 p-0.5" 
                                placeholder="e.g.Frontend" onChange={(e) => setmember({...member,role:e.target.value})} value={member.role}/>
                            </div>
                        </div>
                        <div className=" flex flex-col items-start mt-2">
                            <label>Duty/Responsibilities</label>
                            <textarea className="rounded-[8px] h-[100px] w-[95%] border p-2 text-sm placeholder:text-sm placeholder:text-gray-400 resize-none"
                            placeholder="Describe what this person is responsible for..." onChange={(e) => setmember({...member,duty:e.target.value})} value={member.duty}/>
                        </div>
                        <button className="w-full bg-blue-400 h-[40px] rounded-[9px] mt-3" onClick={handlemember}>+Add team member</button>
                    </div>
                </div>
                <div className={styles.content2}>
                    <div className="bg-blue-50 rounded-[8px] w-full p-3 h-auto flex flex-col">
                        <div className="flex flex-col items-start">
                            <p className="font-bold">All members</p>
                            <p className="text-sm">Browse and search your company team.</p>
                            <input className="border p-0.5 rounded-[8px] mt-2 p-0.5 pl-1" onChange={(e) => setcrole(e.target.value)} placeholder="search by role"/>
                        </div>
                        <div className="bg-gray-300 w-full h-[2px] flex items-center mt-3">

                        </div>
                        {filteredlist.map(function(item){
                            return(
                                <div  key={item.id}>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row gap-2 mt-2">
                                            <div className="w-[60px] h-[60px] bg-blue-100 rounded-4xl flex items-center justify-center">
                                                <p className="text-2xl font-bold pb-1">{item.name[0]}</p>
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <p className="font-bold">{item.name}</p>
                                                <p className="text-xs">{item.role}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-col items-start mt-1">
                                        <p className="font-bold">Reponsibilites</p>
                                        <p className="text-xs text-justify">{item.duty}</p>
                                    </div>
                                    <div className="w-full h-[2px] bg-gray-300 mt-2">

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Members;