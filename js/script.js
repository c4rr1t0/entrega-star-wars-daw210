"use strict";
$(document).ready(function(){
    let lastCharacterData;
    let lastCharacterHomeworld;
    let lastCharacterFilms;
    let originalCardPositions = [];
    const cards = $(".card");
    cards.each(function() {
        originalCardPositions.push({ 
            top: $(this).css('top'),
            left: $(this).css('left'),
            transform: $(this).css('transform'),
            width: $(this).css('width'),
            height: $(this).css('height'),
            animation: $(this).css('animation')
        });
    });
function createStar() {
    var size = Math.random() * 3 + 1; 
    var opacity = Math.random() * 0.5 + 0.5; 
    var left = Math.random() * 100; 
    var animationDuration = Math.random() * 7 + 1; 
    var star = $('<div class="star"></div>').css({
      width: size + 'px',
      height: size + 'px',
      opacity: opacity,
      left: left + '%'
    });


    star.animate({
        top: '100%',
        transform: 'rotate(720deg)'
    }, {
        duration: animationDuration * 1000, 
        easing: 'linear',
        complete: function() {
        $(this).remove(); 
        createStar(); 
    }
    });
    $('.star-rain').append(star);
}
for (var i = 0; i < 50; i++) {
    createStar();
}
    cards.click(function(){
        $(this).css('top', '5%');
        $(this).css('left', '5%');
        $(this).css('transition', '0.5s');
        $(this).css('width', '200px');
        $(this).css('height', '300px');
        $('.info-box').css('display', 'block');
        $('.info-box').css('opacity', '1');
        $('.info-box').css('transition', '2s');
        $('.card').not(this).css('transform', 'translateY(-1000px)');
        $('.card').not(this).find('.options, .showAll').hide();
    });
    $('.exit').click(function(){
        $('.card').each(function(index) {
            $(this).css({
                'transition': 'transform 1s ease, top 1s ease, left 1s ease, width 1s ease, height 1s ease, animation 1s ease', 
                'transform': originalCardPositions[index].transform, 
                'top': originalCardPositions[index].top,
                'left': originalCardPositions[index].left,
                'width': originalCardPositions[index].width,
                'height': originalCardPositions[index].height,
                'animation': originalCardPositions[index].animation
            });

            if (originalCardPositions[index].hover) {
                $(this).addClass('hover');
            } else {
                $(this).removeClass('hover');
            }
        });
        $('.card').css({
            'transform': 'none',
            'transition': '2s'
        });
        $('.info-box').css({
            'display': 'none',
            'opacity': '0',
            'transition': '2s'
        });
    });
    $(document).on('click', '.showAll', function(){
        $('.card').css('transform', 'none');
        $('.options, .showAll').remove();
    });

    $('.menu-item').on('click', function() {
        const selectedOption = $(this).text().trim();
    
        switch (selectedOption) {
          case 'Datos Personales':
            loadCharacterData(lastCharacterData);
            break;
          case 'Planeta':
            fetchPlanetData(lastCharacterHomeworld);
            break;
          case 'Aparición en Películas':
            fetchFilmData(lastCharacterFilms);
            break;
          case 'Otros Datos':
            loadOtherCharacterData(lastCharacterData);
            break;
        }
      });





      function loadCharacterData(data) {
        const characterData = $('.show-info');
        const characterInfo = $('<div class="character-info"></div>');
        const name = $('<h2></h2>').text(data.name);
        const height = $('<p></p>').text(`Altura: ${data.height}`);
        const mass = $('<p></p>').text(`Peso: ${data.mass}`);
        const hairColor = $('<p></p>').text(`Color de pelo: ${data.hair_color}`);
        const skinColor = $('<p></p>').text(`Color de piel: ${data.skin_color}`);
        const eyeColor = $('<p></p>').text(`Color de ojos: ${data.eye_color}`);
        const birthYear = $('<p></p>').text(`Años de nacimiento: ${data.birth_year}`);
        const gender = $('<p></p>').text(`Género: ${data.gender}`);
    
        characterInfo.append(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender);
        characterData.append(characterInfo);
    }
    
    cards.each(function(index) {
        $(this).on("click", function() {
            cards.each(function(idx) {
            if (idx !== index) {
                $(this).css('transition', 'transform 2s ease');
                $(this).css('transform', 'translateY(-300%)');
            } else {
                $(this).css('transition', 'transform 2s ease, top 2s ease, left 2s ease');
                $(this).css('transform', 'rotate(0deg)');
                $(this).css('top', '3%');
                $(this).css('left', '3%');
            }
            });
        switch (index) {
            case 0:
              fetchCharacterData("https://swapi.dev/api/people/13/");
              break;
            case 1:
              fetchCharacterData("https://swapi.dev/api/people/4/");
              break;
            case 2:
              fetchCharacterData("https://swapi.dev/api/people/3/");
              break;
            case 3:
              fetchCharacterData("https://swapi.dev/api/people/2/");
              break;
            case 4:
              fetchCharacterData("https://swapi.dev/api/people/20/");
              break;
          }
        });
      });
    function fetchCharacterData(url) {
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
            console.log(data);
            lastCharacterData = data;
            lastCharacterHomeworld = data.homeworld;
            lastCharacterFilms = data.films;
            loadCharacterData(data);
            },
            error: function(error) {
            console.error('Ha habido un problema:', error);
            }
        });
      }
