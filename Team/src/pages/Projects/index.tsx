import { CgAdd } from "react-icons/cg";
import { useState,useEffect } from "react";
import { GoChevronRight } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { projectactions } from "../../redux/slices/projectslice";

interface projectinfo{
    title:string;
    description:string;
    date:Date;
}


function Project(){
    

    const dispatch=useDispatch()
    const [prj,setprj]=useState<projectinfo>(
        {
            title:'',
            date: new Date(),
            description:''
        }
    )
    //the complication stems from date item. when storing dates in localstorage,
    // you have to add them again 
    const [prjllist, setprjlist] = useState<projectinfo[]>(() => {
    try {
        const saved = JSON.parse(localStorage.getItem("project") || "[]");

        return saved.map((item: any) => ({
            ...item,
            date: new Date(item.date)
        }));
    } catch {
        return [];
    }
});

    //always use useEffect when storing, i used this line in createprj function
    // and it only stored the first item because it was asynchronous
    useEffect(function(){
        localStorage.setItem("project",JSON.stringify(prjllist))
    },[prjllist])


    function createprj(){
        if(!prj.title || !prj.description ){
            alert("please fill in the blanks")
            return;
        }else{
            setprjlist([...prjllist,prj])
            setprj({
                title:'',
                date:new Date(),
                description:''})
            }
            dispatch(projectactions.addproject(prjllist))
            console.log(prjllist)
    }

    return(
        <div className="bg-white flex flex-1 min-h-[94.8vh] flex-col">
            <div className="border bg-blue-50 border-gray-100 w-full  h-auto rounded-[8px] mt-2 p-1">
                <div className="flex flex-row gap-3">
                    <CgAdd size={25} color="blue"/>
                    <p>Create new project</p>
                </div>
                <div className="flex items-start mt-2">
                    <input className="border rounded-[8px] w-1/3 p-0.5" placeholder="Project title" value={prj.title} onChange={(e) => {setprj({...prj,title:e.target.value})}}/>
                </div>
                <div className="flex items-start mt-2">
                    <textarea onChange={(e) => {setprj({...prj,description:e.target.value})}} className=" border rounded-[8px] p-0.5 w-3/4 h-[130px]" placeholder="Describe what the project is..." value={prj.description}/>
                </div>
                <div className="mt-2 ">
                    <button onClick={createprj} className="w-full h-[40px] bg-gray-200 rounded-[8px]">+Create Project</button>
                </div>
            </div>
            { 
            <div className="flex flex-wrap m-2 gap-4">
                {prjllist.map(function(item){
                    return(
                        <div className="bg-blue-50 shadow-lg shadow-red-500/50 flex flex-col rounded-lg w-[300px] h-[180px] justify-between items-start p-1">
                            <div className="flex flex-row w-full justify-between p-1">
                                <div className="flex flex-row gap-2">
                                    <div className="bg-red-50 rounded-[4px] w-[60px] h-[60px] items-justify-center ">
                                        <div className="text-3xl">{item.title[0]}</div>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h2>{item.title}</h2>
                                        <p className="text-sm">{item.description}</p>
                                    </div>
                                </div>
                                <div className="w-[27px] h-[27px] bg-gray-400 rounded-4xl flex items-center justify-center">
                                    <GoChevronRight size={25} color="white"/>
                                </div>
                            </div>
                            <div className="flex flex-row ">
                                <CiCalendar size={25}/>
                                <p>: {item.date.toLocaleDateString("en-us",{
                                    month:"long",
                                    year:"numeric",
                                })}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
                
            }
        </div>
    )
}


export default Project;