import React, { useEffect, useState } from 'react';
import moment from 'moment';
import "./task.css";
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import TokenContext from '../../context/TokenContext.js';
import axios from 'axios';

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    // function temp()
    // {

    
//     const token = localStorage.getItem("authToken");
//     const { user_ } = useContext(TokenContext);
//     return user_
//     }
//     const [user,setUser]=useState({})

//     useEffect(()=>
// {

// },[])
    const handleRemove = (e) => {
        e.preventDefault();
        const confirmdelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmdelete) return;
        

        dispatch({
            type: "REMOVE_TASK",
            id
        })
    }

    const handleMarkDone = async(e) => {
        //const confirmdone = window.confirm("Mark task as completed?");
        //if (!confirmdone) return;
        if (!e.target.checked) {
            const confirmIncomplete = window.confirm("Mark task as incomplete?");
            if (!confirmIncomplete) return;
        }
        if (e.target.checked) {
            const confirmcomplete = window.confirm("Mark task as complete?");
            if (!confirmcomplete) return;
        }
        dispatch({
            type: "MARK_DONE",
            id
        })
       
        // console.log("user id ",localStorage.getItem('user_id'));
        const result=await axios.post('http://localhost:8000/api/task/update',{id:task._id});
        console.log(result);
        console.log(task._id)

    }
    return (
        <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
            </div>
            <div className="task-info text-slate-900 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <div className=' italic opacity-60'>
                    {
                        task?.createdAt ? (
                            <p>{moment(task.createdAt).fromNow()}</p>
                        ) : (
                            <p>just now</p>
                        )
                    }
                </div>
            </div>
            <div className="remove-task text-sm text-white">
                <DeleteIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    size="large"
                    onClick={handleRemove}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" />
            </div>
        </div>
    );
}

export default Task;