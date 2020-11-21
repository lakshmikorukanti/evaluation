const User = require('../models/user');

const addToData = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }, (err) => {
        if (err) {
            console.log(err);
            return err;
        }
    });

    user.data.push({});

    await user.save();

    return res.status(200).send('Successfully added to data!');
};
module.exports = { addToData };
