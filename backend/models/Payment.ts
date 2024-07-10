import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Payment extends Model {
  public id!: number;
  public amount!: number;
  public status!: string;
  public userId!: number;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'payments',
  }
);

export default Payment;