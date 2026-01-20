import { useEffect, useState } from 'react';
import './App.css';
import AuthContext from './components/context/AuthContext';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Loader from './components/Reusable/Loader/loader';
import RouteComponent from './components/RouteComponent';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import { generateID } from './components/Reusable/Data';
import ToastList from './components/Reusable/Toastreusbale/ToastList/ToastList';

function App() {
  const [userName,setUserName] = useState<any>('');
  const [loader,setLoader] = useState<any>(false);
  const [addProjectModalOpen, setaddProjectModalOpen] = useState(false);
  const [projectMethod,setProjectMethod] = useState<any>(false);

  useEffect(()=>{
    handleReloadData(); // eslint-disable-next-line
   },[]) 
 
   const handleReloadData = () =>{
     let UserName =  localStorage.getItem('userName');
     if(UserName){
      loginUserName(UserName);
     }
   }
   
  const addProjectToggle = () => {
    setaddProjectModalOpen(!addProjectModalOpen);
  };
  const handleProjectMethod=(method:string)=>{
    setProjectMethod(method);
    addProjectToggle();
  }
  const loginUserName=(userName:any)=>{
    setUserName(userName);
    localStorage.setItem('userName',userName);
  }
  const handleLoader=(loaderBool:boolean)=>{
    setLoader(loaderBool);
  }
  const handleLogout=()=>{
    setUserName("");
    localStorage.removeItem('userName');
    localStorage.removeItem('tasks');
    localStorage.removeItem('selectProject');
  }

  const [position, setPosition] = useState('top-right');
  const [toasts, setToasts] = useState<any>([]);
  const [autoClose, setAutoClose] = useState<boolean>(true);
  const [autoCloseDuration, setAutoCloseDuration] = useState<number>(5);
  const handlePositionMethod=(method:string)=>{
    setPosition(method);
  }
  const removeAllToasts = () => {
    setToasts([]);
  };
  const handleDurationChange = (number:number) => {
    setAutoCloseDuration(number);
  };
  const handleAutoCloseChange = () => {
    setAutoClose((prevAutoClose) => !prevAutoClose);
    removeAllToasts();
  };

  const showToast = (message:string, type:string) => {
    const toast = {
      id: generateID(3),
      message,
      type,
    };

    setToasts((prevToasts:any) => [...prevToasts, toast]);

    if (autoClose) {
      setTimeout(() => {
        removeToast(toast.id);
      }, autoCloseDuration * 1000);
    }
  };

  const removeToast = (id:any) => {
    setToasts((prevToasts:any) => prevToasts.filter((toast:any) => toast.id !== id));
  };

  return (
    <AuthContext.Provider value={{
      userName:userName,
      loader:loader,
      addProjectModalOpen:addProjectModalOpen,
      projectMethod:projectMethod,
      position:position,
      handlePositionMethod:handlePositionMethod,
      addProjectToggle:addProjectToggle,
      handleLoader:handleLoader,
      loginUserName:loginUserName,
      handleLogout:handleLogout,
      handleProjectMethod:handleProjectMethod,
      removeAllToasts:removeAllToasts,
      showToast:showToast,
      handleDurationChange:handleDurationChange,
      handleAutoCloseChange:handleAutoCloseChange
    }}>
      <Provider store={store}>
        {/* For gh deployment use HashRouter  */}
        {/* For git push use BrowserRouter  */}
        <HashRouter> 
          <RouteComponent />
        </HashRouter> 
        <Loader />
       <ToastList data={toasts} position={position} removeToast={removeToast} />
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
