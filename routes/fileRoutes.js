`use strict`;

const _ = require("lodash");
const {errorResponseManagement} = require("../utils/utils");
const {APIS, ERROR_MESSAGES, STATUS_CODE, MESSAGE} = require("../utils/constants");
const {userAuthToken} = require("../services/authService");
const {upload} = require("../services/fileService");


module.exports = (app) => {

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Single file upload //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.post(APIS.SINGLE_UPLOAD_V1, upload.single(process.env.FIELD), async (req, res) => {
        try {

            res.status(STATUS_CODE.SUCCESS);
            return res.send(MESSAGE.SUCCESS);

        } catch (error) {

            error = errorResponseManagement(error);
            res.status(error[0]);
            return res.send(error[1]);
        }
    });
};