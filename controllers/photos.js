const Photo = require('../models/photo');

function indexRoute(req, res, next) {
  Photo
  .find()
  .populate('createdBy')
  .exec()
  .then((photos) => res.render('photos/photoStream', { photos }))
  .catch(next);
}

function newRoute(req, res) {
  return res.render('photos/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;
  Photo
  .create(req.body)
  .then(() => res.redirect('/photos'))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest(`/photos/${req.params.id}/edit`, err.toString());
    next(err);
  });
}

function showRoute(req, res, next) {
  Photo
  .findById(req.params.id)
  .populate('createdBy comments.createdBy')
  .exec()
  .then((photo) => {
    if(!photo) return res.notFound();
    return res.render('photos/show', { photo });
  })
  .catch(next);
}



function editRoute(req, res, next) {
  Photo
  .findById(req.params.id)
  .exec()
  .then((photo) => {
    if(!photo) return res.redirect();
    if(!photo.belongsTo(req.user)) return res.unauthorized(`/photos/${photo.id}`, 'You do not have permission to edit that resource');
    return res.render('photos/edit', { photo });
  })
  .catch(next);
}

function updateRoute(req, res, next) {
  Photo
  .findById(req.params.id)
  .exec()
  .then((photo) => {
    if(!photo) return res.notFound();
    if(!photo.belongsTo(req.user)) return res.unauthorized(`/photos/${photo.id}`, 'You do not have permission to edit that resource');

    for(const field in req.body) {
      photo[field] = req.body[field];
    }
    return photo.save();
  })
  .then(() => res.redirect(`/photos/${req.params.id}`))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest(`/photos/${req.params.id}/edit`, err.toString());
    next(err);
  });
}

function deleteRoute(req, res, next) {
  Photo
  .findById(req.params.id)
  .exec()
  .then((photo) => {
    if(!photo) return res.notFound();
    if(!photo.belongsTo(req.user)) return res.unauthorized(`/photos/${photo.id}`, 'You do not have permission to delete that resource');
    return photo.remove();
  })
  .then(() => res.redirect('/photos'))
  .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Photo
  .findById(req.params.id)
  .exec()
  .then((photo) => {
    if(!photo) return res.notFound();

    photo.comments.push(req.body); // create an embedded record
    return photo.save();
  })
  .then((photo) => res.redirect(`/photos/${photo.id}`))
  .catch(next);
}


function deleteCommentRoute(req, res, next) {
  Photo
  .findById(req.params.id)
  .exec()
  .then((photo) => {
    if(!photo) return res.notFound();
    // get the embedded record by it's id
    const comment = photo.comments.id(req.params.commentId);
    comment.remove();

    return photo.save();
  })
  .then((photo) => res.redirect(`/photos/${photo.id}`))
  .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
