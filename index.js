const express = require('express');
const { spawnSync } = require('child_process');
const { readFile } = require('fs/promises');
const { appendFile } = require('fs/promises');
const { join } = require('path');
const app = express();

app.get("/", async (req, res, next)=>{
   const X = [1,2, 5] // large array
   const y = [[1,2], [2,3], [1,2]] // large array

   await appendFile(
            join(`scripts/args.json`),
            JSON.stringify({ X, y }),
            {
                encoding: 'utf-8',
                flag: 'w',
            },
        );
   const pythonProcess = await spawnSync('python3', [
     '/usr/src/app/scripts/python-script.py',
     'first_function',
     '/usr/src/app/scripts/args.json',
     '/usr/src/app/scripts/results.json'
   ] /*, { stdio: 'inherit'}*/ );

  //check the stdout/stderr from the python process
  const result = pythonProcess.stdout?.toString()?.trim();
  const error = pythonProcess.stderr?.toString()?.trim();

  // python process wwrites OK to stdout, then all is good in the world

  const status = result === 'OK';
  if (status) {
    console.log("JS: .");
    const buffer = await readFile('/usr/src/app/scripts/results.json');
    const resultParsed = JSON.parse(buffer?.toString());
    res.send(resultParsed.toString())
  } else {
    console.log("JS: NG", error, status, result);
    res.send(JSON.stringify({ status: 500, message: 'Server error' }))
  }

});
//Creates the server on default port 8000 and can be accessed through localhost:8000
const port=8000;
app.listen(port, () => console.log(`JS: Server is listening on PORT ${port}`));
