`use strict`;
const mongoose = require("mongoose");
const {USER_STATUS, ROLE} = require("../utils/constants");
const {objectToEnum} = require("../utils/utils");
const Schema = mongoose.Schema;
const userStatus = objectToEnum(USER_STATUS);

/** User schema **/
const UserSchema = new Schema({
    email: {type: String, unique: true, index: true},
    password: {type: String},
    clientId: {type: String},
    secretKey: {type: String},
    accessToken: {type: String},
    role: {type: String, enum: [ROLE.USER, ROLE.ADMIN], default: ROLE.USER},
    status: {type: Number, enum: userStatus, default: 2, index: true}

}, {timestamps: true});

module.exports = mongoose.model("iw_user", UserSchema);