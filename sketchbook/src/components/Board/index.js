import React, { useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux';

function Board() {
    const canvasRef = useRef(null)
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem )
    const {color, size} = useSelector((state) => state.tool[activeMenuItem])

    useEffect(()=>{
        const canvas = canvasRef?.current; 
        if(canvas){
        const context = canvas.getContext('2d')

        canvas.width = window.innerWidth 
        canvas.height = window.innerHeight; 

        }

    },[])
  return (
   <canvas  ref={canvasRef}>
   </canvas>
  )
}

export default Board