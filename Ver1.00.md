<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>計算機</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f0f0f0;
            overflow: hidden;
        }
        .calc {
            background: white;
            padding: 15px;
            border: 1px solid #ccc;
            position: relative;
            transition: all 0.3s;
        }
        #display {
            width: 180px;
            padding: 10px;
            margin-bottom: 10px;
            text-align: right;
            font-size: 22px;
            border: 1px solid #999;
        }
        .row {
            display: flex;
            gap: 4px;
            margin-bottom: 4px;
        }
        button {
            width: 45px;
            height: 45px;
            font-size: 16px;
            border: 1px solid #999;
            background: #fff;
            cursor: pointer;
            transition: all 0.5s;
            position: relative;
        }
        button:hover {
            background: #e0e0e0;
        }
        .wide {
            width: 94px;
        }
        .shake {
            animation: shake 0.5s;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-30px); }
            75% { transform: translateX(30px); }
        }
        .fly-away {
            position: fixed !important;
            z-index: 1000;
        }
        .spin {
            animation: spin 2s linear infinite;
        }
        @keyframes spin {
            100% { transform: rotate(360deg); }
        }
        .glitch {
            animation: glitch 0.1s infinite;
        }
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        #msg {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: black;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            display: none;
            z-index: 2000;
        }
    </style>
