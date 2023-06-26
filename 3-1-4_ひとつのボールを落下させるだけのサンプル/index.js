const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {  // ここに、教本のJavaScriptの3行目と43行目を除いて、貼り付ける
    // https://playground.babylonjs.com/#C4WLJB#1

    const scene = new BABYLON.Scene(engine);

    // 1.物理エンジンを有効にする
    scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.OimoJSPlugin());　// 追加した
    const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
    const physicsPlugin = new BABYLON.OimoJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    const camera = new BABYLON.FreeCamera("camera1",
        new BABYLON.Vector3(0, 5, -10), scene);
    
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(0, 1, 0), scene);

    light.intensity = 0.7;

    // 2. 地面を設定する
    const ground = BABYLON.MeshBuilder.CreateGround("ground",
        {width: 10, height: 10}, scene);

    // 3.地面に摩擦係数、反撥係数を設定する
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground, BABYLON.PhysicsImpostor.BoxImpostor,
        {mass: 0, friction: 0.4, restitution: 0.8}, scene);
    
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere",
        {diameter: 2, segments: 32}, scene);

    // 4. ボールの表示位置を設定する
    sphere.position.y = 10;

    // 5. ボールに摩擦係数、反撥係数を設定する
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
        sphere, BABYLON.PhysicsImpostor.SphereImpostor,
        { mass: 1, friction: 0.4, restitution: 0.6}, scene);

    return scene;

}

const scene = createScene();

engine.runRenderLoop(() => { scene.render();});

window.addEventListener("resize", () => { engine.resize(); });