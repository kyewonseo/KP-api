exports.handler = function( event, context, callback ) {

    console.log('event =>' + event);
    callback( null, 'success!' );
}