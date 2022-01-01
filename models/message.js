
const { Schema, model } = require('mongoose');

const MessageSchema = Schema({

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true // automatic createdAt from mongoose
});

// extracting and overriding data
MessageSchema.method('toJSON',  function() { // do not use arrow function because js doesnt allow [this] ref
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Message', MessageSchema );