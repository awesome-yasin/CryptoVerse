
const newsUrl = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&apiKey=cb61428f173bd9dfe46ab55e0eed23fa04c30251eb044150e3e5731135e975fa";


const fetchUrl = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  if ((response.status !== 200) | !response.ok) {
    throw new Error();
  }
  console.log("Response: " + response.status);
  prepare(data);
};


fetchUrl(newsUrl).catch((err) => console.log("Error!", err.message));

const prepare = (data) => {
  for (let keys of Object.keys(data.Data)) {
    let key = data.Data[keys];
    let c = [
      key.id,
      key.imageurl,
      key.source_info.name,
      key.title,
      new Date(key.published_on * 1000).toLocaleDateString("en-US"),
      key.body,
      key.url,
      key.tags,
      key.categories,
    ];
    fillPage(c);
  }
};

const fillPage = (c) => {
  const app = document.querySelector("#app");
  let div = document.createElement("div");
 


  div.innerHTML = `
                  
                  <div class="wrapper">
                  <div class="blog_post">
                  <div class="img_pod">
                  <img src="${c[1]}" alt="${c[2]}, ${c[7]}"></img>
                  </div>
                  <div class="container_copy">
                  <h3>${c[4]}</h3>
                  <h1>${c[3]}</h1>
                  <p>${c[5]} <br><h5> Source: ${c[2]}</h5></p>
                  
                  <div>
                  <a class="btn_primary" href='${c[6]}'>Read More</a>
                  </div>
                  </div> 
                  `;

  app.append(div);
};