/**
 * Created by Ariel on 5/20/2017.
 */

module.exports = function(sequelize, Datatypes) {
// Sequelize model to create `pets` instance in db
    var Pet = sequelize.define('pet', {
        pets_id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        img_link: {
            type: Datatypes.STRING,
            defaultValue: 'https://www.dropbox.com/s/xuvi8uearw19jrr/paw.jpg?raw=1'
        },
        notes: {
            type: Datatypes.STRING
        },
        checkedIn: {
            type: Datatypes.BOOLEAN
        }
    });


    return Pet;
};