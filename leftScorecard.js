class LeftScorecard {
    constructor() {
        this.prevLength = passengersInCar.length;
    }

    update() {
        for (var i = 0; i < passengersInCar.length; i++) {
            passengersInCar[i].patience -= 5;
            if (passengersInCar[i].patience <= 0 || globalTimer <= 0) {
                console.log("Game Over")
                gameOver.play();
                rightScorecard.addSadPassenger();
                rightScorecard.updatePersistentScore();
                leftScorecard.animateNotice();
                noLoop();
                $("#notice").html("Game Over!");
                $("#notice").show();
                setTimeout(function () {
                    window.location = "game-over.html";
                }, 4000)
            }
        }
        if (passengersInCar.length > 0) {
            var nextDestination = passengersInCar[0].destination;
            if (typeof nextDestination !== 'undefined' && nextDestination != null)
                $(".bg").css('background-image', 'url(assets/images/places/' + nextDestination + '.jpg)')
            else
                $(".bg").css('background-image', 'url(assets/images/places/Blank.jpg)')
        }
        else {
            $(".bg").css('background-image', 'url(assets/images/places/Blank.jpg)')
        }
    }

    animateFrindsInCar() {
        $("#friendsInCar").addClass("animate__flash");
    }

    animateNotice() {
        $("#notice").addClass("animate__slideInDown");
    }

    show() {
        var html = `
        <div class="row animate__animated my-1" id="friendsInCar">
            <div class="col-8">Friends in Car:</div>
            <div class="col-4 text-right">${passengersInCar.length} / 2</div>
        </div>`;

        if (passengersInCar.length > 0) {
            html += `<div class="my-1">Next Destinations:</div>`;
        }
        for (var i = 0; i < passengersInCar.length; i++) {
            html += `
            <div class="row my-1">
                <div class="col-4 mr-1">${passengersInCar[i].destination}</div>
                <div class="col-6 per-parent">
                    <div class="per-wrapper" style="width: ${passengersInCar[i].patience}%">&nbsp;</div>
                </div>
                <div class="col-1">${passengersInCar[i].patience}</div>
            </div>`;
        }
        $('#leftDiv').html(html);
        if (leftScorecard.prevLength != passengersInCar.length) {
            leftScorecard.prevLength = passengersInCar.length;
            leftScorecard.animateFrindsInCar();
        }
    }
}