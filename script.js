const TypeAll = document.getElementById('All');
const TypeMeat = document.getElementById('Meat');
const TypeAnanas = document.getElementById('Ananas');
const TypeMushroom = document.getElementById('Mushroom');
const TypeSeafood = document.getElementById('Seafood');
const TypeVegan = document.getElementById('Vegan');
const pizzaCards = document.querySelectorAll('.pizza-card');
const buttons = [TypeAll, TypeMeat, TypeAnanas, TypeMushroom, TypeSeafood, TypeVegan];
const pizza_count = document.querySelector('.pizza-count');
const buyButtons = document.querySelectorAll('.buy-button');
const orders_count = document.querySelector('.orders-count');


document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
});

TypeAll.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('type1'));
    TypeAll.classList.add('type1');

    pizzaCards.forEach(card => {
        card.style.display = 'block';
    });
    pizza_count.textContent = 5;

});

TypeMeat.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('type1'));
    TypeMeat.classList.add('type1');

    pizzaCards.forEach(card => {
        const pizzaType = card.querySelector('.pizza-type').textContent;
        if (pizzaType === "М'ясна") {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    pizza_count.textContent = 1;
});

TypeAnanas.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('type1'));
    TypeAnanas.classList.add('type1');

    pizzaCards.forEach(card => {
        const pizzaType = card.querySelector('.pizza-type').textContent;
        if (pizzaType === 'З ананасами') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    pizza_count.textContent = 1;
});

TypeMushroom.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('type1'));
    TypeMushroom.classList.add('type1');

    pizzaCards.forEach(card => {
        const pizzaType = card.querySelector('.pizza-type').textContent;
        if (pizzaType === 'З грибами') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    pizza_count.textContent = 1;
});

TypeSeafood.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('type1'));
    TypeSeafood.classList.add('type1');

    pizzaCards.forEach(card => {
        const pizzaType = card.querySelector('.pizza-type').textContent;
        if (pizzaType === 'З морепродуктами') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    pizza_count.textContent = 2;
});

TypeVegan.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('type1'));
    TypeVegan.classList.add('type1');

    pizzaCards.forEach(card => {
        const pizzaType = card.querySelector('.pizza-type').textContent;
        if (pizzaType === 'Вега') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    pizza_count.textContent = 0;
});

buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonId = event.target.id;
        const pizzaCard = event.target.closest('.pizza-card'); // Відповідна карта піци
        const pizzaName = pizzaCard.querySelector('.pizza-name').textContent; // Ім'я піци

        // Формуємо назву для блоку замовлення
        const orderName = `${pizzaName} (${buttonId === 'Small' ? 'Мала' : 'Велика'})`;

        // Знаходимо відповідний блок замовлення
        const orderedItems = document.querySelectorAll('.ordered');
        orderedItems.forEach(orderedItem => {
            const h4 = orderedItem.querySelector('h4');
            if (h4.textContent === orderName) {
                if (orderedItem.style.display !== 'none') {
                    const countElement = orderedItem.querySelector('.controls span strong');

                    // Отримуємо поточну кількість і збільшуємо її на 1
                    let currentCount = parseInt(countElement.innerText);
                    currentCount++;

                    // Оновлюємо текст в span
                    countElement.innerText = currentCount;
                    updatePrice(orderedItem);
                    saveCartToLocalStorage(orderedItem);
                    updateTotalPrice();
                }
                else {
                    orderedItem.style.display = 'flex';
                    orders_count.textContent = (parseInt(orders_count.textContent)) + 1;
                    saveCartToLocalStorage(orderedItem);
                    updateTotalPrice();
                }
            }
        });
    });
});

function increaseAmount(event) {
    // Знаходимо батьківський елемент ordered
    const orderedItem = event.target.closest('.ordered');

    // Знаходимо span з кількістю
    const countElement = orderedItem.querySelector('.controls span strong');

    // Отримуємо поточну кількість і збільшуємо її на 1
    let currentCount = parseInt(countElement.innerText);
    currentCount++;

    // Оновлюємо текст в span
    countElement.innerText = currentCount;
    updatePrice(orderedItem);
    saveCartToLocalStorage(orderedItem);
    updateTotalPrice();
}


// Додаємо івент-листенер на всі кнопки "+"
document.querySelectorAll('.plus').forEach(button => {
    button.addEventListener('click', increaseAmount);
});

document.querySelectorAll('.minus').forEach(button => {
    button.addEventListener('click', decreaseAmount);
});


function decreaseAmount(event) {
    // Знаходимо батьківський елемент ordered
    const orderedItem = event.target.closest('.ordered');

    // Знаходимо span з кількістю
    const countElement = orderedItem.querySelector('.controls span strong');

    // Отримуємо поточну кількість
    let currentCount = parseInt(countElement.innerText);

    if (currentCount > 1) {

        // Зменшуємо кількість на 1
        currentCount--;
        countElement.innerText = currentCount;
        updatePrice(orderedItem);
        saveCartToLocalStorage(orderedItem);
        updateTotalPrice();
    } else {
        orderedItem.style.display = 'none';
        orders_count.textContent = (parseInt(orders_count.textContent)) - 1;
        removeItemFromLocalStorage(orderedItem);
        updateTotalPrice();
    }
}


