`use strict`;

const bcrypt = require("bcrypt");
const {generateCredentials, customRequiredMsg, customAlreadyExistErr, generateJwt, errorResponseManagement} = require("../utils/utils");
const {APIS, SERVER, ERROR_MESSAGES, STATUS_CODE} = require("../utils/constants");
const {register, userExists, updateUser} = require("../services/userService");
const {userAuthToken} = require("../services/authService");

module.exports = (app) => {

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Sign up user //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.post(APIS.SIGNUP_V1, async (req, res) => {
        try {
            let body = req.body;
            let error = await customRequiredMsg(body, ['email']);
            if (error) {
                res.status(error[0]);
                return res.send(error[1]);
            }

            let isExists = await userExists({email: body.email});
            error = await customAlreadyExistErr(isExists, body, ['email']);
            if (error?.length && error[0] !== STATUS_CODE.SUCCESS) {
                res.status(error[0]);
                return res.send(error[1]);
            }

            if (body.password) {
                body.password = await bcrypt.hash(body.password, SERVER.SALT);
            }
            let returnData = await register(body);

            res.status(returnData[0]);
            return res.send(returnData[1]);
        } catch (error) {

            error = errorResponseManagement(error);
            res.status(error[0]);
            return res.send(error[1]);
        }
    });

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Sign in user //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.post(APIS.SIGNIN_V1, async (req, res) => {
        try {
            let body = req.body;
            let error = await customRequiredMsg(body, ['email', 'password']);
            if (error) {
                res.status(error[0]);
                return res.send(error[1]);
            }

            let user = await userExists({email: body.email}, {__v: 0, accessToken: 0});
            if (!user) {
                res.status(STATUS_CODE.NOT_FOUND);
                return res.send(ERROR_MESSAGES.USER_NOT_FOUND);
            }

            let isMatched = await bcrypt.compare(body.password, user.password);
            if (!isMatched) {
                res.status(STATUS_CODE.BAD_REQUEST);
                return res.send(ERROR_MESSAGES.INVALID_PASSWORD);
            }

            delete user.password;
            let accessToken = await generateJwt(user);
            let returnData = {user, accessToken};
            await updateUser({_id: user._id}, {$set: {accessToken}});

            res.status(STATUS_CODE.SUCCESS);
            return res.send(returnData);
        } catch (error) {
            error = errorResponseManagement(error);
            res.status(error[0]);
            return res.send(error[1]);
        }
    });


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Generate keygen //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.get(APIS.GENERATE_CREDENTIALS_V1, userAuthToken, async (req, res) => {
        try {
            let body = req.body, criteria = {_id: body.user._id}, dataToUpdate = {};
            let credentials = generateCredentials();
            dataToUpdate = {$set: credentials};
            await updateUser(criteria, dataToUpdate);

            res.status(STATUS_CODE.SUCCESS);
            res.send(credentials);
        } catch (error) {
            error = errorResponseManagement(error);
            res.status(error[0]);
            return res.send(error[1]);
        }
    });


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Generate test keys for api //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.get(APIS.TEST_V1, async (req, res) => {
        res.status(STATUS_CODE.SUCCESS);
        return res.send(SERVER.TEST_CREDENTIALS);
    });
};