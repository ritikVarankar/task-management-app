import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface BarGraphProps{
    projectTask:any;
  }
export default function BarGraph({ projectTask }:BarGraphProps){
  
    const [dateWiseSeriesData,setDateWiseSeriesData] = useState<any>(projectTask.dateSeriesData);
    const [dateWiseOptions , setDateWiseOptions] = useState<any>({
        chart: {
            type: 'bar',
            id: "dateChart",
            height: 430
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            // offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            title: {
                text: 'Counts'
            },
            categories:[]
        },
        yaxis: {
            title: {
                text: 'Dates'
            }
        },
        title: {
            text: projectTask.selectProject,
            align:'center',
            style: {
                fontSize:  '15px',
                fontWeight:  'bold',
                fontFamily:  'Nunito Sans',
                color:  '#4682b4'
            }
        }
      });
  
     // Date Function Values Update
    const handleBarDateWise=()=>{
      let obj:any={
          ...dateWiseOptions,
          xaxis:{
              ...dateWiseOptions.xaxis,
              categories: projectTask.dateOptionsCategory
          }
      }
  
      setDateWiseOptions(obj);
      setDateWiseSeriesData(projectTask.dateSeriesData);
    }
    useEffect(()=>{
      if(projectTask.dateOptionsCategory.length !== 0  && projectTask.dateSeriesData.length !== 0){
          ApexCharts.exec('dateChart', 'updateOptions', dateWiseOptions);
          ApexCharts.exec('dateChart', 'updateSeries', dateWiseSeriesData);
      }
    },[dateWiseOptions,dateWiseSeriesData])
  


    useEffect(()=>{
      handleBarDateWise();  
    },[projectTask])
  
    return (      

        <ReactApexChart options={dateWiseOptions} series={dateWiseSeriesData} type="bar" height={430} />  
                   
    )
  }