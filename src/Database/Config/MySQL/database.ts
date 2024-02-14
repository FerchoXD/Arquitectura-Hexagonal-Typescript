import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('CAH_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
