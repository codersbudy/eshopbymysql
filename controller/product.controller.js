import Category from "../model/category.model.js";
import Product from "../model/product.model.js";
export const addProductPage = (request,response,next)=>{
    Category.fetch().then(result=>{
      return response.render("add-product.ejs",{
        currentUser: request.session.user.currentUser,
        categoryList: result,
        message: ""
      });
    }).catch(err=>{
      console.log(err);
    })
}

export const save = (request,response,next)=>{
  let image = request.file?.filename;
  let {productName,price,stock,description,size,color,discount,type,categoryId} = request.body;
  let product = new Product(null,productName,price,stock,description,size,color,discount,type,image,categoryId); 
  product.save().then(result=>{
    Product.fetch().then(result=>{
        return response.render("add-product.ejs",{
          currentUser: request.session.user.currentUser,
          categoryList: result,
          message: "Product saved"
        });
      }).catch(err=>{
        console.log(err);
      })
  }).catch();
}

export const saveProduct = async (request,response,next)=>{
  let productList = request.body.products;
  for(let product of productList){
   let {title, description,price,discountPercentage,rating,stock,brand,category,thumbnail} = product;
   let imageArray = "";
   for(let image of product.images){
      imageArray = imageArray+image+" ";
   }
   let productObject = new Product(null,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,imageArray);
   await productObject.save();
  }
  console.log("data saved..");
}

export const viewProduct = (request,response,next)=>{
  var pageCount=0;
  var pageP = 0;
  var pageN = 1;
  if(request.params.id){
    pageCount = request.params.id*20;
    if( request.params.id >0){
     pageP = 1*request.params.id-1;
    }
    if(request.params.id <4){
      pageN = 1*request.params.id+1;
    }else{
      pageN = 4;
  
    }
    
  }else{
    pageN = 1;

  }
  

  Product.fetch()
  .then(result=>{
    // console.log("+++++++++"+result.length);
     return response.render("view-product.ejs",{
      currentUser: request.session.user.currentUser,
      productList: result,
      pagecount: pageCount,
      pagep : pageP,
      pagen : pageN
     })
  }).catch(err=>{
     console.log(err);      
  })   

}

