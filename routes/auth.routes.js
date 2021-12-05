const { Router } = require("express");;
const authCtrl = require('../controllers/auth.controller')
const router = Router();

router.post('/signup', authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

module.exports = router;

