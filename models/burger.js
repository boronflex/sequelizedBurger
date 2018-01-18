module.exports = function(sequelize, DataTypes){
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.varchar(255),
      allowNull: false
    },

    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
    timestamps: false
  })

  return Burger
}
