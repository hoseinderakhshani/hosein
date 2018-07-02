const CommentAt = function commentAt(text){
    if(text.indexOf("@")!== -1){
        var res = text.indexOf("@");
        var ress = text.indexOf(" ",res);
        var ss = text.substr(res,ress-res)
        var ee = text.replace(ss,"<a href="+"#"+">"+ss+"</a>")
        return ee
   }else {return text}
};
const FollowUser = function follow(ip,username,token){
    const axios = require('axios');
   axios.get(`${ip}/public/api/v1/user/follow/${username}?api_token=${token}`,)
   .then((response)=> {
        window.location.reload()
    })
    .catch( (err)=> {
       alert("something went Wrong",err)
      });
};

module.exports = {CommentAt,FollowUser};