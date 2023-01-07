const fs = require("fs");
const path = require('path');

// Joining path of directory 
const directoryPath = path.join(__dirname, '../../../GitHub/congress/data/118/votes/2023');
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

    let getTheLastTenSenateFiles = [1,2,3,4,5,6,7,8,9,10];
    let getTheLastTenHouseFiles = [1,2,3,4,5,6,7,8,9,10];

    // If the file length of votes in the new congress is less than a complete set of 10, we need to move the previous congress files down the chain, then make the new files.
    const amountOfNewHouseVotes = 10 - houseFiles.length;
    function removeFromArray(num) {
        return getTheLastTenHouseFiles.splice(-num);
    }

    const housePositionsToMoveDown = removeFromArray(amountOfNewHouseVotes);
    // console.log("What are the House numbers? ", housePositionsToMoveDown, getTheLastTenHouseFiles);

    if (houseFiles.length > 0) {
        (async () => { 
            for await (const loop of housePositionsToMoveDown) {
                console.log("How many times does this loop? ", loop)
                let oldPath = `../../../GitHub/prod/congress/rawData/houseFiles/data${loop - houseFiles.length}.js`;
                let newPath = `../../../GitHub/prod/congress/rawData/houseFiles/data${loop}.js`;
        
                // Move and rename the file
                fs.rename(oldPath, newPath, function (err) {
                    console.log(`Renamed houseFiles/data${loop}.js successfully`);
                });

                const filePath = `./rawData/houseFiles/data${loop}.js`;
                // Read the file into memory
                const data = fs.readFileSync(filePath, 'utf8');
                // Split the file into lines
                const lines = data.split('\n');
                // Remove the first line
                lines.shift();
                // Join the lines back together into a single string
                const updatedData = lines.join('\n');
                // Write the updated data back to the file
                fs.writeFileSync(filePath, updatedData, 'utf8');
            }
        })();
    }

    const amountOfNewSenateVotes = 10 - houseFiles.length;
    function removeFromArray(num) {
        return getTheLastTenSenateFiles.splice(-num);
    }
    const senatePositionsToMoveDown = removeFromArray(amountOfNewSenateVotes);
    // console.log("What are the Senate numbers? ", senatePositionsToMoveDown, getTheLastTenSenateFiles);

    if (senateFiles.length > 0) {
        (async () => { 
            for await (const loop of senatePositionsToMoveDown) {
                let oldPath = `../../../GitHub/prod/congress/rawData/senateFiles/data${loop - senateFiles.length}.js`;
                let newPath = `../../../GitHub/prod/congress/rawData/senateFiles/data${loop}.js`;
        
                // Move and rename the file
                fs.rename(oldPath, newPath, function (err) {
                    console.log(`Renamed senateFiles/data${loop}.js successfully`);
                });

                const filePath = `./rawData/senateFiles/data${loop}.js`;
                // Read the file into memory
                const data = fs.readFileSync(filePath, 'utf8');
                // Split the file into lines
                const lines = data.split('\n');
                // Remove the first line
                lines.shift();
                // Join the lines back together into a single string
                const updatedData = lines.join('\n');
                // Write the updated data back to the file
                fs.writeFileSync(filePath, updatedData, 'utf8');
            }
        })();
    }

});
