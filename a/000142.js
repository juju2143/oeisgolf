module.exports=n=>[...Array(n).keys()].reduce((x,y)=>x*-~y,1)