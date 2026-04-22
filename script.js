const output = document.getElementById('output');
const cmdInput = document.getElementById('cmd');
const cmdDisplay = document.getElementById('cmd-display');
const termBody = document.querySelector('.terminal-body');

let isTyping = false;
let pageLines = [];
let pageIndex = 0;
let linesPerPage = 0;
let waitingForNext = false;
let contactMode = null; // 'message' | 'contact-info' | null
let contactMessage = '';
const promptEl = document.querySelector('.prompt');

// 배열 페이징 (성과 단위)
let arrayPages = [];
let arrayPageIndex = 0;
let currentOutputBlock = null;
let currentPagedDiv = null;

const ASCII_ART = [
  " /$$                 /$$ /$$",
  "| $$                | $$| $$",
  "| $$$$$$$   /$$$$$$ | $$| $$  /$$$$$$  /$$  /$$  /$$",
  "| $$__  $$ /$$__  $$| $$| $$ /$$__  $$| $$ | $$ | $$",
  "| $$  \\ $$| $$$$$$$$| $$| $$| $$  \\ $$| $$ | $$ | $$",
  "| $$  | $$| $$_____/| $$| $$| $$  | $$| $$ | $$ | $$",
  "| $$  | $$|  $$$$$$$| $$| $$|  $$$$$$/|  $$$$$/$$$$/",
  "|__/  |__/ \\_______/|__/|__/ \\______/  \\_____/\\___/"
];

const INTRO_TEXT = `
안녕하세요. 하상범입니다.

LG전자 10년 · 제품 창업 6년 · B2B SaaS 3년
리서치로 문제를 정의하고, 제품으로 전환해 성과를 만들어왔습니다.

이력서     <a href="pdf/resume_2026.pdf" target="_blank">resume_2026.pdf</a>
뉴스레터   <a href="https://paper.xyz" target="_blank">paper.xyz</a>

---dotline---

명령어:  A 주요성과  |  E 경력  |  B 배경  |  C 연락처  |  clear 초기화

---dotline---
`;

