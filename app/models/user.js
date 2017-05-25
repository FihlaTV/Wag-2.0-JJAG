module.exports = function(sequelize, Datatypes) {
 
    var User = sequelize.define('user', {
        users_id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Datatypes.TEXT
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Datatypes.BOOLEAN,
            defaultValue: 0
        }
    },
    
    {
    timestamps: false
    });
 
    return User;
 
};