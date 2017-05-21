module.exports = function(sequelize, Datatypes) {
 
    var User = sequelize.define('user', {
        username: {
            type: Datatypes.TEXT
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        },
        status: {
            type: Datatypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });
 
    return User;
 
};