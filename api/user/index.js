/**
 * Created by wminikuma@gmail.com on 2020/11/25
 * Blog : https://minikuma-laboratory.tistory.com/
 * Github : http://github.com/minikuma
 */
const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;