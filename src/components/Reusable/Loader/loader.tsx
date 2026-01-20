import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import './loader.css';

function Loader() {
    const myContext = useContext(AuthContext);
    useEffect(()=>{
        // console.log("props.isOpen=",props.isOpen);
          if(myContext.loader){
              document.body.style.overflow = 'hidden';
          }else{
              document.body.style.overflow = 'unset';
          }
    },[myContext.loader])

    if(myContext.loader){
        return (
            <div className="loadingWrapper">
               <div className="loadingOverlayWrapperBase">
                <div className="loader"></div>
                    <div>Loading...</div>
               </div>
            </div>
          );
    }
    return <></>;
}

export default Loader;
