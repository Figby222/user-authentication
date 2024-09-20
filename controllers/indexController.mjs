function indexRouteGet(req, res) {
    res.render("index", { title: "User Login Page" });
}

function signUpFormGet(req, res) {
    res.render("/sign-up-form")
}

export { indexRouteGet, signUpFormGet };