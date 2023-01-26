import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { useScroll } from "@react-three/drei"
import Sprite from "./Sprite"

const height = -0.8395688058435915

const points = [
  new THREE.Vector3(-4, height, -6.3),
  new THREE.Vector3(0, height, -6.3),
  new THREE.Vector3(0, height, -6),
  new THREE.Vector3(0, height, -2.27),
  new THREE.Vector3(0.5, height, -1.75),
  new THREE.Vector3(-1, height, -0.25),
  new THREE.Vector3(-2.25, height, -0.0),
  new THREE.Vector3(-4.25, height, 0.0),
  new THREE.Vector3(-5.55, height, 0.15),
]

const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0)
const curveDetail = new THREE.CatmullRomCurve3(
  curve.getSpacedPoints(100),
  false,
  "catmullrom",
  0
)

const calculateIdealOffset = (target: THREE.Sprite | THREE.Mesh) =>
  new THREE.Vector3(1, 2, 2).add(target.position)

const calculateIdealLookAt = (target: THREE.Sprite | THREE.Mesh) =>
  target.position

export default function Track() {
  const mesh = useRef<THREE.Sprite>(null!)
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))
  const scroll = useScroll()

  useFrame((state) => {
    const t = scroll.offset || 0
    curveDetail.getPoint(t, mesh.current.position)

    const { camera } = state

    const idealOffset = calculateIdealOffset(mesh.current)
    camera.position.lerp(idealOffset, 0.1)
    cameraTarget.current.lerp(calculateIdealLookAt(mesh.current), 0.1)
    camera.lookAt(cameraTarget.current)
  })

  return <Sprite ref={mesh} />
}
