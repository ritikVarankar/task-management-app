import { createSlice } from "@reduxjs/toolkit";
import { generateID, handleGetCurrentDate } from "../Reusable/Data";

/**
 * Login Id generateID(4)
 * Task List Id generateID(5)
 * Sub Task List Id generateID(3)
 * Project Id generateID(3)
 */

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: { status:"fulfilled", tasks: [
    {
      projectId: generateID(6),
      project:'Task Management',
      label: 'Task Management',
      value: 'Task Management',
      list:{
        Added:[
          {
            listId: generateID(5),
            taskName:'Header Page',
            description:'Create header page to compatible with all other pages',
            subtasks:[
              { 
                id: generateID(3),
                subTaskName:'Create header page',
                checkedstatus:false
              },
              { 
                id: generateID(3),
                subTaskName:'Design header page',
                checkedstatus:false
              },
              { 
                id: generateID(3),
                subTaskName:'Add header component to task and graph page',
                checkedstatus:false
              }
            ],
            status:'Added',
            priority:'High',
            date:'2023-01-01'
          },
          {
            listId: generateID(5),
            taskName:'Project Page Option',
            description:'Create project page option in header profile menu',
            subtasks:[
              { 
                id: generateID(3),
                subTaskName:'Add project option in header profile menu',
                checkedstatus:false
              },
              { 
                id: generateID(3),
                subTaskName:'Edit project option in header profile menu',
                checkedstatus:false
              },
              { 
                id: generateID(3),
                subTaskName:'Delete project option in header profile menu',
                checkedstatus:false
              }
            ],
            status:'Added',
            priority:'Low',
            date:'2023-01-02'
          },
          {
            listId: generateID(5),
            taskName:'Search Bar',
            description:'Create search bar to search task by name and designation',
            subtasks:[
              { 
                id: generateID(3),
                subTaskName:'Design search bar',
                checkedstatus:true
              },
              { 
                id: generateID(3),
                subTaskName:'Add search functionality',
                checkedstatus:false
              }
            ],
            status:'Added',
            priority:'Medium',
            date:'2023-01-02'
          },
        ],
        Started:[
          {
            listId: generateID(5),
            taskName:'Sign In/Sign Up Validation',
            description:'Create login validation for user',
            subtasks:[
              { 
                id: generateID(3),
                subTaskName:'Create login validation for user',
                checkedstatus:false
              },
              { 
                id: generateID(3),
                subTaskName:'Create register validation for user',
                checkedstatus:true
              }
            ],
            status:'Started',
            priority:'High',
            date:'2023-01-01'
          },
          {
            listId: generateID(5),
            taskName:'Add Task Modal',
            description:'Create add task reusable modal for edit purpose',
            subtasks:[
              { 
                id: generateID(3),
                subTaskName:'Add name, description and multiple sub tasks textfield',
                checkedstatus:false
              },
              { 
                id: generateID(3),
                subTaskName:'Add status(Added,Started,Completed) and priority(low,medium,high) dropdown',
                checkedstatus:true
              },
              { 
                id: generateID(3),
                subTaskName:'Add Task Add and Cancel button',
                checkedstatus:true
              }
            ],
            status:'Started',
            priority:'Medium',
            date:'2023-01-01'
          },
          {
            listId: generateID(5),
            taskName:'View Task Modal',
            description:'Create view task',
            subtasks:[
              { 
                id: generateID(3),
                subTaskName:'Add name, sub-task detail, priority and imp buttons',
                checkedstatus:false
              },
              { 
                id: generateID(3),
                subTaskName:'Add delete, view and delete button for task',
                checkedstatus:true
              },
              { 
                id: generateID(3),
                subTaskName:'On View button, task will be display',
                checkedstatus:true
              },
              { 
                id: generateID(3),
                subTaskName:'On Edit button, task will be edit',
                checkedstatus:true
              },
              { 
                id: generateID(3),
                subTaskName:'On delete button, delete modal appear',
                checkedstatus:true
              }
            ],
            status:'Started',
            priority:'Medium',
            date:'2023-01-02'
          },
        ],
        Completed:[
          {
            listId: generateID(5),
            taskName:'Sign In or Sign Up Pages',
            description:'Create sign in or sign up page for user',
            subtasks:[
              { 
                id: generateID(3),
                subTaskName:'Design login page',
                checkedstatus:true
              },
              { 
                id: generateID(3),
                subTaskName:'Design register page',
                checkedstatus:true
              }
            ],
            status:'Completed',
            priority:'Low',
            date:'2023-01-01'
          },
          {
            listId: generateID(5),
            taskName:'Delete Modal',
            description:'Create delete button on view task',
            subtasks:[
              { 
                id: generateID(3),
                subTaskName:'Design delete button and modal',
                checkedstatus:true
              },
              { 
                id: generateID(3),
                subTaskName:'If you click on delete button, delete modal popup open',
                checkedstatus:true
              }
            ],
            status:'Completed',
            priority:'Medium',
            date:'2023-01-02'
          },
        ], 
      }
    },
  ], error:null },
  reducers: {
    existingProject: (state: any, action: any) => {
      state.tasks = action.payload;
    },
    addProject: (state: any, action: any) => {
      let obj={
        projectId: generateID(6),
        project: action.payload,
        label: action.payload,
        value: action.payload,
        list:{
          Added:[],
          Started:[],
          Completed:[], 
        }
      }
      state.tasks.push(obj);
    },
    editProject: (state: any, action: any) => {
      state.tasks = state.tasks.map((dt:any)=>{
        if(dt.project === action.payload.selectEditProject){
          return {
            ...dt, 
            project:action.payload.projectEditName,
            label: action.payload.projectEditName,
            value: action.payload.projectEditName
          }
        }else{
          return dt;
        }
      });
    },
    removeProject: (state: any, action: any) => {
      state.tasks = state.tasks.filter((h: any) => h.projectId !== action.payload);
    },
    addTask: (state: any, action: any) => {
      state.tasks.map((dt:any,index:number)=>{
        if(dt.project === action.payload.selectProject){
          let obj={
            description: action.payload.description,
            status: action.payload.status,
            subtasks: action.payload.subtasks,
            taskName: action.payload.taskName,
            priority:action.payload.priority,
            listId: generateID(5),
            date: handleGetCurrentDate()
          }
          state.tasks[index].list[action.payload.status].push(obj);
        }
      })
    },
    removeTask: (state: any, action: any) => {
      state.tasks=state.tasks.map((dt:any)=>{
        if(dt.project === action.payload.selectProject){
          let arrList = dt.list[action.payload.status].filter((h: any) => h.listId !== action.payload.listId);
          let obj={
            ...dt,
            list:{
              ...dt.list,
              [action.payload.status]:arrList
            }
          }
          return obj;
        }else{
          return dt;
        }
      })
    },
    editTask: (state: any, action: any) => {
      state.tasks=state.tasks.map((dt:any,index:number)=>{
        if(dt.project === action.payload.selectProject){
          let obj:any;
          let arrReqVal:any=[],arrRemVal:any=[];

          if(action.payload.existingStatus === action.payload.status){
            dt.list[action.payload.existingStatus].map((h: any) =>{
                if(h.listId === action.payload.listId){
                  let obj={
                    ...h,
                      description: action.payload.description,
                      status: action.payload.status,
                      subtasks: action.payload.subtasks,
                      taskName: action.payload.taskName,
                      priority:action.payload.priority,
                      date:handleGetCurrentDate()
                    }
                    arrRemVal.push(obj)
                }else{
                  arrReqVal.push(h)
                  }
                });

                obj={
                  ...dt,
                  list:{
                    ...dt.list,
                    [action.payload.existingStatus]: [...arrReqVal,...arrRemVal],
                  }
                }

          }else{
                dt.list[action.payload.existingStatus].map((h: any) =>{
                  if(h.listId !== action.payload.listId){
                    arrReqVal.push(h)
                  }else{
                    let obj={
                        ...h,
                          description: action.payload.description,
                          status: action.payload.status,
                          subtasks: action.payload.subtasks,
                          taskName: action.payload.taskName,
                          priority:action.payload.priority,
                          date:handleGetCurrentDate()
                        }
                        arrRemVal.push(obj)
                      }
                });
                obj={
                  ...dt,
                  list:{
                    ...dt.list,
                    [action.payload.existingStatus]: arrReqVal,
                    [action.payload.status]:  [ ...dt.list[action.payload.status],...arrRemVal]
                  }
                }
          
          }

          return obj;
        }else{
          return dt;
        }
      })
    },
    updateDraggableList:(state: any, action: any) => {
      state.tasks=state.tasks.map((dt:any,index:number)=>{
        if(dt.project === action.payload.selectProject){
          let obj:any;
            obj={
              ...dt,
              list:action.payload.list
            }
          return obj;
        }else{
          return dt;
        }
      })
    }
  },
  extraReducers:(builder)=>{}
});

export const { addProject, removeProject, addTask,
 removeTask,editTask, editProject,updateDraggableList,existingProject } = tasksSlice.actions;
export default tasksSlice.reducer;
