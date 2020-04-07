const router = require('express').Router();
const https = require('https');
const { Transform } = require('stream');

router.get('/', (req, res) => {
    const myTransform = new Transform({
        writableObjectMode: true,

        transform(chunk, encoding, callback) {
            try{
                const trasformed = chunk.toString().toUpperCase();
                callback(null, trasformed);
            }
            catch(err){
                callback(err, null);
            }
        }
    });

    const options = {
        hostname: 'praktikum.tk',
        port: 443,
        path: '/static/cards.json',
        method: 'GET'
    }

    const request = https.request(options, stream => {
        stream.pipe(myTransform).pipe(res);
    })

    request.end()
})

module.exports = router;