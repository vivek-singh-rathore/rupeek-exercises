const express = require( 'express' );
const path = require( 'path' );
const { sendWorkshops, sendWorkshopById } = require( '../../controllers/workshops' );

const router = express.Router();

router.get( '/', sendWorkshops );

router.get( '/:id', ( req, res ) => {
    
    sendWorkshopById(req.params.id,req,res);
});

module.exports = router;