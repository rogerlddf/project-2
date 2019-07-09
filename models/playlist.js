module.exports = (sequelize, DataTypes) => {
  let Playlist = sequelize.define("Playlist", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Playlist.associate = models => {
    // Associating Author with Posts
    // When an Playlist is deleted, also delete any associated Movies
    Playlist.hasMany(models.Movie, {
      onDelete: "cascade"
    });
  };
  return Playlist;
};