function indexRouteGet(req, res) {
    res.render("index", { title: "Node Template" });
}

export { indexRouteGet };