


exports.checkAuth = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.status(403).redirect('/users/')
    }
}

exports.checkAuthor = function (req, res, next) {
    if((req.isAuthenticated()) && (req.user.role >> 0)){    
        return next();
    }
    else{
        res.status(403).send('<h1> Access denied </h1>')
    }
}

exports.isAdmin = function (req, res, next) {
    if((req.isAuthenticated()) && (req.user.role === 2)){  
        return next();
    }else{
        res.status(403).send('<h1> Access denied </h1>')
    }
}