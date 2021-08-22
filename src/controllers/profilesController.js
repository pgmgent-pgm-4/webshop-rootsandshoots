import Profile from "../models/Profiles.js";

export const getProfiles = async (req, res) => {
    const profiles = await Profile.findAll();
    res.status(200).json(profiles)
}

export const getProfile = async (req, res) => {
    try {
        const profileId = req.params.id;
        const selectedProfile = await Profile.findAll({
            where: {
                id: profileId
            }
        });
        if (!selectedProfile) throw new Error("Profile not found!");
        res.status(200).json(selectedProfile)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const editProfile = async (req, res) => {
    try {
        let {userid, firstname, lastname, email} = req.body;
        Profile.update({
            firstname: firstname,
            lastname: lastname,
            email: email
        }, {
            where: {
                user_id: userid,
            },
            returning: true,
            plain: true,
        })
        res.redirect("/");
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const profileId = req.params.id;
        const selectedProfile = await Profile.destroy({
            where: {
                id: profileId
            }
        });
        console.log("this is selected", selectedProfile);
        if (!selectedProfile) throw new Error("Profile not found!");
        res.status(200).json(selectedProfile)
    } catch (message) {
        res.status(404).json({error: message.toString() });
    }
}