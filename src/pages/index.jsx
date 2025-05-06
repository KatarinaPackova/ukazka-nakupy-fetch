import { render } from '@czechitas/render';
import { ShopItem } from '../components/ShopItem';
import '../global.css';
import './index.css';

const response = await fetch('https://nakupy.czechitas.dev/api/mon');
const list = await response.json();

const HomePage = () => (
  <>
    <div className="banner"></div>
    <div className="container">
      <form className="newitem-form">
        <label htmlFor="input-name">Položka</label>
        <input id="input-name" type="text" />
        <label htmlFor="input-amount">Množství</label>
        <input id="input-amount" type="text" />
        <label htmlFor="input-unit">Jednotka</label>
        <input id="input-unit" type="text" />
        <button className="btn-add">Přidat</button>
      </form>
      <div className="shoplist">
        {list.map((item) => (
          <ShopItem
            key={item.id}
            name={item.product}
            amount={item.amount + ' ' + item.unit}
            bought={item.done}
          />
        ))}
      </div>
    </div>
  </>
);

document.querySelector('#root').innerHTML = render(<HomePage />);

document
  .querySelector('.newitem-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#input-name');
    const amountInput = document.querySelector('#input-amount');
    const unitInput = document.querySelector('#input-unit');

    const body = {
      product: nameInput.value,
      amount: Number(amountInput.value),
      unit: unitInput.value,
      done: false,
    };

    await fetch('https://nakupy.czechitas.dev/api/mon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    window.location.reload();
  });

const handleDelete = document.querySelector('.');

async (event) => {
  event.preventDefault();
  const shopItem = event.target.closest('.shopitem');

  const id = event.target.dataset.id;

  const response = await fetch(`https://nakupy.czechitas.dev/api/mon/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    shopItem.remove();
  } else {
    console.error('Smazani se nezdarilo');
  }
  window.location.reload();
};

const button = document.querySelectorAll('.btn-delete');
button.forEach((button) => button.addEventListener('click', handleDelete));
/* const handleDelete = async (event) => {
  event.preventDefault();

  // Správné získání ID z tlačítka
  const id = event.target.dataset.id;

  if (!id) {
    console.log('ID není přítomno!');
    return; // Pokud ID není, nic se neprovádí
  }

  console.log('Mazání položky s ID:', id); // Ujistíme se, že ID je správně získáno

  try {
    // Odesíláme DELETE požadavek na server
    const response = await fetch(`https://nakupy.czechitas.dev/api/mon/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Položka byla úspěšně smazána');
      // Po úspěšném smazání odstraníme položku ze seznamu na stránce
      event.target.closest('.item').remove();
    } else {
      console.log('Chyba při mazání položky');
    }
  } catch (error) {
    console.log('Chyba při komunikaci se serverem:', error);
  }
};

// Přiřazení event listenerů k tlačítkům pro smazání
const deleteButtons = document.querySelectorAll('.shopitem');
deleteButtons.forEach((button) => {
  button.addEventListener('click', handleDelete);
});
 */
