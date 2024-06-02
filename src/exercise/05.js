// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'
import {useEffect, useRef} from 'react'

function Tilt({children}) {
  const tiltRoot = useRef()

  useEffect(() => {
    const tiltNode = tiltRoot.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })
    return () => tiltRoot.vanillaTilt.destroy()
  }, [])

  return (
    <div className="tilt-root" ref={tiltRoot}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
