import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface OverViewGraphProps{
    projectTask:any;
  }
export default function OverViewGraph({ projectTask }:OverViewGraphProps){
  
    const[overviewSeriesData,setOverviewSeriesData] = useState<any>(projectTask.overviewSeriesData);
    const [overviewOptions , setOverviewOptions] = useState<any>({
        chart: {
            width: 400,
            type: 'pie'
        },
        title: {
            text: projectTask.overviewOptionsTitle,
            align:'center',
            style: {
                fontSize:  '14px',
                fontWeight:  'bold',
                fontFamily:  'Nunito Sans',
                color:  '#4682b4'
            }
        },
        labels: projectTask.overviewOptionsLabel,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 340
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });
  
     // Overview Function Values Update
     const handlePieOverview=()=>{
        let obj:any={
            ...overviewOptions,
            labels: projectTask.overviewOptionsLabel,
            title:{
                ...overviewOptions.title,
                text: projectTask.overviewOptionsTitle,
            }
        }
        setOverviewOptions(obj);
        setOverviewSeriesData(projectTask.overviewSeriesData);
    }
    useEffect(()=>{
        if(projectTask.overviewOptionsTitle && projectTask.overviewSeriesData.length !== 0){
            ApexCharts.exec('overViewChart', 'updateOptions', overviewOptions);
            ApexCharts.exec('overViewChart', 'updateSeries', overviewSeriesData);
        }
    },[overviewOptions,overviewSeriesData])
  
    useEffect(()=>{
      handlePieOverview();  
    },[projectTask])
  
    return (
      <ReactApexChart options={overviewOptions} series={overviewSeriesData} type="pie" width={400} />                 
    )
  }