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
    }
    // ,
    // link: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    //   len: [1]
    // },
  });

  Movie.associate = (models) => {
    // A Movie can't be created without a Playlist due to the foreign key constraint
    Movie.belongsTo(models.Playlist, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Movie;
};