const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express(); 
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor encendido en el puerto ${PORT}!`));


app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/canciones', (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repositorio.json', 'utf-8'));
    canciones.push(cancion);
    fs.writeFileSync('repositorio.json', JSON.stringify(canciones));
    res.send('canción agregada'); 
});

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repositorio.json', 'utf-8'));
    res.send(canciones);
});

app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync('repositorio.json', 'utf-8'));
    const index = canciones.findIndex((cancion) => cancion.id.toString() === id);
    canciones.splice(index, 1);
    fs.writeFileSync('repositorio.json', JSON.stringify(canciones));
    res.send('Canción eliminada');
});

app.put('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repositorio.json', 'utf-8'));
    const index = canciones.findIndex((cancion) => cancion.id.toString() === id.toString()); 
    canciones[index] = cancion;
    fs.writeFileSync('repositorio.json', JSON.stringify(canciones));
    res.send('Canción actualizada');
});