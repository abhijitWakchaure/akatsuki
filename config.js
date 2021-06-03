const config = {
    canvas: {
        width: window.innerWidth,
        height: window.innerHeight,
        margin: 0
    },
    car: {
        width: 140,
        height: 30,
        wheelRadius: 15,
        maxVelocity: 9,
        seats: {
            yOffset: 30,
            w: 35,
            h: 30
        },
        frontSeat: {
            xOffset: -5
        },
        backSeat: {
            xOffset: -38.5
        }
    },
    platform: {
        yLevel: 3,
        xLevel: 3,
        height: 20,
        xMarginFactor: 0.20,
        destinations: ["Bangalore", "Hyderabad", "Chennai", "Mumbai", "Pune", "Kolkata", "Jaipur", "Delhi", "Gangtok"]
    },
    passenger: {
        w: 35,
        h: 75
    },
    debug: false
}
