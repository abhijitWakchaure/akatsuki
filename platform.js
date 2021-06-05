class Platform {
    constructor(i, x, y, w, h, d) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        //platform will have no gravity effect
        this.body = Bodies.rectangle(x, y, w, h, {
            isStatic: true,
            render: {
                sprite: {
                    texture: 'assets/images/milestones/' + d + '.png',
                    xScale: 1.2,
                    yScale: 1.2,
                }
            }
        });
        this.body.label = 'platform#' + i;
        this.body.location = d;
        Composite.add(world, this.body);
    }

}

