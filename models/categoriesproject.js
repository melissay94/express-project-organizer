'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoriesProject = sequelize.define('categoriesProject', {
    categoryId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  categoriesProject.associate = function(models) {
    // associations can be defined here
  };
  return categoriesProject;
};