function getWorkshops( req, res ) {
    const workshops = require( '../data/workshops.json' );
    return workshops;
}

function sendWorkshops( req, res ) {
    const workshops = require( '../data/workshops.json' );
    res.json( workshops );
}

function getWorkshopById(id,req,res){
    const workshops = require( '../data/workshops.json' );
    return workshops[id-1];
}
function sendWorkshopById(id,req,res){
    const workshops = require( '../data/workshops.json' );
    res.json(workshops[id-1]);
}
module.exports = {
    sendWorkshops,
    getWorkshops,
    getWorkshopById,
    sendWorkshopById
};
