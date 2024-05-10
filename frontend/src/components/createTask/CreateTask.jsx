import React, { useState ,useEffect} from 'react';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js"
import "./createTask.css"

function CreateTask() {
    const { dispatch } = useContext(TaskContext)
    const {userToken} = useContext(TokenContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tasksAdded, setTasksAdded] = useState(0); // State to keep track of tasks added
    const [progressFill, setProgressFill] = useState(0);
    let [currentLevel, setCurrentLevel] = useState(1); // State for progress bar
    // const [toast, setToast] = useState();
    useEffect(() => {
        // Calculate progress fill based on tasks added
        let maxProgress = 100;
        let progressPerTask = 5; // Assuming 10 tasks complete 100%
        //let progress=0;
        let progress = Math.min((tasksAdded * progressPerTask), maxProgress);
        setProgressFill(progress);
        progress += progressPerTask;
    //const maxProgress = 100;
    if(progress < 0 && currentLevel!==0){
        maxProgress-=100;
        currentLevel--;
        progress=maxProgress+progress;
    }
    if (progress >= maxProgress) {
        maxProgress+=100;
        currentLevel++;
        progress = 0;
    }
        const levelProgress = Math.floor(progress / (maxProgress / 3)); // Dividing progress into 3 levels (beginner, intermediate, professional)
        switch (levelProgress) {
            case 0:
                setCurrentLevel('Beginner');
                break;
            case 1:
                setCurrentLevel('Intermediate');
                break;
            case 2:
                setCurrentLevel('Professional');
                break;
            default:
                setCurrentLevel('Professional');
                break;
        }
    }, [tasksAdded,progressFill,currentLevel]);
    const handleAdd = async (e) => {
        e.preventDefault();
        const confirmAdd = window.confirm("Are you sure you want to add this task?");
        if (!confirmAdd) return;
        try {
            const {_id} = await axios.post("/task/addTask", {title, description},{
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            })
            dispatch({
                type: "ADD_TASK",
                title,
                description,
                _id
        
            })
            //setToast(res.data)
            setTasksAdded(tasksAdded + 1); // showToast();
          } catch (error) {
            console.log(error);
          }
        
        setTitle("")
        setDescription("")
    }
//   const [progress, setProgress] = useState(0);
//   const [progressFill, setFillWidth] = useState(0);
//  // const [level, setLevel] = useState(1);
//  // const [lvlStr, setLvlStr] = useState("Beginner");
//   const [maxProgress, setMaxProgress] = useState(100);
//   const handleAddClick = () => {
//     if (progress < 100) {
//       setProgress(progress + 10);
//     }
//     progressFill.style.width=`${progress}%`
//   };
    // const gainprogress = (points) => {
    //     setprogress(progress + points);
    //     if (progress < 0 && level !== 0) {
    //       setmaxProgress(maxProgress - 100);
    //       levelDown();
    //     }
    //     if (progress >= maxProgress) {
    //       setmaxProgress(maxProgress + 100);
    //       levelUp();
    //     }
    //     const fillWidth = (progress / maxProgress) * 100;
    //     //progressFill.style.width = `${fillWidth}%`;
    //   };
    
    //   const levelUp = () => {
    //     setLevel(level + 1);
    //     setprogress(0);
    //     showLevel(level);
    //   };
    
    //   const levelDown = () => {
    //     setLevel(level - 1);
    //     setprogress(maxProgress + progress);
    //     showLevel(level);
    //   };
    
    //   const showLevel = (level) => {
    //     if (level < 5) {
    //       setLvlStr("Beginner");
    //     } else if (level > 5 && level < 10) {
    //       setLvlStr("Intermediate");
    //     }
    //   };

    // const showToast = () => {
    //     const toast = document.getElementById('toast');
    //     toast.style.display = "block"
    //     setTimeout(hideToast,2000)
    // }
    // const hideToast = () => {
    //     const toast = document.getElementById('toast');
    //     toast.style.display = "none"
    // }
    return (
        <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
            <div className='w-11/12'>
                <form onSubmit={handleAdd}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows={5}
                            name="description"
                            id="description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className=' bg-blue-700 rounded-md text-white px-5 py-1 '
                        >Add</button>
                    </div>
                    {/* <progressBar progress={progress} />  */}
                    <div className="progressBar">
        <div className="progressFill" style={{ width: `${progressFill}%` }}></div>
      </div>
      <div className="levelDisplay text-center mt-2">
                    <p>Current Level: {currentLevel}</p>
                </div>
      {/* <p id="level">Level {level} {lvlStr}</p> */}

                </form>
                <div className="toast bg-green-600 text-white p-3 rounded-xl shadow-2xl text-center absolute bottom-4 left-1/2 -translate-x-1/2" id='toast'>
                    <p>This is test</p>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;