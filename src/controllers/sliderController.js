const Slider = require("../models/Slider");
const { sliderValidation } = require("../utils/validations/sliderValidation");

exports.getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({ isActive: true });

    if (!sliders) {
      return res.status(404).json({ message: "Sliders are not found" });
    }

    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSlider = async (req, res) => {
  const { error } = sliderValidation(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { imageUrl, title, description } = req.body;

    const slider = new Slider({
      imageUrl,
      title,
      description,
    });
    await slider.save();
    res.status(201).json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSlider = async (req, res) => {
  const { imageUrl, title, description, isActive } = req.body;

  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    if (imageUrl) slider.imageUrl = imageUrl;
    if (title) slider.title = title;
    if (description) slider.description = description;
    if (typeof isActive !== undefined) slider.isActive = isActive;

    await slider.save();
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    await slider.deleteOne();
    res.status(200).json({ message: "Slider deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
