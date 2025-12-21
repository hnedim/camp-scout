const Campground = require('../models/campground');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});
const {cloudinary} = require('../cloudinary');

module.exports.index = async (req,res) => {
    const campgrounds = await Campground.find();
    res.render('campgrounds/index', {campgrounds});
}

module.exports.renderNewForm = (req,res) => {
    res.render('campgrounds/new');
}

module.exports.newCampground = async (req,res) => {
    const campground = new Campground(req.body);
    campground.images = req.files.map(f => ({url:f.path, filename: f.filename}));
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
    console.log(req.body);
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body);
    const imgs = req.files.map(f => ({url:f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){
        if (campground.images.length === req.body.deleteImages?.length) {
            req.flash('error', 'You must keep at least one image');
            return res.redirect(`/campgrounds/${campground._id}/edit`);
            }
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash('success', 'Succesfully updated campground!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req,res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Succesfully deleted campground!')
    res.redirect('/campgrounds');
}