function indexRouteGet(req, res) {
    res.render("index", { title: "User Login Page" });
}

export { indexRouteGet };