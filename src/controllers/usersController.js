import User from "../models/Users.js"
import Profile from "../models/Profiles.js"
import Review from "../models/Reviews.js";
import bcrypt from "bcrypt"

User.hasOne(Profile, { foreignKey: 'user_id' });
User.hasMany(Review, { foreignKey: 'user_id' });

export const getUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users)
}

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const selectedUser = await User.findAll({
            where: {
                id: userId
            }
        });
        if (!selectedUser) throw new Error("User not found!");
        res.status(200).json(selectedUser)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const addUser = async (req, res) => {

    try {
        let { username, password, passwordV, firstname, lastname, email } = req.body;
        
        let securePassword = await bcrypt.hash(password, 10)
        console.log(securePassword);

        User.sync().then((result) => {
            return User.create({
                username: username,
                password: securePassword,
            }).then(user => {
                return user.createProfile({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                })
            })
        })
        res.redirect('/login');
    } catch (message) {
        res.redirect('/signup');
        console.log("something went wrong!");
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        User.sync().then((result) => {
            return User.destroy({
                where: {
                    id: userId
                }
            })
        })
        res.redirect('/');
    } catch (message) {
        res.redirect('/signup');
        console.log("something went wrong!");
    }
}