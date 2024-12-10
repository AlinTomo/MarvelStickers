api_key = "123456";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

async function getFromMarvel(url, query="",noUrl){//fetch dall'api della marvel
    var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
    var timestamp = Date.now();
    var publicApiKey = "f25e1766601268916c5923b1e318c586"
    var privateApiKey = "a7fa67cea760b38e3dbb3590b6b892ab9900f11a"
    var publicApiKey2 = "d6725322a3fe8dc7b632bf135c9c8545" //uso due apiKey nel caso in cui esaurisco le richieste possibili 
    var privateApiKey2 = "21fd1829acd161a1023754211452f1a78e1bcf65"
    var parameters = `ts=${timestamp}&apikey=${publicApiKey2}&hash=${MD5(timestamp+privateApiKey2+publicApiKey2)}&`
    if(noUrl){//quando faccio fetch da un url per intero fornito dall'api di marvel
        return await fetch(`${url}?${parameters}${query}`)
            .then(response => response.json())
            .catch(error => console.log('error', error));   
    }
    return await fetch(`http://gateway.marvel.com/v1/${url}?${parameters}${query}`)
        .then(response => {
            return response.json();
        })
        .catch(error => console.log('error', error));
}

function getCardsNumber(times){ //ritorno un array di id delle carte da estrarre dal api della marvel
    let array = [];
    let count = 0;  
    while(count < times){
        random = getRandomInt(0,2500);
        if(!array.includes(random)){    
            array.push(random);
            count++;
        }
    }
    return array;
}

