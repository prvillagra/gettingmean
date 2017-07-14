module.exports.homelist = function (req, res) {
    res.render('location/location-list', { title: 'Home' });
};

module.exports.locationInfo = function (req, res) {
    res.render('location/location-info', { title: 'Location info' });
};

module.exports.addReview = function (req, res) {
    res.render('location/location-review-form', { title: 'Add review' });
};