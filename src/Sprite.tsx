import { useFrame } from "@react-three/fiber"
import { useAseprite } from "./hooks/useAseprite"
import { useScroll } from "@react-three/drei"
import { forwardRef, useRef } from "react"
import * as THREE from "three"
import json from "./ninja.json"

type Direction = "North" | "South" | "East" | "West"
type Action = "Idle" | "Walk" | "Run" | "AttackA"

//
const d = new THREE.Vector3()

const findDirection = (v: THREE.Vector3) => {
  if (v.x) {
    return Math.sign(v.x) === -1 ? "West" : "East"
  }

  if (v.y) {
    return "North"
  }

  if (v.z) {
    return Math.sign(v.z) === -1 ? "North" : "South"
  }
}

const Sprite = forwardRef<THREE.Sprite, any>((props, ref) => {
  const direction = useRef<Direction>("North")
  const action = useRef<Action>("Idle")

  const prevPosition = useRef(new THREE.Vector3(0, 0, 0))

  const [texture, setFrame] = useAseprite("ninja.png", json, "IdleNorth", false)

  const setDirection = (d: Direction) => (direction.current = d)
  const setAction = (a: Action) => (action.current = a)

  useFrame(() => {
    if (!ref) return null

    //@ts-ignore
    const sprite = ref.current

    d.subVectors(sprite.position, prevPosition.current)

    if (d && d.length() > 0.001) {
      //@ts-ignore
      setDirection(findDirection(d))

      setAction("Run")
    } else {
      setAction("Idle")
    }

    setFrame(`${action.current}${direction.current}`)
    prevPosition.current.copy(sprite.position)
  })

  return (
    <group position={[0.001, 0.25, 0.015]}>
      <mesh ref={ref} {...props} castShadow receiveShadow>
        <planeGeometry />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </group>
  )
})

export default Sprite
