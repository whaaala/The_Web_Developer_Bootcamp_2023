const franc = require('franc');
const langs = require('langs');
const process = require('process');
const colors = require('colors');

const sentance = process.argv[2]

//const langCode = franc('এটি একটি ভাষা একক IBM স্ক্রিপ্ট'); //=> 'ben'
//const langCode = franc('Alle menneske er fødde til fridom'); //=> 'nno'
//const langCode = franc('Alle menslike wesens word vry'); //=> 'afr'
const langCode = franc(sentance); //=> 'afr'

if(langCode === 'und'){
    console.log('SORRY, COULD NOT FIGURE IT OUT! TRY WITH MORE SAMPLE TEXT');
}else{
    try {
        const language = langs.where("3", langCode);
        if (language) {
            console.log(colors.green(`Our best guess is: ${language.name}`));
        } else {
            console.log(colors.red(`SORRY, COULDN'T FIND A LANGUAGE FOR CODE: ${langCode}`));
        }
        console.log(language.name.green);
        
    } catch (error) {
        console.log(error.message);
        
    }
}