</head>
<body>
    <div id="msg"></div>
    <div class="calc">
        <input type="text" id="display" value="0" readonly>
        <div class="row">
            <button onmouseenter="dodge(this)" onclick="clr()">C</button>
            <button onmouseenter="dodge(this)" onclick="del()">←</button>
            <button onmouseenter="dodge(this)" onclick="op('/')">÷</button>
            <button onmouseenter="dodge(this)" onclick="op('*')">×</button>
        </div>
        <div class="row">
            <button id="b7" onmouseenter="dodge(this)" onclick="num('7')">7</button>
            <button id="b8" onmouseenter="dodge(this)" onclick="num('8')">8</button>
            <button id="b9" onmouseenter="dodge(this)" onclick="num('9')">9</button>
            <button onmouseenter="dodge(this)" onclick="op('-')">-</button>
        </div>
        <div class="row">
            <button id="b4" onmouseenter="dodge(this)" onclick="num('4')">4</button>
            <button id="b5" onmouseenter="dodge(this)" onclick="num('5')">5</button>
            <button id="b6" onmouseenter="dodge(this)" onclick="num('6')">6</button>
            <button onmouseenter="dodge(this)" onclick="op('+')">+</button>
        </div>
        <div class="row">
            <button id="b1" onmouseenter="dodge(this)" onclick="fakeNum('1')">1</button>
            <button id="b2" onmouseenter="dodge(this)" onclick="num('2')">2</button>
            <button id="b3" onmouseenter="dodge(this)" onclick="fakeNum('3')">3</button>
            <button onmouseenter="dodge(this)" onclick="calc()">=</button>
        </div>
        <div class="row">
            <button id="b0" class="wide" onmouseenter="dodge(this)" onclick="num('0')">0</button>
            <button onmouseenter="dodge(this)" onclick="num('.')">.</button>
        </div>
    </div>
    <script>
        let d = document.getElementById('display');
        let cv = '0', pv = '', o = '', r = false;
        let buggedButtons = new Set();
        let calcEl = document.querySelector('.calc');
        let msgEl = document.getElementById('msg');
        let clickCount = 0;
        
        function num(n) {
            clickCount++;
            if (r) { cv = '0'; r = false; }
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
        
        function fakeNum(n) {
            let fake = ['4', '7', '9', '2', '6', '8'][Math.floor(Math.random() * 6)];
            num(fake);
            calcEl.classList.add('shake');
            setTimeout(() => calcEl.classList.remove('shake'), 500);
        }
        
        function dodge(btn) {
            let rand = Math.random();
            if (rand > 0.7) {
                let rect = btn.getBoundingClientRect();
                btn.classList.add('fly-away');
                btn.style.left = rect.left + 'px';
                btn.style.top = rect.top + 'px';
                
                let angle = Math.random() * Math.PI * 2;
                let distance = 500 + Math.random() * 500;
                let x = Math.cos(angle) * distance;
                let y = Math.sin(angle) * distance;
                
                setTimeout(() => {
                    btn.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 720 - 360}deg)`;
                }, 10);
                
                setTimeout(() => {
                    btn.style.transform = '';
                    btn.classList.remove('fly-away');
                    btn.style.left = '';
                    btn.style.top = '';
                }, 2000);
            } else if (rand > 0.4) {
                let x = (Math.random() - 0.5) * 80;
                let y = (Math.random() - 0.5) * 80;
                btn.style.transform = `translate(${x}px, ${y}px)`;
                setTimeout(() => btn.style.transform = '', 600);
            }
        }
        
        function bugButton(btn) {
            if (buggedButtons.has(btn.id)) return;
            buggedButtons.add(btn.id);
            btn.classList.add('glitch');
            
            let interval = setInterval(() => {
                btn.textContent = Math.floor(Math.random() * 10);
            }, 100);
            
            setTimeout(() => {
                clearInterval(interval);
                buggedButtons.delete(btn.id);
                btn.classList.remove('glitch');
                btn.textContent = btn.id.replace('b', '');
            }, 5000);
        }
        
        function swapNumbers() {
            let nums = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];
            let a = nums[Math.floor(Math.random() * nums.length)];
            let b = nums[Math.floor(Math.random() * nums.length)];
            if (a !== b) {
                let btnA = document.getElementById(a);
                let btnB = document.getElementById(b);
                if (btnA && btnB) {
                    let tempText = btnA.textContent;
                    btnA.textContent = btnB.textContent;
                    btnB.textContent = tempText;
                }
            }
        }

        function allButtonsToFive() {
            let nums = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];
            let originalTexts = {};
            nums.forEach(id => {
                let btn = document.getElementById(id);
                if (btn) {
                    originalTexts[id] = btn.textContent;
                    btn.textContent = '5';
                }
            });
            setTimeout(() => {
                nums.forEach(id => {
                    let btn = document.getElementById(id);
                    if (btn && originalTexts[id]) {
                        btn.textContent = originalTexts[id];
                    }
                });
            }, 3000);
        }
        
        function showMessage(txt) {
            msgEl.textContent = txt;
            msgEl.style.display = 'block';
            setTimeout(() => msgEl.style.display = 'none', 2000);
        }
        
        setInterval(() => {
            let rand = Math.random();
            
            if (rand > 0.7) {
                swapNumbers();
            }
            
            if (rand > 0.95) {
                let nums = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'];
                let target = document.getElementById(nums[Math.floor(Math.random() * nums.length)]);
                bugButton(target);
            }
            
            if (rand > 0.96) {
                allButtonsToFive();
            }
            
            if (rand > 0.92) {
                calcEl.classList.add('spin');
                setTimeout(() => calcEl.classList.remove('spin'), 2000);
            }
            
            if (rand > 0.90) {
                let scale = 0.5 + Math.random() * 1;
                calcEl.style.transform = `scale(${scale})`;
                setTimeout(() => calcEl.style.transform = '', 1500);
            }
            
            if (rand > 0.88 && cv !== '0') {
                let temp = cv;
                d.value = '';
                setTimeout(() => d.value = temp, 1000);
            }
        }, 3000);
        
        setInterval(() => {
            if (Math.random() > 0.85) {
                let btns = document.querySelectorAll('button');
                btns.forEach(b => b.disabled = true);
                setTimeout(() => btns.forEach(b => b.disabled = false), 2000);
            }
        }, 8000);
        
        function op(s) {
            clickCount++;
            if (o && !r) calc();
            pv = cv;
            o = s;
            r = true;
            
            if (Math.random() > 0.8) {
                let ops = ['+', '-', '*', '/'];
                o = ops[Math.floor(Math.random() * 4)];
            }
        }
        
        function calc() {
            clickCount++;
            if (!o) return;
            
            if (Math.random() > 0.85) {
                cv = String(Math.abs(eval(pv + o + cv)));
            }
            else if (Math.random() > 0.75) {
                cv = String(eval(pv + o + cv)) + Math.floor(Math.random() * 10);
            }
            else if (Math.random() > 0.6) {
                cv = String(Math.floor(Math.random() * 1000));
            } else {
                cv = String(eval(pv + o + cv));
            }
            d.value = cv;
            o = '';
            r = true;
        }
        
        function clr() {
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
        
        function del() {
            clickCount++;
            let rand = Math.random();
            if (rand > 0.6) {
                cv = cv + String(Math.floor(Math.random() * 10));
            }
            else if (rand > 0.4) {
                cv = cv.length > 1 ? cv.slice(1) : '0';
            }
            else if (rand > 0.2) {
                if (cv.length > 2) {
                    let mid = Math.floor(cv.length / 2);
                    cv = cv.slice(0, mid) + cv.slice(mid + 1);
                } else {
                    cv = '0';
                }
            } else {
                cv = cv.length > 1 ? cv.slice(0, -1) : '0';
            }
            d.value = cv;
        }
        
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.98) {
                let rect = calcEl.getBoundingClientRect();
                let centerX = rect.left + rect.width / 2;
                let centerY = rect.top + rect.height / 2;
                let dx = e.clientX - centerX;
                let dy = e.clientY - centerY;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 300) {
                    let moveX = -dx / 5;
                    let moveY = -dy / 5;
                    calcEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    setTimeout(() => calcEl.style.transform = '', 500);
                }
            }
        });
    </script>
</body>
</html>