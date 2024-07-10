import sequelize from '../config/database';
import Payment from './Payment';
import User from './User';

User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Payment };