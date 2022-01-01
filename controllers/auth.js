const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

// create
const createUser = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // verifying if this e-mail exists on database
        const emailExist = await User.findOne( { email } );

        if ( emailExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este e-mail encontra-se registrado'
            });
        }
        
        const user = new User( req.body );

        // encrypting password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // saving on database
        await user.save();

        // generate jwt
        const token = await generateJWT( user.id );
    
        res.json({
            ok: true,
            user, 
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Fale com o administrador'
        });
    }

}

// login
const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try { 
        
        const userDB = await User.findOne({ email });
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email não encontrado'
            });
        }

        // Validate password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'A senha é inválida'
            });
        }


        // Generate JWT
        const token = await generateJWT( userDB.id );
        
        res.json({
            ok: true,
            user: userDB,
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({ 
            ok: false,
            msg: 'Fale com o administrador'
        });
        
    }

}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    try {
        
        // generate new JWT
        const token = await generateJWT( uid );
        
        // get user from DB by id
        const user = await User.findById( uid );
        
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) { 
        
        console.log(error);

        return res.status(500).json({ 
            ok: false,
            msg: 'Fale com o administrador'
        });
        
    }

}



module.exports = {
    createUser,
    login,
    renewToken
}