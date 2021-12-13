# CryptoVerse - Crypto Tracker, Portfolio, Events, News

CryptoVerse is a full Responsive Crypto Tracking app made with ReactJS, NodeJs, EJS, Vanilla JS and axios, Cheerio that has following features 
Crypto Currency Tracker,Crypto Portfolio Tracker, Crypto News, Coin Events, Crypto Top Loser and Gainer, Crypto Dictionary. 

The Technologies Used are: NodeJs, ReactJs, Jquery, EJS, Axios, Cheerio, Bootstrap, VanillaJS.

- NodeJs
- ReactJs
- Jquery
- EJS ( For Rendering data from extracted URL)
- Axios (For URL Fetching)
- Cheerio (For Scrapping Coingecko Data)
- Bootstrap (For Making page Responsive)
- Vanilla Javascript

The API Used are from:

- Coingecko (For coin data, Coin Tracker, Coin Details, Movers, Coin Dictionary)
- CryptoCompare API for Latest Crypto News
- Kryptocal API for coins latest events

```diff
- Note: All the currencies is in my Native currency INR but you can change it in API Link where INR written to USD or any other currencies
```


## 1. CryptoVerse HomePage:

Cryptoverse homepage cointains the table of all the crypto currencies aligned with Ranking order, Name, Price, MarketCap, Volume, 24 Hrs High/Low, Circulating Supply, 
Price Change (24h), ATH/ATL Price. **Unlike other Web apps that has only top 100 Crypto Table, Mine has a Pagination of 100 Table per page with more than 1000 CryptoCurrency Data.**
It also has a small table of Global Data and a working Top 7 Trending Coin On coingecko. 

All the Data has been extracted from Coingecko API.


### Demo Image:

