module.exports = (sequelize, DataTypes) => {
  let Movie = sequelize.define("Movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Movie.associate = models => {
    Movie.belongsTo(models.Playlist, {
      foreignKey: "PlaylistId"
    });
    Movie.hasMany(models.Review, {
      onDelete: "cascade"
    });
  };

  return Movie;
};