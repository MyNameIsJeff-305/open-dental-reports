'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        username: 'demoUser1',
        email: 'demo1@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo1',
        lastName: 'User',
        userRoleId: 1
      },
      {
        username: 'demoUser2',
        email: "demo2@user.io",
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo2',
        lastName: 'User',
        userRoleId: 2
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demoUser1', 'demoUser2'] }
    }, {});
  }
};
