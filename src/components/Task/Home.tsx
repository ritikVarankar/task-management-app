import { useContext, useEffect, useState } from "react";
import Content from "../Content/Content";
import Modal from "../Reusable/Modal/Modal";
import TextInput from "../Reusable/TextInput/Textinput";
import TextAreaInput from "../Reusable/TextArea/TextAreaInput";
import CustomSelect from "../Reusable/Select/CustomSelect";
import CustomButton from "../Reusable/Button/CustomButton";
import AuthContext from "../context/AuthContext";
import { TaskPriority, TaskStatus, generateID, handleCheckCompletedSubTaks } from "../Reusable/Data";
import { useDispatch, useSelector } from "react-redux";
import { addProject, addTask, editProject, editTask, existingProject, removeProject, removeTask } from "../redux/tasksReducer";
import Task from "./Task";


function Home() {

  const taskStatus=TaskStatus;
  const taskPriority=TaskPriority;
  const dispatch=useDispatch();
  const myContext=useContext(AuthContext);
  const projectList= useSelector((state:any) => state.tasks);
  const [projectTask, setProjectTask] = useState<any>({
    searchText:'',
    projectName:'',  // Add or Edit Project
    selectProject:'', // Based on select project display list
    modalMethod:"", //  Add or Edit Task Method
    listId:'',      // Used for delete/Edit task in project
    taskName:'',
    description:'',
    subtasks:[
      { 
        id: generateID(3),
        subTaskName:'',
        checkedstatus:false
      }
    ],
    status:'',
    existingStatus:'',
    priority:'',
    selectEditProject:'',
    projectEditName:''

  });
  const handleProjectTaskOnchange = (text: string, input: string) => {
    setProjectTask((prevState: any) => ({ ...prevState, [input]: text }));
  };
  const handleAddProjectSubTaskOnchange=(text:string,obj:any)=>{
    setProjectTask((prevState: any) => ({ ...prevState, [text]: [...prevState[text],obj] }));
  }
  const handleRemoveProjectSubTaskOnchange=(index:number,text:string)=>{
    setProjectTask((prevState: any) =>{
        return {...prevState,[text]:prevState[text].filter((dt:any,i:number)=> i !== index).map((vl:any)=>{return vl})}
    });
  }
  const handleProjectSubTaskOnchange=(eventValue:any,index:number,text1:string,text2:string)=>{
    setProjectTask((prevState: any) =>{
        return {
            ...prevState,
            [text1]:prevState[text1].map((vl:any,i:number)=>{
                        if(i===index){
                            return {
                                ...vl,
                                [text2]:eventValue
                            }
                        }else{
                            return vl;
                        }
                    })
            }
    });
  }
  const [errors, setErrors] = useState<any>({}); 
  const handleError = (error: any, input: string) => {
      setErrors((prevState: any) => ({ ...prevState, [input]: error }));
  };
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const deleteToggle = () => {
    setdeleteModalOpen(!deleteModalOpen);
  };
  const handledeleteToggle= (e:any,dataObj:any) => {
    e.stopPropagation();
    deleteToggle();
    handleProjectTaskOnchange(dataObj.listId, "listId");
    handleProjectTaskOnchange(dataObj.status, "status");
  };
  const handleDeleteModalMethod=()=>{
    dispatch(removeTask(projectTask));
    deleteToggle();
  }
  const [addModalOpen, setaddModalOpen] = useState(false);
  const addToggle = () => {
    setaddModalOpen(!addModalOpen);
  };
  const handleaddToggle= (e:any,method:string,data:any) => {
    e.stopPropagation();
    if(projectTask.selectProject){
      handleProjectTaskOnchange(method, "modalMethod");
      if(method === 'Edit'){
        handleProjectTaskOnchange(data.taskName, "taskName");
        handleProjectTaskOnchange(data.description, "description");
        handleProjectTaskOnchange(data.subtasks, "subtasks");
        handleProjectTaskOnchange(data.status, "status");
        handleProjectTaskOnchange(data.priority, "priority");
        handleProjectTaskOnchange(data.listId, "listId");
        handleProjectTaskOnchange(data.status, "existingStatus");
      }
      addToggle();
    }else{
      myContext.showToast("Please select project","failure");
      handleError("Please select project", "selectProject");
    }    
  };
  const [viewModalOpen, setviewModalOpen] = useState(false);
  const viewToggle = () => {
    setviewModalOpen(!viewModalOpen);
  };
  const handleviewToggle= (e:any,method:string,data:any) => {
    handleProjectTaskOnchange(data.taskName, "taskName");
    handleProjectTaskOnchange(data.description, "description");
    handleProjectTaskOnchange(data.subtasks, "subtasks");
    handleProjectTaskOnchange(data.status, "status");
    handleProjectTaskOnchange(data.status, "existingStatus");
    handleProjectTaskOnchange(data.priority, "priority");
    handleProjectTaskOnchange(data.listId, "listId");
    viewToggle();
  };
  const handleSetLocalStorage=()=>{
    if(projectTask.selectProject){
      localStorage.setItem("tasks",JSON.stringify(projectList.tasks));
      localStorage.setItem("selectProject",projectTask.selectProject);
    }
  }
  useEffect(()=>{
    handleSetLocalStorage();
  },[projectList,projectTask.selectProject])
  useEffect(()=>{
    let dataTask:any = localStorage.getItem("tasks");
    let selectProject:any = localStorage.getItem("selectProject");
    if(dataTask && selectProject){
      dispatch(existingProject(JSON.parse(dataTask)));
      handleProjectTaskOnchange(selectProject, "selectProject");
    }
    return ()=>{
      handleSetLocalStorage();
    }
  },[])
  const addDeleteProjectFn=async(e:any)=>{
    e.preventDefault();

    let arr:any=[];
    await Promise.all(
      projectList.tasks.map((dt:any)=>{
        if(projectTask.projectName === dt.project && myContext.projectMethod !== "Edit"){
            arr.push(dt)
        }
        if(projectTask.selectEditProject === dt.projectEditName && myContext.projectMethod === "Edit"){
          arr.push(dt)
        }
      })
    )

    if(myContext.projectMethod === "Add"){
      if (arr.length === 0) {
        dispatch(addProject(projectTask.projectName));
        myContext.addProjectToggle();
        myContext.showToast("Project added successfully", "success");
        handleClear();
      } else{
        handleError("Project name already exists", "projectName");
      }
    }else if(myContext.projectMethod === "Delete"){
      dispatch(removeProject(arr[0].projectId));
      myContext.addProjectToggle();
      myContext.showToast("Project deleted successfully", "success");
      handleClear();
    }else if(myContext.projectMethod === "Edit"){
      handleEditProject();
    }
  }
  const handleClear=()=>{
    handleProjectTaskOnchange('', "projectName");
    let subtasks:any=[
      { 
        id: generateID(3),
        subTaskName:'',
        checkedstatus:false
      }
    ];
    handleProjectTaskOnchange('', "modalMethod");
    handleProjectTaskOnchange('', "taskName");
    handleProjectTaskOnchange('', "description");
    handleProjectTaskOnchange(subtasks, "subtasks");
    handleProjectTaskOnchange('', "status");
    handleProjectTaskOnchange('', "priority");
    handleProjectTaskOnchange('', "selectEditProject");
    handleProjectTaskOnchange('', "projectEditName");
    handleProjectTaskOnchange('', "existingStatus");


    handleError(null, "projectName");
    handleError(null, "projectEditName");
  }
  const handleProjectClear=()=>{
    handleProjectTaskOnchange('', "projectName");
    handleProjectTaskOnchange('', "selectEditProject");
    handleProjectTaskOnchange('', "projectEditName");
    if(projectTask.modalMethod === "Edit"){
      handleProjectTaskOnchange('', "selectProject");
    }

    handleError(null, "projectName");
    handleError(null, "projectEditName");
  }
  const handleAddTask=(e:any)=>{
    e.preventDefault();

    if(projectTask.modalMethod === "Edit"){
      dispatch(editTask(projectTask));
    }else if(projectTask.modalMethod === "Add"){
      dispatch(addTask(projectTask));
    }
    addToggle();
    handleClear();
  }
  const handleViewStatusOnChange=(e:any)=>{
    handleProjectTaskOnchange(e.target.value, "status");
    let obj={
      ...projectTask,
      status:e.target.value
    }
    dispatch(editTask(obj));
    viewToggle();
  }
  const handleViewSubTaskOnChange=(e:any,index:any,data:any)=>{
    handleProjectSubTaskOnchange(e.target.checked,index,"subtasks","checkedstatus");
    let arr = projectTask.subtasks.map((vl:any)=>{
      if(vl.id === data.id){
        return {...vl, checkedstatus : e.target.checked};
      }else{
        return vl;
      }
    })
    let obj = { 
      ...projectTask,
      subtasks:arr
    }
    dispatch(editTask(obj));
  }

  const handleEditProject=()=>{
    
    if(projectList.tasks.filter((dt:any)=>dt.project === projectTask.projectEditName).length === 0){
      dispatch(editProject(projectTask));
      myContext.addProjectToggle();
      myContext.showToast("Project edited successfully", "success");
      handleClear();    
      handleProjectTaskOnchange('', "selectProject");
    }else{
      handleError("This project name already exists", "projectEditName");
    }
  }


  return (
    <Content>
      <div className="search-wrapper">
        <TextInput 
          labelClassName=""
          labelName={""}
          classDivName="text-search-field" 
          classErrorName="error-text" 
          classIconName="fa-solid fa-magnifying-glass" 
          classInputName="login-input-field"
          iconshow={true}  
          inputtype="text" 
          placeholder="Search by name and description" 
          required 
          value={projectTask.searchText}
          onChange={(e: any) => {handleProjectTaskOnchange(e.target.value, "searchText");}}
          error={false}
        />
        <div className="text-search-div-field">
          <CustomSelect 
            labelClassName=""
            labelName=""
            classDivName="text-select-search-field" 
            classErrorName="error-text" 
            classIconName="fa-solid fa-user" 
            classInputName="text-select-field"
            placeholder="Select Project" 
            required 
            selectVisible={false}
            selectVisibleText='Select Project'
            optionData={projectList.tasks}
            value={projectTask.selectProject}
            onChange={(e: any) => {handleProjectTaskOnchange(e.target.value, "selectProject");}}
            error={errors.selectProject}
            onFocus={() => handleError(null, "selectProject")}
          />
        </div>
        <CustomButton classInputName="add-btn add-task-btn" inputtype="button" buttonText="Add Task" value="Add Task" onClick={(e:any)=>handleaddToggle(e,'Add',{})} />
      </div>

      {
        (projectList.tasks.filter((vl:any) => vl.project === projectTask.selectProject).length === 0 || !projectTask.selectProject) ?  (
          <div className="task-wrapper-empty">
            <ul>
              <li>
                <label>Project are empty.</label>
              </li>
              <li>
                <label>Please create new project using profile section</label>
              </li>
              <li>
                <label>After creating project, please select project and add new tasks.</label>
              </li>
              <li>
                <label>After creating list and selecting project, project based list will be displayed.</label>
              </li>
            </ul>
          </div>
        ) : (
            <Task 
              projectTask={projectTask}
              listProject={projectList.tasks.filter((vl:any) => vl.project === projectTask.selectProject)}
              handleviewToggle={handleviewToggle}
              handledeleteToggle={handledeleteToggle}
              handleaddToggle={handleaddToggle} 
            />
        )
      }
  
      {/* Delete task in the project */}
      <Modal isOpen={deleteModalOpen} toggle={deleteToggle}>
        <p className='modal-line'>Are you sure you want to delete ?</p>
        <div className="custom-modal-footer">
          <button type="button" className="cancel-btn" onClick={deleteToggle}>Cancel</button>
          <button type="button" className="delete-btn" onClick={handleDeleteModalMethod}>Delete</button>
        </div>
      </Modal>

      {/* View Task */}
      <Modal title={''} isOpen={viewModalOpen} toggle={viewToggle}>
        <div className="add-form">
          
          <div className="edit-task-title">
            {projectTask.taskName}
          </div>
          <div className="task-description">
            {projectTask.description}
          </div>

          <div className="subtask-wrapper">
            <div className="edit-task-subtitle">SubTasks ({handleCheckCompletedSubTaks(projectTask.subtasks)})</div>
            {
              projectTask.subtasks.map((dt:any,index:number)=>(
                <div className="edit-checkbox" key={index}>
                  <input type="checkbox" id="signupCheck" value={dt.checkedstatus} 
                    onChange={(e:any)=>handleViewSubTaskOnChange(e,index,dt)} checked={dt.checkedstatus} />
                  <label htmlFor="signupCheck">{dt.subTaskName}</label>
                </div>
              ))
            }
          </div>
             
          <div className="add-margin">
            <CustomSelect 
              labelClassName="text-label"
              labelName="Status"
              classDivName="text-select-div-field"
              classErrorName="error-text"
              classIconName="fa-solid fa-user"
              classInputName="text-select-field"
              placeholder="Add Title"
              required
              selectVisible={true}
              optionData={taskStatus}
              value={projectTask.status}
              onChange={handleViewStatusOnChange} 
              selectVisibleText={""} 
              error={false}           
            />
          </div>

        </div>
      </Modal>

      {/* Task Can be add or edit */}
      <Modal title={ projectTask.modalMethod === "Edit" ? 'Edit Task' : 'Add Task'} isOpen={addModalOpen} toggle={()=>{addToggle(); handleClear();}}>
        <form className="add-form" onSubmit={handleAddTask}>
          <div className="add-margin-bottom">
            <TextInput 
              labelClassName="text-label"
              labelName={"Name"}
              classDivName="text-field" 
              classErrorName="error-text" 
              classIconName="fa-solid fa-user" 
              classInputName="login-input-field"
              iconshow={false}  
              inputtype="text" 
              placeholder="Task Name" 
              required 
              value={projectTask.taskName}
              onChange={(e: any) => {handleProjectTaskOnchange(e.target.value, "taskName");}}
              error={errors.taskName}
              onFocus={() => handleError(null, "taskName")}
            />
          </div>

          <div className="add-margin-bottom">
            <TextAreaInput 
              labelClassName="text-label"
              labelName={"Description"}
              classDivName="text-area-field" 
              classErrorName="error-text"  
              classInputName="login-input-field"
              placeholder="Description" 
              rows={6}
              required 
              value={projectTask.description}
              onChange={(e: any) => {handleProjectTaskOnchange(e.target.value, "description");}}
              error={errors.description}
              onFocus={() => handleError(null, "description")}
            />
          </div>
          <div className="add-margin-bottom">
            <label htmlFor="Sub Tasks"  className="text-label">Sub Tasks</label>
            {
              projectTask.subtasks.map((dt:any, index: number)=>(
                <div className="close-wrapper" key={index}>
                  <TextInput 
                    labelClassName="text-label"
                    labelName=""
                    classDivName="text-field"
                    classErrorName="error-text"
                    classIconName="fa-solid fa-user"
                    classInputName="login-input-field"
                    iconshow={false}
                    inputtype="text"
                    placeholder={`Sub Tasks ${index + 1}`}
                    required
                    value={dt.subTaskName}
                    onChange={(e: any) => handleProjectSubTaskOnchange(e.target.value, index, "subtasks", "subTaskName")} 
                    error={false}
                  />
                  <i className={`fa-solid fa-xmark close-solid-icon ${index === 0 && "close-mark-visible"}`}  onClick={()=>handleRemoveProjectSubTaskOnchange(index,"subtasks")}></i>
                </div>
              ))
            }
            <div className="custom-modal-footer">
              <CustomButton classInputName="add-btn" inputtype="button" buttonText="Add SubTasks +" value="Add SubTasks +"  onClick={()=>handleAddProjectSubTaskOnchange("subtasks",{ id: generateID(3), subTaskName:'', checkedstatus:false })} />
            </div>
          </div>
          
          <div className="add-margin-bottom">
            <CustomSelect 
              labelClassName="text-label"
              labelName="Status"
              classDivName="text-select-div-field"
              classErrorName="error-text"
              classIconName="fa-solid fa-user"
              classInputName="text-select-field"
              placeholder="Add Title"
              required
              optionData={taskStatus}
              value={projectTask.status}
              onChange={(e: any) => { handleProjectTaskOnchange(e.target.value, "status"); } }
              error={errors.status}
              onFocus={() => handleError(null, "status")} 
              selectVisibleText={""} 
              selectVisible={false}            
            />
          </div>

          <div className="add-margin-bottom">
            <CustomSelect 
              labelClassName="text-label"
              labelName="Priority"
              classDivName="text-select-div-field"
              classErrorName="error-text"
              classIconName="fa-solid fa-user"
              classInputName="text-select-field"
              placeholder="Select Priority"
              required
              optionData={taskPriority}
              value={projectTask.priority}
              onChange={(e: any) => { handleProjectTaskOnchange(e.target.value, "priority"); } }
              error={errors.priority}
              onFocus={() => handleError(null, "priority")} 
              selectVisibleText={""} 
              selectVisible={false}            
            />
          </div>
          
          <div className="custom-modal-footer add-margin-top">
            <CustomButton classInputName="cancel-btn" inputtype="button" buttonText="Cancel" value="Cancel" onClick={()=>{addToggle(); handleClear();}} />
            <CustomButton classInputName="add-btn" inputtype="submit" buttonText={projectTask.modalMethod === "Edit" ? 'Save' : 'Add'} value={projectTask.modalMethod === "Edit" ? 'Save' : 'Add'} />
          </div>

        </form>
      </Modal>

      {/* Project can be easily add or edit or delete */}
      <Modal title={`${myContext.projectMethod} Project`} isOpen={myContext.addProjectModalOpen} toggle={()=>{ myContext.addProjectToggle(); handleProjectClear();}}>
        <form className="add-form" onSubmit={addDeleteProjectFn}>

          {
            myContext.projectMethod === "Add" && (
              <div className="add-margin-bottom">
                <TextInput 
                  labelClassName="text-label"
                  labelName={"Project Name"}
                  classDivName="text-field" 
                  classErrorName="error-text" 
                  classIconName="fa-solid fa-user" 
                  classInputName="login-input-field"
                  iconshow={false}  
                  inputtype="text" 
                  placeholder="Project Name" 
                  required 
                  value={projectTask.projectName}
                  onChange={(e: any) => {handleProjectTaskOnchange(e.target.value, "projectName");}}
                  error={errors.projectName}
                  onFocus={() => handleError(null, "projectName")}
                />
              </div>
            )
          }
          {
            myContext.projectMethod === "Edit" && (
              <>
                <div className="add-margin-bottom">
                  <CustomSelect 
                    labelClassName="text-label"
                    labelName="Project List"
                    classDivName="text-select-search-field" 
                    classErrorName="error-text" 
                    classIconName="fa-solid fa-user" 
                    classInputName="text-select-field"
                    placeholder="Project List" 
                    required 
                    selectVisible={false}
                    selectVisibleText='Project List'
                    optionData={projectList.tasks}
                    value={projectTask.selectEditProject}
                    onChange={(e: any) => {handleProjectTaskOnchange(e.target.value, "selectEditProject");}}
                    error={errors.selectEditProject}
                    onFocus={() => handleError(null, "selectEditProject")}
                  />
                </div>
                <div className="add-margin-bottom">
                  <TextInput 
                    labelClassName="text-label"
                    labelName={"Project Name"}
                    classDivName="text-field" 
                    classErrorName="error-text" 
                    classIconName="fa-solid fa-user" 
                    classInputName="login-input-field"
                    iconshow={false}  
                    inputtype="text" 
                    placeholder="Project Name" 
                    required 
                    value={projectTask.projectEditName}
                    onChange={(e: any) => {handleProjectTaskOnchange(e.target.value, "projectEditName");}}
                    error={errors.projectEditName}
                    onFocus={() => handleError(null, "projectEditName")}
                  />
                </div>
                
              </>
            )
          }
          {
            myContext.projectMethod === "Delete" && (
              <div className="add-margin-bottom">
                <CustomSelect 
                  labelClassName="text-label"
                  labelName="Project List"
                  classDivName="text-select-div-field"
                  classErrorName="error-text"
                  classIconName="fa-solid fa-user"
                  classInputName="text-select-field"
                  placeholder="Project List"
                  required
                  optionData={projectList.tasks}
                  value={projectTask.projectName}
                  onChange={(e: any) => { handleProjectTaskOnchange(e.target.value, "projectName"); } }
                  error={errors.projectName}
                  onFocus={() => handleError(null, "projectName")} 
                  selectVisibleText={""} 
                  selectVisible={false}                
                />
              </div>
            )
          }
          
          <div className="custom-modal-footer add-margin-top">
            <CustomButton classInputName="cancel-btn" inputtype="button" buttonText="Cancel" value="Cancel" onClick={()=>{myContext.addProjectToggle(); handleProjectClear();}} />
            {
              myContext.projectMethod === "Add" && (              
                <CustomButton classInputName="add-btn" inputtype="submit" buttonText="Add" value="Add" />
              )
            }
            {
              myContext.projectMethod === "Edit" && (              
                <CustomButton classInputName="add-btn" inputtype="submit" buttonText="Save" value="Save" />
              )
            }
            {
              myContext.projectMethod === "Delete" && (              
                <CustomButton classInputName="add-btn" inputtype="submit" buttonText="Delete" value="Delete" />
              )
            }
          </div>

        </form>
      </Modal>

    </Content>
  );
}

export default Home;

