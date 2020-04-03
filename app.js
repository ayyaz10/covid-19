const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://covid19.mathdro.id/api', true);

xhr.onload = ()=>{
    const response = JSON.parse(xhr.responseText);
    document.getElementsByClassName('confirmed-cases')[0].innerHTML = response.confirmed.value;
    document.getElementsByClassName('recovered-cases')[0].innerHTML = response.recovered.value;
    document.getElementsByClassName('death-cases')[0].innerHTML = response.deaths.value;
}

xhr.send();