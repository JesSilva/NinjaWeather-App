const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// Pesquisa o valor digitado e retorna as informações
const updateCity = async (city) => {

    const cityData = await getCity(city);
    const cityWeather = await getWeather(cityData.Key);

    return { cityData, cityWeather };
};

// Atualiza a interface com os dados recém obtidos
const updateUI = (data) => {

    const { cityData, cityWeather } = data;

    // Template de atualização dos detalhes
    details.innerHTML = `
        <h5 class="my-3">${cityData.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;


    // Atualiza a imagem e o ícone de acordo com o tempo/condição do dia
    let timeSrc = cityWeather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    let iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    // Remove a classe d-none para exibir a div dos detalhes
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

// Update do formulário
cityForm.addEventListener('submit', e => {

    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Obtém os dados do clima
    updateCity(city).
        then(data => updateUI(data))
        .catch(err => console.error(err));

    // Salva a pesquisa mais recente (localStorage)
    localStorage.setItem('city', city);

});

// Verifica se o usuário já fez uma pesquisa anteriormente ao carregar a página
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.error(err));
}