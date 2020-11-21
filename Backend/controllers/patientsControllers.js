const Patients = require('../models/patients');
const patientData = require('../mockdata/database.json');
const getPatientsDetails = async (req, res, next) => {
    let { gender, age, name } = req.query;

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    let sortByAge = age == 'asc' ? 1 : age == 'desc' ? -1 : 0;
    if (gender != undefined && name == undefined) {
        const patientDataCount = await Patients.countDocuments(
            {
                gender: { $regex: gender }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(patientDataCount / limit);
        try {
            const results = await Patients.find({
                gender: { $regex: gender }
            })
                .sort({ age: sortByAge })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (gender == undefined && name != undefined) {
        const patientDataCount = await Patients.countDocuments(
            {
                name: { $regex: name }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(patientDataCount / limit);
        try {
            const results = await Patients.find({
                name: { $regex: name }
            })
                .sort({ age: sortByAge })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (name != undefined && gender != undefined) {
        const patientDataCount = await Patients.countDocuments(
            {
                name: { $regex: name },
                gender: { $regex: gender }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(patientDataCount / limit);
        try {
            const results = await Patients.find({
                name: { $regex: name },
                gender: { $regex: gender }
            })
                .sort({ age: sortByAge })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else {
        const patientDataCount = await Patients.countDocuments({}, (err) => {
            if (err) console.log(err);
        });
        const finalPage = Math.ceil(patientDataCount / limit);
        try {
            const results = await Patients.find({}).sort({ age: sortByAge }).skip((page - 1) * limit).limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    }
};

const PatientId = (req, res) => {
    console.log(req.query.id);
    Patients.findById(req.query.id)
        .then((patient) => res.json(patient))
        .catch((err) => res.status(400).json('Error' + err));
};
module.exports = { getPatientsDetails, PatientId };
