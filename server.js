//usei o express para criar e configurar o servidor
const express = require("express");
const server = express();


/* habilitar uso do req.body */

server.use(express.urlencoded({ extended: true }));

const db = require("./db");

/* 
const ideas = [{
    img: "https://image.flaticon.com/icons/png/512/560/560216.png",
    title: "Curso de Programação",
    category: "Estudo",
    description: "ornare commodo elit. Curabitur sit amet adipiscing purus. ",
    url: "http://rocketseat.com.br",

  },
  {
    img: "https://image.flaticon.com/icons/png/512/2906/2906301.png",
    title: "Atividades Físicas",
    category: "Exercicios",
    description: "ornare commodo elit. Curabitur sit amet adipiscing purus. ",
    url: "http://rocketseat.com.br",

  },

  {
    img: "https://image.flaticon.com/icons/png/512/2043/2043886.png",
    title: "Meditação",
    category: "mentalidade",
    description: "ornare commodo elit. Curabitur sit amet adipiscing purus. ",
    url: "http://rocketseat.com.br",

  },

  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaokê",
    category: "Diverção em Familia",
    description: "ornare commodo elit. Curabitur sit amet adipiscing purus. ",
    url: "http://rocketseat.com.br",

  },

  {
    img: "https://image.flaticon.com/icons/svg/3043/3043735.svg",
    title: "Cozinhar",
    category: "Receitas novas",
    description: "ornare commodo elit. Curabitur sit amet adipiscing purus. ",
    url: "http://rocketseat.com.br",

  },

  {
    img: "https://image.flaticon.com/icons/svg/3043/3043703.svg",
    title: "Gamer",
    category: "Diverção em Familia",
    description: "ornare commodo elit. Curabitur sit amet adipiscing purus. ",
    url: "http://rocketseat.com.br",

  }
]
 */

//configurar arquivos estaticos(css,script,imagens)
server.use(express.static("public"));

//configuração nunjucks

const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true, //boolean
});

//criei uma rota /
//capturo o pedido do cliente para responder
server.get("/", function (req, res) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err);

      return res.send("Erro no banco de dados !");
    }

    const reversedIdeas = [...rows].reverse();

    return res.render("index.html", {
      ideas: reversedIdeas,
    });
  });

  server.get("/ideias", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
      if (err) {
        console.log(err);

        return res.send("Erro no banco de dados !");
      }

      const reversedIdeas = [...rows].reverse();

      return res.render("ideias.html", {
        ideas: reversedIdeas,
      });
    });
  });
});

 /* inserir dados na tabela */

server.post("/", function (req, res) {
 
  const query = `

  INSERT INTO ideas(

      image,
      title,
      category,
      description,
      link

  ) VALUES(?,?,?,?,?);
`;

  const values = [
    req.body.image,
    req.body.title,  
    req.body.category,
    req.body.description,
    req.body.link,
    ];

  db.run(query, values, function (err) {
    if (err) {
      console.log(err);

      return res.send("Erro no banco de dados !");
    }
    return res.redirect("/ideias")
  });
});

//liguei meu servidor da porta 3000
server.listen(3000);
