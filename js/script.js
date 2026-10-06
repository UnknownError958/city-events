const staticCards = document.querySelectorAll('.event-card');

staticCards.forEach(card => card.remove());

const cityEvents = 
[
    { title: 'Джазовий вечір просто неба', category: 'Музика', date: '25.10, 19:00' },
    { title: 'Прем\'єра вистави «Тіні»', category: 'Театр', date: '26.10, 18:30' },
    { title: 'Виставка робототехніки', category: 'Виставка', date: '27.10, 12:00' },
    { title: 'Турнір з вуличного баскетболу', category: 'Спорт', date: '28.10, 10:00' },
    { title: 'Акустичний концерт', category: 'Музика', date: '29.10, 20:00' }
];

const listContainer = document.querySelector('#events-list');
const countElement = document.querySelector('#events-count');

// Функція перебирає масив подій циклом і виводить у консоль ті, що відповідають заданій категорії
function printEventsByCategory(category) 
{
    for (const event of cityEvents)
    {
        if (event.category === category)
        {
            console.log(event.title);
        }
    }
}

// Функція класифікує події за допомогою умовної конструкції та виводить відповідний опис
function classifyEvents()
{
    for (const event of cityEvents)
    {
        if (event.category === 'Музика')
        {
            logEventInfo(event.title, "Музичний захід для поціновувачів живої музики");
        }
        else if (event.category === 'Театр')
        {
            logEventInfo(event.title, "Вистава для любителів театрального мистецтва");
        }
        else if (event.category === 'Виставка')
        {
            logEventInfo(event.title, "Виставка для тих, хто цінує візуальне мистецтво");
        }
        else if (event.category === 'Спорт')
        {
            logEventInfo(event.title, "Спортивна подія для активних людей");
        }
    }
}

function renderEventCards(events)
{
    events.forEach(event => 
    {
        const article = document.createElement('article');
        
        const categoryText = document.createElement('p');
        categoryText.classList.add('badge'); 
        categoryText.textContent = event.category;
        
        const title = document.createElement('h3');
        title.textContent = event.title;

        article.dataset.category = event.category; 
        article.dataset.date = event.date; 
        article.classList.add('event-card');

        if (event.category === 'Музика') 
        {
            article.classList.add('category-music');
        } 
        else if (event.category === 'Театр') 
        {
            article.classList.add('category-theatre');
        } 
        else if (event.category === 'Виставка') 
        {
            article.classList.add('category-exhibition');
        } 
        else if (event.category === 'Спорт') 
        {
            article.classList.add('category-sports');
        }

        article.append(categoryText, title);
        listContainer.append(article);
    });
}

function countEvents(events) 
{
    if (countElement) 
    {
        countElement.textContent = `Загальна кількість подій: ${events.length}`;
    }
}

// Стрілкова функція для форматованого виведення назви події та її деталей у консоль
const logEventInfo = (title, details) => console.log(`"${title}" — ${details}`)

// Стрілкова функція, яка скорочує текст до заданої кількості символів (n) і додає '...', якщо текст задовгий
const shorten = (text, n) => text.length > n ? text.slice(0, n) + '…' : text

renderEventCards(cityEvents);
countEvents(cityEvents);