


function Navbar(){
    return(
        <div className="bg-mist-500 h-[50px] pt-1.5 w-full text-white flex flex-row justify-around rounded-[2px]">
            <div className="text-xl">
                ⚜Teams⚜
            </div>
            <div className="flex flex-row gap-8">
                <p>Mmebers</p>
                <p>Projects</p>
                <p>Tasks</p>
            </div>
            <div>
                <p>Sign up</p>
            </div>
        </div>
    )
}

export default Navbar;