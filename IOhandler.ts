import { createReadStream, createWriteStream } from "fs";
import unzipper from "unzipper";
import {read, ABSOLUTE_PATHS, CASELESS_SORT, readSync} from "readdir";
import {PNG} from "pngjs";
import fs from "fs/promises"



const unzip = async (inputPath:string, outputPath:string) => {
    await createReadStream(inputPath)
        .pipe(unzipper.Extract({ path: outputPath }))        
        .promise() 
    console.log('Extraction Operation Complete');          
    return outputPath    
} 



const readDirectory = async (inputPath:string) => {
    const options = ABSOLUTE_PATHS + CASELESS_SORT;    
    const absolutePath =  await read(inputPath, ['*.png'], options );    
    const filesName =  await read(inputPath, ['*.png']);
    return {absolutePath,
            filesName}
}



const grayScale = (pathIn:string, pathOut:string, fileName:string) => {

    createReadStream(pathIn)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;          
          const average = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3
          // invert color
          this.data[idx] = average;
          this.data[idx + 1] = average;
          this.data[idx + 2] = average;        
        }
      }  
      this.pack().pipe(createWriteStream(`${pathOut}/${fileName}`));
    });
}


const createOutputDirectory = async (path:string) => {  
  try{
    await fs.access(path)
  }catch(err){   
      await fs.mkdir(path);
  }     
}
  

export {
    unzip,
    readDirectory,
    grayScale,
    createOutputDirectory        
};