const COMMANDS = {

  'a': [
`02. 주요성과

**LG전자 (2007-2015)**

1) 배경
- 터치 인터렉션에서 아이폰이 압도적인 성능.
- 정확도 차이 애플 97.1% 대비 LG 83.5%.
---dotline---
2) 접근
- 고속카메라를 이용한 분석 방법론 세계 최초 개발.
- K-Means 군집화 기반 알고리즘 설계.
- 고객 심리 분석 프로젝트 수행 (서울대, 고려대).
---dotline---
3) 결과
- 본인 포함 2명이 알고리즘 자체 개발
- 터치 정확도 83.5% → 96.1% 향상 
- LG 전자 전 모델 양산 적용.
- 양산 장비 개발, 생산라인 적용.
- 그룹사 최우수 프로젝트 선정.`,

`**포스페이스랩 (2022-2025)**

1) 베경
- 데이터 파이프라인과 BM 모두 문제점 존재.
- 주요 고객사 해지 의사 누적, 영업 부진.
- 신규 프로덕트 출시는 지연.
---dotline---
2) 접근
- 프로덕트 PM에서 기술 영업 업무로 확장, 고객 설득과 요구사항 재정의.
- DevOps 엔지니어링으로 업무 확장, 파이프라인 기능 개선.
- 업무 자동화 및 제품 기획·개발·영업 전 과정 직접 리드.
---dotline---
3) 결과
- 해지방어 성공률 80%. 신규 중견 3개사 추가 유치.
- 창사 이래 첫 업세일 계약 달성.
- 사내 영업 프로세스 자체를 재설계.`,


`**마인드허브 (2025)**

1) 배경
- 전산화 인지재활 시장에 다수 제품 존재하지만 대부분 수익화에는 실패 중.
- 시장 공략에 대한 전략 수립이 시급한 상황
---dotline---
2) 접근
- 대학병원 교수진 네트워크 관리 + 전문가 인터뷰 + 경쟁 제품 분석 진행
- 전체 사업 재구성 수준의 구조 진단 및 문서화
- 백오피스 자동화 시스템 직접 구축, 주니어 교육 실시.
---dotline---
3) 결과
- 차별화 콘텐츠 전략 수립.
- 신규 IR Deck 전체 설계. 운영 시스템 안정화.`
  ],

  'e': [
`03. 경력

**2025  디지털 헬스케어 스타트업, 마인드허브 (9개월)**
- 콘텐츠팀 팀리더

**2022  프렌차이즈, 데이터 SaaS 스타트업, 포스페이스랩 (3년)**
- 데이터팀 팀리더

**2016  로캣디자인 (6년)**
- 대표

**2007  LG전자 (9년)**
- LSR/UX연구소 선임연구원 (2013-2015) : UX 디자인
- 생산기술원 선임연구원 (2009-2013) : PM / 연구
- TV연구소 주임연구원 (2007-2009) : 엔지니어`
  ],

  'b': [
`04. 배경

학력
  - 공학석사, 광주과학기술원 신소재공학과 (2005-2007)
  - 공학학사, 광운대학교 전자재료공학과 (1998-2005)

주요 리딩 프로젝트
  - LG전자 미국 플랫폼 데이터 분석 (NDA로 상세 비공개)
  - LG전자 중국 경쟁사 데이터 크롤링 (NDA로 상세 비공개)
  - 한솥 자사앱 개발 및 DW 컨설팅
  - 마이크로 ERP 개발 및 컨설팅
  - 현대자동차 변속기 시뮬레이터 개발
  - 매출 예측 모델 개발
  - 기구 품질 예측 모델 개발
  - 조명 데이터 평가 모델 개발
  - IoT Connection UI/UX 설계 및 개발
  - smart TV UX 설계 및 개발
  - smart watch GUI 설계 및 디자인

기타 주요 경험
  - Red Dot Design Award Winner (2018)
  - 논쟁적UX 저서 (2017)
  - 세종대학교 제품/UX디자인 출강 (2019-2025)
  - 인지심리학회 추계 학술 대회 2017 초청발표
  - LG전자 사원 대표
  - 다수의 C레벨 보고
  - IBM PMP 과정 수료`
  ],

  'c': 'contact'

};

// 터미널 body 높이 기준 한 페이지 줄 수 계산
function calcLinesPerPage() {
    const lineH = 14 * 1.7; // font-size * line-height
    return Math.floor(termBody.clientHeight / lineH) - 2; // 여유 2줄
}

// 한 줄씩 타이핑 출력
function typeLine(container, line, delay) {
    return new Promise(resolve => {
        const div = document.createElement('div');
        div.style.whiteSpace = 'pre-wrap';
        container.appendChild(div);

        // ---dotline--- 마커 처리
        if (line.trim() === '---dotline---') {
            div.className = 'dotline';
            const count = Math.floor(container.clientWidth / 10);
            div.textContent = Array(count).fill('·').join(' ');
            setTimeout(resolve, delay);
            return;
        }

        // **bold** 마커 처리
        const isBold = line.startsWith('**') && line.endsWith('**');
        const text = isBold ? line.slice(2, -2) : line;
        if (isBold) div.style.fontWeight = '700';

        // HTML 태그가 포함된 줄은 타이핑 없이 바로 출력
        if (/<[a-z][\s\S]*>/i.test(text)) {
            div.innerHTML = text;
            setTimeout(resolve, delay);
            return;
        }

        let i = 0;
        const chars = Array.from(text);
        if (chars.length === 0) {
            div.innerHTML = '&nbsp;';
            setTimeout(resolve, delay);
            return;
        }

        function tick() {
            if (i < chars.length) {
                div.textContent += chars[i];
                i++;
                setTimeout(tick, 8);
            } else {
                setTimeout(resolve, delay);
            }
        }
        tick();
    });
}

