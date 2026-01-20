import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface LineGraphProps{
    projectTask:any;
  }
export default function LineGraph({ projectTask }:LineGraphProps){
  
    const [dateWiseSeriesData,setDateWiseSeriesData] = useState<any>(projectTask.dateSeriesData);
    const [dateWiseOptions , setDateWiseOptions] = useState<any>({
        chart: {
            height: 350,
            type: 'line',
            id: "weekChart",
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
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
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: projectTask.dateOptionsCategory,
            title: {
                text: 'Date'
            }
        },
        yaxis: {
            title: {
                text: 'Counts'
            }
        },
        legend: {
            position: 'top',
            // horizontalAlign: 'right',
            // floating: true,
            // offsetY: -25,
            // offsetX: -5
        }
    });
  
    // Date Function Values Update
    const handleLineDateWise=()=>{
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
            ApexCharts.exec('weekChart', 'updateOptions', dateWiseOptions);
            ApexCharts.exec('weekChart', 'updateSeries', dateWiseSeriesData);
        }
    },[dateWiseOptions,dateWiseSeriesData])

  
    useEffect(()=>{
      handleLineDateWise(); 
    },[projectTask])
  
    return (
      <ReactApexChart options={dateWiseOptions} series={dateWiseSeriesData} type="line" height={350} />                
    )
  }