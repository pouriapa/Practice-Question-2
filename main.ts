import {unzip, readDirectory, grayScale, createOutputDirectory} from "./IOhandler";


const zipFilePath = './myfile.zip';
const grayScaledFilesPath = './grayscaledphotos'



const runGrayScale = async (input:string, output:string) => {
    
   const pngFilePath =  await unzip (input, './unzipped');
   const {absolutePath, filesName} = await readDirectory (pngFilePath);
   await createOutputDirectory(grayScaledFilesPath);
   for( let i = 0; i < absolutePath.length; i++ ){
       await grayScale(absolutePath[i], output, filesName[i])
   }
     


   
   
  
}

runGrayScale(zipFilePath, grayScaledFilesPath);