var coinLibKey = "c06378ec9fc1b93c"
var symbols = ""
var today = ""
var price = ""



//*   VARIABLES  broken out for creating Coin Cards 
//We are calling data for the top 5 coins; Each card will have:
//Name, Symbol, rank, marketCap, price, percent change in 24 hr, high 24 hr, low 24hr
var currentCoinDataCard = document.createElement("div")
//card
var dashboard = document.querySelector(".card-container")
dashboard.classList = "card-container";
dashboard.appendChild(currentCoinDataCard)
//card-body
var currentCoinDataCardBody = document.createElement("div")
dashboard.appendChild(currentCoinDataCardBody)
//Title
var currentCoinDataTitle = document.createElement("h2")
currentCoinDataTitle.classList = "card-title"
currentCoinDataTitle.innerHTML = "Top 5 Coins"
currentCoinDataCardBody.appendChild(currentCoinDataTitle)
//Ul
var currentCoinDataListUl = document.createElement("ul")
currentCoinDataListUl.classList = "list-group coin-list"
currentCoinDataCardBody.appendChild(currentCoinDataListUl)




/*************  FIRST FETCH CALL: GETS OUR CARD DATA POINTS AND CALCULATES  PURCHASE POWER ************/
function getTop5() {
  var apiUrl = "https://coinlib.io/api/v1/coinlist?key=c06378ec9fc1b93c&page=1&pref=USD&order=rank_asc";

  // const validInput = isValidInput(InputValue);

  fetch(apiUrl)
    .then(function (response) {
      return response.json()
        .then(function (data) {
          console.log(data);

          for (var i = 0; i <= 4; i++) {
            //define Var for cards
            var name = data.coins[i].name
            var symbol = data.coins[i].symbol
            var rank = data.coins[i].rank
            var market = data.coins[i].market_cap
            var percentChange24 = data.coins[i].delta_24h
            var priceRound = (Math.round(data.coins[i].price * 100) / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            });

            const purchase = calculate(InputValue, data.coins[i].price);

            // Rank
            var currentCoinRankLi = document.createElement("li")
            currentCoinRankLi.classList = "list-group-item rank-item"
            currentCoinRankLi.textContent = "Rank: " + rank
            currentCoinDataListUl.appendChild(currentCoinRankLi)
            // ID - Name - 
            var currentCoinNameLi = document.createElement("li")
            currentCoinNameLi.classList = "list-group-item name-item"
            currentCoinNameLi.textContent = "Name: " + name
            currentCoinDataListUl.appendChild(currentCoinNameLi)
            // Symbol
            var currentCoinSymbolLi = document.createElement("li")
            currentCoinSymbolLi.classList = "list-group-item symbol-item"
            currentCoinSymbolLi.textContent = "Trading Symbol: " + symbol
            currentCoinDataListUl.appendChild(currentCoinSymbolLi)
            //Price
            var currentCoinPriceLi = document.createElement("li")
            currentCoinPriceLi.classList = "list-group-item price-item"
            currentCoinPriceLi.textContent = "Price (USD): " + priceRound
            currentCoinDataListUl.appendChild(currentCoinPriceLi)
            //Market Cap
            var currentCoinMarketLi = document.createElement("li")
            currentCoinMarketLi.classList = "list-group-item market-item"
            currentCoinMarketLi.textContent = "Market Cap USD: " + market
            currentCoinDataListUl.appendChild(currentCoinMarketLi)
            //percent Change
            var coinPercentChangeLi = document.createElement("li")
            coinPercentChangeLi.classList = "list-group-item market-item"
            coinPercentChangeLi.textContent = "Percent Change(24 hr): " + percentChange24
            currentCoinDataListUl.appendChild(coinPercentChangeLi)
            //purchase
            var currentCoinPurchaseLi = document.createElement("li")
            currentCoinPurchaseLi.classList = "list-group-item purchase-item"
            if (validInput) {
              currentCoinPurchaseLi.textContent = "Purchase Power: " + purchase;
            }
            currentCoinDataListUl.appendChild(currentCoinPurchaseLi)

            // setTimeout(function () {
            //   calculate(price)
            // }, 2000)
          };
        })
    })
}
getTop5()


