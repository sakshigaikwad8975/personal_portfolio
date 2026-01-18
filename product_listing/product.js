const products=[
{id:1,name:"Gaming Console",price:1200,category:"tech",image:"https://picsum.photos/id/96/600/400"},
{id:2,name:"Camera",price:800,category:"tech",image:"https://picsum.photos/id/250/600/400"},
{id:3,name:"Clock",price:2200,category:"home",image:"https://picsum.photos/id/357/600/400"},
{id:4,name:"Keyboard",price:450,category:"tech",image:"https://picsum.photos/id/366/600/400"},
{id:5,name:"T-Shirt",price:400,category:"fashion",image:"https://picsum.photos/id/821/600/400"},
{id:6,name:"Shoes",price:1800,category:"fashion",image:"https://picsum.photos/id/858/600/400"},
{id:7,name:"Backpack",price:900,category:"fashion",image:"https://picsum.photos/id/1011/600/400"},
{id:8,name:"Jacket",price:2400,category:"fashion",image:"https://picsum.photos/id/1005/600/400"},
{id:9,name:"Coffee Mug",price:900,category:"home",image:"https://picsum.photos/id/431/600/400"},
{id:10,name:"Lamp",price:600,category:"home",image:"https://picsum.photos/id/460/600/400"}
];

let cart=JSON.parse(localStorage.getItem("cart"))||[];

const grid=document.getElementById("productGrid");
const cartItems=document.getElementById("cart-items");
const cartTotal=document.getElementById("cart-total");
const cartCount=document.getElementById("cart-count");

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
cartCount.innerText=cart.length;
}

function renderProducts(list){
grid.innerHTML="";
list.forEach(p=>{
grid.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p class="price">₹${p.price}</p>
<span class="badge">${p.category}</span>
<button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
</div>`;
});
}

function addToCart(id){
const existing=cart.find(p=>p.id===id);
if(existing){existing.qty++;}
else{
const product=products.find(p=>p.id===id);
cart.push({...product,qty:1});
}
renderCart();
}

function renderCart(){
cartItems.innerHTML="";
let total=0;
cart.forEach((item,i)=>{
total+=item.price*item.qty;
cartItems.innerHTML+=`
<div class="cart-item">
<span>${item.name}</span>
<div>
<button class="qty-btn" onclick="changeQty(${i},-1)">-</button>
${item.qty}
<button class="qty-btn" onclick="changeQty(${i},1)">+</button>
</div>
<span>₹${item.price*item.qty}</span>
<button class="remove-btn" onclick="removeItem(${i})">X</button>
</div>`;
});
cartTotal.innerText=total;
saveCart();
}

function changeQty(i,c){
cart[i].qty+=c;
if(cart[i].qty<=0)cart.splice(i,1);
renderCart();
}

function removeItem(i){
cart.splice(i,1);
renderCart();
}

function filterProducts(){
let filtered=[...products];
const cat=document.getElementById("categoryFilter").value;
const price=document.getElementById("priceFilter").value;
const sort=document.getElementById("sortPrice").value;
const search=document.getElementById("searchInput").value.toLowerCase();

if(cat!=="all")filtered=filtered.filter(p=>p.category===cat);
if(price==="low")filtered=filtered.filter(p=>p.price<500);
if(price==="mid")filtered=filtered.filter(p=>p.price>=500&&p.price<=1500);
if(price==="high")filtered=filtered.filter(p=>p.price>1500);
if(sort==="low-high")filtered.sort((a,b)=>a.price-b.price);
if(sort==="high-low")filtered.sort((a,b)=>b.price-a.price);
filtered=filtered.filter(p=>p.name.toLowerCase().includes(search));

renderProducts(filtered);
}

document.querySelectorAll("select").forEach(el=>el.addEventListener("change",filterProducts));
document.getElementById("searchInput").addEventListener("input",filterProducts);

renderProducts(products);
renderCart();
