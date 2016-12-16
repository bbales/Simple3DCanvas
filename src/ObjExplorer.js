import Context3D from './Context3D'
import Point3 from './Point3'
import _ from 'lodash'

export default class ObjExplorer extends Context3D {
    constructor() {
        super(800, 800, 'canvas')
        this._vertices = []
    }

    load(e) {
        let f = e.target.files[0]; // FileList object
        let reader = new FileReader()

        reader.onload = (file) => {
            let lines = file.target.result.split('\n')
            lines = _.filter(lines, l => !(!l.length || l[0] == '#'))
            lines.forEach(l => this.parseRow(l))
        }
        reader.readAsText(f);
    }

    parseRow(row) {
        console.log(row)
        switch (row[0]) {
            case 'g': // Group Name

                break
            case 'v': // Vertex
                if (row[1] == 'n') break

                // Split coords
                let coords = row.replace(/  /g, ' ').split(' ').slice(1).map(parseFloat)
                this._vertices.push(new Point3(coords[0] + 400, coords[1] + 400, coords[2] + 400))
                break
            case 'f': // Face

                break
        }
    }

    loop() {
        super.loop()

        // Draw obj
        this._vertices.forEach(v => {
            this.drawPoint3d(v)
        })
    }
}
