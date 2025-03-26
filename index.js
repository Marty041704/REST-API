import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: "true" }));

let posts = [{
    bookid: 1,
    title: "Ibong Adarna",
    author: "Anonymous",
    publisher: "Prime Multi-Quality Printing Corporation",
},
{
    bookid: 2,
    title: "Noli Me Tangere",
    author: "Jose Rizal",
    publisher: "Berliner Buchdruckerei-Aktiengesellschaft",
},
{
    bookid: 3,
    title: "El Filibusterismo",
    author: "Jose Rizal",
    publisher: "F. Meyer van Loo Press",
},
{
    bookid: 4,
    title: "Ilustrado",
    author: "Miguel Syjuco",
    publisher: "Random House",
},
];

//GET
app.get('/', (req, res) => {
    res.json(posts);
});

//POST
app.post('/post', (req, res) => {
    var data = req.body;
    console.log(data);
});

//GET SPECIFIC ID
app.get('/post/:bookid', (req, res) => {
    const bookid = parseInt(req.params.bookid);
    console.log(bookid);

    const data = posts.find((item) => item.bookid === bookid);
    res.status(200).json(data);
});

//UPDATE
app.patch('/edit/:bookid', (req, res) => {
    const bookid = parseInt(req.params.bookid);
    const index = posts.findIndex((element) => element.bookid === bookid);

    console.log(posts[index]);
    console.log(req.body.title);

    const updatedData = {
        "bookid": posts[index].bookid,
        "title": req.body.title || posts[index].title,
        "author": req.body.author || posts[index].author,
        "publisher": req.body.publisher || posts[index].publisher,
    }
    posts[index] = updatedData;
    res.json(posts[index]);
})

//POST
app.post('/upload', (req, res) => {
    const body = req.body;
    const title = req.body.title;
    const author = req.body.author;
    const publisher = req.body.publisher;

    const newData = {
        bookid: posts.length + 1,
        title: title,
        author: author,
        publisher: publisher,
    }
    posts.push(newData);
    res.status(200).json({ message: 'New book has been released' })
})

//DELETE
app.delete('/books/:delete', (req, res) => {

    const bookid = parseInt(req.params.bookid);
    const index = posts.findIndex((element) => element.bookid === bookid);

    posts.splice(index, 1);
    res.json({ books: posts });

});

app.listen(port, () => {
    console.log("Running in port" + port);
    console.log("Sever is running on http://localhost:3000");
});

