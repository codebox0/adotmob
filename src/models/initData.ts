import data from '../data.json'
import {User} from './user.model'
import {Pass} from './pass.model'
import {Place} from './place.model'
import {readCSVFile} from "./db";

const importData = async (): Promise<void> => {
    await readCSVFile();
    // const initData: { users: any, pass: any, places: any } = data
    // await User.deleteMany() // delete all data in collection
    // await User.insertMany(initData.users) // insert data from json file into collection
    // await Pass.deleteMany() // delete all data in collection
    // await Pass.insertMany(initData.pass) // insert data from json file into collection
    // await Place.deleteMany() // delete all data in collection
    // await Place.insertMany(initData.places) // insert data from json file into collection
}


export {importData}
