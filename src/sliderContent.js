var contentJson; // unused

var contentJsonSAMPLE = [
  {
    image: "https://www.zappos.com/images/z/3/1/6/3/7/1/3163710-1-4x.jpg",
    color: "grey",
    price: "300hkd",
    id: 1,
    type: "jacket",
    season: "winter",
  },
  {
    image: "https://www.zappos.com/images/z/3/1/6/3/7/1/3163713-1-4x.jpg",
    color: "grey-purple",
    price: "350hkd",
    id: 2,
    type: "jacket",
    season: "winter",
  },
  {
    image: "https://www.zappos.com/images/z/3/1/1/9/7/3/3119732-p-4x.jpg",
    color: "blue",
    price: "250hkd",
    id: 3,
    type: "jacket",
    season: "winter",
  },
  {
    image: "http://www.zappos.com/images/z/2/6/9/6/5/7/2696572-p-4x.jpg",
    color: "light grey",
    price: "300hkd",
    id: 4,
    type: "jacket",
    season: "winter",
  },
  {
    image: "http://www.zappos.com/images/z/3/1/1/9/7/3/3119730-p-4x.jpg",
    color: "black-white",
    price: "300hkd",
    id: 5,
    type: "jacket",
    season: "winter",
  },
  {
    image: "https://www.zappos.com/images/z/1/6/3/4/9/9/1634997-p-4x.jpg",
    color: "dark blue",
    price: "300hkd",
    id: 6,
    type: "jeans",
    season: "all weather",
  },
  {
    image: "https://www.zappos.com/images/z/9/4/5/2/0/2/945202-p-4x.jpg",
    color: "light blue",
    price: "300hkd",
    id: 7,
    type: "jeans",
    season: "all weather",
  },
  {
    image: "https://www.zappos.com/images/z/3/3/5/2/6/4/3352645-p-4x.jpg",
    color: "skin",
    price: "300hkd",
    id: 8,
    type: "jeans",
    season: "all weather",
  },
  {
    image: "https://www.zappos.com/images/z/9/4/5/2/0/1/945201-p-4x.jpg",
    color: "black",
    price: "300hkd",
    id: 9,
    type: "jeans",
    season: "all weather",
  },
  {
    image: "https://www.zappos.com/images/z/3/1/7/3/4/3/3173439-p-4x.jpg",
    color: "shaded blue",
    price: "300hkd",
    id: 10,
    type: "jeans",
    season: "all weather",
  },
  {
    image: "https://www.zappos.com/images/z/3/1/4/9/1/5/3149157-p-4x.jpg",
    color: "checked black-white",
    price: "300hkd",
    id: 11,
    type: "shirt",
    season: "all weather",
  },
  {
    image: "http://www.zappos.com/images/z/3/1/4/9/1/7/3149170-p-4x.jpg",
    color: "checked blue-black",
    price: "300hkd",
    id: 12,
    type: "shirt",
    season: "all weather",
  },
  {
    image: "http://www.zappos.com/images/z/3/1/4/9/1/6/3149164-p-4x.jpg",
    color: "checked black-orange",
    price: "300hkd",
    id: 13,
    type: "shirt",
    season: "all weather",
  },
  {
    image: "http://www.zappos.com/images/z/3/1/4/9/1/5/3149153-p-4x.jpg",
    color: "checked blue-orange",
    price: "300hkd",
    id: 14,
    type: "shirt",
    season: "all weather",
  },
];

// API endpoint:
const APIEndpointURL =
  "https://5yb9exgfs1.execute-api.us-east-1.amazonaws.com/latest/newusers";

// Might not use.
async function getData(url = "") {
  const response = await fetch(url);
  return await response.json();
}

/* contentJson = await getData("/api/Clothing"); */

// Assert: Element positioning is aligned.
const sliderImageArr = document.querySelectorAll(".swiper-slider-image");
const sliderDetailsArr = document.querySelectorAll(".swiper-slider-details");
const numOfHTMLelements = sliderImageArr.length;

