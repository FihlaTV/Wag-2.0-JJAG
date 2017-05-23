module.exports = function(sequelize, Datatypes) {
 
    var User = sequelize.define('user', {
        email: {
            type: Datatypes.TEXT
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Datatypes.BOOLEAN,
            default: 0
        },
        status: {
            type: Datatypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });
 
    return User;
 
};
