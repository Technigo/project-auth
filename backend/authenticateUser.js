import { UserModel } from "./models/userModel"



export const authenticateUser = async(req , res , next) =>{
    const accessToken = req.header("Authorization")

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    )
    try{
        const user = await UserModel.findOne({accessToken: accessToken})
        if(user){
            req.user = user
            next()
        }else{
            res.status(401).json({success: false , response: "please log in" })
        }
    }
    catch(e){
        res.status(500).json({success: false , response: e.message })
    }
}


