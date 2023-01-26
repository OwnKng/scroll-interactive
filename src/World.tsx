import { Center, useGLTF } from "@react-three/drei"
import { useTexture } from "@react-three/drei"

export function World(props: any) {
  const { nodes } = useGLTF("/lowpoly.glb") as any

  const bakedTexture = useTexture("/bakedTexture.jpg")

  return (
    <Center>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube119.geometry}
          position={[29.2, 0.04, 0.06]}
          scale={[0.56, 1.39, 1.39]}
        >
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>
      </group>
    </Center>
  )
}

useGLTF.preload("/lowpoly.glb")
