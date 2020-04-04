const xhr = new XMLHttpRequest();

// fetching confirmed, recovered and total deaths
xhr.open('GET', 'https://covid19.mathdro.id/api', true);

xhr.onload = ()=>{
    const response = JSON.parse(xhr.responseText);
    const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0].innerHTML = response.confirmed.value;
    const totalRecovered = document.getElementsByClassName('recovered-cases')[0].innerHTML = response.recovered.value;
    const totalDeaths = document.getElementsByClassName('death-cases')[0].innerHTML = response.deaths.value;
    document.getElementsByClassName('active-cases')[0].innerHTML = totalConfirmed - (totalRecovered + totalDeaths);
    document.getElementsByClassName('closed-cases')[0].innerHTML = totalRecovered + totalDeaths;
}

xhr.send();