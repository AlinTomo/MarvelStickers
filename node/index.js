const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const crypto = require('crypto');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); // Swagger Autogen
const swaggerSpec = require('./swaggerOptions'); // Swagger JSDoc

const uri = "mongodb+srv://alin:1@atlascluster.apqcdrh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

function hash(input) {
    return crypto.createHash('sha256')
        .update(input)
        .digest('hex');
}

// Middleware
function auth(req, res, next) {
    // L'autenticazione mi dava problemi nello swagger
    if (req.path.startsWith('/api-docs') || req.path === '/swagger.json') {
        return next();
    }
    const apikey = req.query.api_key;
    if (apikey == "123456") {
        next();
    } else {
        res.status(401);
        return res.json({ error: "Invalid API key" });
    }
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(auth); // Applica auth a tutte le rotte

// Serve Swagger UI con entrambe le documentazioni
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        urls: [
            { url: '/swagger.json', name: 'Swagger Autogen' }
        ]
    }
}));

// Serve swagger_output.json direttamente se necessario
app.get('/swagger.json', (req, res) => {
    res.json(swaggerFile);
});

app.listen(3000, () => console.log('Server started on port 3000'));


//funzioni che controllano le regex

function checkEmail(email){
    return emailRegex.test(email);
}

function checkPassword(password){
    return passwordRegex.test(password);
}

let lastCalledTimestamp = 0; // Inizializza il timestamp dell'ultima chiamata a zero (in millisecondi)
var array = [];

function genOfferOfDay() {  //permette di generare le offerte del giorno
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 ore in millisecondi 
    const now = Date.now(); // Ottieni il timestamp attuale in millisecondi
    // Verifica se è passato almeno 24 ore dall'ultima chiamata
    if (now - lastCalledTimestamp >= twentyFourHours) {
        array = []; //svuoto le offerte del giorno precedente
        do {
            const random = rundNumber(1, 12);
            if (!array.includes(random)) {
                array.push(random);
            }
        } while (array.length < 2);
        // Aggiorna il timestamp dell'ultima chiamata alla data e ora attuali
        lastCalledTimestamp = now;
        return array;
    } 
    return array;
}

function rundNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function addUser(user,res){ 
    if(user.name == ""){
        res.status(404).json({"response":"name not found"});
        return;
    }
        
    if(user.surname == ""){
        res.status(404).json({"response":"surname not found"});
        return;
    }
    if(user.age == ""){
        res.status(404).json({"response":"age not found"});
        return;
    }

    user.age = parseInt(user.age);

    if(user.age < 0 || user.age > 100){
        res.status(404).json({"response":"age not valid"});
        return;
    }

    if(user.superhero == ""){
        res.status(404).json({"response":"superhero not found"});
        return;
    }
    if(user.email == ""){
        res.status(404).json({"response":"email not found"});
        return;
    }

    if(!checkEmail(user.email)){
        res.status(404).json({"response":"email not valid"});
        return;
    }

    if(user.password == ""){
        res.status(404).json({"response":"email not found"});
        return;
    }

    if(!checkPassword(user.password)){
        res.status(404).json({"response":"password not valid"});
        return;
    }

    //console.log(user.cards);
    if(user.cards == undefined){
        res.status(404).json({"response":"cards not found"});
        return;
    }
    user.password = hash(user.password);
    user.credits = 0;
    user.packets = [];
    try{
        await client.db("Marvel").collection("users").insertOne(user);
    }catch(e){
        res.status(404).json({"response":"email already used"});
        return;
    }
    res.status(200).json({"response":"ok"});
}

async function getSingleUser(user,res){
    //console.log(user);
    if(user.email == ""){
        res.status(404).json({"response":"manca l'email"});
        return;
    }

    if(!checkEmail(user.email)){
        res.status(404).json({"response":"email non valida"});
        return;
    }
        
    if(user.password == ""){
        res.status(404).json({"response":"manca la password"});
        return;
    }

    if(!checkPassword(user.password)){
        res.status(404).json({"response":"password non valida"});
        return;
    }

    user.password = hash(user.password);
    userFromDb = await client.db("Marvel").collection("users").findOne({
        email : user.email,
        password : user.password
    })
    return userFromDb;
}

