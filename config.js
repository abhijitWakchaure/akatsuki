const config = {
    canvas: {
        width: window.innerWidth,
        height: window.innerHeight,
        margin: 0
    },
    car: {
        width: 175,
        height: 37.5,
        wheelRadius: 18.75,
        maxVelocity: 9,
        seats: {
            yOffset: 37.5,
            w: 43.75,
            h: 37.5
        },
        frontSeat: {
            xOffset: -6.25
        },
        backSeat: {
            xOffset: -48.2
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
        w: 44,
        h: 94
    },
    debug: false
}
