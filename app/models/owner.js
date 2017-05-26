module.exports = function(sequelize, Datatypes) {

// Sequelize model to create `owners` instance in db
    var Owner = sequelize.define('owner', {
        owners_id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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

        },
        users_id: {

            type:Datatypes.INTEGER,
            allowNull: false
        }
    },

    {
    timestamps: false

    });

    return Owner;
};