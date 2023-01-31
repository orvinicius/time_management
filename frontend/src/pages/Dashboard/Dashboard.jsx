import styles from './Dashboard.module.css';


import tasksService from '../../services/tasksService'

// hooks
import { useEffect, useState } from 'react';

const Dashboard = ({ newTask, userName }) => {

    const [tasks, setTasks] = useState([]);
    const [tasksTime, setTasksTime] = useState([]);



    useEffect(() => {

        const getTasks = async () => {

            const userTasks = await tasksService.getUserTasks()

            setTasks(userTasks);
        }

        getTasks();

    }, []);

    useEffect(() => {

        const getTasksTime = async () => {

            const tasksTime = await tasksService.getUserTasks()

            //get tasks time
            const taskTimesMap = tasksTime.map((time) => {
                return time.taskTime
            })

            let taskTimeSum = taskTimesMap.reduce((sum, taskTime) => sum + taskTime)
            console.log(taskTimeSum);

            setTasksTime(taskTimeSum);
        }

        getTasksTime();

    }, []);


    return (
        <div className={styles.container}>
            <div>
                <p className={styles.p}>Hello, {userName}!</p>
            </div>

            <div>
                <p className={styles.tag}>Daily Overview </p>
            </div>
            <div className={styles.tasks_count}>
                <div className={styles.clock}>
                    <img src={require('../../assets/clock-icon.png')} alt="clock icon" />
                    <span><p>

                        {("0" + Math.floor((tasksTime / 3600000) % 60)).slice(-2)}:

                        {("0" + Math.floor((tasksTime / 60000) % 60)).slice(-2)}:

                        {("0" + Math.floor((tasksTime / 1000) % 60)).slice(-2)}

                    </p></span>
                </div>
                <div className={styles.tasks}>
                    <span><p>{tasks.length}</p></span>
                    <img src={require('../../assets/task-icon.png')} alt="task icon" />
                </div>
            </div>
            <div className={styles.graphic_container}>
                <div className={styles.graphic}></div>
            </div>
            <div className={styles.newTask}>
                <button onClick={newTask} >New Task</button>
            </div>
        </div>
    )
}

export default Dashboard