//let Git=require('nodegit')
async function getCommitId(){
    return'0'
    let
        repository=await Git.Repository.open('althea'),
        commit=await repository.getBranchCommit('master')
    return commit.id().toString()
}
export default getCommitId
