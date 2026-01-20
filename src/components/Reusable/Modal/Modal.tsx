import React, { ReactNode, useEffect } from "react";
import './Modal.css';

interface ModalType {
  title?:string;
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
    useEffect(()=>{
        if(props.isOpen){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'unset';
        }
    },[props.isOpen])
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" >
            <div className="modal-box">
                <div className="modal-content">
                    <div className="custom-modal-header">
                        <div className="modal-header-title">{props.title ? props.title : ''}</div>
                        <i className="fa-solid fa-xmark close-solid-icon" onClick={props.toggle}></i>
                    </div>
                    <div className="custom-modal-body">
                        {props.children}
                    </div>              
                </div>
            </div>
        </div>
      )}
    </>
  );
}
