/**
 * Created by Ariel on 5/20/2017.
 */
module.exports = function(sequelize, Datatypes) {
// Sequelize model to create `pets` instance in db
    var Pet = sequelize.define('pet', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        pet_name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        pet_type: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        notes: {
            type: Datatypes.STRING
        },
        img_link: {
            type: Datatypes.STRING
        }
    });
    return Pet;
};