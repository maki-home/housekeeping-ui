import './style.css';
import './garbage.png';

const initialize = () => {
    const date = document.getElementById('date');
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
        const d = new Date(today.getTime() + (i - 7) * 24 * 60 * 60 * 1000 /* + (i - 7)日 */);
        const option = document.createElement('option');
        option.text = d.toLocaleDateString();
        if (d.getTime() === today.getTime()) {
            option.selected = true;
        }
        date.appendChild(option);
    }

    const button = document.getElementById('register');
    const onClick = () => {
        alert(date.value + ' 登録!');
    };

    button.addEventListener('click', onClick);
};


document.addEventListener('DOMContentLoaded', initialize);