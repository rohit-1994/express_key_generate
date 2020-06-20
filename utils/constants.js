`use strict`;

const SERVER = {
    NAME: "IT-Waves Image Processors",
    SALT: 10,

    TEST_CREDENTIALS: {
        CLIENTID: "IW_TEST_b6f244eb-438d-4f07-8ca7-651895557ae3",
        SECRETKEY: "IW_TEST_PVS49TY8E6MY1ZHJKPA66JNAQNRY"
    }
};

const APIS = {
    GENERATE_CREDENTIALS_V1: "/api/v1/get_keys",
    SIGNUP_V1: "/api/v1/signup",
    SIGNIN_V1: "/api/v1/signin",
    TEST_V1: "/api/v1/test_keys",

    SINGLE_UPLOAD_V1: "/api/v1/single_upload",
};

const ERROR_MESSAGES = {
    USER_NOT_FOUND: "User not found!",
    USER_ALREADY_EXISTS: "User already exists!",
    INVALID_PASSWORD: "Invalid password!",
    UNAUTHORIZED_ACCESS: "Unauthorized access!",

    INVALID_FILE: "Invalid file type.",
    INVALID_IMAGE_FILE: "Invalid file type. Only jpg, png and gif image files are allowed.",
};

const MESSAGE = {
  SUCCESS: "Successfully done"
};

const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    WENT_WRONG: 500,
    SERVER_CRASHED: 503,
    UNAUTHORIZED_ACCESS: 401
};

const USER_STATUS = {
    DELETED: 1,
    ENABLED: 2,
    BLOCKED: 3
};

const ROLE = {
    ADMIN: "admin",
    USER: "user"
};

const FILE = {
    ALLOWED_MIMES: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],

    FILES: 1,
    LIMITS: 10240 * 10240,
};

module.exports = {
    SERVER,
    APIS,
    ERROR_MESSAGES,
    USER_STATUS,
    ROLE,
    STATUS_CODE,
    MESSAGE,
    FILE
};