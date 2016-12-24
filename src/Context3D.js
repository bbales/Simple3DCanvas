import Point3 from './Point3'
import Point2 from './Point2'


export default class Context3D {
    constructor(w, h, id) {
        this.ctx = document.querySelector(`#${id}`).getContext('2d')
        this.ctx.scale(w / 800, h / 800)

        this.width = 800
        this.height = 800

        this.centerPoint = new Point3(0, 0, 0)

        // Camera orbit
        document.querySelector('canvas').addEventListener('mousewheel', e => {
            if (e.altKey && e.shiftKey) window.camera.x += 0.025 * ((e.wheelDelta > 0) ? -1 : 1)
            else if (e.shiftKey) window.camera.y += 0.025 * ((e.wheelDelta > 0) ? -1 : 1)
            else window.camera.z += 0.025 * ((e.wheelDelta > 0) ? -1 : 1)
        })
    }

    startPath(w = 1, s = '#791b1b') {
        this.ctx.lineWidth = w
        this.ctx.fillStyle = s
        this.ctx.strokeStyle = s
        this.ctx.beginPath()
    }

    drawArc(x, y, radius, start, end) {
        this.startPath()
        this.ctx.arc(x, y, radius, start, end)
        this.ctx.stroke()
    }

    drawRect(x, y, width, height) {
        this.startPath()
        this.ctx.rect(x, y, width, height)
        this.ctx.fill()
    }

    drawRectRot(x, y, width, height, rot) {
        let cos = Math.cos(rot)
        let sin = Math.sin(rot)
        let cos90 = Math.cos(rot + Math.PI / 2)
        let sin90 = Math.sin(rot + Math.PI / 2)

        let middle = {
            right: new Point2(x + cos90 * width / 2, y + sin90 * width / 2),
            left: new Point2(x - cos90 * width / 2, y - sin90 * width / 2)
        }

        let upper = {
            right: new Point2(middle.right.x - cos * height / 2, middle.right.y - sin * height / 2),
            left: new Point2(middle.left.x - cos * height / 2, middle.left.y - sin * height / 2)
        }

        let lower = {
            right: new Point2(middle.right.x + cos * height / 2, middle.right.y + sin * height / 2),
            left: new Point2(middle.left.x + cos * height / 2, middle.left.y + sin * height / 2)
        }

        this.startPath()
        this.ctx.moveTo(lower.right.x, lower.right.y)
        this.ctx.lineTo(lower.left.x, lower.left.y)
        this.ctx.lineTo(upper.left.x, upper.left.y)
        this.ctx.lineTo(upper.right.x, upper.right.y)
        this.ctx.lineTo(lower.right.x, lower.right.y)
        this.ctx.stroke()
    }

    drawLine(a, b) {
        this.startPath()
        this.ctx.moveTo(a.x + this.width / 2, a.y + this.height / 2)
        this.ctx.lineTo(b.x + this.width / 2, b.y + this.height / 2)
        this.ctx.stroke()
    }

    drawCircle3d(center, radius, a, b, iterations = 50) {
        let newPoint = new Point3(0, 0, 0)
        let firstPoint = false
        let temp = false

        // Start path
        this.startPath()

        // Loop through 0->2PI
        for (let i = 0; i < iterations; i++) {
            // Do reused calcs for each iteration
            let angle = i * 2 * Math.PI / iterations
            let s = Math.sin(angle) * radius
            let c = Math.cos(angle) * radius

            // Calculate coordinate
            newPoint.x = center.x + c * a[0] + s * b[0]
            newPoint.y = center.y + c * a[1] + s * b[1]
            newPoint.z = center.z + c * a[2] + s * b[2]

            // Draw line or move origin
            temp = newPoint.twoD
            this.ctx[i ? 'lineTo' : 'moveTo'](temp.x + this.width / 2, temp.y + this.height / 2)

            // Save first point for closing the circle later
            if (!i) firstPoint = _.clone(temp);
        }

        // Close the cirle and stroke it
        this.ctx.lineTo(firstPoint.x + this.width / 2, firstPoint.y + this.height / 2)
        this.ctx.stroke()
    }

    pointCircle3d(center, radius, a, b, rad) {
        // Create a new point instance
        let newPoint = new Point3(0, 0, 0)

        let s = Math.sin(rad) * radius
        let c = Math.cos(rad) * radius

        // Calculate coordinate
        newPoint.x = center.x + c * a[0] + s * b[0]
        newPoint.y = center.y + c * a[1] + s * b[1]
        newPoint.z = center.z + c * a[2] + s * b[2]

        // Return the point
        return newPoint;
    }

    drawPoint3d(point) {
        let two = point.twoD
        this.drawRect(two.x, two.y, 2, 2)
    }

    drawLine3d(p1, p2) {
        this.drawLine(p1.twoD, p2.twoD)
    }

    loop() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width + 1, this.height + 1)
    }

    init() {
        // Fix blurry canvas
        this.ctx.translate(0.5, 0.5)

        // Start animation loop
        this.interval = setInterval(this.loop.bind(this), 1000 / 1)
    }

    stop() {
        clearInterval(this.interval)
    }
}
