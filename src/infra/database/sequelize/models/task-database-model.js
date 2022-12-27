const { Model, DataTypes } = require("sequelize");

module.exports = class TaskDbModel extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'tasks',
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsTo(models.AccountDbModel, { foreignKey: 'user_id', as: 'user' })
  }
}