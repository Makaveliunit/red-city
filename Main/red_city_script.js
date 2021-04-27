// author: Rami Abboud

//launches the loading
var elem = document.getElementById("loading-output");

// locks loading when reached 100
var lock = false;

var AutoF = true;

var mesh;

init();


// once everything is loaded, we run our Three.js stuff.
function init() {

    //whether mobile or not
    const isMobile = (window.orientation !== undefined);

    var clock = new THREE.Clock();



    //loading is true by default
    var loading = 1;

    // enables the loadings screen
    loadingScreen(loading);


    var control = initControl();
    var stats = initStats();


    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();



    var loader = new THREE.OBJMTLLoader();
    var load;


    var i = 0;
    loader.load('../assets/models/city.obj',
        '../assets/models/city.mtl',
        function (object) {
            var scale = chroma.scale(['red', 'red', 'red']);
            setMesh(object, scale);
            mesh = object;
            scene.add(mesh);
        },

        //total_sz = size of .obj
        //disable mouse control
        //loading = loading %
        // called when loading is in progresses     
        function (xhr) {
            var total_sz = 52739112;
            var loading_pc = (xhr.loaded / total_sz * 100);
            if (i == 0)
                loading_pc = 0;
            console.log(loading_pc + '% loaded' + '   ' + i);
            console.log(xhr.loaded + '  ' + total_sz);
            i += 1;





            if (loading_pc > 100 && lock == false) {
                lock = true;
                console.log(lock);

                // continue
                //enable control

                //loading has finished

                //disables the loading screen
                loading = 0;
                loadingScreen(loading);

            }
        },


        // called when loading has errors
        function (error) {

            console.log('An error happened');

        },


        load);




    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer({ antialias: true });
    webGLRenderer.setClearColor(new THREE.Color(0xff0000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;



    //window resize
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    }

    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 70;
    camera.position.z = -430;
    camera.lookAt(new THREE.Vector3(0, 60, 0));


    //declares object flycontrol as camera for Windows
    if (isMobile == false) {
        var flyControls = new THREE.FlyControls(camera);

        flyControls.movementSpeed = 66;
        flyControls.domElement = document.querySelector("#WebGL-output");
        flyControls.rollSpeed = Math.PI / 5;
        flyControls.autoForward = false;
        flyControls.dragToLook = true;
    }

    //mobile controls
    if (isMobile == true) {
        var onlongtouch;
        var timer;
        var touchduration = 500;

        var flyControls = new THREE.FlyControls(camera);

        flyControls.movementSpeed = 40;
        flyControls.domElement = document.querySelector("#WebGL-output");
        flyControls.rollSpeed = Math.PI / 12;
        flyControls.autoForward = AutoF;
        flyControls.dragToLook = false;

        window.addEventListener('touchstart', onTouchStart, false);
        window.addEventListener('touchend', onTouchEnd, false);

        function onTouchStart() {
            timer = setTimeout(onlongtouch, touchduration);
            console.log('touched');
        }


        function onTouchEnd() {
            //stops short touches from firing the event
            if (timer)
                clearTimeout(timer); // clearTimeout, not cleartimeout..
            console.log('stopped');
        }

        onlongtouch = function () {
            console.log('long press');
            if (flyControls.autoForward == false) {
                console.log('DEBUG: Auto forward Turned on');
                flyControls.autoForward = true;
                AutoF = true;
                initControl();
                return;
            }
            if (flyControls.autoForward == true) {
                console.log('DEBUG: Auto forward Turned off');
                flyControls.autoForward = false;
                AutoF = false;
                initControl();
                return;

            }
        }

    }


    // sets music
    var mediaElement = new Audio('../sounds/dynatron.mp3');
    mediaElement.loop = true;
    mediaElement.volume = 0.06;

    //enable for music
    mediaElement.play();


    // EVERYTHING BELOW HERE ARE EXTRA MESH //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    var step = 0;
    var step_light9 = 0;
    var step_light = 0;
    var step_light10 = 0;


    var sphereGeometry = new THREE.SphereGeometry(3, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 475;
    sphere.position.y = 0;
    sphere.position.z = 50;
    sphere.castShadow = true;

    // add the sphere to the scene
    scene.add(sphere);


    ///////////////////////////////////////////////////////////////////////////
    /////////////////////ANIMATION STOPS HERE////////////////////////////////


    // add main name spotlight
    var spotLight = new THREE.SpotLight(0xffffff, 1.0, 2e400, Math.PI / 25, 1, 0.5);
    spotLight.position.set(0, 1000, -400);
    spotLight.target.position.set(0, 0, 0);
    spotLight.intensity = 2.3;
    scene.add(spotLight);
    scene.add(spotLight.target);
    spotLight.target.updateMatrixWorld();

    // add red spotlight
    var spotLight2 = new THREE.SpotLight(0xff0000);
    spotLight2.position.set(200, 200, 500);
    spotLight2.intensity = 2;
    scene.add(spotLight2);
    spotLight2.target.updateMatrixWorld();

    //-------------------------------------------------

    // add spotlight hobbies
    var spotLight4 = new THREE.SpotLight(0xe92bc9, 5, 400, 0.14);
    spotLight4.position.set(320, 90, -220);
    spotLight4.target.position.set(600, -10, -220);
    scene.add(spotLight4);
    scene.add(spotLight4.target);
    spotLight4.target.updateMatrixWorld();

    // add spotlight hobbies
    var spotLight3 = new THREE.SpotLight(0xffffff, 3, 400, 0.06);
    spotLight3.position.set(320, 90, -172);
    spotLight3.target.position.set(600, -10, -172);
    scene.add(spotLight3);
    scene.add(spotLight3.target);
    spotLight3.target.updateMatrixWorld();


    // add spotlight hobbies
    var spotLight5 = new THREE.SpotLight(0xeaca39, 5, 400, 0.08);
    spotLight5.position.set(320, 90, -140);
    spotLight5.target.position.set(600, -10, -140);
    scene.add(spotLight5);
    scene.add(spotLight5.target);
    spotLight5.target.updateMatrixWorld();

    // add spotlight hobbies
    var spotLight6 = new THREE.SpotLight(0x9ef5e1, 5, 400, 0.129);
    spotLight6.position.set(320, 90, -90);
    spotLight6.target.position.set(600, -10, -89);
    scene.add(spotLight6);
    scene.add(spotLight6.target);
    spotLight6.target.updateMatrixWorld();


    // add spotlight hobbies
    var spotLight7 = new THREE.SpotLight(0x2629e8, 5, 400, 0.17);
    spotLight7.position.set(320, 90, -40);
    spotLight7.target.position.set(600, 0, -13);
    scene.add(spotLight7);
    scene.add(spotLight7.target);
    spotLight7.target.updateMatrixWorld();


    // add spotlight hobbies
    var spotLight8 = new THREE.SpotLight(0x8cf3ac, 5, 600, 0.20);
    spotLight8.position.set(320, 90, -200);
    spotLight8.target.position.set(600, 0, 240);
    scene.add(spotLight8);
    scene.add(spotLight8.target);
    spotLight8.castShadow = true;
    spotLight8.target.updateMatrixWorld();


    // add ANIMATED spotlight hobbies
    var spotLight10 = new THREE.SpotLight(0xffffff, 3, 600, 0.15);
    spotLight10.position.set(320, 90, -200);
    spotLight10.target.position.set(600, 120, 240);
    scene.add(spotLight10);
    scene.add(spotLight10.target);
    spotLight10.castShadow = true;
    spotLight10.target.updateMatrixWorld();

    //-------------------------------------------------------
    // add ANIMATED spotlight project
    var spotLight9 = new THREE.SpotLight(0xffffff, 6, 800, 0.5);
    spotLight9.position.set(0, 350, 0);
    spotLight9.target.position.set(-320, 380, -30);
    scene.add(spotLight9);
    scene.add(spotLight9.target);
    spotLight9.target.updateMatrixWorld();

    helper = new THREE.SpotLightHelper(spotLight9);
    scene.add(helper);


    //for testing purposes
    // helper4 = new THREE.SpotLightHelper(spotLight2);
    //  helper3 = new THREE.SpotLightHelper(spotLight);
    // helper2 = new THREE.SpotLightHelper(spotLight4);
    // helper = new THREE.SpotLightHelper(spotLight3);
    //  scene.add(helper);
    //  scene.add(helper2);
    //  scene.add(helper3);
    //  scene.add(helper4);


    //fog
    scene.fog = new THREE.Fog(0xff0000, 100, 1000);




    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);



    //chair pivot point
    var pivot = new THREE.Object3D();
    pivot.position.x = 516.5;
    pivot.position.y = 15;
    pivot.position.z = -222.4;

    var pc_chair;




    //plane WIDTH x HEIGHT
    var cube = createMesh(new THREE.PlaneGeometry(85, 50), "red_cit1.png");
    cube.position.x = -370;
    cube.position.y = 60;
    cube.position.z = -198;
    cube.rotation.y = 0.5*Math.PI;


    scene.add(cube);




    render();

    //creates a mesh a adds png on it
    function createMesh(geom, imageFile) {
        var t = THREE.ImageUtils.loadTexture("../imgs/" + imageFile);
        var mat1 = new THREE.MeshPhongMaterial({
            map: t
        });
        var mesh = new THREE.Mesh(geom, mat1);
        return mesh;
    }



    //finds Mesh from main city.obj to edit them
    function setMesh(object, scale) {
        var children = object.children;


        if (children && children.length > 0) {
            children.forEach(function (e) {
                setMesh(e, scale)
            });
        } else {
            // no children assume contains a mesh
            if (object instanceof THREE.Mesh) {
                object.material.showShadow = true;
                //       object.material.color = new THREE.Color(scale(Math.random()).hex());
                if (object.material.name == "building_117") {
                    //        object.material.emissive = new THREE.Color(0x444444);
                    object.material.transparent = true;
                    object.material.opacity = 0.5;
                    object.material.castShadow = true;
                    object.material.receiveShadow = true;
                }
                if (object.material.name == "pc_chair") {
                    pc_chair = object;
                    pivot.add(object);


                }

            }
        }
    }


    // pivot.add(pc_chair);
    scene.add(pivot);





    function render() {
        stats.update();
        var delta = clock.getDelta();

        if (pc_chair) {
            pc_chair.rotation.y += 0.006;
        }

        if (isMobile == false || isMobile == true) {
            flyControls.update(delta);
        }

        webGLRenderer.clear();

        // render using requestAnimationFrame
        // ball bouncing
        step += 0.03;
        sphere.position.y = 7 + (20 * Math.abs(Math.sin(step)));


        //project target moving
        step_light9 += 0.0009;
        spotLight9.target.position.y = 230 + (230 * Math.sin(step_light9));

        //hobbies target moving
        step_light10 += 0.004;
        spotLight10.target.position.z = -90 + (200 * Math.sin(step_light10));
        spotLight10.target.position.y = 130 + (30 * Math.sin(step / 10));

        //name building target moving
        step_light += 0.002;
        spotLight.target.position.z = 0 + (90 * Math.sin(step_light));
        spotLight.target.position.x = 0 + (90 * Math.cos(step_light));


        //    cube.rotation.y += 0.006;

        requestAnimationFrame(render);



        webGLRenderer.render(scene, camera)
    }



    // FPS Gui
    function initStats() {

        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);


        return stats;
    }



    //controls returned to the user
    function initControl() {


        document.getElementById("control-output").style.position = 'absolute';

        document.getElementById("control-output").style.color = 'transparent';
        document.getElementById("control-output").style.fontFamily = 'Monospace';
        document.getElementById("control-output").style.fontSize = '16px';
        document.getElementById("control-output").style.fontWeight = 'bold';
        document.getElementById("control-output").style.marginLeft = '35%';

        document.getElementById("control-output").style.alignContent = 'center';
        document.getElementById("control-output").style.top = '0px';


        //sets control text
        if (isMobile == false)
            document.getElementById("control-output").innerHTML = 'Move: [w][a][s][d] &nbsp;&nbsp;&nbsp;&nbsp; Elevation: [r][f] &nbsp;&nbsp;&nbsp;&nbsp; Tilt: [e][q]';

        //sets control text
        if (isMobile == true) {
            document.getElementById("control-output").style.marginLeft = '25%';
            document.getElementById("control-output").style.fontSize = '12px';
            document.getElementById("control-output").innerHTML = '[Long touch] Auto Forward: ' + AutoF + '<br>           Touch to auto-turn.';
            if (loading == 0)
                document.getElementById("control-output").style.color = 'white';
        }
    }



    //here is gonna be the loading screen
    function loadingScreen(loading) {

        //if loading is over kill div
        if (loading == 0) {

            elem.parentNode.removeChild(elem);
            document.getElementById("control-output").style.color = 'white';
        }

    }







}


