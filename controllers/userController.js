import userModal from "../models/userModal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        if (!name || !email || !password || !address) {
            return res.status(400).json({ error: "One or more mandatory fields are empty" });
        }

        const userInDB = await userModal.findOne({ email: email });
        if (userInDB) {
            return res.status(500).json({ error: "User with this email is already registered" })
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new userModal({ name, password: hashedPassword, email, address });
        const newUser = await user.save();

        if (newUser) {
            return res.status(201).json({ result: "User signed up successfully" });

        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({ error: "both fields are required " });

        }
        const userInDB = await userModal.findOne({ email: email });
        if (!userInDB) {
            return res.status(401).json({ error: "invalid credentials" })
        }
        const didmatch = await bcryptjs.compare(password, userInDB.password);

        if (didmatch) {
            const jwtToken = jwt.sign({ _id: userInDB._id }, process.env.JWT_SECRET);
            const userinfo = { "email": userInDB.email, "name": userInDB.name, "id": userInDB._id, "isadmin": userInDB.isAdmin };

            return res.status(200).json({ result: { token: jwtToken, user: userinfo, message: "user successfully login" } });

        } else {
            return res.status(401).json({ error: "invalid creaditials" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error" })
    }
}

export const getUser = async (req, res) => {
    try {
        console.log(req)
        const userData = req.user;
        const userId = req.user._id;
        console.log(userId)
        const user = await userModal.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}