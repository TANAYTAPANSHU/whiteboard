import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "../../constants";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { changeBrushSize, changeColor } from "../slice/toolboxSlice";
import socket from "../../socket";
import { useEffect } from "react";

function Toolbox() {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const dispatch = useDispatch();
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;
  const { color, size } = useSelector((state) => state.tool[activeMenuItem]);


  const updateBrushSize = (e) => {
    // console.log(e.target.value)
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
    socket.emit('changeConfig',{color, size: e.target.value})
  };

  const updateColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
    socket.emit('changeConfig',{color : newColor, size})
  };

  return (
    <div className={styles.toolboxContainer}>
      {/* on part  */}
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h1>{activeMenuItem}</h1>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            {Object.keys(COLORS).map((key, index) => {
              if (key !== "WHITE")
                return (
                  <div
                    key={index}
                    className={cx(styles.colorBox, {
                      [styles.active]: color === COLORS[key],
                    })}
                    style={{ background: COLORS[key] }}
                    onClick={() => updateColor(COLORS[key])}
                  />
                );
            })}
          </div>
        </div>
      )}

      {/* second part */}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Range slider</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={size}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Toolbox;