function getRandomInt(min, max) { //prendo un intero randomico
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setPostOption(obj){ //impostazioni per il metodo post per quando si fa la fetch
    return  postOption = {
        method: "POST",
        headers: {
            accept : "application/json",
            "Content-type": "application/json"
        },
        body : JSON.stringify(obj)
    }
}

get = { //impostazioni per il metodo get per quando si fa la fetch
    method : "GET",
    headers: {
        accept : "application/json"
    }
}

del = {//impostazioni per il metodo delete per quando si fa la fetch
    method : "DELETE",
    headers: {
        accept : "applications/json"
    }
}

function getAllHeroes(){ //ottengo tutti gli eroi della marvel
    for (let i = 0; i <= 2600; i+=100) { //offset di cui mi sposto per ottenere i dati posso prenderne solo 100 alla volta(vedi documentazione api)
        offset(i);
    }
    function offset(range){
        //non ho ordinato la lista perchè vorrei averla dal backend già ordinata
        getFromMarvel('public/characters',"orderBy=name&limit=100&offset="+range,false).then(result => {
            list = result.data.results;
            select = document.getElementById("superhero");
            for (let k = 0; k < list.length; k++) { //k serve perchè le liste che ottengono sono indicizzate da 0 a 100
                option = document.createElement("option");
                option.textContent = list[k].name;
                option.value = list[k].name;
                select.appendChild(option);
            }    
        })
    }
}

function createCard (){ //creo una card da usare tramite funzione js
    // Crea l'elemento esterno <div> con le classi e l'attributo data-bs-interval
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item active';
    carouselItem.setAttribute('data-bs-interval', '10000');

    // Crea il secondo <div> con la classe card h-100 e aggiungilo come figlio del primo <div>
    const card = document.createElement('div');
    card.className = 'card h-100';
    carouselItem.appendChild(card);

    // Crea e aggiungi un elemento <img> con l'ID, la classe e l'attributo alt
    const img = document.createElement('img');
    img.className = 'card-img-top';
    card.appendChild(img);

    // Crea un altro <div> per il corpo della card (card-body)
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    // Crea un <h5> per il titolo della card e aggiungilo al card-body
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title text-center';
    cardBody.appendChild(cardTitle);

    // Crea il <div> per il footer della card e aggiungilo al card
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer text text-center';
    card.appendChild(cardFooter);

    // Crea l'elemento <button> per il bottone e aggiungilo al card-footer
    const button = document.createElement('button');
    button.type = 'button'; // Assicurati che sia di tipo 'button' per evitare comportamenti indesiderati
    button.className = 'btn btn-danger';
    button.textContent = 'Buy for';
    button.addEventListener('click', function() {
        addToCart(card); // Passa l'intera card come parametro alla funzione addToCart
    });    
    cardFooter.appendChild(button);

    return carouselItem;
}

function validateLog(){ //verfica se l'utente è loggato altrimenti lo reindirizza alla pagina di login
    let id = localStorage.getItem('idUser');
    if( id == null || id == undefined || id == ""){
        logout();
        window.location.href = "login.html";
    }
}

function logout(){
    localStorage.removeItem('idUser');
    localStorage.removeItem('arrayId');
    localStorage.removeItem('cards');
    localStorage.removeItem('credits');
    localStorage.removeItem('packets');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalCredits');
    localStorage.removeItem('totalCards');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('language');
    localStorage.removeItem('Pag');
    localStorage.removeItem('page')
    localStorage.removeItem('email');
}

//prese da info.html
function showInvalid(id,message){ //funzione che mostra il feedback di un input in un form sbagliato
    input = document.getElementById(id);
    feedback = document.getElementById(id+"Feedback");

    input.classList.add('is-invalid');
    input.classList.remove('is-valid');

    feedback.textContent = message;
    feedback.classList.remove('d-none');
    feedback.classList.add('invalid-feedback');
    feedback.classList.remove('valid-feedback');
}

function showValid(id,word){ //funzione che mostra il feedback di un input in un form giusto
    input = document.getElementById(id);
    feedback = document.getElementById(id+"Feedback");

    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    if(!word)
        feedback.textContent = "Looks good!";
    else
        feedback.textContent = word;
    feedback.classList.remove('d-none');
    feedback.classList.add('valid-feedback');
    feedback.classList.remove('invalid-feedback');
}

async function collectData(){ 
    /* raccoglie le info realtive al costo totale, crediti totali e info relative alle offerte che si intede far visualizzare a video 
    che l'utente ha selezionato per mettere nel carrello
    */
    cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    // console.log(cart);
    let data = [];
    for (let i = 0; i < cart.length; i++) {
        try {
            response = await fetch(`http://localhost:3000/payment/${cart[i].response._id}?api_key=${api_key}`);
            if (response.status == 200) {   
                let jsonResponse = await response.json(); // Store the parsed response
                // console.log(jsonResponse);
                data.push(jsonResponse); 
            } else {
                console.error('Error fetching data:', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    let buy = await creditsAndCards(data, cart);
    buy.price = Math.round(buy.price * 100) / 100;
    return buy;
}

async function creditsAndCards(data,cart){ 
    /*aggiorna il costo totale delle robe nel carrello( prezzo totale tra pacchetti e crediti che si sta acquistando) 
    in base ai crediti che ho e a quelli che sto comprando.
    */
    let credits = await getPersonalCredits();
    let packets = []
    let price = 0;
    let cartCredits = 0;
    // console.log("personal credits",credits);
    for (let i = 0; i < data.length; i++) {
        // console.log("data",data[i].offer,"cartQuantity",cart[i]);
        if(data[i].type == 0){ //se sto comprando crediti
            cartCredits += data[i].offer.credits * cart[i].quantity;
            price += data[i].offer.price * cart[i].quantity;
        }
        else 
            if(data[i].type == 1){ //se sto comprando pacchetti
                cartCredits -= data[i].offer.credits * cart[i].quantity;
                for (let j = 0; j < cart[i].quantity; j++) {
                    packets.push(data[i].offer.cards);
                }
            }
        else{ //se sto comprando entrambi
            if(data[i].offer.price){ //se ho il prezzo come attributo sto comprando crediti
                cartCredits += data[i].offer.credits * cart[i].quantity;
                price += data[i].offer.price * cart[i].quantity;
            }
            else{
                cartCredits -= data[i].offer.credits * cart[i].quantity;
                for (let j = 0; j < cart[i].quantity; j++) {
                    packets.push(data[i].offer.cards);
                }
            }
        }
    }
    // console.log("cartCredits",cartCredits);
    if(cartCredits <= 0){ //sto comprando piu figurine che crediti che ho ha disposizione dal carrello 
        cartCredits *= -1; 
        if(credits == 0){ //non ho crediti nel carrello e nemmeno nel mio account ho un sovraprezzo        
            price += cartCredits;  
        }
        else{
            if(credits >= cartCredits){ //ho i crediti sufficienti
                credits -= cartCredits; //tolgo i crediti di cui mi son virtualmente indebitato nel carrello a quelli che gia avevo
            }
            else{ //non ho i crediti sufficienti
                // console.log("credits",credits);
                // console.log("cartCredits",cartCredits);
                cartCredits -= credits; //riduco il debito di crediti che ho nel carrello aggiungendo quelli che gia avevo
                // console.log("differenza",cartCredits);
                price += cartCredits; //ricalcolo il sovraprezzo
                credits = 0; //metto i crediti a 0 perchè li ho convertiti in sovraprezzo
            }
        } 
        cartCredits = 0;
    }
    else{ //ho i crediti sufficienti e li somma a quelli che gia avevo
        credits += cartCredits;
    }
    return {credits,price,packets,cartCredits};
    // console.log("new credits",credits);
    // console.log("total price",price);
    // console.log("new packets",packets);
}

async function getPersonalCredits(){ //ottengo i crediti dell'utente dal db
    let id = localStorage.getItem('idUser');
    try {
        let response = await fetch(`http://localhost:3000/users/${id}?api_key=${api_key}`);
        if (response.status == 200) {
            let data = await response.json();
            //console.log(data);
            return data.credits;
        } else {
            console.error('Error fetching data:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function getNameSurnameUser(id){//ottiene nome e cognome di un user
    let nameSurname = []; //array contenente nome cognome dello user
    try {
        let response = await fetch(`http://localhost:3000/users/${id}?api_key=${api_key}`);
        if (response.status == 200) {
            let data = await response.json();
            //console.log(data);
            nameSurname.push(data.name);
            nameSurname.push(data.surname);
            return nameSurname;
        } else {
            console.error('Error fetching data:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function updatePacketsAndCredits(response,redirect){//redirect serve per capire se arrivo dalla pagina di pagamento o meno
    console.log(response.packets);
    console.log(response.credits);
    console.log(response.cartCredits);
    let obj = {
                credits : response.credits,
                packets : response.packets,
                redirect : redirect
            }
    let id = localStorage.getItem('idUser');
    // console.log(id);
    let flag = false;
    fetch("http://localhost:3000/users/"+id+"/about?api_key="+api_key,setPostOption(obj))
        .then(response =>{  
            if(response.status == 200){
                if(redirect){
                    window.location.href = "index.html";
                    localStorage.removeItem('arrayId');
                    flag = true;
                }
            }
            return response.json();
        })
        .then(response => { 
            if(!flag){
                console.log(response);
            }
        });
}


//codice legato alla traduzione delle pagine nelle lingue disponibili
async function getLang(language,page){ //ottengo le parole dal db in base alla lingua e alla pagina
    let flag = false;
    return await fetch("http://localhost:3000/languages/"+language+"/"+page+"?api_key="+api_key,get)
        .then(response =>{
            if(response.status == 200){
                flag = true;
            }
            return response.json();
        })
        .then(response => {
            if(!flag){
                return;
            }
            return response;
        })
        .catch(error => console.log('error', error)); 
}

async function genLanguage() { //chiedo al db che lingue sono disponibili per le traduzioni
    let flag = false;
    return await fetch("http://localhost:3000/languages?api_key="+api_key,get)
        .then(response =>{
            if(response.status == 200){
                flag = true;
            }
            return response.json();
        })
        .then(response => {
            if(flag){
                let select = document.getElementById("language");
                response.forEach(language => {
                    // console.log(language);
                    let option = document.createElement("option");
                    option.id = language;
                    option.value = language;
                    option.innerText = language;
                    select.appendChild(option);
                });
            }
        })
}

async function setLang(language){ //imposta la lingua in base alla pagina
    let words = [];
    localStorage.setItem('language',language);
    let page = localStorage.getItem('Pag');
    words = await getLang(language,0);
    //console.log(words);
    page = parseInt(page);
    if(page != 1 && page != 6 && page != 7 && page != 8 && page != 9){//condizione per le pagine che hanno la navbar
        document.getElementById("home").textContent = words[0].text;
        document.getElementById("trade").textContent = words[1].text;
        document.getElementById("shop").textContent = words[2].text;
        document.getElementById("account").textContent = words[3].text;
        document.getElementById("info").textContent = words[4].text;
        document.getElementById("password").textContent = words[5].text;
        document.getElementById("logOut").textContent = words[6].text;
    }
    words = await getLang(language,page);
    switch(page){
        case 1: //per la pag info.html
            console.log(words);
            localStorage.setItem('words',JSON.stringify(words));
            infoTitle = document.getElementById("infoTitle");
            formName = document.getElementById("personalName")
            surname = document.getElementById("surname");
            age  = document.getElementById("age");
            superhero = document.getElementById("superhero");
            save = document.getElementById("save");
            deleteAccount = document.getElementById("deleteAccount");
            goBack = document.getElementById("goBack");
            email = document.getElementById("email");
            
            if(formName != undefined){
                formName.placeholder = words[0].text;
            }
            if(surname != undefined){
                surname.placeholder = words[1].text;
            }
            if(age != undefined){
                age.placeholder = words[4].text;
            }
            if(superhero != undefined){
                superhero.placeholder = words[3].text;
            }
            
            if(infoTitle){
                infoTitle.textContent = words[8].text;
            }

            if(save){
                save.textContent = words[5].text;
            }
            if(deleteAccount){
                deleteAccount.textContent = words[6].text;

            }
            if(goBack){
                goBack.textContent = words[7].text
            }
            if(email){
                email.placeholder = words[2].text;
            }
            break;
        case 2: //pagina index.html
            // console.log(words);
            let credits = localStorage.getItem('credits');
            let packets = JSON.parse(localStorage.getItem('packets'));
            document.getElementById("title").textContent = words[0].text;
            document.getElementById("credits").textContent = words[5].text + ": " + credits;
            document.getElementById("packets").textContent = words[1].text + ": " + packets.length;
            document.getElementById("yourCards").textContent = words[2].text;
            document.getElementById("noCards").textContent = words[7].text;
            //traduzione pacchetti
            let packetsRow = document.getElementById("packetsRow");
            let cards = packetsRow.getElementsByClassName("card");
            buttons = packetsRow.getElementsByClassName("btn-danger");
            // console.log(typeof buttons) 
            Array.from(buttons).forEach(element => { //questo pk le collection non supportano il metodo for each quindi le converto in un array
                console.log(words[4].text);
                element.textContent = words[4].text; //traduco la scritta apri il pacchetto di figurine
            });
            Array.from(cards).forEach(element => {//traduco la scritta pacchetti delle figurine
                console.log(element);
                translateCardsTitle(element,words,true,2);
            });
            //traduzione figurine effettive
            cardsRow = document.getElementById("cardsRow");
            buttons = cardsRow.getElementsByClassName("btn-danger"); //traduco la scritta deittagli sulla singola figurina
            Array.from(buttons).forEach(element => { //questo pk le collection non supportano il metodo for each quindi le converto in un array
                console.log(words[3].text);
                element.textContent = words[3].text;
            });
            break;
        case 3: //pagina trade.html
            console.log(words);
            document.getElementById("firstTitle").textContent = words[0].text;
            document.getElementById("secondTitle").textContent = words[1].text;
            document.getElementById("thirdTitle").textContent = words[2].text;
            document.getElementById("submit").textContent = words[3].text;
            document.getElementById("noDuplicates").textContent = words[10].text;
            document.getElementById("noSuggestedTrades").textContent = words[11].text;
            document.getElementById("noPendingTrades").textContent = words[12].text;
            let proposal = Array.from(document.getElementsByClassName("proposal"));
            proposal.forEach(element => {
                element.options[0].textContent = words[4].text;
            });
            madeProposal = Array.from(document.getElementsByClassName("made"));
            madeProposal.forEach(element => {
                element.options[0].textContent = words[5].text;
            });
            let accept = Array.from(document.getElementsByClassName("accept"));
            accept.forEach(element => {
                element.textContent = words[6].text;
            });
            let decline = Array.from(document.getElementsByClassName("decline"));
            decline.forEach(element => {
                element.textContent = words[7].text;
            });

            let nameSurname = Array.from(document.getElementsByClassName("nameSurname"));
            nameSurname.forEach(element => {
                if(element.textContent != words[8].text)
                    element.textContent = untilLastSpace(element.textContent,words[8].text);
            });
            let nameSuranamePending = Array.from(document.getElementsByClassName("nameSurnamePending"));
            nameSuranamePending.forEach(element => {
                if(element.textContent != words[9].text)
                    element.textContent = untilLastSpace(element.textContent,words[9].text);
            });
            break;
        case 4: //pagina shop.html
            // console.log("case 4",words);
            document.getElementById("title").textContent = words[5].text;
            document.getElementById("dailyOffer").textContent = words[4].text;
            document.getElementById("credits").textContent = words[0].text;
            document.getElementById("packets").textContent = words[1].text;
            document.getElementById("totalPrice").textContent = words[9].text + " " + localStorage.getItem("totalPrice") +"$";
            document.getElementById("totalCards").textContent = words[10].text + " " + localStorage.getItem("totalCards");
            document.getElementById("totalCredits").textContent = words[11].text +" " + localStorage.getItem("totalCredits");
            let carousels = document.getElementById("shopContainer")
            buttons = Array.from(carousels.getElementsByClassName("btn-danger"));
            //al primo caricamento suppongo che buttons non carica tutti i bottoni da tradurre perchè il server non fa in tempo a mandare le info da caricare
            //sotto ho una stampa di debug
            // buttons.forEach(element => {
            //     console.log(element.parentElement.parentElement);
            // });
            translateCredits(buttons,words);
            translateBuy(buttons,words);
            //traduzione parole del carrello
            let items = Array.from(document.getElementsByClassName("item"));
            items.forEach(element =>{ //traduzione del bottone rimuovi delle figurine
                // console.log(element);
                element.getElementsByClassName("btn-danger")[0].textContent = words[3].text;
            });
            let unitPrice = Array.from(document.getElementsByClassName("unitPrice")); 
            unitPrice.forEach(element =>{ //traduzione titolo del prezzo unitario
                element.textContent = words[8].text;
            });
            let subtotalPrice = Array.from(document.getElementsByClassName("subtotalPrice"));
            subtotalPrice.forEach(element =>{ //traduzione titolo del prezzo totale
                element.textContent = words[9].text;
            });
            let discountPrice = Array.from(document.getElementsByClassName("discountPrice"));
            discountPrice.forEach(element =>{   //traduzione titolo dello sconto
                element.textContent = words[7].text;
            });
            let units = Array.from(document.getElementsByClassName("unit"));
            // console.log(units);
            units.forEach(element =>{ //tradizone dell paragrafo che descrive il prezzo unitario
                // console.log(element.textContent);
                if(element.textContent.charAt(element.textContent.length - 1) != '$'){
                    element.textContent = lastSpaceReplace(element.textContent,words[0].text);
                }        
            }); 
            let subototal = Array.from(document.getElementsByClassName("subtotal"));
            subototal.forEach(element =>{  //tradizone dell paragrafo che descrive il prezzo totale di UN SOLO TIPO DI PACCHETTO/CREDITI ACQUISTATI
                // console.log(element.textContent);
                if(element.textContent.charAt(element.textContent.length - 1) != '$'){
                    element.textContent = lastSpaceReplace(element.textContent,words[0].text);
                }
            });
            document.getElementById("buy").textContent = words[13].text;
            document.getElementById("cartTitle").textContent = words[12].text;
            let innerCart = document.getElementById("inner-cart");
            var childNodes = Array.from(innerCart.children) 
            childNodes.forEach(element =>{
                img = element.getElementsByClassName("card-img-top")[0];
                if(img.src.includes("coin")){
                    translateCardsTitle(element,words,false,4);
                }
                if(img.src.includes("album")){
                    translateCardsTitle(element,words,true,4);
                }
            });
            
            let discounts = Array.from(document.getElementsByClassName("discount"));
            discounts.forEach(element =>{ //traduzione del paragrado dello sconto
                if(element.textContent == "sì" || element.textContent == "yes"){
                    element.textContent = words[14].text;
                    // console.log(words[14].text);
                }
                    
                if(element.textContent == "no"){
                    element.textContent = words[15].text;
                }
            });  
            break;
        case 5: //pagina hero.html
            // console.log(words);
            document.getElementById("titleComics").textContent = words[0].text;
            document.getElementById("titleSeries").textContent = words[1].text;
            break;
        case 6: //pagina payment.html
            console.log(words);
            localStorage.setItem("words",JSON.stringify(words));
            document.getElementById("title").textContent = words[0].text;
            document.getElementById("cardNumberLabel").textContent = words[1].text;
            document.getElementById("nameOnCardLabel").textContent = words[4].text;
            document.getElementById("expiryDateLabel").textContent = words[3].text;
            document.getElementById("securityCodeLabel").textContent = words[2].text;
            document.getElementById("submit").textContent = words[5].text;
            document.getElementById("goBack").textContent = words[6].text;
            break
        case 7: //changePassword.html
            // console.log(words);
            localStorage.setItem("words",JSON.stringify(words));
            document.getElementById("email").placeholder = words[0].text;
            document.getElementById("continue").textContent = words[9].text;
            document.getElementById("loginBack").textContent = words[8].text;
            break;
        case 8: //pagina login.html
            console.log(words);
            document.getElementById("email").placeholder = words[0].text;
            document.getElementById("password").placeholder = words[1].text;
            document.getElementById("log").textContent = words[2].text;
            document.getElementById("register").textContent = words[3].text;
            document.getElementById("forgot").textContent = words[4].text;
            document.getElementById("feedback").textContent = words[5].text;
            break;
        case 9: //pagina register.html
            console.log(words);
            localStorage.setItem("words",JSON.stringify(words));
            document.getElementById("name").placeholder = words[0].text;
            document.getElementById("surname").placeholder = words[1].text;
            document.getElementById("age").placeholder = words[2].text;
            document.getElementById("superhero").options[0].textContent = words[3].text;
            document.getElementById("email").placeholder = words[4].text;
            document.getElementById("password").placeholder = words[15].text;
            document.getElementById("confirmPassword").placeholder = words[16].text;
            document.getElementById("title").textContent = words[14].text;
            document.getElementById("log").textContent = words[13].text;  
            document.getElementById("register").textContent = words[14].text;
            break;
    }              
}

function lastSpaceReplace(str,rep){//sostituisce la stringa dopo l'ultimo spazio trovato con rep
    let lastIndex = str.lastIndexOf(" ");
    // console.log("lastIndex",lastIndex);
    substr = str.substr(lastIndex + 1,str.length);
    // console.log("str",str);
    // console.log("rep",rep);
    // console.log(str.replace(substr,rep.toLowerCase()))
    return str.replace(substr,rep.toLowerCase());
}

function untilLastSpace(str,rep){//sostituisce la stringa fino all'ultimo spazio
    let lastIndex = str.lastIndexOf(" ");
    let substr = str.substr(0,lastIndex);
    return str.replace(substr,rep.toLowerCase());
}

function translateBuy(buttons,words){ //traduco la parola compra per
    buttons.forEach(element => {
        str = element.textContent;
        let regex = /\d/;
        firstDigit = str.search(regex) - 1; //quando trovo lo spazio so che la stringa da sotituire è la posizione prima
        buy = str.substr(0,firstDigit);
        element.textContent = str.replace(buy,(words[2].text).toLowerCase());
    });
}

function translateCredits(buttons,words){ //traduce l'ultima stringa dopo il prezzo
    buttons.forEach(element => {
        str = element.textContent;
        // console.log(str);
        lastIndex = str.lastIndexOf(" ") + 1; //quando trovo lo spazio so che la stringa da sotituire è la posizione dopo
        credits = str.substr(lastIndex,str.length); 
        let regex = /\d/; //regular expression che serve per torvare se la prola contiene numeri o meno perchè devo tradurre solo la prola crediti che so che non ha numeri
        let col = (element.parentElement).parentElement;
        if(!regex.test(credits)){ //se non contiene numeri allora so che è un offerta figurine
            element.textContent = str.replace(credits,(words[0].text).toLowerCase());
            translateCardsTitle(col,words,true,4);
        }
        else{
            translateCardsTitle(col,words,false,4); //caso in cui l'offerta è di crediti
        }
    });
}

function translateCardsTitle(col,words,stickers,page){//col è la variabile della card
    let str = col.getElementsByClassName("card-title")[0].textContent;
    // console.log(str);
    lastIndex = str.lastIndexOf(" ") + 1;
    let cards = str.substr(lastIndex,str.length);
    if(page == 4){ //in base alla pagina cambiano le parole da tradurre
        if(stickers) //se stickers è vero vuol dire che la card è un offerta di figurine
            col.getElementsByClassName("card-title")[0].textContent = str.replace(cards,(words[1].text).toLowerCase());
        else
            col.getElementsByClassName("card-title")[0].textContent = str.replace(cards,(words[0].text).toLowerCase());
    }
    if(page == 2){
        // console.log("da tradurre");
        col.getElementsByClassName("card-title")[0].textContent = str.replace(cards,(words[6].text).toLowerCase());
    }
}  

function loadLang(){//carica una lingua nella pagina
    let language = localStorage.getItem('language');
    if(language){
        setLang(language);
    }
    else{
        
        localStorage.setItem('language','en');
        setLang('en');
    }
}