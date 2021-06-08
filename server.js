const https = require('https')
const fs = require('fs');

const options = {
    hostname: 'pandemic-archive-of-voices.herokuapp.com',
    path: '/api/data',
    method: 'GET'
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    let output = '';
    res.on('data', (chunk) => {
        output += chunk;
      });
  
    res.on('end', () => {
        let obj = JSON.parse(output);
        
        let texts = obj.audios.map(a => a.text)
        let characters = texts.join("").split("")
        let uniqueCharacters = characters.filter(function(item, pos) {
            return characters.indexOf(item.toLowerCase()) == pos;
        })
        uniqueCharacters = shuffle(uniqueCharacters)
        console.log("uniqueCharacters", uniqueCharacters.length, uniqueCharacters)
        fs.writeFileSync('unique-characters.json', JSON.stringify(uniqueCharacters, null, 2));
    });
})


req.on('error', error => {
    console.error(error)
})

req.end()

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }