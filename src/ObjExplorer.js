import Context3D from './Context3D'
import Point3 from './Point3'
import _ from 'lodash'

export default class ObjExplorer extends Context3D {
    constructor() {
        super(800, 800, 'canvas')
        this._vertices = []
        this._edges = []
    }

    load(e) {
        let f = e.target.files[0]; // FileList object
        let reader = new FileReader()

        reader.onload = (file) => {
            let lines = file.target.result.split('\n')
            lines = _.filter(lines, l => !(!l.length || l[0] == '#'))
            lines.forEach(l => this.parseRow(l))
        }
        reader.readAsText(f)
        this.init()
    }

    parseRow(row) {
        switch (row[0]) {
            case 'g': // Group Name
                break
            case 'v': // Vertex
                if (row[1] == 'n') break
                // Split coords
                let coords = row.replace(/  /g, ' ').split(' ').slice(1).map(v => parseFloat(v))
                this._vertices.push(new Point3(coords[0], coords[1], coords[2]))
                break
            case 'f': // Face
                // Split edges into connected vertices - can have length of 3 or greater
                let edges = row.replace(/  /g, ' ').split(' ').slice(1).map(v => parseInt(v))
                this._edges.push(edges)
                break
        }
    }

    reset(){
        this.stop()
        this._vertices = []
        this._edges = []
    }

    loop() {
        super.loop()

        // Draw vertices
        // this._vertices.forEach(v => this.drawPoint3d(v))
        this._edges.forEach(e => {
            for (let i = 1; i < e.length; i++) this.drawLine3d(this._vertices[e[i - 1] - 1], this._vertices[e[i] - 1])
        })
    }
}
