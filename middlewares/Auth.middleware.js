var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    let token = req.headers.authorization;
    // console.log(token);

    try {
        if (token) {
            var decoded = jwt.verify(token.split(" ")[1], 'someRandomSecretKey');
            // console.log(decoded);
    
            if (decoded) {
                req.body.userId = decoded.userId;

                next();
            }
            else {
                res.status(200).send({"msg": "Not authenticated"});
            }
        }
        else {
            res.status(200).send({"msg": "Not authenticated"});
        }
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
}

module.exports = {
    auth
}