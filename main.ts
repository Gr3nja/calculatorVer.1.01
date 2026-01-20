// ===== DOM要素 =====
const d = document.getElementById('display') as HTMLInputElement;
const calcEl = document.querySelector('.calc') as HTMLDivElement;
const msgEl = document.getElementById('msg') as HTMLDivElement;

// ===== 状態 =====
let cv: string = '0';
let pv: string = '';
let o: string = '';
let r: boolean = false;
let clickCount: number = 0;

// Set は ES2015 以上（tsconfig 必須）
const buggedButtons: Set<string> = new Set<string>();

// ===== 数字入力 =====
function num(n: string): void {
    clickCount++;

    if (r) {
        cv = '0';
        r = false;
    }

    if (n === '.' && cv.includes('.')) return;

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
function fakeNum(n: string): void {
    const fake: string =
        ['4', '7', '9', '2', '6', '8'][Math.floor(Math.random() * 6)];

    num(fake);

    calcEl.classList.add('shake');
    setTimeout((): void => {
        calcEl.classList.remove('shake');
    }, 500);
}

// ===== ボタン回避 =====
function dodge(btn: HTMLButtonElement): void {
    const rand: number = Math.random();

    if (rand > 0.7) {
        const rect: DOMRect = btn.getBoundingClientRect();

        btn.classList.add('fly-away');
        btn.style.left = rect.left + 'px';
        btn.style.top = rect.top + 'px';

        const angle: number = Math.random() * Math.PI * 2;
        const distance: number = 500 + Math.random() * 500;
        const x: number = Math.cos(angle) * distance;
        const y: number = Math.sin(angle) * distance;

        setTimeout((): void => {
            btn.style.transform =
                `translate(${x}px, ${y}px) rotate(${Math.random() * 720 - 360}deg)`;
        }, 10);

        setTimeout((): void => {
            btn.style.transform = '';
            btn.classList.remove('fly-away');
            btn.style.left = '';
            btn.style.top = '';
        }, 2000);

    } else if (rand > 0.4) {
        const x: number = (Math.random() - 0.5) * 80;
        const y: number = (Math.random() - 0.5) * 80;

        btn.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout((): void => {
            btn.style.transform = '';
        }, 600);
    }
}

// ===== ボタンバグ =====
function bugButton(btn: HTMLButtonElement): void {
    if (buggedButtons.has(btn.id)) return;

    buggedButtons.add(btn.id);
    btn.classList.add('glitch');

    const interval: number = window.setInterval((): void => {
        btn.textContent = String(Math.floor(Math.random() * 10));
    }, 100);

    setTimeout((): void => {
        clearInterval(interval);
        buggedButtons.delete(btn.id);
        btn.classList.remove('glitch');
        btn.textContent = btn.id.replace('b', '');
    }, 5000);
}

// ===== 数字入れ替え =====
function swapNumbers(): void {
    const nums: string[] = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];

    const a: string = nums[Math.floor(Math.random() * nums.length)];
    const b: string = nums[Math.floor(Math.random() * nums.length)];

    if (a !== b) {
        const btnA = document.getElementById(a) as HTMLButtonElement | null;
        const btnB = document.getElementById(b) as HTMLButtonElement | null;

        if (btnA && btnB) {
            const tempText: string = btnA.textContent ?? '';
            btnA.textContent = btnB.textContent;
            btnB.textContent = tempText;
        }
    }
}

// ===== 全部5 =====
function allButtonsToFive(): void {
    const nums: string[] = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];
    const originalTexts: Record<string, string> = {};

    nums.forEach((id: string): void => {
        const btn = document.getElementById(id) as HTMLButtonElement | null;
        if (btn) {
            originalTexts[id] = btn.textContent ?? '';
            btn.textContent = '5';
        }
    });

    setTimeout((): void => {
        nums.forEach((id: string): void => {
            const btn = document.getElementById(id) as HTMLButtonElement | null;
            if (btn && originalTexts[id] !== undefined) {
                btn.textContent = originalTexts[id];
            }
        });
    }, 3000);
}

