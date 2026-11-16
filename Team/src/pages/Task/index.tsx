import { FiUsers } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { useState,useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Option from "../../components/moreoprions/options";
import { PiCodeLight } from "react-icons/pi";
import { CgAdd } from "react-icons/cg";
import styles from "./task.module.css"
import { FiChevronDown } from "react-icons/fi";
import Editoption from "../../components/edit";
import type { Rootstate } from "../../redux/index";
import { FaFilter } from "react-icons/fa";

type projectinfo={
    id:string;
    title:string;
    description:string;
    date:string;
}

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

type actiontype={
    type:"priority"|"status" | "title"|"description" | "assignee"|"deadline";
    payload:string;
}

const reducer=(state:taskinfo,action:actiontype) =>{
    switch(action.type){
        case "priority":{
            return{
                ...state,
                priority:action.payload,
            };
        }
        case "status":{
            return {
                ...state,
                status:action.payload,
            }
        }
        case "title":{
            return{
                ...state,
                title:action.payload,
            }
        }
        case "description":{
            return{
                ...state,
                description:action.payload
            }
        }
        case "assignee":{
            return{
                ...state,
                assignee:action.payload,
            }
        }
        case "deadline":{
            return{
                ...state,
                deadline:action.payload,
            }
        }

    }
}


function Tasks(){
    const {taskid}=useParams()
    const projectlist=useSelector((state:Rootstate) => state.project);
    const memberlist=useSelector((state:Rootstate) => state.member);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [filteropen,setfilteropen]= useState(false);
    const first_member=memberlist[0];

    const [openSection, setOpenSection] = useState<string | null>("status");
    const [state,dispatch]=useReducer(reducer,{
        status:"Todo",
        priority:"Low",
        title: "",
        description: "",
        assignee: "select",
        deadline: "",
        id:Math.random()
    });


    const toggleSection = (section: string) => {
        setOpenSection(current =>
            current === section ? null : section
        );
    };

    function handleremovedoing(number:number){
        const newtasklist=tasklist.filter(function(item){
            return item.id != number;
        })
        settasklist(newtasklist)
    }
    


    const project:projectinfo=projectlist.find(function(item:projectinfo){
        return item.id==taskid;
    })
    
    //filter logic
    const [selectedpr,setselectedpr]=useState<string>("");
    const [selectememb,setselectedmemb]=useState<string>("");
    const [selectedtitle,setselectedtitle]=useState<string>("");
    const [startdate,setstartdate]=useState("");
    const [enddate,setenddate]=useState("");
    const [edit,setedit]=useState<boolean>(false);
    const [editedtask,seteditedtask]=useState({});

    //task logic
    const [tasklist,settasklist]=useState<taskinfo[]>([]);
    
    useEffect(function(){
        localStorage.setItem("tasklist",JSON.stringify(tasklist))
    },[tasklist])

    function handletask(){
        if(!state.status || state.assignee=="select" || !state.priority || !state.deadline || !state.title || !state.description){
            alert("please fill in the blanks")
        } else{
            settasklist((prev) =>[...prev,{...state,id:Math.random()}])
            console.log(tasklist)
            
        }
    };

    const filtprogressprjs=tasklist.filter(function(item:taskinfo){
        const priorityceck= selectedpr=="all"? true:item.priority.toLowerCase().includes(selectedpr)
        const membercheck=item.assignee.toLowerCase().includes(selectememb)
        const titlecheck=item.title.toLowerCase().includes(selectedtitle)
        const datecheck=(!enddate || item.deadline<enddate) && (!startdate || item.deadline>startdate)
        
        
        if(item.status=="Todo"){
            return priorityceck && membercheck && titlecheck && datecheck;
        } else {
          
        }
        
    })

    const filtfinishedprjs=tasklist.filter(function(item:taskinfo){
        
        const priorityceck=item.priority.toLowerCase().includes(selectedpr)
        const membercheck=item.assignee.toLowerCase().includes(selectememb)
        const titlecheck=item.title.toLowerCase().includes(selectedtitle)
        const datecheck=(!enddate || item.deadline<enddate) && (!startdate|| item.deadline>startdate)

        if(item.status=="Done"){
            return priorityceck && membercheck && titlecheck && datecheck;
        } else{
             
        }
    
});


    return(
        <div className={styles.wrapper}>
            <div className="flex flex-col items-center justify-center">
                {edit && <Editoption tasklist={tasklist} settasklist={settasklist} edit={edit} setedit={setedit} task={editedtask} settask={seteditedtask}/>}
            </div>
            <div className={styles.intro}>
                <div className="bg-blue-50 w-[90px] h-[90px] rounded-[2px] flex m-2 items-center text-5xl justify-center"><PiCodeLight size={50}/></div>
                <div className="flex flex-col items-start mt-1 gap-2">
                    <h2 className="text-xl font-bold">{project.title}</h2>
                    <p className="text-sm">{project.description}</p>
                    <div className={styles.introdetails}>
                        <div className="flex flex-row">
                            <CiCalendarDate color="blue" size={25}/>
                            <p> Due: {new Date(project.date).toLocaleDateString("en-us",{
                                month:"long",
                                day:"2-digit",
                            })}</p>
                        </div>
                        <div className="flex flex-row">
                            <FiUsers color="blue" size={20} />
                            <p>Team:</p>
                            <p>{memberlist.length} members</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.filter}>
                <div className={styles.filterbox}>
                    <div className="flex flex-col">
                           <button type="button"
                            onClick={() => setfilteropen(!filteropen)}
                            aria-expanded={filteropen}
                            aria-controls="add-task-form"
                            className="flex w-full flex-row items-center justify-between text-left">

                                <span className="flex flex-row items-center gap-2">
                                <FaFilter size={25} color="blue" />
                                <span className="font-semibold">Filtering</span>
                            </span>

                            <FiChevronDown
                                size={20}
                                className={`transition-transform duration-300 ${
                                    filteropen ? "rotate-180" : ""
                                }`}
                            />

                            </button> 
                            <div
                                id="filter-form"
                                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                                    filteropen
                                        ? "grid-rows-[1fr]"
                                        : "grid-rows-[0fr]"
                                }`}
                            >
    <div className="min-h-0 overflow-hidden">

        <div className="flex flex-col gap-3 pt-4">

            <h2 className="text-xl">Priority and assigned member</h2>

            <div className={styles.taskFormGrid}>
                <div className="flex flex-col items-start">
                    <label>Assignee</label>
                    <select onChange={(e) => setselectedmemb(e.target.value)}>
                        <option value="">All members</option>

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
                    <label>Priority</label>

                    <div className="flex flex-row gap-1">
                        <label>All</label>
                        <input
                            checked={selectedpr === ""}
                            onChange={(e) => setselectedpr("")}
                            name="pr"
                            type="radio"
                        />

                        <label>Low</label>
                        <input
                            checked={selectedpr === "low"}
                            onChange={(e) => setselectedpr(e.target.value)}
                            name="pr"
                            value="low"
                            type="radio"
                        />

                        <label>Medium</label>
                        <input
                            checked={selectedpr === "medium"}
                            onChange={(e) => setselectedpr(e.target.value)}
                            name="pr"
                            value="medium"
                            type="radio"
                        />

                        <label>High</label>
                        <input
                            checked={selectedpr === "high"}
                            onChange={(e) => setselectedpr(e.target.value)}
                            name="pr"
                            value="high"
                            type="radio"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px] bg-gray-400 mt-4 mb-1" />

            <h2 className="text-xl">Deadline range</h2>

            <div className={styles.taskFormGrid}>
                <div className="flex flex-col items-start">
                    <label>Start Date</label>
                    <input
                        value={startdate}
                        onChange={(e) => setstartdate(e.target.value)}
                        type="date"
                    />
                </div>

                <div className="flex flex-col items-start">
                    <label>End Date</label>
                    <input
                        value={enddate}
                        onChange={(e) => setenddate(e.target.value)}
                        type="date"
                    />
                </div>
            </div>

        </div>

    </div>
</div>
</div>
</div>
</div>
        <div className={styles.addtask}>
            <div className={styles.addtaskbox}>
                        {/* Clickable header */}
        <button
            type="button"
            onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}
            aria-expanded={isAddTaskOpen}
            aria-controls="add-task-form"
            className="flex w-full flex-row items-center justify-between text-left"
        >
            <span className="flex flex-row items-center gap-2">
                <CgAdd size={25} color="blue" />
                <span className="font-semibold">Add New Task</span>
            </span>

            <FiChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                    isAddTaskOpen ? "rotate-180" : ""
                }`}
            />
        </button>

        {/* Animated form */}
        <div
            id="add-task-form"
            className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                isAddTaskOpen
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
            }`}
        >
            <div className="min-h-0 overflow-hidden">

                <div className="flex flex-col gap-3 pt-4">

                    {/* Priority and Status */}
                    <div className={styles.taskFormGrid}>
                        <div className="flex flex-col items-start">
                            <label>Priority</label>
                            <select value={state.priority} onChange={(e) => dispatch({type:"priority",payload:(e.target.value|| "Low")})}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="flex flex-col items-start">
                            <label>Status</label>
                            <select value={state.status} onChange={(e) => dispatch({type:"status",payload:(e.target.value || "Done")})}>
                                <option value={"Done"}>Done</option>
                                <option value={"Todo"}>To Do</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-[90%] mx-auto h-[2px] bg-gray-300" />

                    {/* Assignee and Deadline */}
                    <div className={styles.taskFormGrid}>
                        <div className="flex flex-col items-start">
                            <label>Assignee</label>
                            <select value={state.assignee} onChange={(e) => dispatch({type:"assignee",payload:e.target.value})}>
                                <option value="select">select assignee</option>
                                {memberlist.map((item: memberinfo) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col items-start">
                            <label>Deadline date</label>
                            <input onChange={(e) => dispatch({type:"deadline",payload:e.target.value})} type="date" />
                        </div>
                    </div>

                    <div className="w-[90%] mx-auto h-[2px] bg-gray-300" />

                    {/* Title and Description */}
                    <div className={styles.taskFormGrid}>
                        <div className="flex flex-col items-start">
                            <label>Title</label>
                            <input
                                className="border p-2 rounded-lg"
                                placeholder="Enter new task"
                                onChange={(e) => dispatch({type:"title",payload:e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col items-start">
                            <label>Description</label>
                            <textarea
                                placeholder="What is the task required to achieve..."
                                className="border h-[100px] w-[240px] rounded-lg p-2"
                                onChange={(e) => dispatch({type:"description",payload:e.target.value})}
                            />
                        </div>
                    </div>

                </div>
            <button onClick={handletask} className="h-[40px] rounded-xl bg-blue-200 w-full">+Add new task</button>
            </div>
        </div>
                    </div>
                </div>
                <div className={styles.maincontent}>
                    <div className={styles.contentbox}>
                            <div className="flex flex-col justify-center items-center">
                                <div className="w-[360px] h-[50px] bg-red-400 rounded-t-xl p-1">
                                    <div className="flex flex-row justify-between ">
                                        <div className="flex flex-row gap-0.5">
                                            <p className="font-bold">To Do</p>
                                            <div className="bg-blue-200 mt-1 flex items-center justify-center rounded-4xl w-[20px] h-[20px]">
                                                {filtprogressprjs.length}
                                            </div>
                                        </div>
                                        <div className=" bg-blue-300 rounded-full p-0 w-[20px] h-[20px] flex justify-center items-center">
                                            +
                                        </div>
                                    </div>
                                </div>    
                                <div className="w-[360px]  bg-red-100 pb-2 pt-2 rounded-b-xl flex gap-2 flex-col items-center">
                                    {filtprogressprjs.map(function(item:taskinfo){
                                        return(
                                            <div className="h-[130px] w-[320px] flex flex-col p-2  bg-white rounded-[12px]">
                                                    <div className="flex flex-row justify-between">
                                                        <div className="flex flex-col gap-1 items-start">
                                                            <p className="font-bold">{item.title}</p>
                                                            {item.description.trim().split(/\s+/).length > 5
                                                            ? item.description.trim().split(/\s+/).slice(0, 5).join(" ") + "..."
                                                            : item.description}
                                                        </div>
                                                        <div>
                                                            <Option onEdit={()=> (seteditedtask(item),setedit(true))} onRemove={()=> handleremovedoing(item.id)}/>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row mt-auto gap-9">
                                                        <div className="rounded-full bg-purple-400 h-[30px] w-[70px] ">
                                                            <p>{item.priority}</p>
                                                        </div>
                                                        <div className="flex flex-row ">
                                                            <CiCalendarDate size={25}/>
                                                            <p>{new Date(item.deadline + "T00:00:00").toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short"
                                                            })}
                                                            </p>
                                                        </div>
                                                        <div className="bg-pink-300 flex items-center justify-center rounded-full h-[30px] w-[30px]">
                                                            <p className="text-xs">{item.assignee[0]}</p>
                                                        </div>
                                                    </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className="w-[360px] h-[50px] bg-fuchsia-300 rounded-t-xl p-1">
                                        <div className="flex flex-row justify-between">
                                        <div className="flex flex-row gap-0.5">
                                            <p className="font-bold">Done</p>
                                            <div className="bg-blue-200 mt-1 flex items-center justify-center rounded-4xl w-[20px] h-[20px]">
                                                {filtfinishedprjs.length}
                                            </div>
                                        </div>
                                        <div className=" mt-1 bg-blue-300 rounded-4xl w-[20px] h-[20px] flex justify-center items-center">
                                            +
                                        </div>
                                    </div>
                                </div>    
                                <div className="w-[360px] flex flex-col gap-2 items-center pb-2 pt-2 bg-fuchsia-100 rounded-b-xl">
                                        {filtfinishedprjs.map(function(item:taskinfo){
                                        return(
                                            <div className="h-[130px] w-[320px] flex flex-col p-2  bg-white rounded-[12px]">
                                                    <div className="flex flex-row justify-between">
                                                        <div className="flex  flex-col gap-1 items-start">
                                                            <p className="font-bold">{item.title}</p>
                                                            {item.description.trim().split(/\s+/).length > 5
                                                            ? item.description.trim().split(/\s+/).slice(0, 5).join(" ") + "..."
                                                            : item.description}
                                                        </div>
                                                        <div>
                                                            <Option onEdit={()=> (seteditedtask(item),setedit(true))} onRemove={()=>handleremovedoing(item.id)}/>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="flex flex-row mt-auto gap-9">
                                                        <div className="rounded-full bg-purple-400 h-[30px] w-[70px] ">
                                                            <p>{item.priority}</p>
                                                        </div>
                                                        <div className="flex flex-row ">
                                                            <CiCalendarDate size={25}/>
                                                            <p>{new Date(item.deadline + "T00:00:00").toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short"
                                                            })}
                                                            </p>
                                                        </div>
                                                        <div className="bg-pink-300 flex items-center justify-center rounded-full h-[30px] w-[30px]">
                                                            <p className="text-xs">{item.assignee[0]}</p>
                                                        </div>
                                                    </div>
                                            </div>
                                        )
                                            })}
                                </div>
                            </div>
                            
                    </div>
                </div>
        </div>
    )
}


export default Tasks;