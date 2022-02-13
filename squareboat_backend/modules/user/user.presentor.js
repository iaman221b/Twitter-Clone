
const Userlisting = (data , req , res) => {

    req.user.following = req.user.following.map((item) => (item.toString()))

    for(let i = 0; i < data.length; i++) {
        if(req.user.following.includes(data[i]._id.toString())){
            data[i].isFollowing = true
        }
        else{
            data[i].isFollowing = false
        }
    }
    return {
        data
    }
}

export const UserPresentors = {
    Userlisting
}