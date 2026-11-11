//Без збірки React із JSX потребує підключення Babel standalone, який транслює JSX у браузері під час завантаження сторінки,
//  що може бути повільніше за попередню компіляцію

const EventCard = {
    props: ['title', 'category', 'date'],
    
    computed: 
    {
        daysUntil() 
        {
            const parts = this.date.split('.');
            const eventDate = new Date(parts[2], parts[1] - 1, parts[0]);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const timeLeft = eventDate - today;
            const daysLeft = Math.round(timeLeft / (1000 * 60 * 60 * 24));
            
            return daysLeft;
        },

        categoryClass() 
        {
            if (this.category === 'Музика') return 'category-music';
            if (this.category === 'Театр') return 'category-theatre';
            if (this.category === 'Виставка') return 'category-exhibition';
            if (this.category === 'Спорт') return 'category-sports';
            if (this.category === 'Свято') return 'category-holiday';
            return '';
        }
    },
    

    template: `
        <article :class="['event-card', categoryClass]" :data-date="date">
            <span class="badge">{{ category }}</span>
            <h3>{{ title }}</h3>
            <span style="position: absolute; bottom: 10px; right: 10px; color: white; font-size: 0.85rem; font-weight: bold;">
                {{ daysUntil < 0 ? 'Подія минула' : 'Днів: ' + daysUntil }}
            </span>
        </article>
    `
};

Vue.createApp({
    components: 
    {
        'event-card': EventCard
    },
    data() 
    {
        return {
            events: 
            [
                { id: 1, title: 'Джазовий вечір просто неба', category: 'Музика', date: '25.10.2027' },
                { id: 2, title: 'Прем\'єра вистави «Тіні»', category: 'Театр', date: '26.11.2026' },
                { id: 3, title: 'Виставка робототехніки', category: 'Виставка', date: '30.09.2027' },
                { id: 4, title: 'Турнір з вуличного баскетболу', category: 'Спорт', date: '29.10.2026' },
                { id: 5, title: 'Акустичний концерт', category: 'Музика', date: '26.12.2026' }
            ],
            nextId: 6,
            loading: false,
            error: null,
            selectedCategory: 'Всі',

            newEvent: 
            {
                title: '',
                category: 'Музика',
                date: ''
            }
        };
    },
    computed: {
        filteredEvents() {
            if (this.selectedCategory === 'Всі') 
            {
                return this.events;
            }
            return this.events.filter(event => event.category === this.selectedCategory);
        }
    },
    methods: 
    {
        async loadData() 
        {
            this.loading = true;
            this.error = null;
            const url = 'https://date.nager.at/api/v3/PublicHolidays/2026/UA';

            try 
            {
                const response = await fetch(url);
                if (!response.ok) 
                {
                    throw new Error('Дані про події не знайдено');
                }
                const data = await response.json();
                
                const adaptedEvents = data.map(holiday => (
                {
                    id: this.nextId++,
                    title: holiday.localName,
                    category: 'Свято',
                    date: holiday.date.split('-').reverse().join('.')
                }));

                this.events.push(...adaptedEvents);
                
            } 
            catch (error) 
            {
                this.error = (error.message === 'Failed to fetch' || error.name === 'TypeError') ? 'Помилка мережі' : error.message;
                console.error('Деталі помилки: ', error);
            } 
            finally 
            {
                this.loading = false;
            }
        },
        addEvent() 
        {
            const [year, month, day] = this.newEvent.date.split('-');
            const formattedDate = `${day}.${month}.${year}`;

            this.events.push(
            {
                id: this.nextId++,
                title: this.newEvent.title,
                category: this.newEvent.category,
                date: formattedDate
            });

            this.newEvent.title = '';
            this.newEvent.category = 'Музика';
            this.newEvent.date = '';
        },

        reloadEvents() 
        {
            this.events.length = 5; 
            this.loadData();
        }
    }
}).mount('#app');