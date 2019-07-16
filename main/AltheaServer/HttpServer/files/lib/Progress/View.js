import doe from '../../_lib/doe/main/doe.mjs'
function View(progress){
    this._progress=progress
    this.node=createNode(this)
}
Object.defineProperty(View.prototype,'free',{get(){
    cancelAnimationFrame(this._animationFrame)
}})
function createNode(view){
    let n=doe.div({className:'progressBar'})
    let f=()=>{
        view._animationFrame=requestAnimationFrame(f)
        n.style.left=(1-view._progress._animationCursor)/2*100+'%'
        n.style.width=view._progress._animationCursor*100+'%'
    }
    view._animationFrame=requestAnimationFrame(f)
    return n
}
export default View
