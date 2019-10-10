//Get clicked Product Counts
export default function getProductCount(product, addedProducts, action, shouldDelete){
    const allProducts = Object.values(product);
    let productCounts = addedProducts;

    //find product location
    allProducts.forEach(function(value,index){
        if(Object.values(value).includes(action.payload)){
            if(shouldDelete){
                productCounts[value.name] = (productCounts[value.name] || 0) - 1;

                // Number of product can't be less than 0
                if (productCounts[value.name]<0){ 
                    productCounts[value.name] = 0;
                }
            }
            else{
                productCounts[value.name] = (productCounts[value.name] || 0) + 1;
            }
        }
    });

    productCounts.total = Object.values(omit(productCounts,"total")).reduce((prev,next)=>prev+next);
    return productCounts;
}

//omitting selected keys
function omit(obj, omitKey) {
  return Object.keys(obj).reduce((result, key) => {
    if(key !== omitKey) {
       result[key] = obj[key];
    }
    return result;
  }, {});
}