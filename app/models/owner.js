/**
 * Created by Ariel on 5/20/2017.
 */
module.exports = function(sequelize, Datatypes) {

    var Owner = sequelize.define('owner', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },

        first_name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        last_name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        address: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        email: {
            type: Datatypes.STRING,
            validate: {
                isEmail: true
            }
        },

        phone: {
            type: Datatypes.INT,
            validate: {
                isNumeric: true
            }
        }


    });

    return Owner;

};