const GeneralSettings = require("../models/GeneralSettings");
const {generalSettingsValidation} = require("../utils/validations/generalSettingsValidation")

exports.getSettings = async (req, res) => {
    
    try {
        const settings = await GeneralSettings.findOne();

        if (!settings) {
            return res.status(404).json({ message: "Settings are not found" });
            
        }
        res.status(200).json(settings);
        
  } catch (error) {
    res.status(500).json({ message: error.message });
    
}
};



exports.updateSettings = async (req, res) => {
    
    try {
        const settings = await GeneralSettings.findOne();
        
        if (!settings) {
            return res.status(404).json({ message: "Settings not found" });
        }
        
        settings.logo = req.body.logo || settings.logo;
        settings.siteName = req.body.siteName || settings.siteName;
        settings.aboutUs = req.body.aboutUs || settings.aboutUs;
        settings.contactDetails.email =
        req.body.contactDetails.email || settings.contactDetails.email;
        settings.contactDetails.phone =
        req.body.contactDetails.phone || settings.contactDetails.phone;
        settings.contactDetails.address =
        req.body.contactDetails.address || settings.contactDetails.address;
        
        await settings.save();
        res.status(200).json(settings);
        
    } catch (error) {
        
        res.status(500).json({ message: error.message });
  }

};


