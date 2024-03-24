const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    acted_as: {
        type: String,
    },
    program: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Activitie = mongoose.model("Activitie", userSchema);

module.exports = Activitie;