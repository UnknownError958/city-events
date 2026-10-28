const staticCards = document.querySelectorAll('.event-card');

staticCards.forEach(card => card.remove());

const cityEvents = 
[
    { title: 'Джазовий вечір просто неба', category: 'Музика', date: '25.10.2027' },
    { title: 'Прем\'єра вистави «Тіні»', category: 'Театр', date: '26.11.2026' },
    { title: 'Виставка робототехніки', category: 'Виставка', date: '30.09.2027' },
    { title: 'Турнір з вуличного баскетболу', category: 'Спорт', date: '29.10.2026' },
    { title: 'Акустичний концерт', category: 'Музика', date: '26.12.2026' }
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

// Динамічне створення та відображення карток подій
function renderEventCards(events)
{
    listContainer.replaceChildren();

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

// Оновлення підсумкового елемента з кількістю подій
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

const form = document.querySelector('#add-event-form')

// Обробник події submit: скасовує перезавантаження сторінки, зчитує дані з форми, додає новий об'єкт у масив та перемальовує картки
form.addEventListener('submit', event => 
{
    event.preventDefault();
    const title = form.querySelector('#title').value.trim();
    const category = form.querySelector('#category').value;
    const [year, month, day] = form.querySelector('#date').value.trim().split('-');
    const date = `${day}.${month}.${year}`;

    const newEvent = 
    { 
        title: title, 
        category: category, 
        date: date 
    };

    cityEvents.push(newEvent);
    renderEventCards(cityEvents);
    countEvents(cityEvents);
    form.reset()
});

const titleInput = document.querySelector('#title');

// Налаштування власних повідомлень про помилки валідації
titleInput.addEventListener('invalid', () => 
{
    if (titleInput.validity.valueMissing) 
    {
        titleInput.setCustomValidity('Поле є обов\'язковим!');
    } 
    else if (titleInput.validity.patternMismatch) 
    {
        titleInput.setCustomValidity('Назва занадто коротка! Введіть щонайменше 3 символи.');
    }
});

// Скидання стану помилки при введенні нового тексту
titleInput.addEventListener('input', () => 
{
    titleInput.setCustomValidity(''); 
});


const filterContainer = document.querySelector('#filter-btn-container');

// Фільтрація списку подій за категорією
filterContainer.addEventListener('click', (event) => 
{
    if (event.target.tagName === 'BUTTON') 
    {
        const selectedCategory = event.target.dataset.category;
        
        if (selectedCategory === 'Всі') 
        {
            renderEventCards(cityEvents);
            countEvents(cityEvents);
        } 
        else 
        {
            const filteredEvents = cityEvents.filter(event => event.category === selectedCategory);
            renderEventCards(filteredEvents);
            countEvents(filteredEvents);
        }
    }
});