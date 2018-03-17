//let Git=require('nodegit')
module.exports=getCommitId
async function getCommitId(){
    return'0'
    let
        repository=await Git.Repository.open('althea'),
        commit=await repository.getBranchCommit('master')
    return commit.id().toString()
}
