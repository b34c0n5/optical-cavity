import Formula from './Formula.js'
import styles from './Box.module.scss'
import { rgb2string } from './Visualizations.js'

const Box = ({
  min = '0',
  max = '200',
  step = '0.1',
  label = 'defaultLabel',
  setF = { function() {} },
  unit = 'AU',
  value = '0',
  hideCanvas = false,
  formula = null,
  isResult = false,
  showFormula = false,
  rgb = { r: 255, g: 255, b: 255 },
  infoClick = () => console.log('no info text provided'),
  canvasplot = (
    <canvas
      className={styles.visualization}
      style={{ backgroundColor: `${rgb2string(rgb, 0.2)}` }}
    ></canvas>
  ),
}) => {
  return (
    <div className={styles.box}>
      <label style={{ textAlign: 'center' }} htmlFor={'infoTODO'}>
        <h1 style={{ textAlign: 'center' }}>{label}</h1>
      </label>
      <span className={styles.formula}>
        {formula && showFormula && <Formula formula={formula} />}
      </span>
      <span>
        {isResult ? (
          <input type="number" disabled value={value} />
        ) : (
          <input
            id="infoTODO"
            type="number"
            min={min}
            max={max}
            step={step}
            onChange={setF}
            value={value}
          />
        )}
        {unit}
      </span>
      {!hideCanvas && canvasplot}
      {!isResult && (
        <input
          type="range"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={setF}
        />
      )}
      <button onClick={() => infoClick(label)} className={styles.infoBtn}>
        i
      </button>
    </div>
  )
}

export default Box