// 페이지 단위로 출력
function showPage() {
    linesPerPage = calcLinesPerPage();
    const end = Math.min(pageIndex + linesPerPage, pageLines.length);
    const chunk = pageLines.slice(pageIndex, end);
    pageIndex = end;

    const container = currentPagedDiv;

    isTyping = true;

    (async () => {
        for (const line of chunk) {
            await typeLine(container, line, 15);
            termBody.scrollTop = termBody.scrollHeight;
        }

        isTyping = false;

        if (pageIndex < pageLines.length) {
            // 더 남아있으면 안내 표시
            waitingForNext = true;
            const hint = document.createElement('div');
            hint.className = 'page-hint';
            hint.textContent = '-- 스페이스 또는 터치로 계속 --';
            container.appendChild(hint);
            termBody.scrollTop = termBody.scrollHeight;
        } else {
            // 출력 완료
            pageLines = [];
            pageIndex = 0;
            waitingForNext = false;
        }
    })();
}

// 문자열 명령어 출력
function startPagedOutput(cmd, text) {
    const block = document.createElement('div');
    block.className = 'out-block';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'out-cmd';
    cmdLine.textContent = 'visitor@sangbomha:~$ ' + cmd;
    block.appendChild(cmdLine);

    const pagedDiv = document.createElement('div');
    pagedDiv.className = 'paged-output';
    block.appendChild(pagedDiv);

    output.appendChild(block);

    currentPagedDiv = pagedDiv;
    pageLines = text.split('\n');
    pageIndex = 0;

    showPage();
}

// 배열 명령어 출력 (성과 단위 페이징)
function startArrayOutput(cmd, pages) {
    const block = document.createElement('div');
    block.className = 'out-block';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'out-cmd';
    cmdLine.textContent = 'visitor@sangbomha:~$ ' + cmd;
    block.appendChild(cmdLine);

    output.appendChild(block);
    currentOutputBlock = block;

    arrayPages = pages;
    arrayPageIndex = 0;

    showArrayPage();
}

function showArrayPage() {
    if (arrayPageIndex >= arrayPages.length) {
        arrayPages = [];
        arrayPageIndex = 0;
        waitingForNext = false;
        return;
    }

    const text = arrayPages[arrayPageIndex];
    const lines = text.split('\n');
    const container = document.createElement('div');
    container.className = 'paged-output';
    currentOutputBlock.appendChild(container);

    isTyping = true;

    (async () => {
        for (const line of lines) {
            await typeLine(container, line, 15);
            termBody.scrollTop = termBody.scrollHeight;
        }

        // 실제 렌더링된 높이 기준으로 계산
        const contentHeight = container.getBoundingClientRect().height;
        const lineHeight = 14 * 1.7;
        const screenLines = Math.floor(termBody.clientHeight / lineHeight);
        const contentLines = Math.ceil(contentHeight / lineHeight);
        const padNeeded = screenLines - contentLines - 1;

        // 내용 시작점의 정확한 스크롤 위치 계산
        const contentTop = container.getBoundingClientRect().top
            - termBody.getBoundingClientRect().top
            + termBody.scrollTop;

        // 빈 줄을 한 칸씩 추가하면서 내용이 위로 올라감
        await new Promise(resolve => {
            let added = 0;
            function addOne() {
                if (added >= padNeeded) {
                    resolve();
                    return;
                }
                const empty = document.createElement('div');
                empty.innerHTML = '&nbsp;';
                currentOutputBlock.appendChild(empty);
                // 내용 시작점이 화면 맨 위에 오도록 스크롤
                termBody.scrollTop = contentTop;
                added++;
                setTimeout(addOne, 20);
            }
            addOne();
        });

        isTyping = false;
        arrayPageIndex++;

        if (arrayPageIndex < arrayPages.length) {
            waitingForNext = true;
            const hint = document.createElement('div');
            hint.className = 'page-hint';
            hint.textContent = '-- ' + arrayPageIndex + '/' + arrayPages.length + ' 스페이스 또는 터치로 계속 --';
            currentOutputBlock.appendChild(hint);
            termBody.scrollTop = contentTop;
        }
    })();
}

