import styles from './Box.module.scss'
import { Jitter } from './Visualizations'
import { useEffect, useState } from 'react'

const JitterBox = ({
  label = 'Jitter',
  setter = null,
  hideCanvas = false,
  showDetails = false,
  infoClick = () => {},
}) => {
  const [isActive, setIsActive] = useState(false)
  const datapoints = 25
  const [graphData, setGraphData] = useState([])
  const [delta, setDelta] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((active) => {
        if (active) {
          setGraphData((graphdata) => {
            graphdata.push(Math.floor(Math.random() * 3) - 1)
            setDelta((x) => x + graphdata[graphdata.length - 1])
            if (graphdata.length > datapoints) {
              graphdata.shift()
            }
            return graphdata
          })
          if (setter) {
            setter((value) => parseInt(value) + graphData[graphData.length - 1])
          }
        }
        return active
      })
    }, 10)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={styles.box}>
      <label style={{ color: 'white', textAlign: 'center', width: '100%' }}>
        <h1 style={{ marginRight: '1rem' }}>{label}</h1>
      </label>
      {!hideCanvas && (
        <Jitter jitter={graphData} datapoints={datapoints} totaldelta={delta} />
      )}
      <div className={'button-container'}>
        <button onClick={() => setIsActive((x) => !x)}>
          {isActive ? 'turn off' : 'turn on'}
        </button>
        <button
          onClick={() => {
            setDelta(0)
          }}
        >
          reset delta
        </button>
      </div>
      {showDetails && (
        <button onClick={() => infoClick(label)} className={styles.infoBtn}>
          i
        </button>
      )}
    </div>
  )
}

export default JitterBox