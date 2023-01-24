const express = require('express')
const nodemailer = require("nodemailer")
const multer = require('multer')
const path = require('path')
const { urlencoded } = require('express')
require('dotenv').config()

const password = process.env.NODEMAILER_PASS
const app = express()
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})
const bp = require("body-parser");
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json())
app.use(bp.urlencoded({ extended: true }));

let uploadMultiple = upload.fields([
    { name: 'foto_cedula_frente' }, 
    { name: 'foto_cedula_dorso' },

])

app.post('/upload', uploadMultiple, function (req, res, next) {
    console.log(req.files)
    let cedula_verde_frente = req.files.foto_cedula_frente[0].filename
    let cedula_verde_frente_path = req.files.foto_cedula_frente[0].path

    let path = __dirname + '/' + cedula_verde_frente_path

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: 'damian.vegtech@gmail.com',
            pass: password
        }
    });

    const mailOptions = {
        from: 'nombre',
        to: 'damian.vegtech@gmail.com',
        subject: 'Nuevo reporte',
        html: `
            <h2>cedula frente:</h2> 
            <img src="${path}" alt="">
            ${req.files.foto_cedula_frente[0]}
            <img src="https://i0.wp.com/minutomotor.com.ar/wp-content/uploads/2021/03/Cedula-digital-220321-01.jpg?fit=1300%2C860&ssl=1" alt="">
            `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error.message)
        } else {
            console.log('email enviado')
            // res.send('consulta enviada')
            res.redirect('/')
        }
    })
})

// SEND EMAIL
app.post("/send-email", (req, res) => {
    console.log(req.body);
    const { nombre, email, telefono, consulta } = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: 'damian.vegtech@gmail.com',
            pass: password
        }
    });

    const mailOptions = {
        from: nombre,
        to: 'damian.vegtech@gmail.com',
        subject: 'Nuevo reporte',
        html: `<h1>Nuevo reporte de ${nombre}, email: ${email}, tel: ${telefono}</h1><p>${consulta}</p>`
    }

    console.log(nombre, email, telefono, consulta);
    if (nombre != '' || email != '' || telefono != '' || consulta != '') {

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send(error.message)
            } else {
                console.log('email enviado')
                // res.send('consulta enviada')
                res.redirect('/')
            }
        })
    }
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})