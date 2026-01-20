import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Toast from "../Toast/Toast";
import "./ToastList.css";

export default function ToastList({ data, position, removeToast }:any){

  const listRef = useRef<any>(null);

  const handleScrolling = (el:any) => {
    const isTopPosition = ["top-left", "top-right"].includes(position);
    if (isTopPosition) {
      el?.scrollTo(0, el.scrollHeight);
    } else {
      el?.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [position, data]);

  const sortedData = position.includes("bottom")
    ? [...data].reverse()
    : [...data];

    if(sortedData.length === 0){
      return null
    }

  return (
    <div
      className={`toast-list toast-list--${position}`}
      aria-live="assertive"
      ref={listRef}
    >
      {sortedData.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

};

ToastList.defaultProps = {
  position: "bottom-right",
};

ToastList.propTypes = {
  data: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired,
  removeToast: PropTypes.func.isRequired,
};