//    *******INPUT VALIDAITON    ****
var isValidInput = function (InputValue) {
  if (InputValue == null || InputValue == "") {
    return false;
  } else {
    if (isNaN(InputValue)) {
      // window.alert("Please Enter a Correct Number");
      return false;
    }
    if (InputValue < 0) {
      // window.alert("Please enter a positive number");
      return false;
    }
  }
  return true;
}


//  we would use  - data.data[i].priceUsd - from the first call for this
  var calculate = function (InputValue, price) {
    cryptoAmount = InputValue / price;
    // return cryptoAmount.toFixed(2);
    return cryptoAmount;
  };


  /************* SECOND FETCH CALL:  Fetch News ************/
function getNews() {

  var newsUrl = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=Market,trading&excludeCategories=Asia&sortOrder=popular&page=1&items$top=10&api_key=2bca4c4c3a2b4a0f3b91b3b8b668b8c2951f5d39944fa806eeabf1804ed13eca"


  fetch(newsUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //console.log as check then display in main card
          console.log(data);
          // console.log(data.Data[i].url)

          for (var i = 0; i < 8; i++) {

            var articleTitle = data.Data[i].title
            var articleLink = data.Data[i].url

            var articleImgEl = document.createElement("img")
            var articleImgSrc = data.Data[i].source_info.img
            articleImgEl.src = articleImgSrc
            //articleImgEl.style.width = '10em'
            // articleImg.setAttribute("src", articleImg)
            var linkDiv = document.createElement("div")
            linkDiv.classList = "news-card"

             var linkContainer = document.querySelector(".link-container")
             linkContainer.appendChild(linkDiv)
             linkDiv.appendChild(articleImgEl)
             $(linkDiv).append(`<a href="${articleLink}" target="_blank">${articleTitle}</a>`)
            
          }
        })
    })
}
getNews()




/**********NAV BAR MODAL POP UPS***************/
/************* Modal 1:  ABOUT  Pop-Up control ************/
var aboutPopUp = document.querySelector("#aboutBtn");
var aboutModalContainer = document.querySelector("#modalContainer1");
var close = document.querySelector("#closeBtn");

aboutPopUp.addEventListener("click", function () {
  aboutModalContainer.classList = "modalContainer open";
});
close.addEventListener("click", function () {
  aboutModalContainer.classList = "modalContainer";
});


/************* Modal 2:  FAQ  Pop-Up control ************/
var faqPopUp = document.querySelector("#faqBtn");
var faqModalContainer = document.querySelector("#modalContainer2");
var close = document.querySelector("#closeBtn2");

faqPopUp.addEventListener("click", function () {
  faqModalContainer.classList = "modalContainer open";
});
close.addEventListener("click", function () {
  faqModalContainer.classList = "modalContainer";
});


/************* Modal 3: GLOASSARY  Pop-Up control ************/
var glossPopUp = document.querySelector("#glossBtn");
var glossModalContainer = document.querySelector("#modalContainer3");
var close = document.querySelector("#closeBtn3");

glossPopUp.addEventListener("click", function () {
  glossModalContainer.classList = "modalContainer open";
});
close.addEventListener("click", function () {
  glossModalContainer.classList = "modalContainer";
});




//START LISTENER :  Start App Fetch and Open Modal

// <!--Modal Pop-Up control-->
// var popUp = document.querySelector("#myBtn");
// var coinDashboard = document.querySelector("#dashboard");

// popUp.addEventListener("click", function (event) {
//   event.preventDefault();
//   var InputValue = document.querySelector(".input-value").value
//   getTop5(InputValue)
// })













        //  *************************     Items for possible use later ****************************








