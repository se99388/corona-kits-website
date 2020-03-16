import fs from 'fs';


export const readDir = async (currentDir) => {

    return new Promise((resolve, reject) => {
        fs.readdir(currentDir, (err, files) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(files)
            }
        });

    });
}