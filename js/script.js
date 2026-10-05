console.log('script.js підключено')

const cityEvents = 
[
    { title: 'Симфонічний рок-оркестр', category: 'Музика' },
    { title: 'Сучасний балет «Мавка»', category: 'Театр' },
    { title: 'Фотовиставка «Місто крізь роки»', category: 'Виставка' },
    { title: 'Міський благодійний марафон', category: 'Спорт' }
];

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

// Стрілкова функція для форматованого виведення назви події та її деталей у консоль
const logEventInfo = (title, details) => console.log(`"${title}" — ${details}`)

// Стрілкова функція, яка скорочує текст до заданої кількості символів (n) і додає '...', якщо текст задовгий
const shorten = (text, n) => text.length > n ? text.slice(0, n) + '…' : text

printEventsByCategory('Музика');
printEventsByCategory('Театр');
printEventsByCategory('Виставка');
printEventsByCategory('Спорт');

classifyEvents();
console.log(shorten('Симфонічний рок-оркестр', 10));