// 인트로 출력
function showIntro() {
    const artBlock = document.createElement('div');
    artBlock.style.cssText = 'font-size:14px;line-height:1.15;letter-spacing:0;overflow-x:auto;color:#5fa7e8;margin-bottom:1rem;font-family:monospace;';
    artBlock.textContent = ASCII_ART.join('\n');
    output.appendChild(artBlock);

    isTyping = true;
    const lines = INTRO_TEXT.split('\n');
    const container = document.createElement('div');
    output.appendChild(container);

    (async () => {
        for (const line of lines) {
            await typeLine(container, line, 15);
            termBody.scrollTop = termBody.scrollHeight;
        }
        isTyping = false;
    })();
}

// 명령어 처리
function handleCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (cmd === '' || isTyping) return;

    if (cmd === 'clear') {
        output.innerHTML = '';
        pageLines = [];
        pageIndex = 0;
        waitingForNext = false;
        contactMode = null;
        contactMessage = '';
        promptEl.textContent = 'visitor@sangbomha:~$';
        showIntro();
        return;
    }

    const result = COMMANDS[cmd];

    if (result === 'contact') {
        startContactFlow(raw.trim());
    } else if (result) {
        startArrayOutput(raw.trim(), Array.isArray(result) ? result : [result]);
    } else {
        const block = document.createElement('div');
        block.className = 'out-block';
        const cmdLine = document.createElement('div');
        cmdLine.className = 'out-cmd';
        cmdLine.textContent = 'visitor@sangbomha:~$ ' + raw.trim();
        block.appendChild(cmdLine);
        const errDiv = document.createElement('div');
        errDiv.textContent = '"' + raw.trim() + '" — 알 수 없는 명령어입니다.';
        block.appendChild(errDiv);
        output.appendChild(block);
    }

    termBody.scrollTop = termBody.scrollHeight;
}

// 문의하기 플로우
function startContactFlow(raw) {
    const block = document.createElement('div');
    block.className = 'out-block';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'out-cmd';
    cmdLine.textContent = 'visitor@sangbomha:~$ ' + raw;
    block.appendChild(cmdLine);

    const lines = [
        '05. 연락처',
        '',
        'email: f4strada@gmail.com',
        '',
        '문의하기  링크를 누르시고 메세지 남겨주세요'
    ];

    const container = document.createElement('div');
    container.className = 'paged-output';
    block.appendChild(container);
    output.appendChild(block);

    isTyping = true;
    (async () => {
        for (const line of lines) {
            if (line === '문의하기  링크를 누르시고 메세지 남겨주세요') {
                const div = document.createElement('div');
                div.style.whiteSpace = 'pre-wrap';
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = '문의하기';
                link.style.color = '#5fa7e8';
                link.style.textDecoration = 'underline';
                link.style.cursor = 'pointer';
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!contactMode) {
                        contactMode = 'message';
                        promptEl.textContent = '메세지를 남겨주세요:';
                        cmdInput.value = '';
                        cmdDisplay.textContent = '';
                        termBody.scrollTop = termBody.scrollHeight;
                        cmdInput.focus();
                    }
                });
                div.appendChild(link);
                div.appendChild(document.createTextNode('  링크를 누르시고 메세지 남겨주세요'));
                container.appendChild(div);
            } else {
                await typeLine(container, line, 15);
            }
            termBody.scrollTop = termBody.scrollHeight;
        }
        isTyping = false;
    })();
}

const BAD_WORDS = /시발|씨발|씨팔|시팔|ㅅㅂ|ㅆㅂ|병신|ㅂㅅ|개새끼|새끼|ㅅㄲ|지랄|ㅈㄹ|꺼져|닥쳐|fuck|shit|damn|bitch|asshole/i;

function isValidContact(v) {
    const phone = /^01[016789]-?\d{3,4}-?\d{4}$/;
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phone.test(v.replace(/\s/g, '')) || email.test(v.trim());
}

