var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Svg = Matter.Svg,
    Common = Matter.Common,
    Bounds = Matter.Bounds,
    Vector = Matter.Vector,
    Constraint = Matter.Constraint,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

var engine, render, world, runner, ground, car, terrain;
var viewportCentre, extents, boundsScaleTarget, boundsScale, initialCarPos;
var wallTop, wallRight, wallBottom, wallLeft;
var passangersInCar = [];
var isPlatformPresent = false;


function setup() {
    setNumPassenger(0);
    noCanvas();
    config.canvas.width = windowWidth - config.canvas.margin;
    config.canvas.height = windowHeight - config.canvas.margin;

    // create engine
    engine = Engine.create();
    world = engine.world;

    // create renderer
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: config.canvas.width,
            height: config.canvas.height,
            showAngleIndicator: config.debug,
            showCollisions: config.debug,
            wireframes: config.debug,
        }
    });

    Render.run(render);

    // create runner
    runner = Runner.create();
    Runner.run(runner, engine);

    // ground = new Ground(getX(0, config.canvas.width), (config.canvas.height * 0.9),
    //     config.canvas.width, 50);

    screenWidth = config.canvas.width;
    screenHeight = config.canvas.height;
    wallThikness = 50

    wallTop = new Wall(getX(0, screenWidth), (0 - wallThikness), screenWidth, wallThikness);
    wallRight = new Wall(screenWidth + (wallThikness / 2), (screenHeight / 2), wallThikness, screenHeight);
    wallBottom = new Wall(getX(0, screenWidth), (screenHeight - wallThikness / 2), screenWidth, wallThikness);
    wallLeft = new Wall(0 - (wallThikness / 2), (screenHeight / 2), wallThikness, screenHeight);

    initialCarPos = { x: getX(100, 200), y: (config.canvas.height * 0.1) };
    car = new Car(initialCarPos.x, initialCarPos.y, 200, 80, 40);

    // initialCarPos = Vector.magnitude(Vector.sub(car.getPosition(), viewportCentre))
    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: config.canvas.width, y: config.canvas.height }
    });

    Events.on(engine, 'collisionStart', function (event) {
        if (car.detectCollision(event)) {
            var pair = event.pairs;
            console.log('collision start with pair count:', pair.length)
            for (var i = 0; i < pair.length; i++) {
                var bodyALabel = pair[i].bodyA.label
                var bodyBLabel = pair[i].bodyB.label
                var passanger;
                if (bodyALabel.startsWith('passenger')) {
                    passanger = pair[i].bodyA
                }
                if (bodyBLabel.startsWith('passenger')) {
                    passanger = pair[i].bodyB
                }
                if (typeof passanger === 'undefined') {
                    continue;
                }
                if (passangersInCar.length < 3) {
                    console.log("Number of passengers in car before:", passangersInCar.length)
                    console.log("Adding passenger to car")
                    passangersInCar.push(passanger)
                    setNumPassenger(passangersInCar.length)
                    passanger.isInsideCar = true
                    // passanger.hide()
                    passanger.remove()
                    console.log("Number of passengers in car after:", passangersInCar.length)
                    break;
                } else {
                    console.log('Taxi full. No more passengers allowed. Please drop existing passengers first')
                }
            }
        }
    });

    textSize(width / 3);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);
    text("Hello", 100, 100, 70, 80);
    if (keyIsDown(LEFT_ARROW)) {
        car.move("LEFT")
    }
    if (keyIsDown(RIGHT_ARROW)) {
        car.move("RIGHT")
    }
    if (keyIsDown(32)) {
        car.move("JUMP")
    }
}

function keyPressed() {
    // display passengers upon DOWN_ARROW key press
    if (keyIsDown(DOWN_ARROW)) {
        console.log("Creating new passenger")
        new Passenger(car.getPosition().x + random(300, 500), 450, 70, 70);
    }
    // drop passengers upon UP_ARROW key press
    if (keyIsDown(UP_ARROW)) {
        console.log("Number of passengers in car:", passangersInCar.length)
        // check if passenger exists and display passeneger on screen for 2 seconds and disappear after wards. 
        if (passangersInCar.length > 0) {
            console.log("Dropping passenger now")
            // TODO: change position of existing passenger from car to ground
            // TODO: also remove the passanger from world
            // passangersInCar[0].remove()
            console.log("Number of passengers in car before:", passangersInCar.length)
            passangersInCar.shift()
            setNumPassenger(passangersInCar.length)
            var tempP = new Passenger(car.getPosition().x + random(100, 200), car.getPosition().y, 70, 70);
            tempP.body.label = "droppedPassenger";
            setTimeout(function () { tempP.body.remove(); }, 1000);
            console.log("Number of passengers in car after:", passangersInCar.length)
        } else {
            console.log('no passengers found in taxi')
        }
    }

    if (keyIsDown(49)) {
        // platform 1:   on keyPress 1 
        console.log("Creating platform 1")
        new Platform(170, 160, 300, 40);
    }
    if (keyIsDown(50)) {
        // platform 2:   on keyPress 2  
        console.log("Creating platform 2")
        new Platform(700, 160, 300, 40);
    }
    if (keyIsDown(51)) {
        // platform 3:   on keyPress 3  
        console.log("Creating platform 3")
        new Platform(1220, 160, 300, 40);
    }
    if (keyIsDown(52)) {
        // platform 4:   on keyPress 4
        console.log("Creating platform 4")
        new Platform(170, 330, 300, 40);
    }
    if (keyIsDown(53)) {
        // platform 5:   on keyPress 5
        console.log("Creating platform 5")
        new Platform(700, 330, 300, 40);
    }
    if (keyIsDown(54)) {
        // platform 6:   on keyPress 6
        console.log("Creating platform 6")
        new Platform(1220, 330, 300, 40);
    }
    if (keyIsDown(55)) {
        // platform 7:   on keyPress 7
        console.log("Creating platform 7")
        new Platform(170, 500, 300, 40);
    }
    if (keyIsDown(56)) {
        // platform 8:   on keyPress 8
        console.log("Creating platform 8")
        new Platform(700, 500, 300, 40);
    }
    if (keyIsDown(57)) {
        // platform 9:   on keyPress 9
        console.log("Creating platform 9")
        new Platform(1220, 500, 300, 40);
    }

}

function getX(x, width) {
    return x + (width * 0.5);
}

window.addEventListener("resize", function () {
    config.canvas.width = window.innerWidth;
    config.canvas.height = window.innerHeight;
});

(function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
})()