/********** FETCH CALLS WITH VALIDATION   *********/
// input function card - PURCHASE POWER
// var calculate = function (InputValue, phone) {
//   purchase = InputValue / phone;
//   console.log(price)

//var InputValue = document.querySelector(".input-form").value
//pull and validation input



//var inputValidation = function (InputValue) {
//   //if (InputValue == null || InputValue == "" || InputValue == "0") {
//     //return null;
//   //} else {
//     //if (isNaN(InputValue)) {
//       //window.alert("Please Enter a Correct Number");
//     //} else {
//       //for (var i = 0; i <= 2; i++) {
//         //define Var for cards
//         //var name = data.coins[i].name
//         //var symbol = data.coins[i].symbol
//         //var rank = data.coins[i].rank
//         //var market = data.coins[i].market_cap
//         //var percentChange24 = data.coins[i].delta_24h

//         //var purchasePower = calculate(input, parseFlouat(priceRound))

//         //var priceRound = (Math.round(data.coins[i].price * 100) / 100).toLocaleString('en-US', {
//           //style: 'currency',
//           //currency: 'USD',
//         //});
//         // Rank
//         var currentCoinRankLi = document.createElement("li")
//         currentCoinRankLi.classList = "list-group-item rank-item"
//         currentCoinRankLi.textContent = "Rank: " + rank
//         currentCoinDataListUl.appendChild(currentCoinRankLi)
//         // ID - Name - 
//         var currentCoinNameLi = document.createElement("li")
//         currentCoinNameLi.classList = "list-group-item name-item"
//         currentCoinNameLi.textContent = "Name: " + name
//         currentCoinDataListUl.appendChild(currentCoinNameLi)
//         // Symbol
//         var currentCoinSymbolLi = document.createElement("li")
//         currentCoinSymbolLi.classList = "list-group-item symbol-item"
//         currentCoinSymbolLi.textContent = "Trading Symbol: " + symbol
//         currentCoinDataListUl.appendChild(currentCoinSymbolLi)
//         //Price
//         var currentCoinPriceLi = document.createElement("li")
//         currentCoinPriceLi.classList = "list-group-item price-item"
//         currentCoinPriceLi.textContent = "Price (USD): " + priceRound
//         currentCoinDataListUl.appendChild(currentCoinPriceLi)
//         //Market Cap
//         var currentCoinMarketLi = document.createElement("li")
//         currentCoinMarketLi.classList = "list-group-item market-item"
//         currentCoinMarketLi.textContent = "Market Cap USD: " + market
//         currentCoinDataListUl.appendChild(currentCoinMarketLi)
//         //percent Change
//         var coinPercentChangeLi = document.createElement("li")
//         coinPercentChangeLi.classList = "list-group-item market-item"
//         coinPercentChangeLi.textContent = "Percent Change(24 hr): " + percentChange24
//         currentCoinDataListUl.appendChild(coinPercentChangeLi)
//         //purchase
//         var currentCoinPurchaseLi = document.createElement("li")
//         currentCoinPurchaseLi.classList = "list-group-item purchase-item"
//         currentCoinPurchaseLi.textContent = "Purchase Power: " + purchasePower
//         currentCoinDataListUl.appendChild(currentCoinPurchaseLi)

//       }
//     }
//   };
//   //Math




//   //First Fetch Call: GETS OUR CARD DATA POINTS AND CALCULATES  PURCHASE POWER
//   var getTop5 = function () {
//     var apiUrl = "https://coinlib.io/api/v1/coinlist?key=c06378ec9fc1b93c&page=1&pref=USD&order=rank_asc";

