import React from 'react'
import { Canvas } from '@react-three/fiber'
import TestBox from "./components/TestBox"
import {Game} from "./components/Game";

function App() {
  return (
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TestBox position={[-1.2, 0, 0]} />
        <TestBox position={[1.2, 0, 0]} />
        <Game/>
      </Canvas>
  )
}

export default App
