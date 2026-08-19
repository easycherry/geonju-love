document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     🌹 건주언니를 위한 작은 하루의 선물
     ========================================================= */

  const ROSE_IMAGE = 'assets/rose.jpg';
  const LETTER_IMAGE = 'assets/letter.png';


  /* =========================================================
     기본 스타일
     ========================================================= */

  const style = document.createElement('style');

  style.textContent = `
    * { box-sizing: border-box; }
    html, body { margin:0; padding:0; width:100%; min-height:100%; font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR","Apple SD Gothic Neo",sans-serif; background:#050505; color:#fff; overflow-x:hidden; }
    body { min-height:100vh; }
    button { font-family:inherit; cursor:pointer; }
    .hidden { display:none !important; }
    .fade-in { animation:fadeIn 1.2s ease forwards; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

    /* 첫 화면 */
    #introScreen { position:fixed; inset:0; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:30px; background:radial-gradient(circle at center,rgba(130,20,50,0.15),transparent 55%),#050505; z-index:100; }
    .main-title { font-size:clamp(28px,6vw,52px); font-weight:700; letter-spacing:-2.5px; margin:0 0 15px; line-height:1.35; word-break:keep-all; }
    .sub-title { font-size:clamp(14px,3vw,18px); color:#999; margin:0 0 58px; letter-spacing:0.2px; }
    .heart { color:#ff5c7a; }
    .prompt { font-size:clamp(18px,4vw,25px); margin:0 0 25px; font-weight:500; }
    .button-wrap { display:flex; gap:12px; }
    .choice-btn { border:none; border-radius:999px; padding:13px 31px; font-size:15px; transition:all .25s ease; }
    #yesBtn { background:#fff; color:#111; }
    #noBtn { background:#222; color:#999; }
    .choice-btn:hover { transform:translateY(-3px); }

    /* 아니오 화면 */
    #noScreen { position:fixed; inset:0; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:30px; background:#050505; z-index:200; }
    .no-message { font-size:28px; margin-bottom:12px; }
    .no-sub-message { color:#999; margin-bottom:27px; font-size:15px; }
    #retryBtn { border:none; background:#fff; color:#111; border-radius:999px; padding:12px 26px; font-size:14px; }

    /* 장미 화면 */
    #roseScreen { position:relative; width:100%; min-height:100vh; padding:80px 20px 110px; background:radial-gradient(circle at 50% 15%,rgba(150,20,50,0.18),transparent 45%),#050505; text-align:center; }
    .rose-title { font-size:clamp(26px,5vw,42px); letter-spacing:-1.7px; margin:0; line-height:1.4; }
    .rose-subtitle { margin:15px 0 0; color:#999; font-size:15px; line-height:1.8; }
    .message { max-width:620px; margin:36px auto 42px; font-size:17px; line-height:2.05; color:#eee; word-break:keep-all; }
    .message strong { color:#fff; font-weight:600; }
    
    /* 한 송이 장미를 위한 스타일 */
    .rose-grid { display:flex; justify-content:center; align-items:center; margin:36px auto; }
    .rose-grid img { width:180px; height:180px; object-fit:cover; border-radius:24px; opacity:0; transform:scale(0.2) rotate(-8deg); animation:rosePop .8s cubic-bezier(.17,.89,.32,1.49) forwards; box-shadow:0 12px 35px rgba(255,40,80,0.25), 0 0 0 1px rgba(255,255,255,0.1); }
    @keyframes rosePop { to { opacity:1; transform:scale(1) rotate(0deg); } }
    
    .next-btn { margin-top:55px; border:1px solid rgba(255,255,255,.25); background:rgba(255,255,255,.06); color:#fff; border-radius:999px; padding:13px 27px; font-size:14px; transition:all .3s ease; }
    .next-btn:hover { background:rgba(255,255,255,.13); transform:translateY(-2px); }

    /* 편지 보기 전 */
    #letterPromptScreen { position:fixed; inset:0; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:30px; background:radial-gradient(circle at center,rgba(255,255,255,.05),transparent 50%),#050505; z-index:150; }
    .letter-small { color:#777; font-size:13px; margin-bottom:18px; letter-spacing:1.5px; }
    .letter-question { font-size:clamp(20px,4vw,31px); line-height:1.7; margin-bottom:35px; word-break:keep-all; }
    .letter-choice { border:none; background:#fff; color:#111; border-radius:999px; padding:13px 30px; font-size:15px; transition:.3s ease; }
    .letter-choice:hover { transform:translateY(-3px); }

    /* 마지막 편지 */
    #letterScreen { position:relative; width:100%; min-height:100vh; padding:60px 20px 100px; background:#090909; text-align:center; }
    .letter-header { margin-bottom:30px; }
    .letter-header p { color:#777; font-size:13px; margin:0 0 9px; }
    .letter-header h2 { font-size:25px; margin:0; font-weight:500; }
    .letter-image-wrap { width:min(720px,94%); margin:0 auto; border-radius:8px; overflow:hidden; box-shadow:0 20px 80px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.08); background:#eee; }
    .letter-image-wrap img { display:block; width:100%; height:auto; }
    .final-message { margin-top:52px; animation:fadeIn 1.5s ease forwards; }
    .tomorrow { color:#ff718c; font-size:18px !important; font-weight:600; margin-top:8px !important; }

    /* 떠오르는 하트 */
    .floating-heart { position:fixed; color:rgba(255,92,122,.55); pointer-events:none; animation:floatHeart 4s linear forwards; z-index:300; }
    @keyframes floatHeart { from { transform:translateY(20px) scale(.7); opacity:0; } 15% { opacity:1; } to { transform:translateY(-100vh) scale(1.2); opacity:0; } }

    /* 모바일 */
    @media (max-width:600px) {
      .rose-grid img { width:150px; height:150px; border-radius:20px; }
      .message { font-size:15px; padding: 0 10px; line-height: 1.9; }
      .main-title { letter-spacing:-1.2px; font-size: 28px; }
      .sub-title { margin: 0 0 45px; }
      .rose-title { font-size: 24px; }
      .rose-subtitle { font-size: 14px; }
      .choice-btn { padding: 12px 28px; font-size: 14px; }
      .letter-image-wrap { border-radius: 6px; }
      .final-message h1 { font-size: 26px; }
      .final-message p { font-size: 14px; }
    }
  `;

  document.head.appendChild(style);


  /* =========================================================
     1. 첫 화면
     ========================================================= */

  const introScreen = document.createElement('section');
  introScreen.id = 'introScreen';
  introScreen.innerHTML = `
    <h1 class="main-title">오늘 하루도 잘 버텨줘서 고마워</h1>
    <p class="sub-title"><span class="heart">for 건주언니 ♥</span></p>
    <p class="prompt">잠깐 쉬어가시겠습니까?</p>
    <div class="button-wrap"><button class="choice-btn" id="yesBtn">예</button><button class="choice-btn" id="noBtn">아니오</button></div>
  `;
  document.body.appendChild(introScreen);


  /* =========================================================
     2. 아니오 화면
     ========================================================= */

  const noScreen = document.createElement('section');
  noScreen.id = 'noScreen';
  noScreen.className = 'hidden';
  noScreen.innerHTML = `
    <div class="no-message">안대안대 ㅠㅠ</div>
    <div class="no-sub-message">이건 무조건 예 눌러야 하는 거예요 🥺</div>
    <button id="retryBtn">다시 생각해보기</button>
  `;
  document.body.appendChild(noScreen);


  /* =========================================================
     3. 장미 화면 (수정됨)
     ========================================================= */

  const roseScreen = document.createElement('section');
  roseScreen.id = 'roseScreen';
  roseScreen.className = 'hidden';
  roseScreen.innerHTML = `
    <h1 class="rose-title">오늘도 정말 수고 많았어:)</h1>
    <p class="rose-subtitle">오늘 하루가 조금이라도 가벼워졌으면 해서<br>작은 마음을 하나 모아봤어.</p>
    <p class="message">
      힘든 하루를 보낸 사람에게<br>거창한 말을 해주고 싶은 날도 있지만,<br>사실은 그냥 이것만 말해주고 싶었어.
    </p>
    <div class="rose-grid" id="roseGrid"></div>
    <button class="next-btn" id="letterBtn">그리고 한 장 더 볼래?</button>
  `;
  document.body.appendChild(roseScreen);


  /* =========================================================
     4. 편지 보기 전 화면
     ========================================================= */

  const letterPromptScreen = document.createElement('section');
  letterPromptScreen.id = 'letterPromptScreen';
  letterPromptScreen.className = 'hidden';
  letterPromptScreen.innerHTML = `
    <div class="letter-small">ONE MORE THING</div>
    <div class="letter-question"><strong>- 찬슬 - 이가 - 건주 - 에게</strong><br>보여주고 싶은 글이 있는데<br>읽어보시겠습니까?</div>
    <button class="letter-choice" id="showLetterBtn">네, 보여주세요 ♥</button>
  `;
  document.body.appendChild(letterPromptScreen);


  /* =========================================================
     5. 마지막 편지 화면 (수정됨)
     ========================================================= */

  const letterScreen = document.createElement('section');
  letterScreen.id = 'letterScreen';
  letterScreen.className = 'hidden';
  letterScreen.innerHTML = `
    <div class="letter-header"><p>찬슬이 준비한 마지막 한 장</p><h2>건주언니에게</h2></div>
    <div class="letter-image-wrap"><img src="${LETTER_IMAGE}" alt="찬슬이가 건주언니에게 전하는 글"></div>
    <div class="final-message">
      <p class="tomorrow">♥ 내일도 파이팅 !</p>
    </div>
  `;
  document.body.appendChild(letterScreen);


  /* =========================================================
     화면 전환 함수
     ========================================================= */

  function showScreen(screen) {
    [introScreen, noScreen, roseScreen, letterPromptScreen, letterScreen]
      .forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
    screen.classList.add('fade-in');
    setTimeout(() => screen.classList.remove('fade-in'), 1500);
  }


  /* =========================================================
     떠오르는 하트
     ========================================================= */

  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '♥';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.fontSize = (12 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (3 + Math.random() * 3) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }


  /* =========================================================
     장미 1송이 생성 (수정됨)
     ========================================================= */

  function createRoses() {
    const roseGrid = document.getElementById('roseGrid');
    roseGrid.innerHTML = '';
    const img = document.createElement('img');
    img.src = ROSE_IMAGE;
    img.alt = '장미';
    img.style.animationDelay = `0.1s`;
    roseGrid.appendChild(img);

    // 하트가 떠오르는 효과 (25번)
    let heartCount = 0;
    const heartInterval = setInterval(() => {
      createFloatingHeart();
      heartCount++;
      if (heartCount >= 25) clearInterval(heartInterval);
    }, 300);
  }


  /* =========================================================
     버튼 연결
     ========================================================= */

  const yesBtn = introScreen.querySelector('#yesBtn');
  const noBtn = introScreen.querySelector('#noBtn');
  const retryBtn = noScreen.querySelector('#retryBtn');
  const letterBtn = roseScreen.querySelector('#letterBtn');
  const showLetterBtn = letterPromptScreen.querySelector('#showLetterBtn');

  yesBtn.addEventListener('click', () => {
    showScreen(roseScreen);
    setTimeout(createRoses, 1000);
  });
  noBtn.addEventListener('click', () => showScreen(noScreen));
  retryBtn.addEventListener('click', () => showScreen(introScreen));
  letterBtn.addEventListener('click', () => showScreen(letterPromptScreen));
  showLetterBtn.addEventListener('click', () => {
    showScreen(letterScreen);
    let cnt = 0;
    const intv = setInterval(() => {
      createFloatingHeart();
      cnt++;
      if (cnt >= 15) clearInterval(intv);
    }, 500);
  });

});
