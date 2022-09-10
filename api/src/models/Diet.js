const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define("diet", {
   id: {
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV1,
     allowNull: false,
     primaryKey: true,
   },
   name: {
     type: DataTypes.STRING,
   },
 });
};