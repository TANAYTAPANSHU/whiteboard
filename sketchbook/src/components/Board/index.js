import { MENU_ITEMS } from "@/constants";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionItemclick } from "../slice/menuSlice";
import socket from "../../socket";

function Board() {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  //to check whether drawing can be done
  const shouldDrawRef = useRef(null);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.tool[activeMenuItem]);

  //mounting the component
  useEffect(() => {
    const canvas = canvasRef?.current;

    //connecting with web socket
    socket.on("connect", () => {
 
    });
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
        socket.emit("beginPath", { x: e.clientX, y: e.clientY });
      };

      const handleMouseMove = (e) => {
        if (!shouldDrawRef.current) return;
        drawLine(e.clientX, e.clientY);
        socket.emit("drawLine", { x: e.clientX, y: e.clientY });
      };

      const handleMouseUp = (e) => {
        shouldDrawRef.current = false;
        //taking imageData for undo and redo
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        //pushing the data to the drawHistory ref array , which is used for redo and undo
        drawHistory.current.push(imageData);
        //history pointer pointing to the latest element 
        historyPointer.current = drawHistory.current.length - 1;
      };

      const handleBeginPath = (path) =>{
        beginPath(path.x,path.y)
      }

      const handleDrawLine = (path) =>{
        drawLine(path.x,path.y)
      }
    
      socket.on('beginPath',handleBeginPath)
      socket.on('drawLine',handleDrawLine)

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
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (drawHistory.current[historyPointer.current - 1]) {
        const imageData = drawHistory.current[historyPointer.current - 1];
        context.putImageData(imageData, 0, 0);
        if (historyPointer.current > 0) {
          historyPointer.current -= 1;
        }
      }
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      if (drawHistory.current[historyPointer.current + 1]) {
        const imageData = drawHistory.current[historyPointer.current + 1];
        context.putImageData(imageData, 0, 0);

        historyPointer.current += 1;
      }
    }
    dispatch(actionItemclick(null));
  }, [actionMenuItem]);

  //effect will be called once color and size is changed apart from initial render
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')

    const changeConfig = (color, size) => {
        context.strokeStyle = color
        context.lineWidth = size
    }

    const handleChangeConfig = (config) => {
        console.log("config", config)
        changeConfig(config.color, config.size)
    }
    changeConfig(color, size)
    socket.on('changeConfig', handleChangeConfig)

    return () => {
        socket.off('changeConfig', handleChangeConfig)
    }
}, [color, size])

  return <canvas ref={canvasRef}></canvas>;
}

export default Board;