function getQueryStringCriteria() {
  const queryString = window.location.search;
  console.log("Query String is: ", queryString);
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("criteria");
}

function destructureQueryToRegex(str) {
  // NOTE: for reference, full regex should be of the form '(^|\s)(the|number)+'
  const words = str.split(" ");
  var regexStr = "(^|s)(";
  for (let i = 0; i < words.length - 1; i++) {
    regexStr += words[i];
    regexStr += "|";
  }
  regexStr += words[words.length - 1];
  regexStr += ")+";

  /* var regex2 = new RegExp(regexStr, 'i'); */
  console.log(regexStr);
  return regexStr;
}

// Function: search via checking "type" property only
// Default behaviour: NO changes (i.e. generic pre-placed html textcontent is used), if queryString does not match any json content
// Pre-condition: JSON received is an array of objects
function filterData(data) {
  const searchCriteria = getQueryStringCriteria();
  let resultantFilteredData = [];
  const filteredAll = [];
  const filteredType = [];
  const filteredSeason = [];

  var regex = new RegExp(destructureQueryToRegex(searchCriteria), "i");

  if (searchCriteria == "" || searchCriteria == null) {
    console.log("Search content: contains no search keyword");
    return;
  } else {
    console.log("Search content: contains search keyword");
    // insert content depending on search_content:
    // retrieve book list one by one, and construct grid-items
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      // Extract JSON values
      const type = item["type"];
      const season = item["season"];
      const color = item["color"];
      /*      console.log(regex.test(type), ' ', type);
      console.log(regex.test(season), ' ', season);
      console.log(regex.test(color), ' ', color); */
      if (regex.test(type) && regex.test(season) && regex.test(color)) {
        // if contains all criteria
        filteredAll.push(item);
      } else if (regex.test(type)) {
        // if contains type:
        filteredType.push(item);
      } else if (regex.test(season)) {
        // if contains season:
        filteredSeason.push(item);
      }
    }
  }
  console.log("Finished filtering data: ");
  resultantFilteredData = resultantFilteredData.concat(
    filteredAll,
    filteredType,
    filteredSeason
  );
  console.log(resultantFilteredData);

  return resultantFilteredData;
}

function selectivelyUpperCaseText(text, ...positions) {
  /* var output; */
  if (positions.length == 0) {
    text = text.toUpperCase();
  } else {
    /*  output = text; */
    for (let i = 0; i < positions.length; i++) {
      const replacedChar = text.charAt(positions[i]).toUpperCase();
      text =
        text.substr(0, positions[i]) +
        replacedChar +
        text.substr(positions[i] + 1);
    }
  }
  return text;
}

// Function: populate elements starting from the first in filteredData, until all elems populated.
function populateElems(filteredData) {
  for (let i = numOfHTMLelements - 1; i >= 0; i--) {
    const item = filteredData[numOfHTMLelements - 1 - i];
    
    // Append background image:
    const imageURL = item["image"];
    sliderImageArr[i].style.backgroundImage =
      "url(" + '"' + imageURL + '"' + ")";

    // Append textual elements:
    const price = selectivelyUpperCaseText(item["price"]);
    const type = selectivelyUpperCaseText(item["type"], 0);
    const color = selectivelyUpperCaseText(item["color"], 0);
    const season = "Season: " + selectivelyUpperCaseText(item["season"], 0);

    /* for(let i = 0; i < sliderDetailsArr.length; i++)
    { */
    sliderDetailsArr[i].querySelector(".details-type").textContent = type;
    sliderDetailsArr[i].querySelector(".details-color").textContent = color;
    sliderDetailsArr[i].querySelector(".details-price").textContent = price;
    sliderDetailsArr[i].querySelector(".details-season").textContent = season;
    /*  } */
  }
}

function execContentFill(url) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      // filter json using query string:
      return filterData(json);
    })
    .then((filtered) => populateElems(filtered));
}

// Run script via api endpoint:
execContentFill(APIEndpointURL);

/* // Run script via hardcoded content:
populateElems(contentJsonSAMPLE) */
