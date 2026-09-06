const fs = require('fs');

// readding files
// fs.readFile('./docs/be1.txt', (err, data) =>{
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

//writing files
// fs.writeFile('./docs/be1.txt', 'Hello to my beautiful world', () => {
//     console.log("Files was writtend");
// });

// fs.writeFile('./docs/be2.txt', 'Hello to my beautiful world', () => {
//     console.log("Files was writtend");
// });


//directories
// if(!fs.existsSync('./assets')){
//    fs.mkdir('./assets', (err) => {
//     if(err){
//         console.log(err);
//     }
//     console.log('folder created');
//     });
// }else{
//     fs.rmdir('./assets', (err) => {
//         if(err){
//             console.log(err);
//         }
//         console.log('folder deleted');
//     });   
// }


//deleting filles
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    });

}