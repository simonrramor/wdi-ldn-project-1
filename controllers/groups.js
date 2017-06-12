const Group = require('../models/group');
const User = require('../models/user');
const Photo = require('../models/photo');

function indexRoute(req, res, next) {
  Group
  .find({'members': req.user})
  .populate('createdBy members')
  .exec()
  .then((groups) => res.render('groups/index', { groups }))
  .catch(next);
}

function newRoute(req, res, next) {
  User
  .find()
  .exec()
  .then((users) => res.render('groups/new', { users }))
  .catch(next);
}

function createRoute(req, res, next) {
  // if(req.file) req.body.image = req.file.key;
  req.body.createdBy = req.user;

  Group
  .create(req.body)
  .then(() => res.redirect('/groups'))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest(`/groups/new`, err.toString());
    next(err);
  });
}

function showRoute(req, res, next) {
  Group
  .findById(req.params.id)
  .populate('createdBy comments.createdBy members')
  .exec()
  .then((group) => {
    if(!group) return res.notFound();

    return Photo
      .find({'groups': group.id})
      .exec()
      .then((photos) => {
        if(!photos) return console.log('No photos in this group currently');
        return res.render('groups/show', { group, photos });
      });

  })
  .catch(next);
}



function editRoute(req, res, next) {
  Group
  .findById(req.params.id)
  .exec()
  .then((group) => {
    if(!group) return res.redirect();
    if(!group.belongsTo(req.user)) return res.unauthorized(`/groups/${group.id}`, 'You do not have permission to edit that resource');
    return res.render('groups/edit', { group });
  })
  .catch(next);
}

function updateRoute(req, res, next) {
  Group
  .findById(req.params.id)
  .exec()
  .then((group) => {
    if(!group) return res.notFound();
    if(!group.belongsTo(req.user)) return res.unauthorized(`/groups/${group.id}`, 'You do not have permission to edit that resource');

    for(const field in req.body) {
      group[field] = req.body[field];
    }
    return group.save();
  })
  .then(() => res.redirect(`/groups/${req.params.id}`))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest(`/groups/${req.params.id}/edit`, err.toString());
    next(err);
  });
}

function deleteRoute(req, res, next) {
  Group
  .findById(req.params.id)
  .exec()
  .then((group) => {
    if(!group) return res.notFound();
    // if(!group.belongsTo(req.user)) return res.unauthorized(`/groups/${group.id}`, 'You do not have permission to delete that resource');
    return group.remove();
  })
  .then(() => res.redirect('/groups'))
  .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Group
  .findById(req.params.id)
  .exec()
  .then((group) => {
    if(!group) return res.notFound();

    group.comments.push(req.body); // create an embedded record
    return group.save();
  })
  .then((group) => res.redirect(`/groups/${group.id}`))
  .catch(next);
}


function deleteCommentRoute(req, res, next) {
  Group
  .findById(req.params.id)
  .exec()
  .then((group) => {
    if(!group) return res.notFound();
    // get the embedded record by it's id
    const comment = group.comments.id(req.params.commentId);
    comment.remove();

    return group.save();
  })
  .then((group) => res.redirect(`/groups/${group.id}`))
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
