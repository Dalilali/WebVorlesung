
fetchDataFromAPI();
async function fetchDataFromAPI() {
    try {
        const apiurl = "https://restcountries.com/v3.1/all";
        const response = await fetch(apiurl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Convert the JSON object to a string
        const json_data = JSON.stringify(data, null, 2);
        let count = 0;
        if (data) {
            let template = '';
            for (x in data) {
                count++;
                template += '<div class="col ' + data[x].region + '"><h3>'
                    + data[x].flag + " "
                    + data[x].name.common + '</h3><ul class="detail"><li>'
                    + data[x].region + '</li><li>'
                    + data[x].capital + '</li><li>'
                    + data[x].population + '</li><li>'
                    + data[x].flag + '</li></ul>'
                    + '</div>';
            }
            document.getElementById("allcountry").innerHTML = template;
            console.log('Data fetched successfully:' + count);
        } else {
            console.log('Failed to fetch data');
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener("load", event => {
    return;
})