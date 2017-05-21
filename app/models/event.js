/**
 * Created by Ariel on 5/20/2017.
 */
module.exports = function(sequelize, Datatypes) {
 // Sequelize model to create `events` instance in db
    var Event = sequelize.define('event', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        event_type: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        notes: {
            type: Datatypes.STRING
        }
    });
    return Event;
};