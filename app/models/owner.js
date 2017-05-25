/**
 * Created by Ariel on 5/20/2017.
 */

module.exports = function(sequelize, Datatypes) {

// Sequelize model to create `owners` instance in db
    var Owner = sequelize.define('owner', {
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
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        address: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        phone: {
            type: Datatypes.INTEGER,
            allowNull: false
            // validate: {
            //     // ensures data is phone number in phone number format
            //     is: ["([0-1]([\s-./\\])?)?(\(?[2-9]\d{2}\)?|[2-9]\d{3})([\s-./\\])?(\d{3}([\s-./\\])?\d{4}|[a-zA-Z0-9]{7})$"]
            // }
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Owner.belongsTo(models.user, {
                        foreignKey: {
                            allowNull: false
                        }
                    }),
                        Owner.hasMany(models.pet, {
                            onDelete: "cascade"
                        });
                }
            }
        }
    );

    return Owner;
};