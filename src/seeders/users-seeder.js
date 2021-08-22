import faker from "faker"
import User from "../models/Users.js";
import Profile from "../models/Profiles.js"
import bcrypt from "bcrypt"

Profile.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Profile, { foreignKey: 'user_id' });

const UserSeeder = async (req, res) => {
    let data = [];
    let amount = 20;
    
    User.hasOne(Profile, { foreignKey: 'user_id', targetKey: 'user_id'});

    while (amount--) {
        let securePassword = await bcrypt.hash(faker.internet.password(), 10)
        User.sync().then((result) => {
            return User.create({
                username: faker.name.firstName(),
                password: securePassword,
            }).then(user => {
                return user.createProfile({
                    firstname: faker.name.firstName(),
                    lastname: faker.name.lastName(),
                    email: faker.internet.email(),
                })
            })
        })
    }
}

export default UserSeeder