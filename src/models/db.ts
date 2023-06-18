import path from "path";
import fs from "fs";
import {parse} from 'csv-parse';
import {EventInput} from "../dtos/event";
import csvParser from "csv-parser";

let eventsData: EventInput[] = []
const readCSVFile = async (): Promise<unknown> => {
    return  new Promise(async (resolve, reject) => {
        const csvFilePath = path.resolve('./src/data/events.csv')
        let result = {};
        const events = await fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {

                if (!result[`${row.lat},${row.lon}`]) {
                    result[`${row.lat},${row.lon}`] = {
                        lat: row.lat,
                        lon: row.lon,
                        impressions: 0,
                        clicks: 0
                    };
                }


                if (row.event_type === 'imp') {
                    result[`${row.lat},${row.lon}`].impressions++
                } else if (row.event_type === 'click') {
                    result[`${row.lat},${row.lon}`].clicks++;
                }
            })
            .on('end', () => {
                console.log('result -- : ', result)
                resolve(result)
                return result;
            });

        const eventFilePath = path.resolve('./src/data/grouped-events.json')

        fs.writeFile(eventFilePath, JSON.stringify(events) , 'utf8', ()=>{
            console.log('grouped-events.json file created')});
        // resolve(result);
    });
};

const readCSVFiler = async (pathFile: string) => {
    const csvFilePath = path.resolve(pathFile)
    const headers = ['lat', 'lon', 'event_type'];
    const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf-8'});
    eventsData = await new Promise((resolve, reject) => {
        parse(fileContent, {
            delimiter: ',',
            columns: headers,
            fromLine: 2,
            cast: (columnValue, context) => {
                if (context.column === 'lat' || context.column === 'lon') {
                    return parseInt(columnValue, 10);
                }
                return columnValue;
            }
        }, async (error, result: EventInput[]) => {
            if (error) {
                console.error(error);
            }
            resolve(result)
        });
    })
}

// eventsData =  readCSVFile('./src/data/events.csv');


export {
    // eventsData,
    // readCSVFile,
    readCSVFile
};
