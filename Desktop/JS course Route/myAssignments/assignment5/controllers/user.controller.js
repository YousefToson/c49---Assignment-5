const { User } = require('../models');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Email already exists." });
        
        const user = User.build({ name, email, password, role }); // using build
        await user.save(); // using save
        res.json({ message: "User added successfully." });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createOrUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        await User.upsert({ id, ...req.body }, { validate: false }); // skip validation
        res.json({ message: "User created or updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.findByEmail = async (req, res) => {
    const user = await User.findOne({ where: { email: req.query.email } });
    if (!user) return res.status(404).json({ message: "no user found" });
    res.json({ user });
};

exports.findById = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['role'] } // excluding role
    });
    if (!user) return res.status(404).json({ message: "no user found" });
    res.json(user);
};