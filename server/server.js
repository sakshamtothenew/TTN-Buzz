const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(5000, () => {

    console.log("app is listening at port 5000...")
})