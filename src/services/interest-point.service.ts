import * as fs from "fs";
import * as path from "path";
import csvParser from 'csv-parser';
import {getDistance} from 'geolib';
import {InterestPoint} from "../dtos/interest-point";
import * as groupedEvents from "../data/grouped-events.json";
import {readCSVFile} from "../models/db";


const getInterestPoint = async (pointsOfInterest: Array<InterestPoint>) => {

    return new Promise(async (resolve, reject) => {
        const csvFilePath = path.resolve('./src/data/events.csv')
        const result = {};
        await fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                let closestPOI = pointsOfInterest[0];
                let closestDistance = Infinity;

                pointsOfInterest.forEach((poi) => {
                    const distance = getDistance(
                        {latitude: row.lat, longitude: row.lon},
                        {
                            latitude: poi.lat,
                            longitude: poi.lon
                        }
                    )
                    if (distance < closestDistance) {
                        closestPOI = poi;
                        closestDistance = distance;
                    }
                });

                if (closestPOI) {
                    if (!result[closestPOI.name]) {
                        result[closestPOI.name] = {
                            ...closestPOI,
                            impressions: 0,
                            clicks: 0
                        };
                    }

                    if (row.event_type === 'imp') {
                        result[closestPOI?.name].impressions++;
                    } else if (row.event_type === 'click') {
                        result[closestPOI?.name].clicks++;
                    }
                }
            })
            .on('end', () => {
                resolve(result);
                return result;
            });

    });
}

const getInterestPointGrouped = async (pointsOfInterest: Array<InterestPoint>) => {
    if(groupedEvents.length===0){
         await readCSVFile();
    }
    return new Promise(async (resolve, reject) => {
        const result = {};
        let rawdata = fs.readFileSync('./src/data/grouped-events.json', 'utf8');
        let events = JSON.parse(rawdata);
        events.map((event, index) => {
            let closestPOI = pointsOfInterest[0];
            let closestDistance = Infinity;

            pointsOfInterest.forEach((poi) => {
                const distance = getDistance(
                    {latitude: event.lat, longitude: event.lon},
                    {
                        latitude: poi.lat,
                        longitude: poi.lon
                    }
                )
                if (distance < closestDistance) {
                    closestPOI = poi;
                    closestDistance = distance;
                }
            });

            if (closestPOI) {
                if (!result[closestPOI.name]) {
                    result[closestPOI.name] = {
                        ...closestPOI,
                        impressions: 0,
                        clicks: 0
                    };
                }

                if (event.event_type === 'imp') {
                    result[closestPOI?.name].impressions+ events.impressions;
                } else if (event.event_type === 'click') {
                    result[closestPOI?.name].clicks + events.clicks;
                }
            }
        });
        resolve(result);
    });
}

export {
    getInterestPoint,
    getInterestPointGrouped
}