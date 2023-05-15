import {config} from '../config.js';
import SQ from 'sequelize';

const {host, user, database, password } = config.db;
// config.db에서 host, user, database, password를 가져옴.

export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    logging: false,    // log를 남기지 않겠다는 의미.
})