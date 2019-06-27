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
    // }
    // ,
    // playlistId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'playlists',
    //     key: 'id'
    //   }
    // }
  });

  Movie.associate = function (models) {
  Movie.belongsTo(models.Playlist, {
    foreignKey: "PlaylistId"
  }
  );
};

return Movie;
};

