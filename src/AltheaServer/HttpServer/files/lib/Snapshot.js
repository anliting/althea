function Snapshot(o){
    this.o=o
    this.keys=Object.keys(this.o)
}
Object.defineProperty(Snapshot.prototype,'new',{get(){
    return Object.keys(this.o).filter(k=>
        !this.keys.includes(k)
    )
}})
export default Snapshot
