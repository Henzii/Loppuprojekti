/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
require('dotenv').config();
const mysql = require('mysql2/promise');
const makeConnection = () => {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  let connection;
  try {
    connection = mysql.createConnection({
      host,
      user,
      password,
      database: 'dev',
    })
  } catch (e) {
    throw new Error('Virhe yhdistettäessä tietokantaan');
  }
  return connection;
}
module.exports = (on, config) => {
  on('task', {
    'db:deleteUsers': async () => {
      const con = await makeConnection();
      const res = await con.query('delete from user where id > 0');
      con.end();
      return res;
    },
    'db:activateUsers': async () => {
      const con = await makeConnection();
      const res = await con.query('update user set active = 1 where id > 0')
      con.end();
      return res;
    }
  })
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