//     fetch(apiUrl)
//       .then(function (response) {
//         return response.json()
//           .then(function (data) {
//             console.log(data);
//             var inputV = inputValidation(InputValue);
//             if (inputV == null) {
//               for (var i = 0; i <= 2; i++) {
//                 //define Var for cards
//                 var name = data.coins[i].name
//                 var symbol = data.coins[i].symbol
//                 var rank = data.coins[i].rank
//                 var market = data.coins[i].market_cap
//                 var percentChange24 = data.coins[i].delta_24h
//                 var priceRound = (Math.round(data.coins[i].price * 100) / 100).toLocaleString('en-US', {
//                   style: 'currency',
//                   currency: 'USD',
//                 });
//                 // Rank
//                 var currentCoinRankLi = document.createElement("li")
//                 currentCoinRankLi.classList = "list-group-item rank-item"
//                 currentCoinRankLi.textContent = "Rank: " + rank
//                 currentCoinDataListUl.appendChild(currentCoinRankLi)
//                 // ID - Name - 
//                 var currentCoinNameLi = document.createElement("li")
//                 currentCoinNameLi.classList = "list-group-item name-item"
//                 currentCoinNameLi.textContent = "Name: " + name
//                 currentCoinDataListUl.appendChild(currentCoinNameLi)
//                 // Symbol
//                 var currentCoinSymbolLi = document.createElement("li")
//                 currentCoinSymbolLi.classList = "list-group-item symbol-item"
//                 currentCoinSymbolLi.textContent = "Trading Symbol: " + symbol
//                 currentCoinDataListUl.appendChild(currentCoinSymbolLi)
//                 //Price
//                 var currentCoinPriceLi = document.createElement("li")
//                 currentCoinPriceLi.classList = "list-group-item price-item"
//                 currentCoinPriceLi.textContent = "Price (USD): " + priceRound
//                 currentCoinDataListUl.appendChild(currentCoinPriceLi)
//                 //Market Cap
//                 var currentCoinMarketLi = document.createElement("li")
//                 currentCoinMarketLi.classList = "list-group-item market-item"
//                 currentCoinMarketLi.textContent = "Market Cap USD: " + market
//                 currentCoinDataListUl.appendChild(currentCoinMarketLi)
//                 //percent Change
//                 var coinPercentChangeLi = document.createElement("li")
//                 coinPercentChangeLi.classList = "list-group-item market-item"
//                 coinPercentChangeLi.textContent = "Percent Change(24 hr): " + percentChange24
//                 currentCoinDataListUl.appendChild(coinPercentChangeLi)
//                 //purchase
//                 // var currentCoinPurchaseLi = document.createElement("li")
//                 // currentCoinPurchaseLi.classList = "list-group-item purchase-item"
//                 // currentCoinPurchaseLi.textContent = "Purchase Power: " + purchase
//                 // currentCoinDataListUl.appendChild(currentCoinPurchaseLi)

//                 // calculate(InputValue, data.coins[i].price)

//                 // setTimeout(function () {
//                 //   calculate(price)
//                 // }, 2000)
//               }
//             } else {
//               for (var i = 0; i <= 2; i++) {
//                 //define Var for cards
//                 var name = data.coins[i].name
//                 var symbol = data.coins[i].symbol
//                 var rank = data.coins[i].rank
//                 var market = data.coins[i].market_cap
//                 var percentChange24 = data.coins[i].delta_24h

//                 var purchasePower = calculate(inputV, parseFloat(priceRound))

