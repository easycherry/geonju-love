document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     🌹 건주언니를 위한 작은 하루의 선물
     ========================================================= */

  const ROSE_IMAGE = 'assets/rose.jpg';
  const LETTER_IMAGE = 'assets/letter.png';


  /* =========================================================
     기본 스타일 & 레이아웃 확장
     ========================================================= */

  const style = document.createElement('style');

  style.textContent = `
    * { box-sizing: border-box; }
    html, body { margin:0; padding:0; width:100%; min-height:100%; font-family:-apple-system,BlinkMacSystemFont,"Noto Sans KR","Apple SD Gothic Neo",sans-serif; background:#050505; color:#fff; overflow-x:hidden; }
    body { min-height:100vh; }
    button { font-family:inherit; cursor:pointer; }
    .hidden { display:none !important; }
    .fade-in { animation:fadeIn 0.8s ease forwards; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

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
    #roseScreen { position:relative; width:100%; min-height:100vh; padding:100px 20px 110px; background:radial-gradient(circle at 50% 15%,rgba(150,20,50,0.18),transparent 45%),#050505; text-align:center; }
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
    #letterScreen { position:relative; width:100%; min-height:100vh; padding:90px 20px 100px; background:#090909; text-align:center; }
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

    /* 신규 추가 스타일: 뒤로가기 버튼 */
    .back-btn {
      position: absolute;
      top: 24px;
      left: 24px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 18px;
      border-radius: 999px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 1000;
      backdrop-filter: blur(4px);
    }
    .back-btn:hover {
      background: rgba(255, 255, 255, 0.18);
      transform: translateX(-4px);
      border-color: rgba(255, 255, 255, 0.3);
    }

    /* 신규 추가 스타일: 조회수 버튼 */
    .stats-btn {
      position: absolute;
      top: 24px;
      right: 24px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.85);
      font-size: 13px;
      font-weight: 500;
      padding: 8px 18px;
      border-radius: 999px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 1000;
      backdrop-filter: blur(4px);
    }
    .stats-btn:hover {
      background: rgba(255, 255, 255, 0.18);
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.3);
      color: #fff;
    }

    /* 신규 추가 스타일: 조회수 모달 */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }
    .modal-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    .modal-content {
      background: rgba(18, 18, 18, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 28px;
      padding: 35px 30px;
      max-width: 380px;
      width: 90%;
      text-align: center;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
      transform: scale(0.9);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      backdrop-filter: blur(16px);
    }
    .modal-overlay.active .modal-content {
      transform: scale(1);
    }
    .modal-title {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 24px;
      color: #fff;
      letter-spacing: -0.5px;
    }
    .stats-row {
      display: flex;
      justify-content: space-around;
      margin-bottom: 30px;
      background: rgba(255, 255, 255, 0.03);
      padding: 20px 10px;
      border-radius: 18px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .stat-val {
      font-size: 26px;
      font-weight: 700;
      color: #ff5c7a;
    }
    .stat-lbl {
      font-size: 12px;
      color: #888;
    }
    .modal-close-btn {
      border: none;
      background: #fff;
      color: #111;
      border-radius: 999px;
      padding: 11px 28px;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.25s ease;
      width: 100%;
    }
    .modal-close-btn:hover {
      background: #eee;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15);
    }

    /* 하단 날짜 정보 */
    .footer-info {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: #555;
      text-align: center;
      width: 100%;
      pointer-events: none;
      letter-spacing: 0.3px;
    }

    /* 모바일 반응형 조정 */
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
      .back-btn { top: 16px; left: 16px; padding: 6px 14px; font-size: 13px; }
      .stats-btn { top: 16px; right: 16px; padding: 6px 14px; font-size: 13px; }
      #roseScreen { padding: 80px 20px 100px; }
      #letterScreen { padding: 80px 20px 100px; }
    }
  `;

  document.head.appendChild(style);


  /* =========================================================
     조회수 & 날짜 API 연동
     ========================================================= */

  let cachedVisits = null;
  let cachedYesClicks = null;
  const NAMESPACE = 'geonju-love';

  // 카운터 및 날짜 데이터 초기 로딩
  async function initData() {
    // 1. 방문 횟수 증가
    try {
      const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/visits/increment`);
      if (res.ok) {
        const data = await res.json();
        cachedVisits = data.value;
      }
    } catch (e) {
      console.error("방문 수 증가 API 실패:", e);
    }

    // 2. "예" 클릭 수 사전 로딩
    try {
      const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/yes_clicks`);
      if (res.ok) {
        const data = await res.json();
        cachedYesClicks = data.value;
      } else if (res.status === 404) {
        cachedYesClicks = 0; // 아직 생성 전인 경우
      }
    } catch (e) {
      console.error("클릭 수 조회 API 실패:", e);
    }

    // 3. 깃허브 마지막 업데이트 날짜 조회
    await loadLastUpdateDate();
  }

  // "예" 클릭 수 증가
  async function incrementYesClicks() {
    try {
      const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/yes_clicks/increment`);
      if (res.ok) {
        const data = await res.json();
        cachedYesClicks = data.value;
      }
    } catch (e) {
      console.error("클릭 수 증가 API 실패:", e);
    }
  }

  // 깃허브 최종 커밋 날짜 로드
  async function loadLastUpdateDate() {
    const defaultDate = '2026-08-20'; // API 실패 시 나타날 기본값
    const dateEl = document.getElementById('updateDate');
    if (!dateEl) return;

    try {
      const res = await fetch(`https://api.github.com/repos/easycherry/geonju-love/commits?per_page=1`);
      if (res.ok) {
        const commits = await res.json();
        if (commits && commits.length > 0) {
          const dateStr = commits[0].commit.committer.date;
          const formattedDate = new Date(dateStr).toISOString().split('T')[0];
          dateEl.textContent = `최종 업데이트: ${formattedDate}`;
          return;
        }
      }
    } catch (e) {
      console.error("깃허브 API 날짜 조회 실패:", e);
    }
    dateEl.textContent = `최종 업데이트: ${defaultDate}`;
  }

  // 비동기 통신 개시
  initData();


  /* =========================================================
     1. 첫 화면
     ========================================================= */

  const introScreen = document.createElement('section');
  introScreen.id = 'introScreen';
  introScreen.innerHTML = `
    <button class="stats-btn" id="statsBtn">📊 조회수</button>
    <h1 class="main-title">오늘 하루도 잘 버텨줘서 고마워</h1>
    <p class="sub-title"><span class="heart">for 건주언니 ♥</span></p>
    <p class="prompt">잠깐 쉬어가시겠습니까?</p>
    <div class="button-wrap">
      <button class="choice-btn" id="yesBtn">예</button>
      <button class="choice-btn" id="noBtn">아니오</button>
    </div>
    <div class="footer-info" id="updateDate">최종 업데이트: 불러오는 중...</div>
  `;
  document.body.appendChild(introScreen);


  /* =========================================================
     2. 아니오 화면
     ========================================================= */

  const noScreen = document.createElement('section');
  noScreen.id = 'noScreen';
  noScreen.className = 'hidden';
  noScreen.innerHTML = `
    <button class="back-btn" id="noBackBtn">← 처음으로</button>
    <div class="no-message">안대안대 ㅠㅠ</div>
    <div class="no-sub-message">이건 무조건 예 눌러야 하는 거예요 🥺</div>
    <button id="retryBtn">다시 생각해보기</button>
  `;
  document.body.appendChild(noScreen);


  /* =========================================================
     3. 장미 화면
     ========================================================= */

  const roseScreen = document.createElement('section');
  roseScreen.id = 'roseScreen';
  roseScreen.className = 'hidden';
  roseScreen.innerHTML = `
    <button class="back-btn" id="roseBackBtn">← 처음으로</button>
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
    <button class="back-btn" id="promptBackBtn">← 이전으로</button>
    <div class="letter-small">ONE MORE THING</div>
    <div class="letter-question"><strong>- 찬슬 - 이가 - 건주 - 에게</strong><br>보여주고 싶은 글이 있는데<br>읽어보시겠습니까?</div>
    <button class="letter-choice" id="showLetterBtn">네, 보여주세요 ♥</button>
  `;
  document.body.appendChild(letterPromptScreen);


  /* =========================================================
     5. 마지막 편지 화면
     ========================================================= */

  const letterScreen = document.createElement('section');
  letterScreen.id = 'letterScreen';
  letterScreen.className = 'hidden';
  letterScreen.innerHTML = `
    <button class="back-btn" id="letterBackBtn">← 이전으로</button>
    <div class="letter-header"><p>찬슬이 준비한 마지막 한 장</p><h2>건주언니에게</h2></div>
    <div class="letter-image-wrap"><img src="${LETTER_IMAGE}" alt="찬슬이가 건주언니에게 전하는 글"></div>
    <div class="final-message">
      <p class="tomorrow">♥ 내일도 파이팅 !</p>
    </div>
  `;
  document.body.appendChild(letterScreen);


  /* =========================================================
     6. 조회수 통계 모달 생성 (신규)
     ========================================================= */

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.id = 'statsModal';
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title">📊 누적 클릭 조회수</h3>
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-val" id="totalVisits">-</span>
          <span class="stat-lbl">총 방문 횟수</span>
        </div>
        <div class="stat-item">
          <span class="stat-val" id="totalYesClicks">-</span>
          <span class="stat-lbl">"예" 클릭 수</span>
        </div>
      </div>
      <button class="modal-close-btn" id="modalCloseBtn">닫기</button>
    </div>
  `;
  document.body.appendChild(modalOverlay);


  /* =========================================================
     화면 전환 함수
     ========================================================= */

  function showScreen(screen) {
    [introScreen, noScreen, roseScreen, letterPromptScreen, letterScreen]
      .forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
    screen.classList.add('fade-in');
    setTimeout(() => screen.classList.remove('fade-in'), 800);
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
     장미 1송이 생성
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
     버튼 이벤트 연결
     ========================================================= */

  const yesBtn = introScreen.querySelector('#yesBtn');
  const noBtn = introScreen.querySelector('#noBtn');
  const retryBtn = noScreen.querySelector('#retryBtn');
  const letterBtn = roseScreen.querySelector('#letterBtn');
  const showLetterBtn = letterPromptScreen.querySelector('#showLetterBtn');

  // 뒤로가기 버튼들
  const noBackBtn = noScreen.querySelector('#noBackBtn');
  const roseBackBtn = roseScreen.querySelector('#roseBackBtn');
  const promptBackBtn = letterPromptScreen.querySelector('#promptBackBtn');
  const letterBackBtn = letterScreen.querySelector('#letterBackBtn');

  // 조회수 버튼 및 모달 닫기
  const statsBtn = introScreen.querySelector('#statsBtn');
  const modalCloseBtn = modalOverlay.querySelector('#modalCloseBtn');

  // 1) 예/아니오 동작
  yesBtn.addEventListener('click', () => {
    showScreen(roseScreen);
    setTimeout(createRoses, 1000);
    incrementYesClicks(); // "예" 클릭 시 API 카운팅 증가
  });
  noBtn.addEventListener('click', () => showScreen(noScreen));
  retryBtn.addEventListener('click', () => showScreen(introScreen));

  // 2) 뒤로가기 동작 매핑
  noBackBtn.addEventListener('click', () => showScreen(introScreen));
  roseBackBtn.addEventListener('click', () => showScreen(introScreen));
  promptBackBtn.addEventListener('click', () => showScreen(roseScreen));
  letterBackBtn.addEventListener('click', () => showScreen(letterPromptScreen));

  // 3) 편지 이동 동작
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

  // 4) 조회수 모달 열기/닫기
  statsBtn.addEventListener('click', () => {
    document.getElementById('totalVisits').textContent = cachedVisits !== null ? cachedVisits : '오류';
    document.getElementById('totalYesClicks').textContent = cachedYesClicks !== null ? cachedYesClicks : '오류';
    modalOverlay.classList.add('active');
  });

  modalCloseBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  // 모달 영역 외부 클릭 시 닫기
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

});
