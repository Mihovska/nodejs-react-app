const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        _id: false,
        starship: String,
        timesClicked: Number
    }
);

// Remove mongodb specific attributes
schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        delete ret._id;
    },
});

const starShipModel = mongoose.model("Starship", schema);

module.exports = starShipModel;
