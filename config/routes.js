const express = require('express');
const router  = express.Router();
const Photo = require('../models/photo');
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const secureRoute = require('../lib/secureRoute');
const photosController = require('../controllers/photos');
const upload = require('../lib/upload');
const users = require('../controllers/users');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/photos')
.get(photosController.index)
.post(secureRoute, upload.single('image'), photosController.create);

router.route('/photos/new')
.get(secureRoute, photosController.new);

router.route('/photos/:id')
.get(photosController.show)
.put(secureRoute, photosController.update)
.delete(secureRoute, photosController.delete);

router.route('/photos/:id/edit')
.get(secureRoute, photosController.edit);

router.route('/users/:id')
.get(secureRoute, users.show)
.post(upload.single('image'), users.update)
.delete(secureRoute, users.delete);

router.route('/users/:id/edit')
.get(secureRoute, users.edit);

router.route('/register')
.get(registrationsController.new)
.post(registrationsController.create);

router.route('/login')
.get(sessionsController.new)
.post(sessionsController.create);

router.route('/logout')
.get(sessionsController.delete);



module.exports = router;
