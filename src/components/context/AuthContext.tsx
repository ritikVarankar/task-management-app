import React from 'react';

export default React.createContext({
    userName:'',
    loader:false,
    addProjectModalOpen:false,
    projectMethod:'',
    position:'',
    addProjectToggle:() => {
        return;
    },
    handleProjectMethod:(method:string) => {
        return;
    },
    handlePositionMethod:(method:string) => {
        return;
    },
    loginUserName:(userName:string) => {
        return;
    },
    handleLoader:(loaderBool:boolean) => {
        return;
    },
    handleLogout:() => {
        return;
    },
    removeAllToasts:() => {
        return;
    },
    showToast:(message:string, type:string) => {
        return;
    },
    handleDurationChange:(number:number) => {
        return;
    },
    handleAutoCloseChange:() => {
        return;
    },
});