// ===== メッセージ =====
function showMessage(txt: string): void {
    msgEl.textContent = txt;
    msgEl.style.display = 'block';

    setTimeout((): void => {
        msgEl.style.display = 'none';
    }, 2000);
}

// ===== ランダム演出 =====
setInterval((): void => {
    const rand: number = Math.random();

    if (rand > 0.7) swapNumbers();

    if (rand > 0.95) {
        const nums: string[] = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];
        const target =
            document.getElementById(nums[Math.floor(Math.random() * nums.length)])
            as HTMLButtonElement | null;

        if (target) bugButton(target);
    }

    if (rand > 0.96) allButtonsToFive();

    if (rand > 0.92) {
        calcEl.classList.add('spin');
        setTimeout((): void => {
            calcEl.classList.remove('spin');
        }, 2000);
    }

    if (rand > 0.90) {
        const scale: number = 0.5 + Math.random();
        calcEl.style.transform = `scale(${scale})`;
        setTimeout((): void => {
            calcEl.style.transform = '';
        }, 1500);
    }

    if (rand > 0.88 && cv !== '0') {
        const temp: string = cv;
        d.value = '';
        setTimeout((): void => {
            d.value = temp;
        }, 1000);
    }
}, 3000);

// ===== ボタン無効化 =====
setInterval((): void => {
    if (Math.random() > 0.85) {
        const btns = document.querySelectorAll('button');
        btns.forEach((b: HTMLButtonElement): void => {
            b.disabled = true;
        });

        setTimeout((): void => {
            btns.forEach((b: HTMLButtonElement): void => {
                b.disabled = false;
            });
        }, 2000);
    }
}, 8000);

// ===== 演算 =====
function op(s: string): void {
    clickCount++;

    if (o && !r) calc();

    pv = cv;
    o = s;
    r = true;

    if (Math.random() > 0.8) {
        const ops: string[] = ['+', '-', '*', '/'];
        o = ops[Math.floor(Math.random() * ops.length)];
    }
}

// ===== 計算 =====
function calc(): void {
    clickCount++;
    if (!o) return;

    if (Math.random() > 0.85) {
        cv = String(Math.abs(eval(pv + o + cv)));
    } else if (Math.random() > 0.75) {
        cv = String(eval(pv + o + cv)) + Math.floor(Math.random() * 10);
    } else if (Math.random() > 0.6) {
        cv = String(Math.floor(Math.random() * 1000));
    } else {
        cv = String(eval(pv + o + cv));
    }

    d.value = cv;
    o = '';
    r = true;
}

// ===== クリア =====
function clr(): void {
    clickCount++;

    if (Math.random() > 0.7) {
        cv = '999';
    } else if (Math.random() > 0.5) {
        cv = String(Math.floor(Math.random() * 100));
    } else {
        cv = '0';
    }

    pv = '';
    o = '';
    r = false;
    d.value = cv;
}

// ===== 削除 =====
function del(): void {
    clickCount++;
    const rand: number = Math.random();

    if (rand > 0.6) {
        cv = cv + String(Math.floor(Math.random() * 10));
    } else if (rand > 0.4) {
        cv = cv.length > 1 ? cv.slice(1) : '0';
    } else if (rand > 0.2) {
        if (cv.length > 2) {
            const mid: number = Math.floor(cv.length / 2);
            cv = cv.slice(0, mid) + cv.slice(mid + 1);
        } else {
            cv = '0';
        }
    } else {
        cv = cv.length > 1 ? cv.slice(0, -1) : '0';
    }

    d.value = cv;
}

// ===== マウス回避 =====
document.addEventListener('mousemove', (e: MouseEvent): void => {
    if (Math.random() > 0.98) {
        const rect: DOMRect = calcEl.getBoundingClientRect();
        const centerX: number = rect.left + rect.width / 2;
        const centerY: number = rect.top + rect.height / 2;

        const dx: number = e.clientX - centerX;
        const dy: number = e.clientY - centerY;
        const dist: number = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300) {
            const moveX: number = -dx / 5;
            const moveY: number = -dy / 5;

            calcEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
            setTimeout((): void => {
                calcEl.style.transform = '';
            }, 500);
        }
    }
});
