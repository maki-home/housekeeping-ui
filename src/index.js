import './style.css';
import './garbage.png';

const initialize = () => {
    const date = document.getElementById('date');
    console.log(date);
    const today = new Date();
    const data = [
        {
            place: '洗面所',
            lastDate: '2020/3/20',
            cycle: 14
        },
        {
            place: 'キッチン',
            lastDate: '2020/4/15',
            cycle: 21
        },
        {
            place: 'トイレ',
            lastDate: '2020/4/19',
            cycle: 7
        },
        {
            place: '床',
            lastDate: '2020/5/2',
            cycle: 2
        }
    ];

    for (let i = 0; i < 10; i++) {
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
        tr.innerHTML = `<td>${d.place}</td><td>${d.lastDate}</td><td><input type="checkbox" name="finished"></td><td>${d.cycle}日</td><td><input type="checkbox" name="remove"></td>`;
    });

    const button = document.getElementById('register');
    const onClick = () => {
        alert(date.value + ' 登録!');
    };

    button.addEventListener('click', onClick);
};


document.addEventListener('DOMContentLoaded', initialize);