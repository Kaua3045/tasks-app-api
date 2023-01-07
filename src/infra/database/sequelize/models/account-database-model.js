const { Model, DataTypes } = require("sequelize");

module.exports = class AccountDbModel extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      confirm: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'accounts',
      timestamps: false,
      scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] }
        }
      }
    })
  }
}