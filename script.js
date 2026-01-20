// ===== DOM要素 =====
const d = document.getElementById('display');
const calcEl = document.querySelector('.calc');
const msgEl = document.getElementById('msg');
// ===== 状態 =====
let cv = '0';
let pv = '';
let o = '';
let r = false;
let clickCount = 0;
// Set は ES2015 以上（tsconfig 必須）
const buggedButtons = new Set();
// ===== 数字入力 =====
function num(n) {
    clickCount++;
    if (r) {
        cv = '0';
        r = false;
    }
    if (n === '.' && cv.includes('.'))
        return;
    cv = cv === '0' && n !== '.' ? n : cv + n;
    d.value = cv;
    if (Math.random() > 0.95) {
        d.value = d.value.split('').reverse().join('');
    }
    if (Math.random() > 0.97) {
        d.value = d.value + d.value;
    }
}
// ===== フェイク数字 =====
function fakeNum(n) {
    const fake = ['4', '7', '9', '2', '6', '8'][Math.floor(Math.random() * 6)];
    num(fake);
    calcEl.classList.add('shake');
    setTimeout(() => {
        calcEl.classList.remove('shake');
    }, 500);
}
// ===== ボタン回避 =====
function dodge(btn) {
    const rand = Math.random();
    if (rand > 0.7) {
        const rect = btn.getBoundingClientRect();
        btn.classList.add('fly-away');
        btn.style.left = rect.left + 'px';
        btn.style.top = rect.top + 'px';
        const angle = Math.random() * Math.PI * 2;
        const distance = 500 + Math.random() * 500;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        setTimeout(() => {
            btn.style.transform =
                `translate(${x}px, ${y}px) rotate(${Math.random() * 720 - 360}deg)`;
        }, 10);
        setTimeout(() => {
            btn.style.transform = '';
            btn.classList.remove('fly-away');
            btn.style.left = '';
            btn.style.top = '';
        }, 2000);
    }
    else if (rand > 0.4) {
        const x = (Math.random() - 0.5) * 80;
        const y = (Math.random() - 0.5) * 80;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(() => {
            btn.style.transform = '';
        }, 600);
    }
}
// ===== ボタンバグ =====
function bugButton(btn) {
    if (buggedButtons.has(btn.id))
        return;
    buggedButtons.add(btn.id);
    btn.classList.add('glitch');
    const interval = window.setInterval(() => {
        btn.textContent = String(Math.floor(Math.random() * 10));
    }, 100);
    setTimeout(() => {
        clearInterval(interval);
        buggedButtons.delete(btn.id);
        btn.classList.remove('glitch');
        btn.textContent = btn.id.replace('b', '');
    }, 5000);
}
// ===== 数字入れ替え =====
function swapNumbers() {
    var _a;
    const nums = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];
    const a = nums[Math.floor(Math.random() * nums.length)];
    const b = nums[Math.floor(Math.random() * nums.length)];
    if (a !== b) {
        const btnA = document.getElementById(a);
        const btnB = document.getElementById(b);
        if (btnA && btnB) {
            const tempText = (_a = btnA.textContent) !== null && _a !== void 0 ? _a : '';
            btnA.textContent = btnB.textContent;
            btnB.textContent = tempText;
        }
    }
}
// ===== 全部5 =====
function allButtonsToFive() {
    const nums = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];
    const originalTexts = {};
    nums.forEach((id) => {
        var _a;
        const btn = document.getElementById(id);
        if (btn) {
            originalTexts[id] = (_a = btn.textContent) !== null && _a !== void 0 ? _a : '';
            btn.textContent = '5';
        }
    });
    setTimeout(() => {
        nums.forEach((id) => {
            const btn = document.getElementById(id);
            if (btn && originalTexts[id] !== undefined) {
                btn.textContent = originalTexts[id];
            }
        });
    }, 3000);
}
// ===== メッセージ =====
function showMessage(txt) {
    msgEl.textContent = txt;
    msgEl.style.display = 'block';
    setTimeout(() => {
        msgEl.style.display = 'none';
    }, 2000);
}
// ===== ランダム演出 =====
setInterval(() => {
    const rand = Math.random();
    if (rand > 0.7)
        swapNumbers();
    if (rand > 0.95) {
        const nums = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];
        const target = document.getElementById(nums[Math.floor(Math.random() * nums.length)]);
        as;
        HTMLButtonElement | null;
        if (target)
            bugButton(target);
    }
    if (rand > 0.96)
        allButtonsToFive();
    if (rand > 0.92) {
        calcEl.classList.add('spin');
        setTimeout(() => {
            calcEl.classList.remove('spin');
        }, 2000);
    }
    if (rand > 0.90) {
        const scale = 0.5 + Math.random();
        calcEl.style.transform = `scale(${scale})`;
        setTimeout(() => {
            calcEl.style.transform = '';
        }, 1500);
    }
    if (rand > 0.88 && cv !== '0') {
        const temp = cv;
        d.value = '';
        setTimeout(() => {
            d.value = temp;
        }, 1000);
    }
}, 3000);
// ===== ボタン無効化 =====
setInterval(() => {
    if (Math.random() > 0.85) {
        const btns = document.querySelectorAll('button');
        btns.forEach((b) => {
            b.disabled = true;
        });
        setTimeout(() => {
            btns.forEach((b) => {
                b.disabled = false;
            });
        }, 2000);
    }
}, 8000);
// ===== 演算 =====
function op(s) {
    clickCount++;
    if (o && !r)
        calc();
    pv = cv;
    o = s;
    r = true;
    if (Math.random() > 0.8) {
        const ops = ['+', '-', '*', '/'];
        o = ops[Math.floor(Math.random() * ops.length)];
    }
}
// ===== 計算 =====
function calc() {
    clickCount++;
    if (!o)
        return;
    if (Math.random() > 0.85) {
        cv = String(Math.abs(eval(pv + o + cv)));
    }
    else if (Math.random() > 0.75) {
        cv = String(eval(pv + o + cv)) + Math.floor(Math.random() * 10);
    }
    else if (Math.random() > 0.6) {
        cv = String(Math.floor(Math.random() * 1000));
    }
    else {
        cv = String(eval(pv + o + cv));
    }
    d.value = cv;
    o = '';
    r = true;
}
// ===== クリア =====
function clr() {
    clickCount++;
    if (Math.random() > 0.7) {
        cv = '999';
    }
    else if (Math.random() > 0.5) {
        cv = String(Math.floor(Math.random() * 100));
    }
    else {
        cv = '0';
    }
    pv = '';
    o = '';
    r = false;
    d.value = cv;
}
// ===== 削除 =====
function del() {
    clickCount++;
    const rand = Math.random();
    if (rand > 0.6) {
        cv = cv + String(Math.floor(Math.random() * 10));
    }
    else if (rand > 0.4) {
        cv = cv.length > 1 ? cv.slice(1) : '0';
    }
    else if (rand > 0.2) {
        if (cv.length > 2) {
            const mid = Math.floor(cv.length / 2);
            cv = cv.slice(0, mid) + cv.slice(mid + 1);
        }
        else {
            cv = '0';
        }
    }
    else {
        cv = cv.length > 1 ? cv.slice(0, -1) : '0';
    }
    d.value = cv;
}
// ===== マウス回避 =====
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.98) {
        const rect = calcEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
            const moveX = -dx / 5;
            const moveY = -dy / 5;
            calcEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
            setTimeout(() => {
                calcEl.style.transform = '';
            }, 500);
        }
    }
});
