
export const generateID = (length:number) => {
    const digits = '0123456789';
    let ID = '';
    for (let i = 0; i < length; i++) {
      ID += digits[Math.floor(Math.random() * 10)];
    }
    return ID;
};

export const handleCheckCompletedSubTaks=(arr:any)=>{
  let totalLeangth = arr.length;
  let completed = arr.filter((vl:any)=> vl.checkedstatus === true).length;
  return `${completed} of ${totalLeangth} completed tasks`;
};

export const handleDate=(date:string)=>{
  return new Date(date)
}

export const handleGetCurrentDate=()=>{
  let year=new Date().getFullYear();
  let month=Months[new Date().getMonth()];
  let date= new Date().getDate()
  return `${year}-${month}-${date}`
}

export const PositionsData = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left"
];

export const TaskStatus = [
  {
    value:'Added',
    label:'Added'
  },
  {
    value:'Started',
    label:'Started'
  },
  {
    value:'Completed',
    label:'Completed'
  }
];

export const TaskPriority = [
  {
    value:'High',
    label:'High'
  },
  {
    value:'Medium',
    label:'Medium'
  },
  {
    value:'Low',
    label:'Low'
  }
];


export const Months = ["01", "02", "03", "04", "05", "06", "07",
"08", "09", "10", "11", "12"];