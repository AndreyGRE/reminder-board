import React, { useState } from "react"
import './App.css'

function App() {
    const [taskList, setTaskList] = useState(['первое','второе','третье'])
    const [text, setText] = useState('')
    const [hiddenEdit,setHiddenEdit] = useState(false)
    const [index, setIndex] = useState(null)
    const [editText, setEditText] = useState('')
    
    function Change (e) {
        setText(e.target.value)
    }
    
    async function AddTask () {
        if(text){
            setTaskList([...taskList,text]);
            document.getElementById('inputList').value = '';
            setText('')   
        } 
    
    }
    
    async function removeTask (i) {
        const elem = document.getElementById(i)
        elem.classList.add("removeEl")
        await new Promise((r) => setTimeout(r, 250))
        setTaskList([...taskList.slice(0,i),...taskList.slice(i+1)])
        elem.classList.remove("removeEl") 
    }

    function editTask (i) {
        setHiddenEdit(true)
        setIndex(i)
        setEditText(taskList[i])
    }

    function edit (){
        return (
        <div className="edit">
            <p>редактирование задачи №{index + 1}</p>
            <p>Было: "{taskList[index]}"</p>
            <input onChange={ChangeEdit} value={editText}/>
            <button 
            onClick={() => {
                setHiddenEdit(false)
                setTaskList([...taskList.slice(0,index),editText,...taskList.slice(index+1)])
            }}
            >
                законичть редактирование
            </button>
        </div>
        )
    }

    function ChangeEdit (e) {
        setEditText(e.target.value)
    }

    function CompletedTask (i){
        const checkbox = document.getElementById(`checkbox${i}`)
        const el = document.getElementById(i)
        if(checkbox.checked){
            el.classList.add("CompletedTask")
        }else{
            el.classList.remove("CompletedTask")
        }   
    }

    function SortList () {
        taskList.sort()
        setTaskList([...taskList])
    }

    return (
		<div className="App">
            <div className="newTaskList">
                <p>Добавление новой задачи</p>
                <input id='inputList' className="newTask" onChange={Change}/>
                <button className="addTaskList" onClick={AddTask}>
                    Добавить задачу
                </button>
            </div>
            {hiddenEdit && edit()}
            <div className="sort">
                <button className="SortList" onClick={SortList}>А-Я</button>
            </div>
            <div className="allList">
                {
                    taskList.map((text,index)=>{
                        return ( 
                            <div  className='List'
                                // className={index === taskList.length - 1 ? "List newEllement" : "List"}
                                id={index} 
                                key={index} 
                            >
                                <div className="ListItem">
                                    <div>Задача №{index + 1} </div>
                                    <div>{text}</div>
                                    <div className="button">
                                        <button className="removeTask" onClick={()=> removeTask(index)}>
                                            удалить задачу
                                        </button>
                                        <button className="editTask" onClick={()=>editTask(index)}>
                                            редактировать задачу
                                        </button >
                                    </div>
                                </div>
                                <label htmlFor='statys' >выполненно </label>  
                                <input  className="Checkbox" id={`checkbox${index}`} type="checkbox" name='statys' onClick={() => CompletedTask(index)}/>
                            </div>
                            )
                    })
                }
            </div>
        </div>
	);
}

export default App;

