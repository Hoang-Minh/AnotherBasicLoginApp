module.exports = function(app){   

    app.get("/ok", function(req, res){
        res.sendFile("ok.html", {root: "public"});
    })    

    app.get("/*", function(req, res){
        res.sendFile("home.html", {root: "public"});
    })
}