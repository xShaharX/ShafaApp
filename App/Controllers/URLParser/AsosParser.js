let URL = require('url-parse');
let path = require('react-native-path');


let parseByProductID = id => {
    return fetch('http://api.asos.com/product/catalogue/v2/products/'+id+'?store=COM&lang=en-GB&sizeSchema=EU&currency=EUR')
        .then(response=>{
            return response.json().then(data=>{
                data.link = `www.asos.com/search/${data.productCode}?q=${data.productCode}`;
                return new Promise((res,rej)=>{res(data)});
            })
                .catch(err=>{
                console.log(err);
                return  new Promise((res,rej)=>{rej("קישור לא תקין")});
            })
        }).catch(err=>{
            console.log(err);
            return new Promise((res,rej)=>{rej("קישור לא תקין או בעית תקשורת")});
        })

};

exports.parseURL = (link) => {
  if(isNaN(link))
  { //HTTP URL
        let url = new URL(link,true);
        let productID = path.basename(url.pathname);
        return parseByProductID(productID);
  }
  else if(link === ''){
        return new Promise((res,rej)=>{rej('')})
  }
  else
  { //Code Number
      let codeNumber = parseInt(link,10);
      return fetch('https://api.asos.com/product/search/v1/?q='+codeNumber+'&store=1&lang=en-GB&sizeschema=EU&currency=EUR&sort=freshness&channel=mobile-app&offset=0&limit=100')
          .then(response=>{
              return response.json().then(data=>{
                    return data.products.length > 0 ?
                        parseByProductID(data.products[0].id) :
                        new Promise((res,rej)=>{rej("המוצר לא נמצא")});

              }).catch(err=>{
                  console.log(err);
                  return new Promise((res,rej)=>{rej("קוד לא תקין")});
              });
          }).catch(err=>{
              console.log(err);
              return new Promise((res,rej)=>{rej("בעיה באינטרנט")});
      })
  }
};
