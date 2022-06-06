import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import {i} from 'mathjs'

function App() {
  const [distance, setDistance] = useState(200)
  const [wavelength, setWavelength] = useState(200)
  const [power, setPower] = useState(1) // in W
  const [reflm1, setReflm1] = useState(0.9)
  const [reflm2, setReflm2] = useState(0.9)
  const [opticalGain, setOpticalGain] = useState(0)

  const [wavenumber, setWavenumber] = useState(undefined)
  const [phaseShift, setPhaseShift] = useState(undefined)
const [trans1, setTrans1] = useState(0)
const [trans2, setTrans2] = useState(0)

  useEffect(() => {
    setWavenumber(2*Math.PI/wavelength)
  },[wavelength])

  useEffect(() => {
    setPhaseShift((wavenumber*10*distance)/10 % (2*Math.PI))
  },[wavenumber, distance])
 
  useEffect(() => {
    setReflm1(x => {setTrans1(Math.sqrt(1.0 - Math.pow(x, 2))); return x})
    setReflm2(x => {setTrans2(Math.sqrt(1.0 - Math.pow(x, 2))); return x})
  },[reflm1, reflm2])

  // TODO correctly implement i
  useEffect(() => {
    console.log(i)
    console.log(`Optical Gain: ${trans1/(1-Math.pow((reflm1* reflm2*Math.E, 2*i*wavenumber*distance)))}`)
    setOpticalGain(trans1/(1-Math.pow((reflm1* reflm2*Math.E, 2*i*wavenumber*distance))))
  }, [reflm1, reflm2, trans1, wavenumber, distance])

  return (
    <div className="App">
      <div className="controls">

      <label>Laser Power: 
      <input type="number" min="0" max="5000" step="1" onChange={e => setPower(e.target.value)} value={power}/>
      Watts
      </label>

      <label>Cavity Length: 
      <input type="value" value={distance} min="0" max="100000" onChange={e => setDistance(e.target.value)}/>
      {distance}
      </label>

      <label>Lambda: 
      <input type="number" min="0" max="1000" step="0.1" onChange={e => setWavelength(e.target.value)} value={wavelength}/>
      </label>

      <label>M1 Refl: 
      <input type="number" value={reflm1} min="0" max="1" step="0.01" onChange={e => setReflm1(e.target.value)}/>
      </label>

      <label>M2 Refl: 
      <input type="number" value={reflm2} min="0" max="1" step="0.01" onChange={e => setReflm2(e.target.value)}/>
      </label>
      </div>
      <div className="results">
        <label>Wave Number: 
        <input type="text" value={wavenumber} disabled /> 
        </label>

        <label>Phase Shift: 
        <input type="text" value={phaseShift} disabled /> 
        rad
        </label>

        <label>Transmission Mirror 1: 
        <input type="text" value={trans1} disabled /> 
        </label>

        <label>Transmission Mirror 2: 
        <input type="text" value={trans2} disabled /> 
        </label>


      </div>
    </div>
  );
}

export default App;