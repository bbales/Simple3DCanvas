import ObjExplorer from './ObjExplorer'

window.camera = {
    x: 1.377,
    y: -3.35,
    z: -0.025
}

let explorer = new ObjExplorer(800, 800, 'canvas')

document.getElementById('files').addEventListener('change', explorer.load.bind(explorer), false)
