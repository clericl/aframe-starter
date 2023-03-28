/**
 * A component that forces its modified entity to always face the camera.
 */

const cameraTrackerComponent = {
  init() {
    this.camera = document.getElementById('camera')
  },
  tick() {
    const cameraElement = document.getElementById('camera');
    const parentElement = this.el.parentNode
    const targetElement = this.el

    const lookAtYPoint = new THREE.Vector3(
      cameraElement.object3D.position.x,
      parentElement.object3D.position.y,
      cameraElement.object3D.position.z
    );
    parentElement.object3D.lookAt(lookAtYPoint);

    const targetRotation = new THREE.Vector3(
      THREE.MathUtils.lerp(
        cameraElement.object3D.rotation.x,
        targetElement.object3D.rotation.x,
        0.5
      ),
      targetElement.object3D.rotation.y,
      targetElement.object3D.rotation.z
    );
    
    targetElement.object3D.rotation.setFromVector3(targetRotation);
  }
}

export default cameraTrackerComponent
