import Point2 from './Point2'

export default class Point3 {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z

        this.p2 = new Point2(0,0)
    }

    get twoD() {
        let rotated = this.rotate(window.camera.x, window.camera.y, window.camera.z)

        let cx = 0
        let cy = 0
        let cz = 250

        this.p2.x = (cz * (rotated[0] - cx) / (rotated[2] + cz)) + cx
        this.p2.y = (cz * (rotated[1] - cy) / (rotated[2] + cz)) + cy

        return this.p2
    }

    rotate(ax, ay, az) {
        let temp = 0

        let xx = this.x
        let yy = this.y
        let zz = this.z

        let cx = Math.cos(ax)
        let cy = Math.cos(ay)
        let cz = Math.cos(az)
        let sx = Math.sin(ax)
        let sy = Math.sin(ay)
        let sz = Math.sin(az)

        temp = yy
        yy = yy * cx - zz * sx
        zz = temp * sx + zz * cx

        temp = zz
        zz = zz * cy - xx * sy
        xx = temp * sy + xx * cy

        temp = xx
        xx = xx * cz - yy * sz
        yy = temp * sz + yy * cz

        return [xx, yy, zz]
    }
}