document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', (event) => {
        const orderedItem = event.target.closest('.ordered');
        delete_order(orderedItem);
    });
});

function delete_order(orderedItem) {
    // Знаходимо span з кількістю
    const countElement = orderedItem.querySelector('.controls span strong');

    countElement.innerText = 1;
    orderedItem.style.display = 'none';
    orders_count.textContent = (parseInt(orders_count.textContent)) - 1;
    removeItemFromLocalStorage(orderedItem);
    updatePrice(orderedItem);
    updateTotalPrice();
}

document.querySelector('.Clear').addEventListener('click', () => {
    const orderedItems = document.querySelectorAll('.ordered');
    orderedItems.forEach(orderedItem => {
        if (orderedItem.style.display !== 'none') {
            delete_order(orderedItem);
        }
    });
    clearCartInLocalStorage();
});


function saveCartToLocalStorage(orderedItem) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const pizzaName = orderedItem.querySelector('h4').textContent;
    const quantity = orderedItem.querySelector('.controls span strong').innerText;
    const price = orderedItem.querySelector('.price-ordered').innerText;

    // Перевірка, чи елемент вже є в кошику
    const existingItemIndex = cart.findIndex(item => item.name === pizzaName);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = parseInt(quantity);
        cart[existingItemIndex].price = parseInt(price);
    } else {
        cart.push({ name: pizzaName, quantity: parseInt(quantity), price: parseInt(price) });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItemFromLocalStorage(orderedItem) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const pizzaName = orderedItem.querySelector('h4').textContent;

    // Видаляємо елемент з кошика
    const updatedCart = cart.filter(item => item.name !== pizzaName);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
}

function clearCartInLocalStorage() {
    localStorage.removeItem('cart');
}


function loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const orderedItems = document.querySelectorAll('.ordered');

        cart.forEach(item => {
            orderedItems.forEach(orderedItem => {
                const h4 = orderedItem.querySelector('h4');
                if (h4.textContent === item.name) {
                    orderedItem.style.display = 'flex';
                    const countElement = orderedItem.querySelector('.controls span strong');
                    countElement.innerText = item.quantity;
                    const priceElement = orderedItem.querySelector('.price-ordered');
                    priceElement.innerText = item.price;
                    orders_count.textContent = (parseInt(orders_count.textContent)) + 1;
                }
            });
        });
        updateTotalPrice();
    }
}

function updatePrice(orderedItem) {
    const countElement = orderedItem.querySelector('.controls span strong');
    const currentCount = parseInt(countElement.innerText);

    // Отримуємо назву піци з замовлення
    const orderedPizzaName = orderedItem.querySelector('h4').textContent;

    // Видаляємо додаткові елементи з назви (наприклад, розмір)
    const pizzaName = removeExtraInfo(orderedPizzaName);

    // Отримуємо карточку піци, яка містить ціну
    const pizzaCard = findPizzaCardByPartialName(pizzaName);
    const price = orderedItem.querySelector('.controls p strong');

    if (pizzaCard) {
        // Отримуємо ціну піци відповідного розміру з відповідної карточки піци
        const pizzaPrice = getPizzaPrice(pizzaCard);

        // Обчислюємо загальну вартість
        const totalPrice = pizzaPrice * currentCount;

        // Оновлюємо текст загальної вартості в замовленні
        price.innerText = totalPrice;

    }
}

function removeExtraInfo(pizzaName) {
    const regex = /\s*\((Мала|Велика)\)\s*/;
    return pizzaName.replace(regex, '');
}

function findPizzaCardByPartialName(pizzaName) {
    // Знаходимо карточку піци за частковою назвою
    const pizzaCards = document.querySelectorAll('.pizza-card');
    for (let card of pizzaCards) {
        const nameElement = card.querySelector('.pizza-name');
        if (nameElement && nameElement.textContent.includes(pizzaName)) {
            return card;
        }
    }
    return null;
}

function getPizzaPrice(pizzaCard) {
    // Отримуємо ціну піци з карточки піци
    const sizeElement = pizzaCard.querySelector('.pizza-size');
    if (sizeElement) {
        const priceElement = sizeElement.querySelector('.large-price');
        if (priceElement) {
            return parseFloat(priceElement.innerText);
        }
    }
    return 0;
}

function updateTotalPrice() {
    const orderedItems = document.querySelectorAll('.ordered');
    let totalPrice = 0;

    orderedItems.forEach(orderedItem => {
        if (orderedItem.style.display !== 'none') {
            const priceElement = orderedItem.querySelector('.price-ordered');
                const price = parseInt(priceElement.innerText);
                totalPrice += price;
        }
    });

    document.querySelector('.total-sum').textContent = totalPrice;
}


document.querySelector('.report-button').addEventListener('click', function () {
    // Перехід на сторінку звіту
    window.location.href = './report.html';
});