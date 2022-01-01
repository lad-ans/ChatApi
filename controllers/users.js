const { response } = require("express");
const User = require("../models/user");
// const User = require('../models/user');

const getUsers = async ( req, res = response ) => {

    const qty = Number( req.query.qty ) || 0;

    const users = await User
        .find( { _id: { $ne: req.uid } } )  // return all users, but not current user. [$ne: non existent]
        .sort('-online')
        .skip(qty)
        .limit(20)

    res.json({
        ok: true,
        users,
    });

}



module.exports = {
    getUsers
}