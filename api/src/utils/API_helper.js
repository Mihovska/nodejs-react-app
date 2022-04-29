const SWAPI = require("swapi-node");
const nameFilter = require('root-require')('package.json').starShipNameSuffix;

const getAllFighters = async () => {
    const XWing = await SWAPI.starships();
    return XWing.results.filter(f => f.name.includes(nameFilter)).map(n => n.name);
};

module.exports = {
    getAllFighters
}
