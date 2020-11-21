const User = require('../models/user');

const addToData = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }, (err) => {
        if (err) {
            console.log(err);
            return err;
        }
    });
    let data = req.body.data;
    let data1 = user.data;
    user.data.push({ ...data });

    await user.save();

    return res.status(200).send('Successfully added to data!');
};

const getData = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }, (err) => {
        if (err) {
            console.log(err);
            return err;
        }
    });

    return res.status(200).json({ data: user.data });
};
module.exports = { addToData, getData };
