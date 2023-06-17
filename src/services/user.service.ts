import {createUserInput, UpdateUserInput} from '../dtos/user'
import {User} from '../models/user.model'


const addUser = async (createUserSchema: createUserInput) => {
    const user = await User.create(createUserSchema)
    const savedUser = await user.save()
    return savedUser
}

const getUser = async (id: string) => {
    return await User.findOne().where('_id')
        .equals(id)
        .populate('pass_id', 'level')
        .sort({createdAt: 1})
        .exec()
}

const getUsers = async () => {
    return await User.find()
        .populate('pass_id', 'level')
        .sort({createdAt: 1})
        .exec()
}

const updateUser = async (id: string, updateUserInput: UpdateUserInput) => {
    //update user in db
    return User.findByIdAndUpdate(id, updateUserInput, {new: true});
}

const deleteUser = async (id: string) => {
    return User.findByIdAndDelete(id);
}

const getUserByFirstNameAndLastName = async (firstName: string, lastName: string) => {
    return await User.findOne().where('firstName')
        .equals(firstName)
        .where('lastName')
        .equals(lastName)
        .populate('pass_id', 'level')
        .sort({createdAt: 1})
        .exec()
}

const getUserPass = async (id: string) => {
    return await User.findOne().where('_id')
        .equals(id)
        .populate('pass_id', 'level')
        .sort({createdAt: 1})
        .exec()
}


const getUserPassByInfo = async (firstName: string, lastName:string) => {
    return await User.findOne()
        .where('firstName')
        .equals(firstName)
        .where('lastName')
        .equals(lastName)
        .populate('pass_id', 'level')
        .exec()
}






export {
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserByFirstNameAndLastName,
    getUserPass
}