//                 var priceRound = (Math.round(data.coins[i].price * 100) / 100).toLocaleString('en-US', {
//                   style: 'currency',
//                   currency: 'USD',
//                 });
//                 // Rank
//                 var currentCoinRankLi = document.createElement("li")
//                 currentCoinRankLi.classList = "list-group-item rank-item"
//                 currentCoinRankLi.textContent = "Rank: " + rank
//                 currentCoinDataListUl.appendChild(currentCoinRankLi)
//                 // ID - Name - 
//                 var currentCoinNameLi = document.createElement("li")
//                 currentCoinNameLi.classList = "list-group-item name-item"
//                 currentCoinNameLi.textContent = "Name: " + name
//                 currentCoinDataListUl.appendChild(currentCoinNameLi)
//                 // Symbol
//                 var currentCoinSymbolLi = document.createElement("li")
//                 currentCoinSymbolLi.classList = "list-group-item symbol-item"
//                 currentCoinSymbolLi.textContent = "Trading Symbol: " + symbol
//                 currentCoinDataListUl.appendChild(currentCoinSymbolLi)
//                 //Price
//                 var currentCoinPriceLi = document.createElement("li")
//                 currentCoinPriceLi.classList = "list-group-item price-item"
//                 currentCoinPriceLi.textContent = "Price (USD): " + priceRound
//                 currentCoinDataListUl.appendChild(currentCoinPriceLi)
//                 //Market Cap
//                 var currentCoinMarketLi = document.createElement("li")
//                 currentCoinMarketLi.classList = "list-group-item market-item"
//                 currentCoinMarketLi.textContent = "Market Cap USD: " + market
//                 currentCoinDataListUl.appendChild(currentCoinMarketLi)
//                 //percent Change
//                 var coinPercentChangeLi = document.createElement("li")
//                 coinPercentChangeLi.classList = "list-group-item market-item"
//                 coinPercentChangeLi.textContent = "Percent Change(24 hr): " + percentChange24
//                 currentCoinDataListUl.appendChild(coinPercentChangeLi)
//                 //purchase
//                 var currentCoinPurchaseLi = document.createElement("li")
//                 currentCoinPurchaseLi.classList = "list-group-item purchase-item"
//                 currentCoinPurchaseLi.textContent = "Purchase Power: " + purchasePower
//                 currentCoinDataListUl.appendChild(currentCoinPurchaseLi)
//               }
//             }
//           })
//       })
//   }
// }


















        //News DOM Creation
        // News Container
        // var news = document.querySelector(".news")
        //     //card
        // var newsCard = document.createElement("div")
        // news.appendChild(newsCard)

        //newsCard.appendChild(newsCard)
        // //Title
        // var newsCardTitle = document.createElement("h2")
        // newsCardTitle.classList = "card-title news-title"
        // newsCardTitle.innerHTML = "Latest News"
        // newsCard.appendChild(newsCardTitle)
        // // New List
        // var newsCard = document.querySelector(".card-container")
        // var newsListUl = document.createElement("ul")
        // newsListUl.classList = "list-group news-list"
        // newsCard.appendChild(newsListUl)

        // //    var today = data.data.timestamp
        // //     var date = new Date(today * 1000);
        // //        var dateCoin = date.textContent = (moment().format("MMMM Do YYYY, h:mm:ss a"));
        // //         console.log(dateCoin);
        //this Var will need to use in 2nd Fetch API
        //hiLowCoinArr defined globally
        // (2nd fetch gets us the hi & lo data pts)
        // hiLowCoinArr.push(data.data[i].symbol)
        // console.log(hiLowCoinArr);

        //var for inserting/calling 2nd Fetch Call (hiLowCall)
        //   var symbolsForApi = hiLowCoinArr.join(" ").replace(/\s/g, ',');
        //   console.log(symbolsForApi)

        //   //* Set timeout for  2nd Fetch Call hiLowCall(), otherwise  2nd fetch runs too soon & data comes back null/undefined (these are async)
        //   setTimeout(function () {
        //     hiLowCall(symbolsForApi, data.data[i].id);
        //   }, 2000)

        // }
        //         }
        //     })

/*  for testing:
// $("#myBtn").click(function () {
//   //   alert( "Handler for .click() called." );
//   console.log("testBtn")
//   getTop5()
// });
// getNews()*/

        //possible code  for dom creation
        //https://medium.com/@tforward/get-html-to-the-dom-fast-with-js-template-literals-insertadjacenthtml-24b8aa4e8807