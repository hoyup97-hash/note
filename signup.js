/* 오픈 알림 사전신청 폼
   저장소: 구글 폼(응답 시트에 받은 시간이 자동 기록됨)
   CONFIG에 폼 주소와 칸 번호를 채우면 작동해요. */
(function () {
  /* 계정마다 폼과 시트를 따로 둬요. data-account="fp"면 FP 영업노트 폼 */
  var FIELDS = { email: "entry.1031617953", phone: "entry.1567260345", src: "entry.332361773" };
  var ACCOUNTS = {
    consumer: {
      action: "https://docs.google.com/forms/d/e/1FAIpQLSeH8gBYw6WkXQet6aJTY3Hz2sYBwUD6BNIB354UYbIb9EaprA/formResponse",
      title: "1:1 보험 점검, 열리면 알려드려요",
      lead: "내 보험이 겹치는지 같이 봐 드리는 서비스를 준비 중이에요.",
      purpose: "오픈 알림만, 남에게 넘기지 않음",
      done: "오픈하면 가장 먼저 알려드릴게요."
    },
    fp: {
      action: "https://docs.google.com/forms/d/e/1FAIpQLSc201A2ZhjM5-fRwe2Ehip2329n6zyJfvDfE3B1V1RlqNv2HA/formResponse",
      title: "제도가 바뀌면 먼저 알려드려요",
      lead: "수수료, 심의, 판매규제가 바뀌면 정리해서 보내 드려요.",
      purpose: "제도 브리핑 알림만, 남에게 넘기지 않음",
      done: "새 브리핑이 나오면 보내 드릴게요."
    }
  };

  var box = document.getElementById("signup");
  if (!box) return;
  var A = ACCOUNTS[box.dataset.account] || ACCOUNTS.consumer;
  var CONFIG = { action: A.action, email: FIELDS.email, phone: FIELDS.phone, src: FIELDS.src };
  var src = new URLSearchParams(location.search).get("src") || box.dataset.src || "direct";

  box.innerHTML =
    '<h2>' + A.title + '</h2>' +
    '<p>' + A.lead + '</p>' +
    '<form class="su card" novalidate>' +
      '<div class="su-l" id="su-how">어떻게 알려드릴까요?</div>' +
      '<div class="su-tg" role="radiogroup" aria-labelledby="su-how">' +
        '<label><input type="radio" name="how" value="email" checked><span>이메일로</span></label>' +
        '<label><input type="radio" name="how" value="phone"><span>문자로</span></label>' +
      '</div>' +
      '<input id="su-v" name="v" type="email" inputmode="email" autocomplete="email" placeholder="example@gmail.com" aria-labelledby="su-how" required>' +
      '<input class="su-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<label class="su-c"><input type="checkbox" name="agree" required> ' +
        '<span>개인정보 수집과 이용에 동의해요. <span class="su-r">필수</span></span></label>' +
      '<div class="su-t">수집: 이메일 또는 휴대폰 번호<br>' +
        '목적: ' + A.purpose + '<br>' +
        '보관: 알림 후 바로 삭제, 최대 6개월<br>' +
        '동의하지 않으면 알림을 받을 수 없어요.<br>' +
        '<a href="/note/privacy/">개인정보 처리방침 보기</a></div>' +
      '<p class="su-e" role="alert" hidden></p>' +
      '<button class="btn su-b" type="submit">알림 신청하기</button>' +
    '</form>';

  var css = document.createElement("style");
  css.textContent =
    '.su{margin-top:16px;padding:20px 20px 22px;display:flex;flex-direction:column}' +
    '.su-l{margin-top:14px;font-weight:800;font-size:15.5px}.su-l:first-child{margin-top:0}' +
    '.su-tg{margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px}' +
    '.su-tg label{position:relative}.su-tg input{position:absolute;opacity:0;inset:0}' +
    '.su-tg span{display:block;padding:11px 0;text-align:center;border:2px solid var(--ink);border-radius:var(--r-ctl,12px);font-weight:800;font-size:15.5px;cursor:pointer}' +
    '.su-tg input:checked+span{background:var(--ink);color:var(--card)}.su-tg input:focus-visible+span{outline:3px solid var(--pen);outline-offset:2px}' +
    '.su input[type=email],.su input[type=tel]{margin-top:10px;margin-top:6px;padding:13px 14px;border:2px solid var(--ink);border-radius:var(--r-ctl,12px);font:inherit;font-size:16px;background:var(--card);color:var(--ink)}' +
    '.su input:focus-visible{outline:3px solid var(--pen);outline-offset:1px}' +
    '.su-r{color:var(--pen);font-size:13px;font-weight:800}.su-o{color:var(--muted);font-size:13px;font-weight:700}' +
    '.su-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}' +
    '.su-c{margin-top:18px;display:flex;gap:10px;align-items:flex-start;font-weight:700;font-size:15.5px}' +
    '.su-c input{width:20px;height:20px;margin-top:3px;accent-color:var(--pen);flex:none}' +
    '.su-t{margin-top:8px;padding:12px 14px;border-radius:var(--r-ctl,12px);background:var(--tint);color:var(--muted);font-size:13.5px;line-height:1.6}' +
    '.su-t a{color:var(--ink);font-weight:700}' +
    '.su-e{margin-top:12px;color:var(--pen);font-weight:700;font-size:15px}' +
    '.su-b{margin-top:16px;border:0;cursor:pointer;font:inherit;font-weight:800;padding:14px 18px;font-size:17px;text-align:center}' +
    '.su-b[disabled]{opacity:.6;cursor:default}' +
    '.su-done{margin-top:16px;padding:28px 20px;text-align:center}' +
    '.su-done b{display:block;font-size:24px;letter-spacing:-.6px}.su-done span{display:block;margin-top:6px;color:var(--muted);font-size:15px}';
  document.head.appendChild(css);

  var form = box.querySelector("form");
  var err = box.querySelector(".su-e");
  var v = form.v;
  form.addEventListener("change", function (e) {
    if (e.target.name !== "how") return;
    var em = e.target.value === "email";
    v.type = em ? "email" : "tel";
    v.inputMode = em ? "email" : "numeric";
    v.autocomplete = em ? "email" : "tel";
    v.placeholder = em ? "example@gmail.com" : "010-1234-5678";
    v.value = ""; err.hidden = true; v.focus();
  });
  function fail(msg) { err.textContent = msg; err.hidden = false; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    err.hidden = true;
    var how = form.how.value;
    var raw = form.v.value.trim();
    var email = "", phone = "";
    if (form.website.value) return; // 봇
    if (how === "email") {
      email = raw;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("이메일 주소를 확인해 주세요.");
    } else {
      phone = raw.replace(/[^0-9]/g, "");
      if (!/^01[016789][0-9]{7,8}$/.test(phone)) return fail("휴대폰 번호를 확인해 주세요.");
    }
    if (!form.agree.checked) return fail("개인정보 수집과 이용에 동의해 주셔야 신청할 수 있어요.");
    if (!CONFIG.action) return fail("지금은 신청을 받을 준비 중이에요. 조금 뒤에 다시 시도해 주세요.");

    var btn = form.querySelector("button");
    btn.disabled = true; btn.textContent = "보내는 중...";
    var body = new URLSearchParams();
    if (email) body.append(CONFIG.email, email);
    if (phone) body.append(CONFIG.phone, phone);
    body.append(CONFIG.src, src);

    fetch(CONFIG.action, { method: "POST", mode: "no-cors", body: body })
      .then(function () {
        form.outerHTML = '<div class="su-done card"><b>받았습니다!</b><span>' + A.done + '</span></div>';
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = "알림 신청하기";
        fail("전송이 안 됐어요. 잠시 뒤 다시 눌러 주세요.");
      });
  });
})();
