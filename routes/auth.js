/**
 * path: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { fieldsValidate } = require('../middlewares/field-validate');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
    '/new', 
    [ 
        check( 'name', 'O nome é obrigatório' ).not().isEmpty(),
        check( 'email', 'O e-mail é obrigatório' ).isEmail(),
        check( 'password', 'A senha é obrigatória' ).not().isEmpty(),
        fieldsValidate
    ], 
    createUser
);

router.post(
    '/', 
    [ 
        check( 'email', 'O e-mail é obrigatório' ).isEmail(),
        check( 'password', 'A senha é obrigatória' ).not().isEmpty(),
        fieldsValidate
    ], 
    login
);

router.get( '/renew', validateJWT, renewToken );


  



module.exports = router; 