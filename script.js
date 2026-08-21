document.addEventListener("DOMContentLoaded", () => {
  const ROSE_IMAGE   = "assets/rose.jpg";      // 최신 장미 이미지
  const LETTER_IMAGE = "assets/letter.png";    // 최신 편지 이미지

  /* ----- 초기 오버레이 (예/아니오) ----- */
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.innerHTML = `
    <h1>건주언니에게</h1>
    <h2>(for 건주언니(하트))</h2>
    <p class="prompt">클릭하시겠습니까?</p>
    <button id="yesBtn">예</button>
    <button id="noBtn">아니오</button>
  `;
  document.body.appendChild(overlay);

  /* ----- 아니오 → “안대안대” 알림 ----- */
  overlay.querySelector("#noBtn").addEventListener("click", () => {
    alert("안대안대. 무조건 예를 눌러야 해요! 🙈");
  });

  /* ----- 예 클릭 → 장미 100송이 + 편지 ----- */
  overlay.querySelector("#yesBtn").addEventListener("click", () => {
    overlay.remove();
    showRoseScreen();
  });

  /* ---------- 장미 화면 ---------- */
  function showRoseScreen() {
    const screen = document.createElement("div");
    screen.id = "roseScreen";
    screen.innerHTML = `
      <p style="font-size:1.4rem; margin:0;">수고많았어! 🌹</p>
      <div id="roses"></div>
    `;
    document.body.appendChild(screen);

    const container = screen.querySelector("#roses");
    for (let i = 0; i < 100; i++) {
      const img = document.createElement("img");
      img.src = ROSE_IMAGE;
      img.alt = "Rose";
      container.appendChild(img);
    }
    setTimeout(showLetter, 2000);
  }

  /* ---------- 편지 화면 ---------- */
  function showLetter() {
    const note = document.createElement("div");
    note.style.position = "fixed";
    note.style.bottom = "2rem";
    note.style.right = "2rem";
    note.innerHTML = `
      <img src="${LETTER_IMAGE}" alt="Letter"
           style="width:200px; border-radius:.6rem; box-shadow:0 4px 12px rgba(0,0,0,.5);">
      <p style="margin-top:.5rem;">❤ 건주언니에게 사랑을 가득 담아</p>
    `;
    document.body.appendChild(note);
  }
});
