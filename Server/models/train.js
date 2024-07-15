module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define("Train", {
    train_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seat_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arrival_time_at_source: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    arrival_time_at_destination: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });

  return Train;
};
