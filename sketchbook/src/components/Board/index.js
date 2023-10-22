import { MENU_ITEMS } from "@/constants";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionItemclick } from "../slice/menuSlice";

function Board() {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const drawHistory = useRef([]);;
  const historyPointer = useRef(0);
  //to check whether drawing can be done
  const shouldDrawRef = useRef(null);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.tool[activeMenuItem]);

  //mounting the component
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (canvas.getContext) {
      const context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const beginPath = (x, y) => {
        context.beginPath(); //begin path
        context.moveTo(x, y); //
      };

      const drawLine = (x, y) => {
        context.lineTo(x, y);
        context.stroke();
      };

      const handleMouseDown = (e) => {
        shouldDrawRef.current = true;

        beginPath(e.clientX, e.clientY);
      };

      const handleMouseMove = (e) => {
        if (!shouldDrawRef.current) return;
        drawLine(e.clientX, e.clientY);
      };

      const handleMouseUp = (e) => {
        shouldDrawRef.current = false;
        const imageData = context.getImageData(0,0, canvas.width,canvas.height)
        drawHistory.current.push(imageData);
        console.log("This is the draw history ", drawHistory.current)
        historyPointer.current = drawHistory.current.length -1;
      };

      //added event listener for movements of mouse on canva
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);

      //unmounting the event listeners
      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

  //effect will be called intially and then if actionMenuItem is changed
  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    //this function is only called if actionMenuItem is Download
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    }
    else if (actionMenuItem === MENU_ITEMS.UNDO){
      if(drawHistory.current[historyPointer.current -1])
      {
        const imageData = drawHistory.current[historyPointer.current -1]
        context.putImageData(imageData, 0, 0)
        if(historyPointer.current > 0) 
        {
         historyPointer.current -=1;
        }
      }
    
    }
    else if(actionMenuItem === MENU_ITEMS.REDO){
      if(drawHistory.current[historyPointer.current +1])
      {
        const imageData = drawHistory.current[historyPointer.current +1]
        context.putImageData(imageData, 0, 0)
  
         historyPointer.current +=1;
      
      }

    }
        dispatch(actionItemclick(null));
  }, [actionMenuItem]);

  //effect will be called once color and size is changed apart from initial render
  useEffect(() => {
    //current propery of canvasRef
    const canvas = canvasRef?.current;

    //condition to check whether browser supports HTML5 canvas
    if (canvas.getContext) {
      //Obtaining 2d rendering context of canvas
      const context = canvas.getContext("2d");

      //function for changing style and linewidth
      const changeConfig = () => {
        context.strokeStyle = color;
        context.lineWidth = size;
      };

      changeConfig();
    }
  }, [color, size]);

  return <canvas ref={canvasRef}></canvas>;
}

export default Board;
