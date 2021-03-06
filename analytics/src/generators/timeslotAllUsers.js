const db = require('../db').db;
const utils = require('../utils');


// todo check for specific event not global (scan activity, ...)
module.exports = async (timeslots) => {
    const output = [];
    
    for(let i = 0; i < timeslots.length; ++i) {
        const res = await db().collection('sessionlog').aggregate([
            { 
                $match: { $and: [ 
                    { from: { $gte: timeslots[i][0] } }, 
                    { from: { $lte: timeslots[i][1] } },
                ]}
            },
            {
                $project: { userId: 1, _id: 0 }
            },
        ]).toArray();

        const uniqueUsers = [];
        res.forEach(e => {
            if (!uniqueUsers.includes(e.userId))
                uniqueUsers.push(e.userId);
        });

        output.push({ 
            timeslot: i + 1,
            from: utils.timestampToString(timeslots[i][0]),
            to: utils.timestampToString(timeslots[i][1]),
            uniqueUserCount: uniqueUsers.length,
            sessionCount: res.length,
        });
    }

    return output;
};