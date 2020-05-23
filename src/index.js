import './style.css';
import './garbage.png';

const initialize = () => {
    const date = document.getElementById('date');
    const today = new Date();
    const data = [
        {
            id: 1,
            place: '洗面所',
            lastDate: '2020/3/20',
            cycle: 14
        },
        {
            id: 2,
            place: 'キッチン',
            lastDate: '2020/4/15',
            cycle: 30
        },
        {
            id: 3,
            place: 'トイレ',
            lastDate: '2020/4/19',
            cycle: 7
        },
        {
            id: 4,
            place: '床',
            lastDate: '2020/5/2',
            cycle: 2
        }
    ];

    for (let i = 0; i < 8; i++) {
        const d = new Date(today.getTime() + (i - 7) * 24 * 60 * 60 * 1000 /* + (i - 7)日 */);
        const option = document.createElement('option');
        option.text = d.toLocaleDateString();
        if (d.getTime() === today.getTime()) {
            option.selected = true;
        }
        date.appendChild(option);
    }
    const items = document.getElementById('items');
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
        tr.innerHTML = `<td>${d.place}</td><td>${d.lastDate}</td><td><input type="checkbox" name="finished" data-id="${d.id}"></td><td>${cycle}</td><td><input type="checkbox" name="remove" data-id="${d.id}"s></td>`;
    });

    const registerButton = document.getElementById('register');
    const onClickRegister = () => {
        const checked = document.querySelectorAll("input[name=finished]:checked");
        const ids = [];
        checked.forEach(c => {
            ids.push(c.dataset.id);
        });
        alert(JSON.stringify({date: date.value, finished: ids}));
    };

    registerButton.addEventListener('click', onClickRegister);

    const removeButton= document.getElementById('remove');
    const onClickRemove =(event) => {
        const checked= document.querySelectorAll("input[name=remove]:checked");
        const ids = [];
        checked.forEach(c => {
            ids.push(c.dataset.id);
        });
        alert(JSON.stringify({ remove: ids}));
    };
    removeButton.addEventListener('click', onClickRemove);

};


document.addEventListener('DOMContentLoaded', initialize);