import '../scss/index.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

//  -------------MAIN-------------------------

let ourRequest = new XMLHttpRequest();

ourRequest.open('GET', 'http://www.json-generator.com/api/json/get/cqHzMtkErS?indent=2');
ourRequest.onload = function () {

  let ourData = JSON.parse(ourRequest.responseText);
  renderHTML(ourData);
};
ourRequest.send();

//  -------------FUNCTIONS--------------------

function renderHTML(data) {
  let article = document.getElementById('article');
  let toggleButton = document.getElementById('switch');
  let htmlStringList = '';
  let htmlStringCard = '';

  for (let i = 0; i < data.data.friends.length; i++) {
    let templateCard =
      '<div class="card">' +
      '<img class="card-img-top" src="../src/img/card-bg.jpg" alt="Card image cap">' +
      '<img class="profileImg" src="../src/img/profile.svg">' +
      '<div class="details">' +
      '<p class="card-text">$friendName</p>' +
      '<p class="card-text">$gender, $age</p>' +
      '</div>' +
      '<class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample' + [i] + '" aria-expanded="false" aria-controls="collapseExample">' +
      '<img src="../src/img/view-more.svg">' +
      '</>' +
      '<div class="collapse" id="collapseExample' + [i] + '">' +
      '<div class="card-body">' +
      '<p>$relationship</p>' +
      '<p>$biography</p>' +
      '</div>' +
      '</div>' +
      '</div>';

    let templateList =
      '<div class="container-fluid d-flex flex-row align-items-center">' +
      '<img src="../src/img/profile.svg" id="profile">' +
      '<p class="flexbox_user_name">$friendName</p>' +
      '<p class="flexbox_user_gender_age">$gender, $age</p>' +
      '<div class="flexbox_user_details_button" type="button" data-toggle="collapse" data-target="#collapseExample' + [i] + '" aria-expanded="false" aria-controls="collapseExample">' +
      '<img src="../src/img/view-more.svg">' +
      '</div>' +
      '</div>' +
      '<div class="collapse" id="collapseExample' + [i] + '">' +
      '<div class="card-body" style="text-align: left; margin-left: -0.5em;">' +
      '<p><h5>Relationship</h5></p>' +
      '<p>$relationship</p>' +
      '<p><h5>Biography</h5></p>' +
      '<p>$biography</p>' +
      '</div>' +
      '</div>';

    let htmlString_relationship = '';

    for (let ii = 0; ii < data.data.friends[i].friends.length; ii++) {
      htmlString_relationship =
        '\"' +
        data.data.friends[i].friends[ii].relationship +
        '\", ';
      // if(htmlString_relationship === '\"\"\,'){
      //   htmlString_relationship = 'none';
      // }
    }

    htmlStringList += templateList
      .replace('$friendName', data.data.friends[i].name)
      .replace('$gender', data.data.friends[i].gender)
      .replace('$age', data.data.friends[i].age)
      .replace('$relationship', htmlString_relationship)
      .replace('$biography', data.data.friends[i].biography);

    htmlStringCard += templateCard
      .replace('$friendName', data.data.friends[i].name)
      .replace('$gender', data.data.friends[i].gender)
      .replace('$age', data.data.friends[i].age)
      .replace('$relationship', htmlString_relationship)
      .replace('$biography', data.data.friends[i].biography);
  }

  article.innerHTML = htmlStringList;
  // console.log(article, htmlString);
  toggleButton.addEventListener('click', (e) => {
    // console.log(htmlStringList);
    // console.log(htmlStringCard);
    if (toggleButton.checked) {
      article.innerHTML = htmlStringCard;
    } else {
      article.innerHTML = htmlStringList;
    }
  });
  // article.innerHTML = htmlStringList;
}
