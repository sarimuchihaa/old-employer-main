import React from "react";
import Button from "./Button";
import { CloseIcon } from "../icon";

const OffCanvas = ({ isOpen, toggleMenu, title, children, buttonText, saveBtnHandler }) => {
  return (
    <div>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${isOpen ? "block" : "hidden"
          }`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-black"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-4 h-[80%]">{children}</div>
        <div className="p-4 border-t w-full">
          <Button
            text={buttonText}
            classes={"w-full py-[10px]"}
            varient={"primary"}
            onClick={saveBtnHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default OffCanvas;
