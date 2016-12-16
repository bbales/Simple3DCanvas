import Point2 from './Point2'

export default class Point3 {
    constructor(x, y, z) {
        this.x = x
        this.y = y;
        this.z = z;
    }

    get twoD() {
        let rotated = this.rotate(window.camera.x, window.camera.y, window.camera.z)

        let cx = 0
        let cy = 0
        let cz = 250

        let bx = (cz * (rotated[0] - cx) / (rotated[2] + cz)) + cx
        let by = (cz * (rotated[1] - cy) / (rotated[2] + cz)) + cy

        return new Point2(bx, by)
    }

    rotate(ax, ay, az) {
        let temp = 0;

        let xx = this.x
        let yy = this.y
        let zz = this.z

        temp = yy
        yy = (yy * Math.cos(ax)) - (zz * Math.sin(ax));
        zz = (temp * Math.sin(ax)) + (zz * Math.cos(ax));

        temp = zz
        zz = (zz * Math.cos(ay)) - (xx * Math.sin(ay));
        xx = (temp * Math.sin(ay)) + (xx * Math.cos(ay));

        temp = xx
        xx = (xx * Math.cos(az)) - (yy * Math.sin(az));
        yy = (temp * Math.sin(az)) + (yy * Math.cos(az));

        return [xx, yy, zz];
    }
}
