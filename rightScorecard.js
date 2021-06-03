class RightScorecard {
    constructor() {
        this.score = 0;
        this.happyPassengers = 0;
        this.sadPassengers = 0;
    }

    updatePassengerDropped(passenger) {
        if (passenger.patience > 0) {
            this.addHappyPassenger();
            return;
        }
        this.addSadPassenger();
    }

    addHappyPassenger() {
        this.score += 70;
        this.happyPassengers += 1;
        rightScorecard.animateScore();
        rightScorecard.animateHappyPassengers();
    }

    addSadPassenger() {
        this.sadPassengers += 1;
        rightScorecard.animateSadPassengers();
    }

    pickPassenger() {
        this.score += 30;
        rightScorecard.animateScore();
    }

    show() {
        var minutes = Math.floor(globalTimer / 60);
        var seconds = globalTimer - (minutes * 60);
        var finalTime = rightScorecard.paddTime(minutes, '0', 2) + ':' + rightScorecard.paddTime(seconds, '0', 2);
        var html = `
        <div class="my-1">
            <div class="row animate__animated my-1" id="score">
                <div class="col-6">Driver Name:</div>
                <div class="col-6 text-right">${titleCase(driverName)}</div>
            </div>
            <div class="row animate__animated my-1" id="score">
                <div class="col-6">Time Remaining:</div>
                <div class="col-6 text-right">${finalTime}</div>
            </div>
            <div class="row animate__animated my-1" id="score">
                <div class="col-6">Score:</div>
                <div class="col-6 text-right">${this.score}</div>
            </div>
            <div class="row animate__animated my-1" id="happy-passengers">
                <div class="col-6">Visited Places:</div>
                <div class="col-6 text-right">${this.happyPassengers}</div>
            </div>
            <div class="row animate__animated my-1" id="sad-passengers">
                <div class="col-6">Missed Places:</div>
                <div class="col-6 text-right">${this.sadPassengers}</div>
            </div>
        </div>
        `;
        $('#rightDiv').html(html);
    }

    paddTime(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    animateScore() {
        $("#score").addClass("animate__flash");
    }

    animateHappyPassengers() {
        $("#happy-passengers").addClass("animate__flash");
    }

    animateSadPassengers() {
        $("#sad-passengers").addClass("animate__flash");
    }
}