
let loginForm = document.getElementById("countryForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let answer = document.getElementById("results");

    let countryToFind = document.getElementById("q");

    if (countryToFind.value == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        const url = "https://api.restcountries.com/countries/v5?q=" + countryToFind.value.trim();

        try{
            const response = (await fetch(
                url,
                { headers: { 'Authorization': 'Bearer -'  } }
            )).json();


            const body = await response;
            const data = body.data.objects;

            if(data.length === 0) {
                throw new Error("Could not find country");
            }

            console.log(data);

            let rows = "";
            data.forEach(country => {
                rows += "<tr>" +
                    "<td>" + country.names.common + "</td>" +
                    "<td>" + (country.capitals.length ? country.capitals[0].name : "-") + "</td>" +
                    "<td>" + country.population + "</td>" +
                    "<td>" + country.region + "</td>" +
                    "<td>" + country.subregion + "</td>" +
                    "</tr>";
            });

            answer.innerHTML = "<table> <thead> <tr> <th>Name</th> <th>Capital</th> <th>Population</th> <th>Region</th> <th>Subregion</th> </tr> </thead>" +
                "<tbody>" + rows  + "</tbody>"
                + "</table>";
        } catch (error) {
            alert(error);
        }
    }
});