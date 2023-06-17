import {passInput} from '../dtos/pass'
import {Pass} from '../models/pass.model'


const addPass = async (createPassSchema: passInput) => {
    const pass = await Pass.create(createPassSchema)
    const savedPass = await pass.save()
    return savedPass
}

const getPass = async (id: string) => {
    return await Pass.findOne().where('_id').equals(id).exec()
}

const getPassList = async () => {
    return await Pass.find().sort({createdAt: 1}).exec()
}

const updatePass = async (id: string, updatePassInput: passInput) => {
    //update pass in db
    const updatedPass = await Pass.findByIdAndUpdate(id, {
        ...updatePassInput,
        updatedAt: new Date()
    }, {new: true});

    return updatedPass;
}

const deletePass = async (id: string) => {
    return Pass.findByIdAndDelete(id);
}

export {
    addPass,
    getPass,
    getPassList,
    updatePass,
    deletePass
}