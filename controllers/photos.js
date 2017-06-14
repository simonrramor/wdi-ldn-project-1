const Photo = require('../models/photo');
const Group = require('../models/group');

function indexRoute(req, res, next) {
  let sortedByGroup = [];

  if(req.query.q) {
    sortedByGroup = [];
    console.log(req.query.q);
    req.query.q = req.query.q.split('-').reverse().join('-');

    const regex = new RegExp(req.query.q, 'i');
    const query = { date: regex };
    console.log(query);


    Photo
      .find()
      .exec()
      .then((photos) => {
        console.log(photos);
        res.render('photos/index', { photos, sortedByGroup });
      })
      .catch((err) => {
        res.notFound('statics/404', err.toString());
      });
  } else {
    // Find all groups that the current user is a member of
    Group
    .find({'members': req.user})
    .exec()
    .then((groups) => {

      return Photo
      .find()
      .populate('createdBy groups')
      .sort('-createdAt')
      .exec()
      .then((photos) => {

        const sortedByDate = []; // eventually an array of arrays
        photos.forEach((photo) => {
          let pushed = false;
          sortedByDate.forEach((dateArray) => {
            // Loop through all photos, and check if the date matches the date in any of the mini sorted arrays
            var date = dateArray[0].date;
            if (photo.date === date) {
              // If it matches, push it in (with other photos of the same date)
              dateArray.push(photo);
              pushed = true;
            }
          });
          // If there are no mini arrays of photos with the same date, create a new one and push it in
          if (!pushed) sortedByDate.push([photo]);
        });

        sortedByGroup = []; // Eventually become an array of objects, sorted by group and date
        sortedByDate.forEach((dateArray) => {
          // Loop through all possible groups a photo can belong to
          for (let i = 0; i < groups.length; i++) {
            // Create a mini object to store the group and image data
            const miniObject = {
              id: groups[i].id,
              name: groups[i].name,
              images: []
            };
            // For each array that we sorted earlier (images sorted by date)
            dateArray.forEach((image) => {
              // Check to see if the image has a group in it's groups array that matches one of the current users groups that we pulled in above
              const match = image.groups.find((group) => {
                return group.id === groups[i].id;
              });
              // If there's a match, add the image to the mini object images array
              if (match) miniObject.images.push(image);
            });
            // If the images array isn't empty, then push the mini sorted object (with group name, id and images array) into the sortedByGroup array
            if (miniObject.images.length > 0) sortedByGroup.push(miniObject);
          }
        });
        // Finally, render the index page and send through the sorted images
        res.render('photos/index', { photos, sortedByGroup });
      });
    })
    .catch(next);
  }

}

function newRoute(req, res, next) {
  Group
  .find({'members': req.user})
  .exec()
  .then((groups) => res.render('photos/new', { groups }))
  .catch(next);
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  req.body.createdBy = req.user;

  Photo
  .create(req.body)
  .then(() => res.redirect('/photos'))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest(`/photos/new`, err.toString());
    next(err);
  });
}

function showRoute(req, res, next) {
  Photo
  .findById(req.params.id)
  .populate('createdBy comments.createdBy groups')
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
