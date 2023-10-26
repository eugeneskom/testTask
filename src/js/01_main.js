
const submitBtn = document.querySelector('#submitBtn');
const dateForm = document.querySelector('#dateForm');

const getPersons = async () => {
  const startDate = document.querySelector('#dateFrom').value;
  const endDate = document.querySelector('#dateTo').value;
  console.log(startDate, endDate, 'startDate, endDate')
  const response = await fetch(`https://fakerapi.it/api/v1/persons?dateFrom=${startDate}&dateTo=${endDate}`);
  if(response.status !== 200) return null;
  const responseJson = await response.json();
  return responseJson.data;
}




function createPersonCard(person) {
  const listItem = document.createElement('li');
  listItem.classList.add('person-list__card');

  const name = document.createElement('h2');
  name.classList.add('person-list__name');
  name.textContent = `${person.firstname} ${person.lastname}`;

  const infoList = document.createElement('ul');
  infoList.classList.add('person-info');

  const email = createInfoItem('email', person.email);
  const phone = createInfoItem('phone', person.phone);
  const dob = createInfoItem('dob', person.birthday);
  const genderItem = createInfoItem('gender', person.gender); // Create gender item
  const website = createInfoItem('website', person.website);

  infoList.appendChild(email);
  infoList.appendChild(phone);
  infoList.appendChild(dob);

  // Add gender-specific class to the gender item
  if (person.gender === 'male') {
    genderItem.classList.add('male');
  } else if (person.gender === 'female') {
    genderItem.classList.add('female');
  }

  infoList.appendChild(genderItem); // Append gender item to the list
  infoList.appendChild(website);

  listItem.appendChild(name);
  listItem.appendChild(infoList);

  return listItem;
}


function createInfoItem(className, value) {
  const listItem = document.createElement('li');
  listItem.classList.add('person-info__item', className);
  listItem.textContent = value;
  return listItem;
}

function renderPersonList(people) {
  const container = document.querySelector('.person-list');
  container.innerHTML = '';
  people.forEach((person) => {
    const personCard = createPersonCard(person);
    container.appendChild(personCard);
  });
}

dateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const persons = await getPersons();
  renderPersonList(persons);

})

// const persons = getPersons();
// console.log(persons, 'persons')