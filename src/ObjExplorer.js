import Context3D from './Context3D'

export default class ObjExplorer extends Context3D {
    constructor() {
        super(800, 800, 'canvas')
    }

    load(e) {
        let f = e.target.files[0]; // FileList object
        let reader = new FileReader()

        reader.onload = (file) => {
            console.log(file.target.result)
        }
        reader.readAsText(f);
    }

    parseRow(row) {

    }

    loop() {
        super.loop()

        // Draw obj
    }
}
