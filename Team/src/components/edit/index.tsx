import { useState } from "react"
import { useSelector } from "react-redux";
import styles from "./edit.module.css"
import type { Rootstate } from "../../redux/index";
import type { Dispatch,SetStateAction } from "react"; 

type memberinfo={
    id:number;
    name:string;
    role:string;
    duty:string;
}

type taskinfo={
    status:string;
    priority:string;
    title:string;
    description:string;
    assignee:string;
    deadline:string;
    id:number;
} 

type edittype={
    edit:boolean;
    task:taskinfo;
    setedit:Dispatch<SetStateAction<boolean>>;
    settask:Dispatch<SetStateAction<object>>;
    tasklist:taskinfo[];
    settasklist:Dispatch<SetStateAction<taskinfo[]>>;
}

function Editoption({edit,setedit,task,settask,tasklist,settasklist}:edittype){
    const memberlist=useSelector((state:Rootstate) => state.member);

    //4 states for the editing version
    const[prt,setprt]=useState(task.priority)
    const[stat,setstat]=useState(task.status)
    const[mem,setmem]=useState(task.assignee)
    const[dead,setdead]=useState(task.deadline)

    function handlecancel(){
        setedit(false)
    }
    function handlesave(){
        const number=task.id;
        settasklist(
        tasklist.map(function(item){
            if(item.id==number){
                return {...item,assignee: mem, priority: prt, status: stat, deadline: dead}
            } else{
                return item;
            }
        }))
        setedit(false)
    }

    return(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/25 backdrop-blur-sm">
        <div className="flex flex-col bg-gray-50 h-[260px] border rounded-[8px]  w-[400px] ">
            <h1 className=" text-xl"> Edit Task</h1>
            <div className="flex flex-col">
                <div className={styles.taskFormGrid}>
                    <div className="flex flex-col items-start">
                        <label >Priority</label>
                        <select value={prt} onChange={(e)=> setprt(e.target.value)}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-start">
                        <label>status</label>
                        <select value={stat} onChange={(e)=> setstat(e.target.value)}>
                            <option value="Todo">To do</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                <div className={styles.taskFormGrid}>
                    <div className="flex flex-col items-start">
                        <label>Assignee</label>
                        <select value={mem} onChange={(e)=>setmem(e.target.value)}>
                            {memberlist.map(function(item: memberinfo) {
                                return (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col items-start">
                        <label>Deadline date</label>
                        <input value={dead} type="date" onChange={(e)=>setdead(e.target.value)}/>
                    </div>
                </div>
                <div className="flex flex-row gap-8 mt-1 justify-center">
                    <button onClick={handlecancel} className="w-[110px] h-[40px] rounded-[6px] text-white bg-red-600">Cancel</button>
                    <button onClick={handlesave} className="w-[110px] h-[40px] rounded-[6px] text-white bg-green-400">Save</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Editoption;