async function getSingleId(user,res){
    if(user.email == ""){
        res.status(404).json({"response":"manca l'email"});
        return;
    }

    if(!checkEmail(user.email)){
        res.status(404).json({"response":"email non valida"});
        return;
    }

    user = await client.db("Marvel").collection("users").findOne({email: user.email});

    if(user == undefined){
        res.status(404).json({"response" : "email inesistente"});
        return; 
    }
    res.status(200).json({"id": user._id}); 
}

async function changePassword(user,res){
    if(user.email == ""){
        res.status(404).json({"response":"manca l'email"});
        return;
    }

    if(!checkEmail(user.email)){
        res.status(404).json({"response":"email non valida"});
        return;
    }

    if(user.password == ""){
        res.status(404).json({"response" : "password not found"});
        return;
    }

    if(!checkPassword(user.password)){
        res.status(404).json({"response":"invalid password"});
        return;
    }
    console.log(user)
    user.password = hash(user.password);
    existingUser = await client.db("Marvel").collection("users").findOne({ //vedo se trovo l'utente con la stessa password e la stessa mail
        email : user.email,
        password : user.password},
        {
            projection: {
                password: 1,  // Include il campo cards
                _id: 0     // Esclude il campo _id
            }
        }  
    );
    if(existingUser) { //se trovo la password uguale vuol dire che non l'ha cambiata
        res.status(404).json({"response":"password already used"});
        return;
    }
    await client.db("Marvel").collection("users").updateOne({email : user.email},{$set: {password : user.password}});
    res.status(200).json({"response":"password aggiornata correttamente"});
}

async function modifyUser(id,user,res){
    if(id == undefined || id == ""){
        res.status(404).json({"response":"manca l'id"});
        return;
    }
    if(user.name == ""){
        res.status(404).json({"response":"name missing"});
        return;
    }

    if(user.surname == ""){
        res.status(404).json({"response":"surname missing"});
        return; 
    }

    if(user.age == ""){
        res.status(404).json({"response":"age missing"});
        return; 
    }

    if(user.email == ""){
        res.status(404).json({"response":"email missing"});
        return;  
    }

    if(!emailRegex.test(user.email)){
        res.status(404).json({"response":"email not valid"});
        return;
    }

    if(user.superhero == ""){
        res.status(404).json({"response":"superhero missing"});
        return; 
    }
    try {
        await client.db("Marvel").collection("users").updateOne({_id: new ObjectId(id)},{$set:{name: user.name, surname: user.surname, age: user.age, email: user.email, superhero: user.superhero}});
    } catch (error) {
        res.status(404).json({"response":"email already used"});
        return;
    }
    res.status(200).json({"response":"l'utente è stato aggiornato correttamente"});
}   

async function getOneDiscount(id){
    discount = await client.db("Marvel").collection("discount").findOne({_id: new ObjectId(id)});
    return discount;
}

async function getOnePacket(id){
    album = await client.db("Marvel").collection("packets").findOne({_id: new ObjectId(id)});
    return album;
}

async function getOneShop(id){
    shop = await client.db("Marvel").collection("shop").findOne({_id: new ObjectId(id)});
    return shop;
}

