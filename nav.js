function generateNavbar() {
    return `
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <div class="navbar-brand text-center">
                    <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" alt="Marvel Logo" class="img-fluid" width="100vw">
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a id="home" class="nav-link" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a id="trade" class="nav-link" href="trade.html">changes</a>
                    </li>
                    <li class="nav-item">
                        <a id="shop" class="nav-link" href="shop.html">shop</a>
                    </li>
                    <li class="nav-item">
                        <a id="cartLink" class="nav-link" data-bs-toggle="modal" data-bs-target="#cart" href="shop.html">
                            <img src="images/cart.svg" width="30" height="24">
                            <span id="cartLenght" class="position top-0 start-100 translate-middle badge rounded-pill bg-danger">99+<span class="visually-hidden">unread messages</span>
                        </a>
                    </li>
                    <li>
                        <a id="account" class="nav-link d-lg-none" data-bs-toggle="modal" data-bs-target="#exampleModal">account</a>
                    </li>
                    </ul>
                    <select id="language" class="form-select mx-auto text-center" onchange="setLang(this.value)" aria-label="Default select example">
                        <option selected disabled hidden value="def">language</option>  
                    </select>
                    <a class="nav-link d-none d-lg-block" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img id="accountIcon" src="images/account.svg" width="40" height="40">
                    </a>
                </div>
            </div>
        </nav>
            <div class="modal fade modal-dialog modal-sm modal-right-lg modal-right-md modal-right-sm" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog mt-md-0">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Account</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <a id="info" href="info.html">change account info</a>
                            <br>
                            <a id="password" href="changePassword.html">change password</a>
                            <br>
                            <a id="logOut" href="login.html" onclick="logout()">log out</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="cart" class="modal fade modal-dialog modal-sm modal-right-lg modal-right-md modal-right-sm"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 id="cartTitle" class="modal-title fs-5 text-center" id="exampleModalLabel">Cart</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex justify-content-center">
                            <div id="inner-cart" class="col">
                                <div id="clone" class="card mb-3 d-none">
                                    <div class="row g-0 ">
                                        <div class="item sm-4 col-md-6">
                                            <img class="card-img-top" src="">
                                            <div class="card-body">
                                                <h5 class="card-title text-center"></h5>
                                            </div>
                                            <div class="card-footer row d-flex justify-content-center">
                                                <div class="row input-group d-flex justify-content-center mt-1">
                                                    <button class="col-3 btn btn-outline-secondary bootstrap-touchspin-up" type="button" onclick="inc(this.nextElementSibling,this.closest('.card'))">+</button>
                                                    <input id="quantity1" type="number" class="col-3" value="0" min="1" max="10">
                                                    <button class="col-3 btn btn-outline-secondary bootstrap-touchspin-down" type="button" onclick="dec(this.previousElementSibling,this.closest('.card'))">-</button>
                                                </div>
                                                <div class="col d-flex justify-content-center mt-2 mt-sm-0 mb-1">
                                                    <button class="btn btn-danger mt-3" type="button" onclick="remove(this.closest('.card'))">remove</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="sm-6 col-md-6">
                                            <div class="card-body">
                                                <div class="row">
                                                    <h5 class="card-title unitPrice">unit price:</h5>
                                                    <p class="unit"></p>
                                                </div>
                                                <div class="row">
                                                    <h5 class=" card-title subtotalPrice">subtotal price:</h5>
                                                    <p class="subtotal"></p>
                                                </div>
                                                <div class="row">
                                                    <h5 class="card-title discountPrice">discount:</h5>
                                                    <p class="discount"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="footer" class="modal-footer d-flex justify-content-center">
                            <div class="col-12">
                                <h5 id="totalPrice" class="text-center">Total price: 0$<br></h5>
                                <h5 id="totalCards" class="text-center">Total cards: 0<br></h5>
                                <h5 id="totalCredits" class="text-center">Total credits: 0<br></h5>
                            </div>
                            <a id="buy" href="payment.html" class="btn btn-dark px-sm-5 px-lg-4 px-xl-5" role="button">buy</a>
                        </div>
                    </div>
                </div>
            </div>
    `;
}
document.body.innerHTML += generateNavbar();

genLanguage();
