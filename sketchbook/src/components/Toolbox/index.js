import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "../../constants";
import cx from "classnames";
import { useSelector } from "react-redux";

function Toolbox() {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;

  const updateBrushSize = (e) => {
    // console.log(e.target.value)
  };

  return (
    <div className={styles.toolboxContainer}>
      {/* on part  */}
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h1>{activeMenuItem}</h1>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={styles.colorBox}
              style={{ background: COLORS.BLACK }}
            />
            <div
              className={styles.colorBox}
              style={{ background: COLORS.RED }}
            />
            <div
              className={styles.colorBox}
              style={{ background: COLORS.GREEN }}
            />
            <div
              className={styles.colorBox}
              style={{ background: COLORS.BLUE }}
            />
            <div
              className={styles.colorBox}
              style={{ background: COLORS.ORANGE }}
            />
            <div
              className={styles.colorBox}
              style={{ background: COLORS.YELLOW }}
            />
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
              max={10}
              step={1}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Toolbox;
