import { useState,useRef,useEffect } from "react"
import { HiOutlineDotsVertical } from "react-icons/hi";
import styles from "./option.module.css"


type optiontype={
  onEdit: ()=>void;
  onRemove:()=>void;
}



function Option({onEdit,onRemove}:optiontype){
    
    const [openmenu,setopenmenu]=useState(false)
    const menuref=useRef<HTMLDivElement>(null);
    
    useEffect(function(){
        function handleclick(event:any){
            if(menuref.current && !menuref.current.contains(event.target)){
                setopenmenu(false);
            }
        }
        
        document.addEventListener("mousedown",handleclick);
        
        return () => {
            document.removeEventListener("mousedown", handleclick);
        }
    },[])

    return(
        <div className={styles.more_options} ref={menuref}>
      <button
        className={styles.dots_button}
        onClick={() => setopenmenu(!openmenu)}
        aria-label="More options"
        aria-expanded={openmenu}
      >
        <HiOutlineDotsVertical size={25} />
      </button>

      {openmenu && (
        <div className={styles.dropdown_menu}>
          <button
            onClick={() => {
              setopenmenu(false);
              onEdit();
            }}
          >
            Edit
          </button>

          <button
            className={styles.remove_option}
            onClick={() => {
              setopenmenu(false);
              onRemove();
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}



export default Option;