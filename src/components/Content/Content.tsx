import React from "react";
import Header from "../Header/Header";

function Content({ children }:any) {
  return(
    <>
        <Header />
        <div className="content-body">
            {children}
        </div>
    </>
  );
}

export default Content;
