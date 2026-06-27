const userAuth = (req, res, next) => {
    const isAuthenticated = req.session.userId

    if(!isAuthenticated){
        return res.status(401).json({
            message : "Unauthenticated request"
        })
    }
    
    next()
}

export {
    userAuth
}