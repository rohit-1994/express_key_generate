`use strict`;
const {decodeJwt} = require("../utils/utils");
const {ROLE, ERROR_MESSAGES, STATUS_CODE} = require("../utils/constants");
const {userExists} = require("../services/userService");

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// User auth token authentication //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
const userAuthToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        let decode = await decodeJwt(token);

        let user = await userExists({_id: decode._id, role: ROLE.USER, accessToken: token}, {__v: 0, password: 0});
        if (!user || user?.role !== ROLE.USER) {
            res.status(STATUS_CODE.UNAUTHORIZED_ACCESS);
            return res.send(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
        }
        delete user?.accessToken;
        req.body.user = user;
        next();
    } catch(error) {

        res.status(STATUS_CODE.UNAUTHORIZED_ACCESS);
        return res.send(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }
};

module.exports = {
    userAuthToken
};