module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    train_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    no_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat_numbers: {
      type: DataTypes.JSON, // Using JSON to store array data
      allowNull: false,
    },
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "user_id" });
    Booking.belongsTo(models.Train, { foreignKey: "train_id" });
  };

  return Booking;
};