function fetchPlanetData(url) {
    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        console.log(data);
        const characterData = $('.show-info');
        characterData.empty();
        const planetInfo = $('<div class="planet-info"></div>');
        const name = $('<h2></h2>').text(data.name);
        const rotationPeriod = $('<p></p>').text(`Periodo de rotación: ${data.rotation_period}`);
        const orbitalPeriod = $('<p></p>').text(`Periodo orbital: ${data.orbital_period}`);
        const diameter = $('<p></p>').text(`Diámetro: ${data.diameter}`);
        const climate = $('<p></p>').text(`Clima: ${data.climate}`);
        const gravity = $('<p></p>').text(`Gravedad: ${data.gravity}`);
        const terrain = $('<p></p>').text(`Terreno: ${data.terrain}`);
        const surfaceWater = $('<p></p>').text(`Superficie del agua: ${data.surface_water}`);
        const population = $('<p></p>').text(`Población: ${data.population}`);
        planetInfo.append(name, rotationPeriod, orbitalPeriod, diameter, climate, gravity, terrain, surfaceWater, population);
        characterData.append(planetInfo);
      },
      error: function(error) {
        console.error('Ha habido un problema:', error);
      }
    });
  }
  function fetchFilmData(filmUrls) {
    const filmPromises = filmUrls.map(url => $.ajax({ url: url }));
  
    $.when.apply($, filmPromises)
      .then(function() {
        const films = [...arguments].map(arg => arg[0]);
        console.log(films);
  
        const characterData = $('.show-info');
        characterData.empty();
  
        const filmsInfo = $('<div class="films-info"></div>');
        const titleHeader = $('<h2>Aparición en Películas</h2>');
        const filmsList = $('<ul class="films-list"></ul>');
  
        films.forEach(function(film) {
          const filmItem = $('<li></li>');
          const filmTitle = $('<p></p>').text(`Título: ${film.title}`);
          const episodeId = $('<p></p>').text(`Episodio: ${film.episode_id}`);
          const director = $('<p></p>').text(`Director: ${film.director}`);
          const producer = $('<p></p>').text(`Productor: ${film.producer}`);
          const releaseDate = $('<p></p>').text(`Fecha de Lanzamiento: ${film.release_date}`);
  
          filmItem.append(filmTitle, episodeId, director, producer, releaseDate);
          filmsList.append(filmItem);
        });
  
        filmsInfo.append(titleHeader, filmsList);
        characterData.append(filmsInfo);
      })
      .fail(function(error) {
        console.error('Ha habido un problema:', error);
      });
  }
  function loadOtherCharacterData(data) {
    if (!data.species.length) {
      data.species.push("https://swapi.dev/api/species/1/");
    }
  
    const characterData = $('.show-info');
    characterData.empty();
  
    const otherData = $('<div class="other-data"></div>');
    let hasContent = false;
  
    if (data.vehicles.length > 0) {
      hasContent = true; 
      const vehiclesInfo = $('<div class="vehicles-info"></div>');
      const vehiclesTitle = $('<h3>Vehículos</h3>');
  
      data.vehicles.forEach(function(vehicleUrl) {
        $.ajax({
          url: vehicleUrl,
          method: 'GET',
          success: function(vehicleData) {
            const vehicleItem = $('<div class="vehicle-item"></div>');
            const name = $('<p></p>').text(`Nombre: ${vehicleData.name}`);
            const model = $('<p></p>').text(`Modelo: ${vehicleData.model}`);
  
            vehicleItem.append(name, model);
            vehiclesInfo.append(vehicleItem);
          },
          error: function(error) {
            console.error('Ha habido un problema:', error);
          }
        });
      });
  
      otherData.append(vehiclesTitle, vehiclesInfo);
    }
    if (data.starships.length > 0) {
      hasContent = true; 
      const starshipsInfo = $('<div class="starships-info"></div>');
      const starshipsTitle = $('<h3>Starships</h3>');
  
      data.starships.forEach(function(starshipUrl) {
        $.ajax({
          url: starshipUrl,
          method: 'GET',
          success: function(starshipData) {
            const starshipItem = $('<div class="starship-item"></div>');
            const name = $('<p></p>').text(`Nombre: ${starshipData.name}`);
            const model = $('<p></p>').text(`Modelo: ${starshipData.model}`);
  
            starshipItem.append(name, model);
            starshipsInfo.append(starshipItem);
          },
          error: function(error) {
            console.error('Ha habido un problema:', error);
          }
        });
      });
  
      otherData.append(starshipsTitle, starshipsInfo);
    }
    if (hasContent) {
      characterData.append(otherData);
    }
    data.species.forEach(function(speciesUrl) {
      $.ajax({
        url: speciesUrl,
        method: 'GET',
        success: function(speciesData) {
          const speciesTitle = $('<h3>Especie</h3>');
          const speciesInfo = $('<div class="species-info"></div>');
  
          const speciesName = $('<p></p>').text(`Tipo: ${speciesData.name}`);
          const classification = $('<p></p>').text(`Clasificación: ${speciesData.classification}`);
          const designation = $('<p></p>').text(`Designación: ${speciesData.designation}`);
          const averageHeight = $('<p></p>').text(`Altura media: ${speciesData.average_height}`);
          const skinColors = $('<p></p>').text(`Colores de piel: ${speciesData.skin_colors}`);
          const hairColors = $('<p></p>').text(`Colores de pelo: ${speciesData.hair_colors}`);
          const eyeColors = $('<p></p>').text(`Colores de ojos: ${speciesData.eye_colors}`);
          const averageLifespan = $('<p></p>').text(`Promedio de vida: ${speciesData.average_lifespan}`);
          const language = $('<p></p>').text(`Lenguaje: ${speciesData.language}`);
  
          speciesInfo.append(speciesName, classification, designation, averageHeight, skinColors, hairColors, eyeColors, averageLifespan, language);
          otherData.append(speciesTitle, speciesInfo);
        },
        error: function(error) {
          console.error('Ha habido un problema:', error);
        }
      });
    });
  
    characterData.append(otherData);
  }
    


    });
        
