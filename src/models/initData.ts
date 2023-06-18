import {readCSVFile} from "./db";

const importData = async (): Promise<void> => {
    await readCSVFile();
}


export {importData}
