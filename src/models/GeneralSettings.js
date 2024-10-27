const mongoose = require('mongoose');

const generalSettingsSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    siteName: {
        type: String,
        required: true
    },
    aboutUs: {
        type: String,
        required: true
    },
    contactDetails: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('GeneralSettings', generalSettingsSchema);
