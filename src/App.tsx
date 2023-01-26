import { ScrollControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Track from "./Track"
import { World } from "./World"

const App = () => (
  <div className='App'>
    <Canvas>
      <ScrollControls pages={3}>
        <color args={["#303636"]} attach='background' />
        <Track />
        <World />
      </ScrollControls>
    </Canvas>
  </div>
)

export default App
