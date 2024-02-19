const fs = require('fs');
// console.log(fs);
const folderName = process.argv[2] || 'Project';

const htmlTemplateData = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Template</title>
    </head>
    <body>
        
        <script src="app.js"></script>
    </body>
    </html>`
}

// //THIS IS THE SYNC VERSION
// fs.mkdir('Dogs', { recursive: true }, (err) => {
//     console.log('IN THE CALLBACK');
//     if (err) throw err;
// }); 

//THIS IS THE ASYNC VERSION
try{
    fs.mkdirSync(folderName); 
    fs.writeFileSync(`${folderName}/app.css`, '')
    fs.writeFileSync(`${folderName}/app.js`, '')
    fs.writeFileSync(`${folderName}/index.html`, `${htmlTemplateData()}`)

}catch(e){
    console.log(e);

}

// console.log('I COME AFTER MKDIR IN THE FILE!!');
