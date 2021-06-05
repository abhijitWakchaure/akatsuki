function setDriverName(value) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.driverName = value;
    } else {
        console.error(`Sorry, your browser does not support web storage`);
    }
}

function getDriverName() {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.driverName) {
            return sessionStorage.driverName;
        } else {
            sessionStorage.driverName = 'anonymous';
            return 'anonymous';
        }
    } else {
        console.error(`Sorry, your browser does not support web storage`);
    }
}

function setScore(value) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.score = JSON.stringify(value);
    } else {
        console.error(`Sorry, your browser does not support web storage`);
    }
}

function getScore() {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.score) {
            return JSON.parse(sessionStorage.score);
        } else {
            return {
                score: 0,
                happyPassengers: 0,
                sadPassengers: 0
            };
        }
    } else {
        console.error(`Sorry, your browser does not support web storage`);
    }
}

function getX(x, width) {
    return x + (width * 0.5);
}

function isPlatformPresent(i) {
    for (var j = 0; j < world.bodies.length; j++) {
        if (world.bodies[j].label == ('platform#' + i)) {
            return world.bodies[j];
        }
    }
    return;
}

function getRandomDestination() {
    var index = random(destinationsAvailable.length);
    return destinationsAvailable.splice(index, 1)[0];
}

function titleCase(name) {
    var splitStr = name.toString().toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}