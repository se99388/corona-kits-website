export const reduce = (arr,chosenKey)=>{
    return arr.reduce((accum, curr)=>{
        // if (!accum[curr[chosenKey]]){
        //     accum[curr[chosenKey]] = []
        // }
        accum[curr[chosenKey]]=curr;
        return accum;
    },{})
}