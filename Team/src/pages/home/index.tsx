import { useRef } from "react";
import { useSelector } from "react-redux";
import Pic1 from "./../../assets/Pic1.png";
import type { Rootstate } from "./../../redux/index";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import styles from "./home.module.css"


type projectinfo = {
    id: string;
    title: string;
    description: string;
    date: string;
};

function Home() {
    const projectlist = useSelector(
        (state: Rootstate) => state.project || []
    );

    const projectScrollRef = useRef<HTMLDivElement>(null);

    const scrollProjects = (direction: "left" | "right") => {
        projectScrollRef.current?.scrollBy({
            left: direction === "right" ? 336 : -336,
            behavior: "smooth"
        });
    };

    return (
        <div>
            <div className="flex items-start">
                <img src={Pic1} className={styles.wrapper}/>
            </div>

            <div>
                <h2 className="font-bold mt-2 flex items-start text-xl">My projects </h2>

                <div className="flex items-center gap-2 mt-2">

                    {/* Left button */}
                    <button
                        onClick={() => scrollProjects("left")}
                        className="w-9 h-9 shrink-0 flex items-center justify-center
                        bg-gray-100 hover:bg-gray-200 rounded-full"
                        aria-label="Scroll projects left"
                    >
                        <FiChevronLeft size={24} />
                    </button>

                    {/* Scrollable projects */}
                    <div
                        ref={projectScrollRef}
                        className="flex flex-row gap-4 flex-1 min-w-0
                        overflow-x-auto scroll-smooth pb-2
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden"
                    >
                        {projectlist.map((item: projectinfo) => (
                            <div
                                key={item.id}
                                className="w-[320px] h-[160px] shrink-0
                                rounded-[6px] p-2 bg-blue-100
                                flex flex-col"
                            >
                                {/* Project information */}
                                <div className="flex flex-row justify-between gap-2">

                                    <div className="flex flex-row gap-2 min-w-0">

                                        <div className="w-[60px] h-[50px] shrink-0
                                        flex items-center justify-center
                                        bg-blue-50 rounded-[4px]">
                                            <p className="text-2xl">
                                                {item.title[0]}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-start min-w-0">
                                            <p className="font-bold text-xl">
                                                {item.title}
                                            </p>

                                            <p className="truncate max-w-full text-justify">
                                                {item.description.trim().split(/\s+/).length > 3
                                                ? item.description.trim().split(/\s+/).slice(0, 3).join(" ") + "..."
                                                : item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-[28px] w-[28px] shrink-0
                                    flex items-center justify-center
                                    bg-gray-100 rounded-full">
                                        <FiChevronRight size={25} />
                                    </div>
                                </div>

                                {/* Date stays at the bottom */}
                                <div className="mt-auto flex items-center">
                                    <CiCalendarDate size={25} />

                                    <p>
                                        {new Date(item.date).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "2-digit",
                                                month: "short"
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right button */}
                    <button
                        onClick={() => scrollProjects("right")}
                        className="w-9 h-9 shrink-0 flex items-center justify-center
                        bg-gray-100 hover:bg-gray-200 rounded-full"
                        aria-label="Scroll projects right"
                    >
                        <FiChevronRight size={24} />
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Home;
