import React from "react";

function CustomButton({classInputName, inputtype, buttonText,  ...otherProps}:any) {
  return (
    <button className={classInputName} type={inputtype} { ...otherProps}>{buttonText}</button>
  );
}

export default CustomButton;
