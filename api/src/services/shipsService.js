const getXWingFighters = require("../utils/API_helper");
const Fighters = require('../models/starship.model')

const fetchFighters = async () => {
    return await Fighters.find().exec();
}

const createFighter = async ({starshipName, clicks}) => {
    return Fighters.updateOne({starship: starshipName}, {$set: {timesClicked: clicks}}, {upsert: true});
}

const fetchAllFighters = async () => {
    const apiFighters = await convertApiFighters();
    const dbFighters = await fetchFighters();
    const filteredFighters = filterByReference(apiFighters, dbFighters);
    return [].concat(filteredFighters, dbFighters);
}

const filterByReference = (arr1, arr2) => {
    let res = [];
    res = arr1.filter(el => {
        return !arr2.find(element => {
            return element.starship === el.starship;
        });
    });
    return res;
}

const convertApiFighters = async () => {
    let apiFighters = await getXWingFighters.getAllFighters();
    return apiFighters.map(f => new Fighters({starship: f, timesClicked: 0}));

}

module.exports = {
    fetchFighters, createFighter, fetchAllFighters
}