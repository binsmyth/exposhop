//Get clicked Product Counts
export function getProductCount(product, addedProducts, action, shouldDelete){
    const allProducts = Object.values(product);
    let productCounts = addedProducts;
    let total = 0;
   
    //find product location
    allProducts.forEach(function(value,index){
        if(Object.values(value).includes(action.payload)){ //Check if the product exists
            if (productCounts[value.name] === undefined){
                productCounts[value.name] = {
                    count:0,
                    price: value.price
                };
            }
            if(shouldDelete){
                productCounts[value.name].count--;

                // Number of product can't be less than 0
                if (productCounts[value.name].count<0){ 
                    productCounts[value.name].count = 0;
                }
            }
            else{
                productCounts[value.name].count++;
            }
        }
        if(productCounts.hasOwnProperty(value.name)){ // Check if product has been added
            total = total + productCounts[value.name].count;
        }
    });
    productCounts.total = total;
    return productCounts;
}

//omitting selected keys
export function omit(obj, omitKey) {
  return Object.keys(obj).reduce((result, key) => {
    if(key !== omitKey) {
       result[key] = obj[key];
    }
    return result;
  }, {});
}

/* 

- Should i add total price of each product in here or not?(06/12/2019)
*/