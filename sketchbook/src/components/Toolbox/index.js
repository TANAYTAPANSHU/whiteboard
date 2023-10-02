import styles from './index.module.css'
import { COLORS, MENU_ITEMS } from '../../constants'
import cx from 'classnames';

function Toolbox() {
  
    const updateBrushSize = (e) => {
        // console.log(e.target.value)
    }

  return (
    <div className={styles.toolboxContainer}>
      {/* on part  */}
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
        <div className={styles.colorBox}  style={{background: COLORS.BLACK}} />
        <div className={styles.colorBox}  style={{background: COLORS.RED}} />
        <div className={styles.colorBox}  style={{background: COLORS.GREEN}} />
        <div className={styles.colorBox}  style={{background: COLORS.BLUE}} />
        <div className={styles.colorBox}  style={{background: COLORS.ORANGE}} />
        <div className={styles.colorBox}  style={{background: COLORS.YELLOW}} />
        </div>
      </div>
      {/* second part */}
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Range slider</h4>
        <div className={styles.itemContainer}>
          <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} />
        </div>
      </div>
    </div>
  );
}

export default Toolbox;