function handleContactInput(val) {
    const lastContainer = output.querySelector('.out-block:last-child .paged-output');

    if (contactMode === 'message') {
        if (BAD_WORDS.test(val)) {
            const warn = document.createElement('div');
            warn.style.whiteSpace = 'pre-wrap';
            warn.style.color = '#e85f5f';
            warn.textContent = '부적절한 표현이 포함되어 있습니다. 다시 입력해주세요.';
            lastContainer.appendChild(warn);
            termBody.scrollTop = termBody.scrollHeight;
            return;
        }
        const echo = document.createElement('div');
        echo.style.whiteSpace = 'pre-wrap';
        echo.textContent = '메세지를 남겨주세요: ' + val;
        lastContainer.appendChild(echo);
        contactMessage = val;
        contactMode = 'contact-info';
        promptEl.textContent = '연락처를 남겨주세요:';
        termBody.scrollTop = termBody.scrollHeight;
    } else if (contactMode === 'contact-info') {
        if (!isValidContact(val)) {
            const warn = document.createElement('div');
            warn.style.whiteSpace = 'pre-wrap';
            warn.style.color = '#e85f5f';
            warn.textContent = '올바른 전화번호 또는 이메일을 입력해주세요.';
            lastContainer.appendChild(warn);
            termBody.scrollTop = termBody.scrollHeight;
            return;
        }
        const echo = document.createElement('div');
        echo.style.whiteSpace = 'pre-wrap';
        echo.textContent = '연락처를 남겨주세요: ' + val;
        lastContainer.appendChild(echo);
        const blank = document.createElement('div');
        blank.innerHTML = '&nbsp;';
        lastContainer.appendChild(blank);
        const sendingMsg = document.createElement('div');
        sendingMsg.style.whiteSpace = 'pre-wrap';
        sendingMsg.textContent = '전송 중...';
        lastContainer.appendChild(sendingMsg);
        termBody.scrollTop = termBody.scrollHeight;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: '8c2e44e8-a92c-4a29-a3e9-16a03c901bae',
                subject: '개인사이트 문의',
                message: contactMessage,
                contact: val
            })
        }).then(res => res.json()).then(data => {
            sendingMsg.textContent = data.success
                ? '감사합니다. 메세지가 전송되었습니다.'
                : '전송에 실패했습니다. 이메일로 직접 연락해주세요.';
        }).catch(() => {
            sendingMsg.textContent = '전송에 실패했습니다. 이메일로 직접 연락해주세요.';
        }).finally(() => {
            contactMode = null;
            contactMessage = '';
            promptEl.textContent = 'visitor@sangbomha:~$';
            termBody.scrollTop = termBody.scrollHeight;
        });
    }
}

// 다음 페이지 진행
function nextPage() {
    if (!waitingForNext || isTyping) return;
    const hint = output.querySelector('.page-hint');
    if (hint) hint.remove();
    waitingForNext = false;

    if (arrayPages.length > 0) {
        showArrayPage();
    } else {
        showPage();
    }
}

// 키보드 입력
cmdInput.addEventListener('keydown', (e) => {
    if (e.isComposing) return;

    // 스페이스로 다음 페이지
    if (e.key === ' ' && waitingForNext) {
        e.preventDefault();
        nextPage();
        return;
    }

    if (e.key === 'Enter') {
        if (waitingForNext) {
            nextPage();
            return;
        }
        const val = cmdInput.value;
        cmdInput.value = '';
        cmdDisplay.textContent = '';
        if (contactMode) {
            handleContactInput(val);
        } else {
            handleCommand(val);
        }
    }
});

// 입력 텍스트 표시 동기화
cmdInput.addEventListener('input', () => {
    cmdDisplay.textContent = cmdInput.value;
});

// 화면 클릭/터치 시
document.addEventListener('click', () => {
    if (waitingForNext) {
        nextPage();
        return;
    }
    cmdInput.focus();
});

document.addEventListener('touchend', () => {
    if (waitingForNext) {
        nextPage();
        return;
    }
    cmdInput.focus();
});

// 초기 인트로
showIntro();