// Connect to MongoDB
async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        console.log('Visita http://localhost:3000/api-docs?api_key=123456 per vedere la documentazione Swagger');
        app.post("/users",(req,res) =>{ //aggiunge un utente 
            addUser(req.body,res);
        });

        app.post("/email",(req,res)=>{ //ritorna l'id dell'utente per questioni di sicurezza è una post serve per validare solo l'email per poter cabiare la password
            getSingleId(req.body,res);
        });

        app.post("/login",async (req,res)=>{ //richiesta di login da parte di un utente
            userFromDb = await getSingleUser(req.body, res);
            if(userFromDb == undefined)
                res.status(404).json({"response" : "email o password sbagliati"});
            else
                res.status(200).json({"id": userFromDb._id});
        });

        app.post("/password", (req, res) => { //cambia la password di un utente
            changePassword(req.body, res);
        });

        app.get("/users/:id",async(req,res)=>{ //trovo un utente e lo restituisco
            id = req.params.id;
            user = await client.db("Marvel").collection("users").findOne({_id: new ObjectId(id)});
            if(user)
                res.status(200).json(user);
            else
                res.status(400).json({"response" : "errore nel caricamente dell'user"});
        })

        app.post("/users/:id",(req,res)=>{ //dovremmo usare una put
            id = req.params.id;
            user = req.body;
            modifyUser(id,user,res);
        });

        app.delete("/users/:id",async (req,res)=>{ //cancella un utente
            id = req.params.id;
            if(id == undefined || id == ""){
                res.status(404).json({"response":""});
                return;
            }
            try{
                await client.db("Marvel").collection("users").deleteOne({_id: new ObjectId(id)});
            }
            catch(e){
                res.status(404).json({"response":"utente non trovato"});
                return;
            }
            res.status(200).json({"response":"utente cancellato correttamente"});
        });
        
        app.get("/shop",async(req,res)=>{ //ritorna tutti i crediti non in offerta
            //await client.connect();
            offer = await client.db("Marvel").collection("shop").find().toArray();
            //await client.close();
            if(offer == undefined){
                res.status(404).json({"response":"nessuna offerta trovata"});
                return;
            }
            //console.log(offer);
            res.status(200).json(offer);
        });

        app.get("/albums",async(req,res)=>{ //ritorna tutti i pacchetti di figurine non in offerta
            albums = await client.db("Marvel").collection("packets").find().toArray();
            if(albums == undefined){
                res.status(404).json({"response":"nessuna offerta trovata"});
                return;
            }
            res.status(200).json(albums);
        });

        app.get("/discount",async(req,res)=>{//ritorna le offerte
            array = genOfferOfDay();
            discount = await client.db("Marvel").collection("discount").find({ discount: { $in: [array[0], array[1]] } }).toArray();    
            if (discount == undefined){
                res.status(404).json({"response":"nessuna offerta trovata"});
                return;
            }
            res.status(200).json(discount);
        });

        app.get("/payment/:id", async (req, res) => {//restituisce le info complete sule informazioni del carrello
            let id = req.params.id;
            let type = 0; //0 = shop, 1 = album, 2 = discount;
            let offer = null;
            try {
                offer = await client.db("Marvel").collection("shop").findOne({ _id: new ObjectId(id) });
                if (offer == null) {
                    offer = await client.db("Marvel").collection("packets").findOne({ _id: new ObjectId(id) });
                    if (offer == null) {
                        offer = await client.db("Marvel").collection("discount").findOne({ _id: new ObjectId(id) });
                        if (offer != null) type = 2;
                    } else {
                        type = 1;
                    }
                }
        
                if (offer == null) {
                    res.status(404).json({ "response": "resource not found" });
                    return;
                }
                res.status(200).json({offer, "type": type });
        
            } catch (error) {
                console.error(error);
                res.status(500).json({ "response": "internal server error" });
            }
        });

        app.post("/users/:id/about", async (req, res) => {//dove aver pagato aggiorna gli acquisti dell'utente nel db
            let id = req.params.id;
            let credits = req.body.credits;
            let packets = req.body.packets;
            let redirect = req.body.redirect;
            if (id == undefined || id == "") {
                res.status(404).json({"response": "missing id"});
                return;
            }
            if (credits == undefined || credits === "") {
                res.status(404).json({"response": "missing credits"});
                return;
            }
            
            if (packets == undefined) {
                res.status(404).json({ "response": "missing packets"});
                return;
            }
            try {
                if(redirect){
                    await client.db("Marvel").collection("users").updateOne(
                        { _id: new ObjectId(id) },
                        { 
                            $set: { credits: credits },
                            $push: { packets: { $each: packets } }
                        }
                    ); 
                }
                else{
                    await client.db("Marvel").collection("users").updateOne(
                        { _id: new ObjectId(id) },
                        { 
                            $set: { credits: credits },
                            $set: { packets: packets }
                        }
                    ); 
                }      
            }
            catch (e) {
                console.log(e)
                res.status(404).json({ "response": "error" });
                return;
            }
            res.status(200).json({ "response": "ok"});
        });
        
        app.get("/users/:id/heroes", async (req, res) => {//restituisce i supereroi
            id = req.params.id;
            if(id == undefined || id == ""){
                res.status(404).json({"response":""});
                return;
            }

            heroes = await client.db("Marvel").collection("users").findOne(
                {_id: new ObjectId(id)},
                {//voglio farmi stampare solo gli eroi
                    projection:{
                        cards: 1,  // includo solo il campo cards
                        _id: 0     // Escludo il campo id dalla risposta pk altrimenti me lo manda
                    }
                }
            );
            if(heroes){
                // console.log(heroes);
                res.status(200).json(heroes);
            }
            else
                res.status(400).json({"response" : "errore nel caricamento degli eroi"});
        });

        app.post("/users/:id/heroes", async (req, res) => { //quando apri un pacchetto di figurine aggiunge le carte al db
            let id = req.params.id;
            cards = req.body.cards;
            // console.log(id);    
            if (id == undefined || id == "") {
                res.status(404).json({ "response": "missing id" });
                return;
            }
            if (cards == undefined) {
                res.status(404).json({ "response": "missing cards" });
                return;
            }
            try {
                await client.db("Marvel").collection("users").updateOne({ _id: new ObjectId(id)},{$push: { cards: { $each: cards } }});
            }
            catch (e) {
                console.log(e)
                res.status(404).json({ "response": "error" });
                return;
            }
            res.status(200).json({"response":"ok"});
        });
        app.get("/shop/:id", async (req, res) => {//ritorna un oggetto che si vuole aggiungere nel carrello
            let id = req.params.id;
            if (id == undefined || id == "") {
                res.status(404).json({ "response": "missing id" });
                return;
            }
            shopObj = await getOneShop(id);
            if (shopObj) {
                res.status(200).json(shopObj);
                return;
            }
        
            shopObj = await getOnePacket(id);
            if (shopObj) {
                res.status(200).json(shopObj);
                return;
            }
        
            shopObj = await getOneDiscount(id);
            if (shopObj) {
                res.status(200).json(shopObj);
                return;
            }
            res.status(404).json({ "response": "resource not found" });
        });

        app.get("/languages", async (req, res) => {//restituisce le lingue disponibili
            let array = [];
            let languages = await client.db("Marvel").collection("languages").find().toArray();
            for (let i = 0; i < languages.length; i++) {
                array.push(languages[i].language);  
            }
            if (languages) {
                res.status(200).json(array);
                return;
            }
            res.status(404).json({ "response": "resource not found" });
        });//ritorna tutte le lingue disponibili

        app.get("/languages/:id/:page", async (req, res) => {//restituisce le parole nella lingua selezionata
            let language = req.params.id;
            let page = parseInt(req.params.page);
            // console.log(language);
            if (language == undefined || language == "") {
                res.status(404).json({ "response": "missing language" });
                return;
            }

            if (isNaN(page)) {
                res.status(404).json({ "response": "missing or invalid page" });
                return;
            }

            try {
                let words = await client.db("Marvel").collection("languages").aggregate([
                    { $match: { language: language } },        // Filtra per linguaggio
                    { $unwind: "$items" },                     // "Esplodi" l'array items per lavorare su un singolo oggetto dell'array
                    { $match: { "items.page": page } },        // ottine un array filtrato dove sono presenti solo oggetti che hanno la pagina che si sta cercando
                    { $project: { _id: 0, text: "$items.text" } } // Proietta solo il campo text
                ]).toArray();
        
                if (words.length > 0) {
                    res.status(200).json(words);
                } else {
                    res.status(404).json({ "response": "resource not found" });
                }
            } catch (err) {
                res.status(500).json({ "response": "internal server error", "error": err.message });
            }
        });

        app.get("/trade/:idTrade",async (req,res)=>{ //restituisce un trade a partire da un id del trade fornito come input
            idTrade = req.params.idTrade;
            // console.log("idTrade",idTrade);
            if(idTrade == undefined || idTrade == ""){
                res.status(404).json({"response":"missing idTrade"});
                return;
            }
            let trade = await client.db("Marvel").collection("trades").findOne({_id: new ObjectId(idTrade)});
            // console.log("trade",trade);
            if(trade == undefined){
                res.status(404).json({"response":"nessuno scambio trovato"});
                return;
            }
            res.status(200).json(trade);
        });

        app.get("/trades/:id",async (req,res)=>{ //restituisce tutti gli scambi proposti da un utente
            id = req.params.id;
            if(id == undefined || id == ""){
                res.status(404).json({"response":"missing id"});
                return;
            }
            let trades = await client.db("Marvel").collection("trades").find({
                $and: [
                    { "initiator.idUser": id },
                    { status: "unsolicited" }
                ]
            }
            ).toArray();
            
            // console.log("trades",trades);
            if(trades == undefined){
                res.status(404).json({"response":"nessuno scambio trovato"});
                return;
            }
            res.status(200).json(trades);
        })

        app.get("/trades/allUnsolicited/:id",async (req,res)=>{ //restituisce tutti gli scambi proposti dagli altri user nel db
            id = req.params.id;
            if(id == undefined || id == ""){
                res.status(404).json({"response":"missing id"});
                return;
            }
            let trades = await client.db("Marvel").collection("trades").find({
                $and: [
                    { "initiator.idUser": { $ne: id } },
                    { status: "unsolicited" }
                ]
            }).toArray();           
            // console.log("trades",trades);
            if(trades == undefined){
                res.status(404).json({"response":"nessuno scambio trovato"});
                return;
            }
            res.status(200).json(trades);
        });

        app.get("/trades/allPending/:id/receiver",async(req,res)=>{ //trova le proposte dell'utente nello stato pending dove lo user è un receiver
            let id = req.params.id; 
            if(id == undefined || id == ""){
                res.status(404).json({"response":"missing id"});
                return;
            }
            let trades = await client.db("Marvel").collection("trades").find({
                $and: [
                    { "receiver.idUser": id },
                    { status: "pending" }
                ]
            }).toArray();           
            // console.log("pending",trades);
            if(trades == undefined){
                res.status(404).json({"response":"nessuno scambio trovato"});
                return;
            }
            res.status(200).json(trades);
        });

        app.get("/trades/allPending/:id/initiator",async(req,res)=>{ //trova le proposte dell'utente nello stato pending dove lo user è un initiator
            let id = req.params.id; 
            if(id == undefined || id == ""){
                res.status(404).json({"response":"missing id"});
                return;
            }
            let trades = await client.db("Marvel").collection("trades").find({
                $and: [
                    { "initiator.idUser": id },
                    { status: "pending" }
                ]
            }).toArray();           
            // console.log("pending",trades);
            if(trades == undefined){
                res.status(404).json({"response":"nessuno scambio trovato"});
                return;
            }
            res.status(200).json(trades);
        });

        app.get("/trades/allStandBy/:id",async(req,res)=>{ //trova le proposte dell'utente nello stato standBy ovvero coinvolte i qualche scambio come receiver
            let id = req.params.id;
            if(id == undefined || id == ""){
                res.status(404).json({"response":"missing id"});
                return;
            }
            let trades = await client.db("Marvel").collection("trades").find({
                $and: [
                    { "initiator.idUser": id },
                    { status: "standBy" }
                ]
            }).toArray();           
            // console.log("standBy",trades);
            if(trades == undefined){
                res.status(404).json({"response":"nessuno scambio trovato"});
                return;
            }
            res.status(200).json(trades);
        });
        
        app.post("/trades", async (req, res) => {//aggiunge uno scambio
            let trade = req.body;
            if (trade == undefined) {
                res.status(404).json({ "response": "missing trade" });
                return;
            }

            if(trade.initiator.idUser == undefined || trade.initiator.idUser == ""){
                res.status(404).json({ "response": "missing initiator" });
                return;
            }

            if(trade.initiator.cards == undefined || trade.initiator.cards.length == 0){
                res.status(404).json({ "response": "missing initiator cards" });
                return;
            }

            try {
                await client.db("Marvel").collection("trades").insertOne(trade);
                res.status(200).json({ "response": "ok" });
            } catch (err) {
                res.status(500).json({ "response": "internal server error", "error": err.message });
            }
        });

        app.post("/trades/pendingToUnsolicited/:idTrade",async (req,res)=>{ //modifica gli scambi da stato di sandBy a stato unsolicited
            let idTrade = req.params.idTrade;
            // console.log("idPending",idTrade);
            if(idTrade == undefined || idTrade == ""){
                res.status(404).json({"response":"missing id"});
                return;
            }
            let trade = req.body;
            // console.log("pending",trade);
            if(trade == undefined){
                res.status(404).json({"response":"missing trade"});
                return;
            }

            if(trade.status != "unsolicited"){
                res.status(404).json({ "response": "this post require the status of the trade to be unsolicited" });
                return;
            }

            if(trade.receiver != null){
                res.status(404).json({ "response": "this post require the receiver to be null" });
                return;
            }
            try {
                await client.db("Marvel").collection("trades").updateOne(
                    {_id: new ObjectId(idTrade)},
                    {$set:{
                        "status": trade.status,
                        "receiver": trade.receiver,
                        "standByTrade": trade.receiver //pk trade receiver vale null
                    }
                });
                res.status(200).json({"response":"ok"});
            } catch (error) {
                res.status(404).json({"response":"errore nell'aggiornamento dello scambio"});
            }
        });

        app.post("/trades/standByToUnsolicited/:idTrade",async (req,res)=>{ //modifica gli scambi da stato di sandBy a stato unsolicited
            let idTrade = req.params.idTrade;
            let trade = req.body;
            // console.log("idStandBy",idTrade);   
            if(idTrade == undefined || idTrade == ""){
                res.status(404).json({"response":"missing id"});
                return;
            }
            // console.log("standBy",trade);
            if(trade == undefined){
                res.status(404).json({"response":"missing trade"});
                return;
            }
            if(trade.status != "unsolicited"){
                res.status(404).json({ "response": "this post require the status of the trade to be unsolicited" });
                return;
            }
            try {
                await client.db("Marvel").collection("trades").updateOne({_id: new ObjectId(idTrade)},{$set:{ "status": trade.status}});
                res.status(200).json({"response":"ok"});
            } catch (error) {
                res.status(404).json({"response":"errore nell'aggiornamento dello scambio"});
            }
        });

        app.post("/trades/:idTrade/pending",async (req,res)=>{ //modifica lo stato di uno scambio a pending
            idTrade = req.params.idTrade;
            // console.log("id",idTrade);
            let trade = req.body;
            // console.log(trade);
            if(idTrade == undefined || idTrade == ""){
                res.status(404).json({"response":"missing idTrade"});
                return;
            }

            if(trade.initiator.idUser == undefined || trade.initiator.idUser == ""){
                res.status(404).json({ "response": "missing initiator id" });
                return;
            }

            if(trade.initiator.cards == undefined || trade.initiator.cards.length == 0){
                res.status(404).json({ "response": "missing initiator cards" });
                return;
            }

            if(trade.status != "pending"){
                res.status(404).json({ "response": "this post require the status of the trade to be pending" });
                return;
            }
            
            if(trade.receiver.idUser == undefined || trade.receiver.idUser == ""){
                res.status(404).json({ "response": "missing receiver id" });
                return;
            }

            if(trade.receiver.cards == undefined || trade.receiver.cards.length == 0){
                res.status(404).json({ "response": "missing receiver cards" });
                return;
            }

            try {
                await client.db("Marvel").collection("trades").updateOne({_id: new ObjectId(idTrade)},{
                    $set:{
                        receiver: trade.receiver,
                        status: "pending",
                        standByTrade: trade.standByTrade
                    }
                });
                res.status(200).json({"response":"ok"});
            } catch (error) {
                res.status(404).json({"response":"errore nell'aggiornamento dello stato"});
            }
        });

        app.post("/trades/:idTrade/standBy",async (req,res)=>{ //modifica lo stato di uno scambio a standBy
            idTrade = req.params.idTrade;
            sta = req.body; //non posso chiamarla standBy
            // console.log("status",sta);
            if(idTrade == undefined || idTrade == ""){
                res.status(404).json({"response":"missing idTrade"});
                return;
            }
            try {
                await client.db("Marvel").collection("trades").updateOne({_id: new ObjectId(idTrade)},{
                    $set:{
                        status: "standBy",
                    }
                });
                res.status(200).json({"response":"ok"});
            } catch (error) {
                res.status(404).json({"response":"errore nell'aggiornamento dello stato"});
            }
        });

        app.post("/trade/tradeCards/:idUser",async (req,res)=>{ //modifica le carte di uno scambio
            let idUser = req.params.idUser; 
            let cardsToAdd = req.body.cardsToAdd;
            let cardsToRemove = req.body.cardsToRemove;
            if(idUser == undefined || idUser == ""){
                res.status(404).json({"response":"missing idUser"});
                return;
            }

            if(cardsToAdd == undefined){
                res.status(404).json({"response":"missing cards to add"});
                return;
            }

            if(cardsToRemove == undefined){
                res.status(404).json({"response":"missing cards to remove"});
                return;
            }
            // console.log("cardsToAdd",cardsToAdd);
            // console.log("cardsToRemove",cardsToRemove);
            // console.log("idUser",idUser);
            userPreviusCards = await client.db("Marvel").collection("users").findOne(
                { _id: new ObjectId(idUser) }
                ,{
                    projection: {
                        cards: 1,  // Include il campo cards
                        _id: 0     // Esclude il campo _id
                    }
                }
            );
            // console.log("carte prima",userPreviusCards.cards);
            for(let i = 0; i < cardsToRemove.length; i++){
                // console.log("carta da rimuovere",cardsToRemove[i].id)
                for(k = 0; k < cardsToRemove[i].count; k++){
                    // console.log("per ",k + 1,"volte")
                    let index = userPreviusCards.cards.indexOf(cardsToRemove[i].id);
                    if(index != -1){
                        userPreviusCards.cards.splice(index,1);
                    }   
                }
            }
            // console.log("carte dopo aver tolto",userPreviusCards.cards);
            for(let i = 0; i < cardsToAdd.length; i++){
                // console.log("carta da aggiungere",cardsToAdd[i].id)
                for(k = 0; k < cardsToAdd[i].count; k++){
                    // console.log("per ",k + 1,"volte")
                    userPreviusCards.cards.push(cardsToAdd[i].id);
                }
            }
            // console.log("carte dopo aver aggiunto",userPreviusCards.cards);
            try {
                await client.db("Marvel").collection("users").updateOne(
                    { _id: new ObjectId(idUser) },
                    { $set: { cards: userPreviusCards.cards } }
                );
                res.status(200).json({"response":"ok"});
            } catch (error) {
                res.status(404).json({"response":"errore nell'aggiornamento delle carte"});
            }
        });
        app.delete("/trades/:idTrade",async (req,res)=>{
            idTrade = req.params.idTrade;
            console.log("delete id",idTrade);
            if(idTrade == undefined || idTrade == ""){
                res.status(404).json({"response":"id del trade non trovato"});
                return;
            }
            try{
                await client.db("Marvel").collection("trades").deleteOne({_id: new ObjectId(idTrade)});
            }
            catch(e){
                res.status(404).json({"response":"trade non trovato"});
                return;
            }
            res.status(200).json({"response":"trade cancellato correttamente"});
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log("MongoDB connection closed");
        process.exit(0);
    } catch (err) {
        console.error("Failed to close MongoDB connection", err);
        process.exit(1);
    }
});

main().catch(console.error);
