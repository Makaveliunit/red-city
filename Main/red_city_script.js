// author: Rami Abboud


   init();
   

// once everything is loaded, we run our Three.js stuff.
    function init() {
        

        var clock = new THREE.Clock();
        
        var stats = initStats();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();


        var loader = new THREE.OBJMTLLoader();
        var load = function (object) {
            mesh = object;
            scene.add(mesh);

        };


        var i = 0;
       loader.load('../assets/models/city.obj',
        '../assets/models/city.mtl',
        function ( object ) {

            scene.add( object );
    
        },
        
        //disable mouse control
        //loading = loading %
        // called when loading is in progresses     
        function ( xhr ) {
            var loading =  (xhr.loaded / xhr.total * 100);
            if (i == 0)
            loading = 0;
            console.log(loading + '% loaded' + '   ' + i );
            i += 1;

            



            if( loading  === 100) 
            {
            // continue
            //enable control    


            
            }
        },
      
      
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        },
        
        
        load);




        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer({antialias: true});
       webGLRenderer.setClearColor(new THREE.Color(0xff0000, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;
        


        // position and point the camera to the center of the scene
        camera.position.x = 0;
        camera.position.y = 70;
        camera.position.z = -430;
        camera.lookAt(new THREE.Vector3(0, 60, 0));
   

        //declares object flycontrol as camera
        var flyControls = new THREE.FlyControls(camera);

        flyControls.movementSpeed = 66;
        flyControls.domElement = document.querySelector("#WebGL-output");
        flyControls.rollSpeed = Math.PI / 5;
        flyControls.autoForward = false;
        flyControls.dragToLook = false;
        

        var fftSize = 128;
        var listener = new THREE.AudioListener();
        var audio = new THREE.Audio( listener );
        var mediaElement = new Audio( '../sounds/dynatron.mp3' );
        mediaElement.loop = true;
		mediaElement.volume = 0.1;
        
        //enable for music
        mediaElement.play();

        


        

        // add main name spotlight
        var spotLight = new THREE.SpotLight(0xffffff,1.0, 2e400, Math.PI/25, 1, 0.5);
        spotLight.position.set(0 ,1000, -400);
        spotLight.intensity = 1.7;
        scene.add(spotLight);
        spotLight.target.updateMatrixWorld();

        // add red spotlight
        var spotLight2 = new THREE.SpotLight(0xff0000);
        spotLight2.position.set(200 ,200, 500);
        spotLight2.intensity = 2;
        scene.add(spotLight2);
        spotLight2.target.updateMatrixWorld();

        // add spotlight hobbies

        var spotLight3 = new THREE.SpotLight(0xffffff,3.0, 300, Math.PI/9.0, 1, 0.5);
        spotLight3.position.set(320 ,90, -20);
        spotLight3.target.position.set(600,0,-20);
        spotLight3.intensity = 3;
        scene.add(spotLight3);
        scene.add(spotLight3.target);
        spotLight3.target.updateMatrixWorld();
        
        




        // add spotlight hobbies
        var spotLight4 = new THREE.SpotLight(0xffffff,3.0, 300, Math.PI/9.0, 1, 0.5);
        spotLight4.position.set(320 ,90, -220);
        spotLight4.target.position.set(600,0,-150);
        spotLight4.intensity = 3;
        scene.add(spotLight4);
        scene.add(spotLight4.target);
        spotLight4.target.updateMatrixWorld();


        //for testing purposes
        helper4 = new THREE.SpotLightHelper(spotLight2);
        helper3 = new THREE.SpotLightHelper(spotLight);
        helper2 = new THREE.SpotLightHelper(spotLight4);
        helper = new THREE.SpotLightHelper(spotLight3);
        scene.add(helper);
        scene.add(helper2);
        scene.add(helper3);
        scene.add(helper4);


        //fog
        scene.fog = new THREE.Fog(0xff0000, 100, 1000);


        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

        // call the render function
        var step = 0;
        

 


        // setup the control gui
        var controls = new function () {
            // we need the first child, since it's a multimaterial


        };

        var gui = new dat.GUI();
        var mesh;






        function setCamControls() {

        }




        render();

        function setRandomColors(object, scale) {
            var children = object.children;


            if (children && children.length > 0) {
                children.forEach(function (e) {
   //                 setRandomColors(e, scale)
                });
            } else {
                // no children assume contains a mesh
                if (object instanceof THREE.Mesh) {

  //                  object.material.color = new THREE.Color(scale(Math.random()).hex());
                    if (object.material.name.indexOf("building") == 0) {
             //           object.material.emissive = new THREE.Color(0x444444);
            //            object.material.transparent = true;
            //            object.material.opacity = 0.5;
                    }
                }
            }
        }

        function animate() {
            
        }



        function render() {
            stats.update();
            var delta = clock.getDelta();

            if (mesh) {
                //   mesh.rotation.y+=0.006;
            }


            flyControls.update(delta);
            webGLRenderer.clear();
            // render using requestAnimationFrame
            requestAnimationFrame(render);

     

            webGLRenderer.render(scene, camera)
        }




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
    }


