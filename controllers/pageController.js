exports.index = (req, res) => {
    res.render("index");
};

exports.login = (req, res) => {
    const flash = req.session.flash;
    delete req.session.flash;
    res.render("login", { flash });
};

exports.register = (req, res) => {
    res.render("register");
};
