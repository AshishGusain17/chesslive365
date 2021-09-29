var jwt = require('jsonwebtoken');
const creds = require('./../Credentials_Save.json');

const fetchuser = (req, res, next)=>{
    let success = false;
    const token = req.header('jwt-token');
    try{
        if (token !== 'null'){
            const dataToken = jwt.verify(token, creds.JWT_SECRET_KEY);
            console.log(dataToken);
            req.userId = dataToken.id;
        }
        else{
            res.status(401).json({success: success, message: 'token not found'});
        }
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ success: success, message: "fetchuser function wrong credentials" });
    }

}

module.exports = fetchuser;