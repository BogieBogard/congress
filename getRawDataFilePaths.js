// const rawDataFolder = './rawData/';
// const fs = require('fs');

// fs.readdir(rawDataFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// });


const rawDataFolder = './rawData/';
const fs = require('fs');

fs.readdirSync(rawDataFolder).forEach(year => {
const yearFolder = `${rawDataFolder}${year}`;

  if (fs.lstatSync(yearFolder).isDirectory()) {

    fs.readdirSync(yearFolder).forEach(vote => {

      const voteFolder = `${rawDataFolder}${year}/${vote}`;

      if (fs.lstatSync(voteFolder).isDirectory()) {
        const dataFilePath = `<script src="${rawDataFolder}${year}/${vote}/data.js"></script>`;
        console.log(dataFilePath);
      }
    });
  }
});