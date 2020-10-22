const express = require( 'express' );
const path = require( 'path' );
const { getWorkshops, getWorkshopById } = require( '../controllers/workshops' );

const router = express.Router();

// EXERCISE: Serve workshops list page (the js files must be present in public folder) - adapt the HTML, CSS and JS content from workshops-app application (Plain JS/Vue app)
router.get( '/', ( req, res ) => {
    
    let workshops, error;

    try {
        workshops = getWorkshops();
    } catch( err ) {
        error = err;
    }

    res.render( 'workshops', {
        error,
        workshops
    });
});

router.get( '/:id', ( req, res) => {
    
    
    let workshop, error;
    try{
        workshop = getWorkshopById(parseInt(req.params.id),);

    }catch(err){
        error = err;
    }
    res.render('workshop-list',{
        error,
        workshop
    })
});

module.exports = router;