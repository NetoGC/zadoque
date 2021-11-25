const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require("./data");

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true,
});

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://livrariaevangelicaceleiro.com.br/wp-content/uploads/2020/07/subira-400x380.jpg",
        name: "Luciano Subirá",
        role: "Pastor - Comunidade Alcance",
        description: 'Servo de Deus, focado em trazer o Reino de Deus para a sua vida. Colaborador da <a href="https://www.orvalho.com/ministerio/eventos/categorias/casadezadoque/" target="_blank">Casa de Zadoque.</a>',
        links: [
            {name: "Instagram", url: "https://www.instagram.com/lucianosubira/?hl=pt"},
            {name: "Orvalho.com", url: "https://www.orvalho.com/"},
            {name: "Youtube", url: "https://www.youtube.com/user/lucianosubira"}
        ]
    }
    

    return res.render("about", { about })
});

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", {items: videos})
});

server.get("/video", function(req, res) {
    const id = req.query.id;
    const video = videos.find(function(video) {
       return video.id == id   
    }) 

    if (!video) { 
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})
});

server.listen(5000, function(){
    console.log("server is running")   
});