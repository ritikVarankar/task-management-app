import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { updateDraggableList } from "../redux/tasksReducer";
import { handleGetCurrentDate } from "../Reusable/Data";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface TaskProps{
    listProject:any;
    handleviewToggle:any;
    handledeleteToggle:any;
    handleaddToggle:any;
    projectTask:any;
}
export default function Task({ projectTask, listProject,handleviewToggle,handledeleteToggle,handleaddToggle }:TaskProps){
  const [demoVl,setDemoVl] = useState<string>('');
  const projectList= useSelector((state:any) => state.tasks);
  const dispatch = useDispatch();
  const [listData,setListData] = useState<any>({
    Added:[],
    Started:[],
    Completed:[], 
  });

  const handleSearch = (query:any) => {
    const searchList1 = listProject[0].list["Added"].filter((item:any) => {
      return (item.taskName.toLowerCase() + item.description.toLowerCase()).indexOf(query.toLowerCase()) !== -1;
    });
    const searchList2 = listProject[0].list["Started"].filter((item:any) => {
      return (item.taskName.toLowerCase() + item.description.toLowerCase()).indexOf(query.toLowerCase()) !== -1;
    });
    const searchList3 = listProject[0].list["Completed"].filter((item:any) => {
      return (item.taskName.toLowerCase() + item.description.toLowerCase()).indexOf(query.toLowerCase()) !== -1;
    });
    setListData((prevObj:any)=>({...prevObj,["Added"]:searchList1,["Started"]:searchList2,["Completed"]:searchList3}));
  };

  useEffect(()=>{
    if(demoVl !== ''){
      let objDemo={
        ...projectTask,
        list:{
          ...listData
        }
      }
      dispatch(updateDraggableList(objDemo));
      setDemoVl('');
    }
  },[demoVl])

  useEffect(()=>{
    if(projectTask.searchText !== '' && listProject[0].list.length !== 0){
      handleSearch(projectTask.searchText);
    }else{
      setListData(listProject[0].list);
    }
  },[listProject])


  const onDragEnd = (result:any, columns:any, setColumns:any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn];
      const destItems = [...destColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      const obj = {
        ...removed,
        status: destination.droppableId,
        date: handleGetCurrentDate()
      }
      destItems.splice(destination.index, 0, obj);
      setColumns({
        ...columns,
        [source.droppableId]:[
          ...sourceItems
        ],
        [destination.droppableId]:[
          ...destItems
        ]
      });
      setDemoVl('Drag');
      
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: [
          ...copiedItems
        ]
      });
      setDemoVl('Drag');
    }
  };

    return (
      <DragDropContext onDragEnd={(result) => onDragEnd(result, listData, setListData)}>
        {/* <div className="task-wrapper"> */}

        <Container>
        <Row>
          
          <TaskList 
            listStatus={'Added'} 
            list={listData["Added"]} 
            listLength={listData["Added"].length}
            handleviewToggle={handleviewToggle} handledeleteToggle={handledeleteToggle} handleaddToggle={handleaddToggle}  
          />
          <TaskList 
            listStatus={'Started'} 
            list={listData["Started"]} 
            listLength={listData["Started"].length}
            handleviewToggle={handleviewToggle} handledeleteToggle={handledeleteToggle} handleaddToggle={handleaddToggle}  
          />
          <TaskList 
            listStatus={'Completed'} 
            list={listData["Completed"]} 
            listLength={listData["Completed"].length}
            handleviewToggle={handleviewToggle} handledeleteToggle={handledeleteToggle} handleaddToggle={handleaddToggle}  
          />
          </Row>
          </Container>
        {/* </div> */}
      </DragDropContext>
    )
}