import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
  },
  {
    sequelize,
    tableName: "users",
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ['password']
        }
      }
    }
  }
);

export default User
