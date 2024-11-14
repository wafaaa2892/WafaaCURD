
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var updateButt = document.getElementById("updateButt");
var productList =[];
var Update;

if (localStorage.getItem("Product")!=null) {
  productList=JSON.parse(localStorage.getItem("product"))
  displayProduct();
}else{
  productList=[]
}
function AddProduct() {
  // ;
  // validProductPrice();
  // validUrl();

  var product={
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  }
  if (updateButt.innerText=="UpdateProduct") {
    productList[Update]=product;
    updateButt.innerText="Add Product"
  }else{
    productList.push(product)

  }
  localStorage.setItem("Product",JSON.stringify(productList));
  displayProduct();
  clearInput();
  console.log(productList);
}

function displayProduct(){
  var disPro = ``;
  for (var i = 0; i < productList.length; i++) {
    disPro += `<tr>
    <td>${i+1}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td><button class="btn btn-outline-warning" onclick="UpdateProduct(${i})">Update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
</tr>`
  }
  document.getElementById("tableBody").innerHTML = disPro;
}

function clearInput(){
  productName.value = '';
  productPrice.value = ''
  productCategory.value = ''
  productDescription.value = ''
}


function deleteProduct(index){
  productList.splice(index,1)
  displayProduct()
  localStorage.setItem("product",JSON.stringify(productList));
}


function UpdateProduct(index){
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDescription.value = productList[index].description;
  updateButt.innerText = "UpdateProduct"
  Update = [index] ;

}


function searchProduct(searchName){
  disPro =``;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchName.toLowerCase())) {
      productList[i].newProduct = productList[i].name.replace(searchName,`<span class="text-danger fw-bolder">${searchName}</span>`)
      disPro += `<tr>
    <td>${i+1}</td>
    <td>${productList[i].newProduct?productList[i].newProduct:productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td><button class="btn btn-outline-warning" onclick="UpdateProduct(${i})">Update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
</tr>`
  }
  document.getElementById("tableBody").innerHTML = disPro;      
    }
  }

// function visitProduct(index){
//   productList.includes()
// }


function validProductName(){
  var regex = /^[A-Z][a-z]{3,8}$/
  if (regex.test(productName.value)) {
    document.getElementById("errorName").classList.add("d-none");
  }else{
    document.getElementById("errorName").classList.remove("d-none");
  }
}
 function validProductPrice(){
  var regex =/^[1-9]{2,7}$/
  if (regex.test(productPrice.value)) {
    document.getElementById("errorPrice").classList.add("d-none");
  }else{
    document.getElementById("errorPrice").classList.remove("d-none");
  }
}
function validUrl(){
  var regex =/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
  if (regex.test(productPrice.value)) {
    document.getElementById("errorURL").classList.add("d-none");
  }else{
    document.getElementById("errorURL").classList.remove("d-none");
  }
}