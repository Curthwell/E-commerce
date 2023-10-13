//works from Products
let shoppi = document.getElementById("shoppi");
//console.log(shoppi);
//works from forProducts
let shop = document.getElementById("shop");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */
let shopItemsData = [
    {
        id: "jfhgbvnscs",
        name: "Oxford full corner unit",
        price: 23999,
        desc: "FurnitureFurnitureFurnitureFurnitureFurnitureFurnitureFurniture.",
        img: "assets/img/Furniture/oxford1.jfif",
    },
    {
        id: "ioytrhndcv",
        name: "RITA COFFEE TABLE 90CM",
        price: 6699,
        desc: "The elegance of glass with the glamour of gold detailing, this coffee table will steal centre stage.",
        img: "assets/img/Furniture/rita3.jfif",
    },
    {
        id: "wuefbncxbsn",
        name: "LAWRENCE MEDIA UNIT",
        price: 9499,
        desc: "This modern solid wood media unit is perfect for the super organised home.",
        img: "assets/img/Furniture/lawrence.jfif",
    },
    {
        id: "thyfhcbcv",
        name: "VOLVE IRON STANDING SHELF",
        price: 7499,
        desc: "Made locally from high quality iron for strength and durability",
        img: "assets/img/Furniture/volve.jfif",
    },
    {
        id: "thiecbawdjksadjk",
        name: "MADISON 1 SEATER FIBREGUARD VELVET",
        price: 15999,
        desc: "A beautiful one seater for a luxurious home.",
        img: "assets/img/Furniture/madison.jfif",
    },
    {
        id: "iuertrywebncdjksadjk",
        name: "AGATE NESTED SIDE TABLES",
        price: 4200,
        desc: "Handmade in India, each Agate gemstone occasional table is a unique piece for your home. ",
        img: "assets/img/Furniture/agate.jfif",
    },
];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generateShop = () => {
    return (shoppi.innerHTML = shopItemsData.map((x) => {
            let { id, name, desc, img, price } = x;
            let search = basket.find((y) => y.id === id) || [];
            return `
      <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>R ${price} </h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item
                }</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
    </div>
      `;
        })
        .join(""));
};

generateShop();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
};


/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();