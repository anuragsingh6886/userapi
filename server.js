const express = require("express")
const app = express();
const userdata = require("./userdata.json");

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get("/users/:pageId", (req, res) => {
    let pageId = req.params.pageId;
    let response = {};
    let temp = [];
    let startIndex = (pageId - 1) * 10;
    let endIndex = startIndex + 9;
    userdata.forEach((item) => {
        if (item.index >= startIndex && item.index <= endIndex) {
            temp.push(item);
        }
    });
    response.current_page = pageId;
    response.users = temp;
    response.total_pages = Math.ceil(userdata.length / 10);
    response.start_page = 1;
    response.items_per_page = 10;
    res.send(response);
})
app.get("/users", (req, res) => {
    let response = {};
    response.users = [];
    response.total_pages = Math.ceil(userdata.length / 10);
    response.start_page = 1;
    response.items_per_page = 10;
    res.send(response);
})

app.listen(8080, () => {
    console.log('server started at port 8080')
})