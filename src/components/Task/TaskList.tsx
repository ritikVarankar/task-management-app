import { handleCheckCompletedSubTaks } from "../Reusable/Data";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Col from 'react-bootstrap/Col';

interface TaskListProps{
    listStatus:string;
    list:any;
    listLength:any;
    handleviewToggle:any;
    handledeleteToggle:any;
    handleaddToggle:any;

}
export default function TaskList({ listStatus, list, listLength, handleviewToggle, handledeleteToggle, handleaddToggle }:TaskListProps){

    const handlePriority=(priority:string)=>{
        if(priority === "High"){
            return (<div className="chip chip-high">{priority}</div>)
        }else if(priority === "Medium"){
            return (<div className="chip chip-medium">{priority}</div>)
        }else if(priority === "Low"){
            return (<div className="chip chip-low">{priority}</div>)
        }
    }
    return(
        <Droppable droppableId={listStatus}>
            {(provided) => (
            <Col sm={4} className="task-item"  {...provided.droppableProps} ref={provided.innerRef}>
                <h1>{listStatus} ({listLength})</h1>

                {
                    list.map((dt:any,index:number)=>(
                        <Draggable draggableId={dt.listId} index={index} key={dt.listId}>
                            {
                                (provided, snapshot) => {
                            
                                return (
                                    <div className="task-item-card"  
                                        key={dt.listId} 
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps} 
                                    >
                                        
                                        <div className="task-item-content">
                                            <div className="task-title">{dt.taskName}</div>
                                            <p className="task-subtitle">{ handleCheckCompletedSubTaks(dt.subtasks) }</p>
                                        </div>
                                        <div className="task-button-content">
                                            { handlePriority(dt.priority) }
                                            <div className="card-btn-wrapper">
                                                <i className="fa-solid fa-eye"  onClick={(e:any)=>handleviewToggle(e,'View',dt)}></i>
                                                <i className="fa-solid fa-trash-can" onClick={(e:any)=>handledeleteToggle(e,dt)}></i>
                                                <i className="fa-solid fa-pen-to-square" onClick={(e:any)=>handleaddToggle(e,'Edit',dt)}></i>
                                            </div>
                                        </div>
                                    </div>
                                );

                                }
                            }
                        </Draggable>
                    ))
                }
                {provided.placeholder}
            </Col>
             )}
        </Droppable>
    )

}