![h1](https://user-images.githubusercontent.com/85479838/145671101-46b74e09-a378-48e3-ac1d-50c92b1539f3.png)

![h2](https://user-images.githubusercontent.com/85479838/145671103-d9f2c053-ee1f-4934-8b78-ee59876cdd4e.png)

![h3](https://user-images.githubusercontent.com/85479838/145671108-4a054d06-94c4-464e-9fd6-592d75331709.png)

![h4](https://user-images.githubusercontent.com/85479838/145671112-284ab8a6-e93c-4453-87bf-b0d830d990bf.png)



### Page URL: https://cryptoversee.herokuapp.com/


## 2. Coin Detail Page:

Coinverse Coin Detail Page cointains:

- Coin price
- Coin MarketCap
- Coin Market Ticker
- Coins Historic Charts
- Coin Price converter 
- 24H, 7D, 14D, 30D, 200D, 1Yr Coin Price Change percent
- Coin total and circulation supply
- Coin All time High / Low
- Hashing Algorithm
- Block Time
- Coin Description
- Trending Coins

It is made using NodeJs, Jquery, Bootstrap and API/Wedgets from Coingecko.

### Demo Image:

![coin1](https://user-images.githubusercontent.com/85479838/145670615-70f7a060-1e34-4266-b1b9-062868db50c3.png)

![coin2](https://user-images.githubusercontent.com/85479838/145670617-9daf98ce-6c4e-45b2-a33d-3cc149e658e6.png)

![coin3](https://user-images.githubusercontent.com/85479838/145670623-064bf3a2-3ed5-4c95-baf6-55840fd0dd80.png)


![coin4](https://user-images.githubusercontent.com/85479838/145670619-06765bff-28ad-4e62-83d3-771813d54b5d.png)


## 3. Crypto Exchange Page

Coinverse Exchange page is one page web page having table which cointains:

- All Exchanges in world
- Exchange Ranking
- Exchange Trust Score and Trust Rank
- 24H Volume
- Established Year and Country Based on
- Exchange URL
- Pagination of 100 Data Per page
- Trending Coins


### Demo Image:

![ex1](https://user-images.githubusercontent.com/85479838/145670883-c640ff44-397d-4759-b549-912bba1cf4b0.png)

![ex2](https://user-images.githubusercontent.com/85479838/145670884-9ef1731d-5b15-4930-9f5e-1db78172b56d.png)

### Page URL: https://cryptoversee.herokuapp.com/exchanges.html#

## 4. Cryptocurrency Portfolio tracker:

Cryptocurrency Portfolio tracker can help you to track all your crypto coins investments, cointaining:

- Total Portfolio Worth
- Coin Current Price
- Investment Total Volume
- Total No of Coin Bought
- Profit/Loss Amount
- Profit/Loss Percentage
- Coin List to add Coin

**The best part is that all your data is contained in LocalStorage of your browser, there's no use of DataBase.** 

It is made using ReactJs and ExpressJS with libraries of Bootstrap and Jquery and API from Coingecko.

### Demo Image: 

![portfolio1](https://user-images.githubusercontent.com/85479838/145669176-f622fa88-0519-40cd-973e-e8ee0182c578.png)

![portfolio2](https://user-images.githubusercontent.com/85479838/145669185-a5d6e798-c09e-40e7-b178-9f99511012a5.png)

### Page URL : https://cryptoversee.herokuapp.com/portfolio


## 5. CryptoCurrency Latest News:

Coinverse Crypto News Collects the most recent news about crypto industry clear UI and Link to source News Channel. All live news about Bitcoin, technology blockchain and cryptocurrency.

It is made using NodeJs, Jquery, Bootstrap and Free API from Cryptocompare.

### Demo Image:

![news1](https://user-images.githubusercontent.com/85479838/145669406-4aa70e2b-9797-46b2-9ee0-bae8ed6e144e.png)

![news2](https://user-images.githubusercontent.com/85479838/145669408-f6de4a4f-a01e-4821-b800-7e809830a1e2.png)

![news3](https://user-images.githubusercontent.com/85479838/145669413-07e19e19-2787-4055-b985-b67155e6b648.png)


### Page URL : https://cryptoversee.herokuapp.com/news.html

## 6. Coinverse Publications

Coinverse Publications is a simple list of book download page that has top Books on cryptography, NFT, Investment, Mining written in simple HTML, CSS, Javascript.

### Demo Image: 

![book](https://user-images.githubusercontent.com/85479838/145669581-ad1689e0-a8fc-4c21-ba49-61c05f2da8bd.png)


## 7. Crypto Top Movers or Gainers/Loser: 

Coinverse Top Movers page is simple 1 Page webpage that shows top gainers and loser coins in one day in crypto market. The table shows Gainer/Losers coin name, price, Volume, Percentage increase of coin.

**Note since there's no Free API Available for Showing Gainers and Losers in any exchange API so I've used Web scrapping(Cheerio) to Scrap the data from coingecko Largest mover page and displayed in my Webpage.**

It is made using NodeJs, Jquery, Bootstrap, Cheerio, Axios.

### Demo Page:

![mover](https://user-images.githubusercontent.com/85479838/145669870-0321d7a7-e9c7-45b3-89f9-c8d31d62b93a.png)

### Page URL : https://cryptoversee.herokuapp.com/mover.html


## 8. Crypto Events Page

CryptoVerse Crypto Events Calendar helps you to Stay up-to-date with the Upcoming crypto Events. It covers all events in Cryptocurrency, Blockchains, NFT's that help crypto traders make better decisions and invest. 

It cointains list of all Upcoming events in 2 Months with Coin Name, Coin Ranking, Event Date, Event title, Description and I'll try to update the page every Month.

It is made Using NodeJs, Node-Fetch, Javascript, EJS, Bootstrap and API from kryptocal.

### Demo Image: 

![events](https://user-images.githubusercontent.com/85479838/145670083-35903a99-faa5-40ca-b9df-f00f979d08c7.png)

### Page URL: https://cryptoversee.herokuapp.com/events

## 9. CryptoVerse Crypto Dictionary

Its a one page web page that coin information of all Crypto categories like what is Smart Chain, NFT, Metaverse, Polygon Ecosystem, Decentralized Finance (DeFi), Yield Farming etc with its 24H price change Percent and market cap. Made using Coingecko API and Bootstrap.

### Demo Image:

![dic](https://user-images.githubusercontent.com/85479838/145670210-d27f5256-db9f-4683-aa4d-edd3bb06e2bf.png)

### Page URL: https://cryptoversee.herokuapp.com/dictionary.html


## 9. CryptoVerse Crypto Market Prediction

CryptoVerse Crypto Prediction Uses Cheerio TO scrap data from Crypto prediction to predict the Future worth of coin from 2021-2024. You can search different coins and it will show a table of prediction with Month, Max Price, Min Price, Average Price, Change. 

It is made from NodeJs, Axios, Cheerio, Bootstrap and data is scrapped from coin predictions.

### Demo Image:

![pre1](https://user-images.githubusercontent.com/85479838/145850353-5af2234e-d4b9-41af-aeea-94201dd7e9d9.png)

![pre2](https://user-images.githubusercontent.com/85479838/145850370-351dd3db-df6f-43ba-a333-444c0dd98b89.png)


### Page URL: https://cryptooversee.herokuapp.com/predict
























