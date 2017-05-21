/**
 * Created by Ariel on 5/20/2017.
 */
module.exports = function(sequelize, Datatypes) {
 // Sequelize model to create `events` instance in db
    var Event = sequelize.define('event', {
        event_type: {
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
    return Event;
};