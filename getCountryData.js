

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
            for (x in sortedData) {
                let country = sortedData[x];
                count++;
                document.getElementById("allcountry").appendChild(generateContryTemplate(country));

            }

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
    regionItem.innerHTML = 'Region: ' + country.region;
    detailList.appendChild(regionItem);

    var capitalItem = document.createElement('li');
    capitalItem.innerHTML = 'Hauptstadt: ' + country.capital;
    detailList.appendChild(capitalItem);

    var populationItem = document.createElement('li');
    populationItem.innerHTML = 'Bevölkerung: ' + country.population;
    detailList.appendChild(populationItem);

    if (country.languages) {

        var languages = Object.values(country.languages)
        var languagesItem = document.createElement('li')
        languagesItem.innerHTML = 'Sprache(n): ' + languages;
        detailList.appendChild(languagesItem);
    }


    var flagItem = document.createElement('li');
    flagItem.innerHTML = country.flag;
    detailList.appendChild(flagItem);

    countryDiv.appendChild(detailList);

    var iconbar = document.createElement('div');
    iconbar.classList.add('iconraw', 'nav')

    iconbar.appendChild(addMapIcon(country.maps.googleMaps));

    iconbar.appendChild(addWikiIcon(country.name.common));

    countryDiv.appendChild(iconbar);

    return countryDiv;
}


window.addEventListener("load", event => {
    fetchDataFromAPI();
    let searchBtn = document.getElementById('searchForm');
    searchBtn.addEventListener('submit', function (event) {
        event.preventDefault();

        let searchContent = document.getElementById('searchInput');
        let searchContentValue = searchContent.value;
        console.log(searchContentValue);
        searchCountry(searchContentValue);
        searchContent.values == '';
    })
})

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