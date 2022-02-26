console.log("search.js")
window.addEventListener('load', (event) => {
    const navbar = document.querySelector(".navbar-collapse");
    const menu = document.querySelector(".navbar-collapse ul").classList.add("menu-dropdown");
    const search = document.querySelector(".search-block-form").classList;

    document.querySelector(".search-block-form > div").classList.add("row", "justify-content-md-center");
    document.querySelector(".search-block-form div.form-item").classList.add("col-md-6", "col-9");
    document.querySelector(".search-block-form div.form-actions").classList.add("col-md-1", "col-3");
    const opensearchPhone = document.querySelector("#phone.open-search span");
    const opensearchDesktop = document.querySelector("#desktop.open-search span");
    opensearchPhone.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("search")
        search.toggle("show")
    })
    opensearchDesktop.addEventListener('click', (e) => {
        e.preventDefault();
        search.toggle("show")
    })
});