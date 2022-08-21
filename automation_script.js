const fs = require("fs");
const path = require('path');

// Joining path of directory 
const directoryPath = path.join(__dirname, '../../../GitHub/congress/data/117/votes/2022');
// Passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    // Log the length of all of the files
    console.log("Files length: ", files.length); 

    senateFiles = [];
    senateFileIntegers = [];
    houseFiles = [];
    houseFileIntegers = [];
    files.forEach(function (file, index) {
        // Resort files so that they're chronolical, ex: should end with s274 not s99.
        if (file.startsWith('s')) {
            senateFiles.push(file);
            senateFiles.sort();
            let removeS = file.substring(1);
            senateFileIntegers.push(parseInt(removeS));
            senateFileIntegers.sort();
        }
        if (file.startsWith('h')) {
            houseFiles.push(file);
            houseFiles.sort();
            let removeH = file.substring(1);
            houseFileIntegers.push(parseInt(removeH));
            houseFileIntegers.sort();
        }
    });

    senateFileIntegers.sort(function(a, b) {
        return a - b;
    });

    houseFileIntegers.sort(function(c, d) {
        return c - d;
    });

    const getTheLastTenFiles = [1,2,3,4,5,6,7,8,9,10];
    (async () => { 
        for await (const iteration of getTheLastTenFiles) {
            let dataFilePosition = senateFileIntegers[senateFileIntegers.length - iteration];            
            let dataFile = senateFiles.find(element => parseInt(element.substring(1)) === dataFilePosition)

            let oldPath = `../../../GitHub/congress/data/117/votes/2022/${dataFile}/data.json`;
            let newPath = `rawData/senateFiles/data${iteration}.js`;

            // Move and rename the file
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err
                
                // Add the custom first variable declaration
                let data = fs.readFileSync(`./rawData/senateFiles/data${iteration}.js`).toString().split("\n");

                data.splice(0, 0, `const senate${iteration}Votes = ` );

                let text = data.join("\n");

                fs.writeFile(`./rawData/senateFiles/data${iteration}.js`, text, function (err) {
                    if (err) return err;
                });
                console.log(`Ran senate${iteration}Votes without errors`);
            });
        }
    })();

    (async () => { 
        for await (const iteration of getTheLastTenFiles) {
            let dataFilePosition = houseFileIntegers[houseFileIntegers.length - iteration];            
            let dataFile = houseFiles.find(element => parseInt(element.substring(1)) === dataFilePosition)
    
            let oldPath = `../../../GitHub/congress/data/117/votes/2022/${dataFile}/data.json`;
            let newPath = `rawData/houseFiles/data${iteration}.js`;
    
            // Move and rename the file
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err
                
                // Add the custom first variable declaration
                let data = fs.readFileSync(`./rawData/houseFiles/data${iteration}.js`).toString().split("\n");
    
                data.splice(0, 0, `const house${iteration}Votes = ` );
    
                let text = data.join("\n");
    
                fs.writeFile(`./rawData/houseFiles/data${iteration}.js`, text, function (err) {
                    if (err) return err;
                });
                console.log(`Ran house${iteration}Votes without errors`);
            });
        }
    })();

});

// Calculate current date
const d = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const currentMonthToInsert = monthNames[d.getMonth()];
const today = new Date();
const day = today.getDate();       
const year = today.getFullYear(); 

function getLocalTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
}

// Set the current date and time
const data = fs.readFileSync('index.html').toString().split("\n");
data.splice(71, 1, `                        ${currentMonthToInsert} ${day}, ${year} at ${getLocalTime(new Date)} Central Time`);
const text = data.join("\n");

fs.writeFile('index.html', text, function (err) {
  if (err) return console.log(err);
});

