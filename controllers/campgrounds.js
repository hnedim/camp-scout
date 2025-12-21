const Campground = require('../models/campground');

module.exports.index = async (req,res) => {
    const campgrounds = await Campground.find();
    res.render('campgrounds/index', {campgrounds});
}

module.exports.renderNewForm = (req,res) => {
    res.render('campgrounds/new');
}

module.exports.newCampground = async (req,res) => {
    const campground = new Campground(req.body);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Created a new campground!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate({path: 'reviews', populate: {path: 'author'}}).populate('author');
    res.render('campgrounds/show', {campground});
}

module.exports.renderEditForm = async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}

module.exports.updateCampground = async(req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body);
    req.flash('success', 'Succesfully updated campground!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req,res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Succesfully deleted campground!')
    res.redirect('/campgrounds');
}