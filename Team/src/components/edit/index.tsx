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
    function handlecancel(){
        setedit(false)
    }
    function handlesave(){
        if(tasklist.includes(task)){
            settasklist([...tasklist,])
            
        }
    }


    return(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/25 backdrop-blur-sm">
        <div className="flex flex-col bg-gray-50 h-[260px] border rounded-[8px]  w-[400px] ">
            <h1 className=" text-xl"> Edit Task</h1>
            <div className="flex flex-col">
                <div className={styles.taskFormGrid}>
                    <div className="flex flex-col items-start">
                        <label >Priority</label>
                        <select>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-start">
                        <label>status</label>
                        <select>
                            <option value="todo">To do</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </div>
                <div className={styles.taskFormGrid}>
                    <div className="flex flex-col items-start">
                        <label>Assignee</label>
                        <select>
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
                        <input type="date"/>
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