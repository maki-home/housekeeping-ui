import './style.css';
import './garbage.png';

const BASE_URL = 'https://housekeeping-api.dev.ik.am';

const loadData = async () => {
    const data = await fetch(`${BASE_URL}/missions`).then(x => x.json());
    const items = document.getElementById('items');
    items.innerHTML = '';
    data.forEach(d => {
        const tr = document.createElement('tr');
        items.appendChild(tr);
        let cycle;
        if (d.cycle % 30 === 0) {
            cycle = d.cycle / 30 + 'か月';
        } else if (d.cycle % 7 === 0) {
            cycle = d.cycle / 7 + '週間';
        } else {
            cycle = d.cycle + '日間';
        }
        tr.innerHTML = `<td>${d.place}</td><td>${d.lastDate || '未登録'}</td><td><input type="checkbox" name="finished" data-id="${d.id}"></td><td>${cycle}</td><td><input type="checkbox" name="remove" data-id="${d.id}"s></td>`;
    });
};

const initialize = async () => {
    const date = document.getElementById('date');
    const today = new Date();

    for (let i = 0; i < 8; i++) {
        const d = new Date(today.getTime() + (i - 7) * 24 * 60 * 60 * 1000 /* + (i - 7)日 */);
        const option = document.createElement('option');
        const isoString = d.toISOString();
        option.text = isoString.substring(5, 10).replace('-', '/');
        option.value = isoString.substring(0, 10);
        if (d.getTime() === today.getTime()) {
            option.selected = true;
        }
        date.appendChild(option);
    }

    const registerButton = document.getElementById('register');
    const onClickRegister = async () => {
        const checked = document.querySelectorAll("input[name=finished]:checked");
        const ids = [];
        checked.forEach(c => {
            ids.push(Number(c.dataset.id));
        });
        await fetch(`${BASE_URL}/missions`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: date.value, finished: ids})
        });
        await loadData();
    };

    registerButton.addEventListener('click', onClickRegister);

    const removeButton = document.getElementById('remove');
    const onClickRemove = async (event) => {
        const checked = document.querySelectorAll("input[name=remove]:checked");
        const ids = [];
        checked.forEach(c => {
            ids.push(Number(c.dataset.id));
        });
        await fetch(`${BASE_URL}/missions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({remove: ids})
        });
        await loadData();
    };
    removeButton.addEventListener('click', onClickRemove);
    await loadData();
};


document.addEventListener('DOMContentLoaded', initialize);