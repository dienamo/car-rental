module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    engine: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Car.associate = function(models) {
    // associations can be defined here
  };
  return Car;
};