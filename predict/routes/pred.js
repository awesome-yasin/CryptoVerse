const express = require('express')
const axios = require('axios')
const newsp=express.Router()
const cheerio = require("cheerio");
const { math } = require('mathjs')

newsp.get('/predict',async(req,res)=>{
    try {
        const siteUrl = "https://cryptopredictions.com/bitcoin/";
        
        
        const { data } = await axios({
          method: "GET",
          url: siteUrl,
        });
    
        const $ = cheerio.load(data);
        const elemSelector = "#page > div.container.detail-page > div.crypto-info > div.tables > div > div > table > tbody > tr";
        
        const keys = [
            'Month',
          'Minimum_Price',
          'Maximum_Price',
          'Average_Price',
           'Change',
           'desc'
          ];
           
         

          const coinArr = [];
          
        $(elemSelector).each((parentsIdx, parentsElem) => {
          let keyIdx = 0;
          const coinObj = {};
          const descn = $("body > div:nth-child(5) > h2:nth-child(10)");
          if (parentsIdx <= 58) {
            $(parentsElem).children().each((childTdx, childElem) => {
                let tdVal = $(childElem).text();
                
                //  tdVal = tdVal.replace(/\$/g,'');
                console.log(tdVal)
                if (tdVal) {
                  coinObj[keys[keyIdx]] = tdVal;
    
                  keyIdx++;
                }
              });
            coinArr.push(coinObj);
            
          }
        });
   
        const listItems = $("#page > div.container.detail-page > div.crypto-info > div.prediction-info");

        const countries = [];

        listItems.each((idx, el) => {
            // Object holding data for each country/jurisdiction
            const country = { head: "" };
            // Select the text content of a and span elements
            // Store the textcontent in the above object
            country.head = $(el).children("h1:nth-child(1)").text();
           
            // Populate countries array with country data
            countries.push(country);
          });
        
        
      

         res.render('pred',{articles:coinArr, de:countries}, math)
    
       
       
        
        
      } catch (err) {
        console.error(err);
      }
})


newsp.post('/search',async(req,res)=>{
    const search=req.body.search
    try {
        const siteUrl = `https://cryptopredictions.com/${search}`;
       
        
        
        const { data } = await axios({
          method: "GET",
          url: siteUrl,
        });
    
        const $ = cheerio.load(data);
        const elemSelector = "#page > div.container.detail-page > div.crypto-info > div.tables > div > div > table > tbody > tr";
        const keys = [
            'Month',
          'Minimum_Price',
          'Maximum_Price',
          'Average_Price',
           'Change'
          ];
          const coinArr = [];
    
        $(elemSelector).each((parentsIdx, parentsElem) => {
          let keyIdx = 0;
          const coinObj = {};
    
          if (parentsIdx <= 58) {
            $(parentsElem).children().each((childTdx, childElem) => {
                let tdVal = $(childElem).text();
    
                // tdVal = tdVal.replace(/\$/g,'');
    
                if (tdVal) {
                  coinObj[keys[keyIdx]] = tdVal;
    
                  keyIdx++;
                }
              });
            coinArr.push(coinObj);
          }
        });
  
      
        const listItems = $("#page > div.container.detail-page > div.crypto-info > div.prediction-info");

        const countries = [];

        listItems.each((idx, el) => {
            // Object holding data for each country/jurisdiction
            const country = { head: "" };
            // Select the text content of a and span elements
            // Store the textcontent in the above object
            country.head = $(el).children("h1").text();
           
            // Populate countries array with country data
            countries.push(country);
          });
        
      

         res.render('pred',{articles:coinArr, de:countries})
    
       
       
        
        
      } catch (err) {
        console.error(err);
      }
})

module.exports=newsp