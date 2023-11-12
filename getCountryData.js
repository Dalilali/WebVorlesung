main();

window.addEventListener("load", event => {



})

async function main() {
    await fetchDataFromAPI();
    addContinentToButton();
    searchBtnEvent();


}

var continents = [];

async function fetchDataFromAPI() {
    try {
        const apiurl = "https://restcountries.com/v3.1/all";
        const response = await fetch(apiurl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        //counter for number of countrys
        let count = 0
        let sortedData = Object.values(data).sort((a, b) => a.name.common.localeCompare(b.name.common));
        if (data) {
            document.getElementById("allcountry").innerHTML = '';
            for (x in sortedData) {
                let country = sortedData[x];
                if (!continents.includes(country.region)) {
                    continents.push(country.region);
                }
                count++;
                document.getElementById("allcountry").appendChild(generateContryTemplate(country));
            }

            console.log(continents);
            console.log('Data fetched successfully:' + count);
        } else {
            console.log('Failed to fetch data');
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

function generateContryTemplate(country) {
    var countryDiv = document.createElement('div');
    countryDiv.classList.add('col', country.region);
    countryDiv.id = country.name.common;

    var heading = document.createElement('h3');
    heading.innerHTML = country.flag + ' ' + country.name.common;
    countryDiv.appendChild(heading);

    var detailList = document.createElement('ul');
    detailList.classList.add('detail');

    var regionItem = document.createElement('li');
    regionItem.innerHTML = 'Continent: ' + country.region;
    detailList.appendChild(regionItem);

    var capitalItem = document.createElement('li');
    capitalItem.innerHTML = 'Capital: ' + country.capital;
    detailList.appendChild(capitalItem);

    var populationItem = document.createElement('li');
    populationItem.innerHTML = 'Population: ' + country.population;
    detailList.appendChild(populationItem);

    if (country.languages) {

        var languages = Object.values(country.languages)
        var languagesItem = document.createElement('li')
        languagesItem.innerHTML = 'Sprache(n): ' + languages;
        detailList.appendChild(languagesItem);
    }

    countryDiv.appendChild(detailList);

    var iconbar = document.createElement('div');
    iconbar.classList.add('iconraw', 'nav')

    iconbar.appendChild(addMapIcon(country.maps.googleMaps));

    iconbar.appendChild(addWikiIcon(country.name.common));

    countryDiv.appendChild(iconbar);

    return countryDiv;
}

function searchBtnEvent() {
    let searchBtn = document.getElementById('searchForm');
    searchBtn.addEventListener('submit', function (event) {
        event.preventDefault();

        let searchContent = document.getElementById('searchInput');
        let searchContentValue = searchContent.value;
        console.log(searchContentValue);
        searchCountry(searchContentValue);
        searchContent.values == '';
    });
}

function addMapIcon(mapLocation) {
    var link = document.createElement('a');
    link.href = mapLocation;

    var img = document.createElement('img');
    img.classList.add('map');
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Maps_icon_%282015-2020%29.svg';
    link.appendChild(img);
    return link;
}

function addWikiIcon(countryName) {
    var link = document.createElement('a');
    link.href = "https://en.wikipedia.org/wiki/" + countryName;

    var wiki = document.createElement('img');
    wiki.classList.add('wiki');
    wiki.src = 'https://cdn.icon-icons.com/icons2/602/PNG/512/Wikipedia_icon-icons.com_55780.png';
    link.appendChild(wiki);
    return link
}

function searchCountry(searchValue) {
    let countryContent = document.getElementById("allcountry");
    let countryItems = countryContent.querySelectorAll('h3');

    for (let item of countryItems) {
        let content = item.textContent;
        if (content.toLowerCase().includes(searchValue.toLowerCase())) {
            item.parentElement.style.display = ''
        } else {
            item.parentElement.style.display = 'none';
        }
    }
}

function addContinentToButton() {
    let dropmenu = document.getElementById('continent-selector');
    for (let i = 0; i < continents.length; i++) {
        let optionItem = document.createElement('option');
        optionItem.value = continents[i];
        optionItem.textContent = continents[i];
        dropmenu.appendChild(optionItem);
        console.log(optionItem);
    }
}

var independent = document.getElementById('inlineCheckbox1');
var isIndependent = independent.checked;

var un = document.getElementById('inlineCheckbox2');
var isUnMember = un.checked;

var landlocked = document.getElementById('inlineCheckbox3');
var isLandlocked = landlocked.checked;

function getSelectedOption() {

    var selectElement = document.getElementById("continent-selector");

    var selectedvalue = selectElement.value;

    // Log or use the selected value and text
    console.log("Selected Text:", selectedvalue);
    return selectedvalue;
}


async function getCountryByContinent(continent) {
    if (continent == "all") {
        return fetchDataFromAPI();
    }
    try {
        const apiurl2 = "https://restcountries.com/v3.1/region/" + continent;
        const response2 = await fetch(apiurl2);

        if (!response2.ok) {
            throw new Error(`HTTP error! status: ${response2.status}`);
        }
        const data2 = await response2.json();

        //counter for number of countrys
        let count2 = 0
        let sortedData2 = Object.values(data2).sort((a, b) => a.name.common.localeCompare(b.name.common));
        if (data2) {
            document.getElementById("allcountry").innerHTML = "";
            for (x in sortedData2) {
                let country = sortedData2[x];
                if (country.region == continent) {

                    count2++;
                    document.getElementById("allcountry").appendChild(generateContryTemplate(country));
                }
            }
            console.log('Data fetched successfully:' + count2);
        } else {
            console.log('Failed to fetch data');
        }
        return data2;
    } catch (error) {
        console.error(error);
    }
}
