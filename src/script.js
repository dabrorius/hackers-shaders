import './style.css'
import * as THREE from 'three'
import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/fragment.glsl'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        elapsed: { value: 0 }
    }
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.position.z = -1;
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.OrthographicCamera(- 0.5, 0.5, 0.5, - 0.5, 0, 100)
camera.position.z = 2;
scene.add( camera );


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const timer = new THREE.Clock();

/**
 * Animate
 */
const tick = () =>
{
    const elapsedTime = timer.getElapsedTime();
    material.uniforms.elapsed.value = elapsedTime;

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()