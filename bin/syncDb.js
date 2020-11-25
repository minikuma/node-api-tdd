/**
 * Created by wminikuma@gmail.com on 2020/11/25
 * Blog : https://minikuma-laboratory.tistory.com/
 * Github : http://github.com/minikuma
 */

const models = require('../model/models');

module.exports = () => {
    return models.sequelize.sync({force: true});
};