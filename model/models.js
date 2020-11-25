/**
 * Created by wminikuma@gmail.com on 2020/11/25
 * Blog : https://minikuma-laboratory.tistory.com/
 * Github : http://github.com/minikuma
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite',
    logging: false
});

const User = sequelize.define('User', {
    name: {
        type: Sequelize.DataTypes.STRING,
        unique: true
    }
});

module.exports = {User,  Sequelize, sequelize};
