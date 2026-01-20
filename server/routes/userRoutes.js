const express = require('express');
const router = express.Router();

const {
  createUser,
  getById,
  login,
  updateUser,
  deleteUser,
  verify,
  resetPassword,
  logout,
} = require('../controller/userController');

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/cadastrar').post(createUser);
router.route('/reset-password').put(resetPassword);
router.route('/verify').post(verify);
router.route('/:id').get(getById).delete(deleteUser).patch(updateUser);

module.exports = router;
