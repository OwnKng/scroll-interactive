import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { useScroll } from "@react-three/drei"

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
  new THREE.Vector3(-6, height, 0.15),
]

const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0)
const curveDetail = new THREE.CatmullRomCurve3(
  curve.getPoints(100),
  false,
  "catmullrom",
  0
)

const calculateIdealOffset = (target: THREE.Mesh) =>
  new THREE.Vector3(2, 2, 2).add(target.position)

const calculateIdealLookAt = (target: THREE.Mesh) => target.position

export default function Track() {
  const mesh = useRef<THREE.Mesh>(null!)
  const pos = useRef(0)
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))
  const scroll = useScroll()

  useFrame((state) => {
    const t = scroll.offset
    curveDetail.getPoint(t, mesh.current.position)
    mesh.current.position.y += 0.5

    const { camera } = state

    const idealOffset = calculateIdealOffset(mesh.current)
    camera.position.lerp(idealOffset, 0.1)
    cameraTarget.current.lerp(calculateIdealLookAt(mesh.current), 0.1)
    camera.lookAt(cameraTarget.current)
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshNormalMaterial />
    </mesh>
  )
}
