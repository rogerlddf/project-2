module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: "5"
      }
    });

    Review.associate = models => {
      Review.belongsTo(models.Movie, {
        foreignKey: "MovieID"
      });
    
    };

    return Review;
  };
  