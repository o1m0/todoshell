const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user= new User({
            username,
            password:hash,
        });

        await user.save();

        res.send("User registered");
    }catch(err){
        console.log(err);
        res.status(500).send("Register error");
    }
};

exports.login = async(req,res) => {
    try{
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if(!user){
            return res.send("User not found");
        }

        const valid = await bcrypt.compare(password,user.password);

        if(!valid){
            return res.send("Wrong password");
        }

        req.session.userId = user._id;

        res.send("Login success");
    }catch(err){
            console.log(err);
            res.status(500).send("Login error");
    }
};

exports.logout = (req,res) =>{
    req.session.destroy();
    res.send("Logged out")
}