const checkSongsAvailability = require('./server')

const testFunction = (() => {
    const songsList = [
        {
            name: "aim",
            artist: "benten"
        },
        {
            name: "wasted",
            artist: "daleun"
        }
    ];

    checkSongsAvailability(songsList)
})

console.log(testFunction())