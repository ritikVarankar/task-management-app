import { useContext, useEffect, useState } from "react";
import Content from "../Content/Content";
import { useSelector } from "react-redux";
import CustomSelect from "../Reusable/Select/CustomSelect";
import CustomButton from "../Reusable/Button/CustomButton";
import OverViewGraph from "./subpages/OverViewGraph";
import BarGraph from "./subpages/BarGraph";
import LineGraph from "./subpages/LineGraph";
import AuthContext from "../context/AuthContext";
import { handleDate } from "../Reusable/Data";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Graph() {
  const myContext=useContext(AuthContext);
  const projectList= useSelector((state:any) => state.tasks);
  const [projectTask, setProjectTask] = useState<any>({
    selectProject:'', 

    overviewSeriesData:[],
    overviewOptionsLabel:['Added', 'Started', 'Completed'],
    overviewOptionsTitle:"",
    overviewChartDisplay:false,

    dateSeriesData:[],
    dateOptionsCategory:[],
    dateChartDisplay:false,

  });
  const handleProjectTaskOnchange = (text: any, input: string) => {
    setProjectTask((prevState: any) => ({ ...prevState, [input]: text }));
  };

  const handleSubmit=(e:any)=>{
    e.preventDefault();
    myContext.handleLoader(true);
    handleOverView();
    handleLine();
    setTimeout(()=>{    
      myContext.handleLoader(false);
    },3000)
  }

  const handleOverView=()=>{
    let arr:any = [
      projectList.tasks.filter((vl:any)=> vl.project === projectTask.selectProject)[0].list["Added"].length,
      projectList.tasks.filter((vl:any)=> vl.project === projectTask.selectProject)[0].list["Started"].length,
      projectList.tasks.filter((vl:any)=> vl.project === projectTask.selectProject)[0].list["Completed"].length
    ];
    handleProjectTaskOnchange(arr, "overviewSeriesData");
    handleProjectTaskOnchange(projectTask.selectProject, "overviewOptionsTitle");
    handleProjectTaskOnchange(true, "overviewChartDisplay");
  }
  const handleLine=()=>{

    let addedData=projectList.tasks.filter((vl:any)=> vl.project === projectTask.selectProject)[0].list["Added"];
    let startedData=projectList.tasks.filter((vl:any)=> vl.project === projectTask.selectProject)[0].list["Started"];
    let completeData=projectList.tasks.filter((vl:any)=> vl.project === projectTask.selectProject)[0].list["Completed"];
   

    let addedData1=handleDateWiseArrayCountData(addedData,"Added");
    let startedData1=handleDateWiseArrayCountData(startedData,"Started");
    let completeData1=handleDateWiseArrayCountData(completeData,"Completed");

    const arrayOfObjects = [ ...addedData1, ...startedData1, ...completeData1];

    const mergedObject = arrayOfObjects.reduce((acc, obj) => {
      const key = obj.date; // Replace 'id' with the unique property key
      if (!acc[key]) {
        acc[key] = obj;
      } else {
        acc[key] = { ...acc[key], ...obj };
      }
      return acc;
    }, {});

    const mergedArray = Object.values(mergedObject);
    mergedArray.sort((a:any,b:any)=>{
      let c:any = handleDate(a.date);
      let d:any = handleDate(b.date);
      return c-d;
    });

    let dateArr:any=[];
    let dateAdd:any=[];
    let dateStart:any=[];
    let dateComplete:any=[];
    mergedArray.map((dt:any)=>{
      if(dt.date){
        dateArr.push(dt.date);
        if(dt["Added"]){
          dateAdd.push(dt["Added"]);
        }else{
          dateAdd.push(0);
        }
        if(dt["Started"]){
          dateStart.push(dt["Started"]);
        }else{
          dateStart.push(0);
        }
        if(dt["Completed"]){
          dateComplete.push(dt["Completed"]);
        }else{
          dateComplete.push(0);
        }
      }
    })

    let serirsObj:any=[
      {
        name:'Added',
        data:dateAdd
      },
      {
        name:'Started',
        data:dateStart
      },
      {
        name:'Completed',
        data:dateComplete
      }
    ];

    handleProjectTaskOnchange(serirsObj, "dateSeriesData");
    handleProjectTaskOnchange(dateArr,"dateOptionsCategory");
    handleProjectTaskOnchange(true, "dateChartDisplay");

  }



  const handleDateWiseArrayCountData=(ArrData:any,status:string)=>{
    let addArr:any=[];
    for(let i=0;i<ArrData.length;i++){
      let count=0;
      for(let j=0;j<ArrData.length;j++){

    
        if(ArrData[i].date === ArrData[j].date){
          count=count+1;
        }
      }

      let obj={
        date:ArrData[i].date,
        [status]:count
      }

      if(addArr.length === 0){
        addArr.push(obj);
      }else{
        let arrC=0;
        for(let k=0;k<addArr.length;k++){
          if(addArr[k].date===obj.date){
            arrC=arrC+1;
          }
        }
        if(arrC == 0){
          addArr.push(obj);
        }
      }

    }
    return addArr;
  }

  // useEffect(()=>{
  //   console.log("projectTask=",projectTask,"projectList=",projectList.tasks);
  // },[projectTask])

  
  return(
    <Content>
       <form onSubmit={handleSubmit}>
          <div className="search-wrapper">
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
                onChange={(e: any) => { handleProjectTaskOnchange(e.target.value, "selectProject"); } } 
                error={false}              
              />
            </div>
            <CustomButton classInputName="add-btn add-task-btn" inputtype="submit" buttonText="Submit" value="Submit" />
          </div>
        </form>
        {
          (!projectTask.overviewChartDisplay && !projectTask.dateChartDisplay) && (
            <div className="task-wrapper-empty">
              <ul>
                <li>
                  <label>Please select project and press submit button</label>
                </li>
                <li>
                  <label>Based on the project, you will get a graph</label>
                </li>
              </ul>
            </div>
          )
        }
        
        <Container>
          <Row>
            <Col sm={6} className="p-2">
          {
            projectTask.overviewChartDisplay && (
              <div className="single-graph">
                <OverViewGraph projectTask={projectTask} />
              </div>
            )
          }
          </Col>

          <Col sm={6} className="p-2">

          {
            projectTask.dateChartDisplay && (
              <div className="single-graph">
                <LineGraph projectTask={projectTask} />
              </div>
            )
          }
          </Col>

<Col sm={6} className="p-2">
          
          {
            projectTask.dateChartDisplay && (
              <div className="single-graph">
                <BarGraph projectTask={projectTask} /> 
              </div>
            )
          }
          </Col>

          </Row>
          
        </Container>
    </Content>
  );
}

export default Graph;
