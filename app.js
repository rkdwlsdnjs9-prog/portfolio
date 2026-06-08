// ==========================================================================
// Project Data Definitions (Simulated Database)
// ==========================================================================
const PROJECTS_DATA = [
  {
    id: 1,
    title: "약속 (YakSok): DUR API 및 AI 기반 안전 복약 관리 플랫폼",
    subtitle: "DUR API 및 AI 기반 안전 복약 관리 소셜 플랫폼",
    period: "2026.03 - 2026.04 (개인 프로젝트 / 기여도 100%)",
    summary: "Vertex AI(Gemini Pro) 및 식약처 DUR API를 연동하여 실시간 의약품 상호작용을 검증하고, 안전한 복약을 관리하는 풀스택 SNS 플랫폼입니다.",
    tags: ["Next.js", "TypeScript", "Firestore", "Cloud Functions", "Vertex AI", "PWA"],
    architecture: ["Next.js (Vercel)", "Cloud Functions v2", "Cloud Firestore", "DUR Open API / Vertex AI"],
    images: ["images/yaksok-1.png", "images/yaksok-2.png", "images/yaksok-3.png", "images/yaksok-4.png", "images/yaksok-5.png"],
    liveUrl: "https://sns-alpha-six.vercel.app",
    githubUrl: "https://github.com/rkdwlsdnjs9-prog/sns",
    role: "• 프론트엔드 및 서버리스 백엔드 인프라 전반 아키텍처 설계 및 구현 (기여도 100%)\n• Vertex AI (Gemini Pro Multimodal) 연동을 통한 처방전 OCR 추출 및 민감정보(L4 등급) 자동 마스킹 시스템 구축\n• 식약처 DUR Open API 연동 및 복합 인덱싱(userId + interactionRisk)을 이용한 실시간 복약 위험 데이터 정렬 최적화\n• Zero-Trust 기반 민감 의료 데이터 24시간 자동 파기 정책(Storage Lifecycle) 및 임시 권한 공유(TTL 토큰) 구현",
    troubleshooting: [
      {
        title: "외부 API(식약처 DUR API) 장애에 대비한 Circuit Breaker 및 로컬 캐싱(Fallback) 구축",
        problem: "외부 API 서버의 정기 점검 또는 일시적 오버로드 발생 시, API 응답 지연(Timeout) 및 503 에러가 본사 서버로 전파되어 유저의 핵심 기능인 약물 등록 프로세스 전체에 무한 로딩이 걸리는 가용성 마비 이슈가 발생함.",
        cause: "사용자의 핵심 비즈니스 로직이 외부 연동 인프라의 가용성에 지나치게 강하게 결합(Tight Coupling)되어 있어 연동 시스템의 결함이 전체 서비스 중단으로 전이되는 아키텍처적 취약점을 확인.",
        solution: "1. Cloud Functions 내부에서 외부 API 호출 루틴을 격리하고, 3회 연속 실패 또는 5초 초과 시 요청을 차단하는 서킷 브레이커(Circuit Breaker) 패턴 설계.\n2. 회로가 열린(Open) 상태에서는 외부 API 대신, 사전에 정기 동기화해 둔 로컬 'DUR 마스터 DB' 캐시 데이터를 조회하는 Fallback 메커니즘 가동.",
        result: "외부 인프라가 다운된 비상 상황 속에서도 약물 상호작용 교차 검증 서비스의 약 90% 이상을 가용 상태로 유지하여 결함 격리 및 높은 시스템 복원력(Resilience)을 달성함."
      },
      {
        title: "Firestore 동시성 데이터 처리에 따른 Race Condition 해결 및 정합성 보장",
        problem: "커뮤니티 트래픽이 집중되는 특정 게시글에서 댓글 작성 및 추천 이벤트가 동시다발적으로 누적될 때, 실제 등록된 댓글 개수보다 데이터베이스의 카운트 필드 수치가 더 낮게 유실되는 정합성 불일치 현상 포착.",
        cause: "클라이언트 단에서 기존 카운트 값을 읽어와(Read) 연산 후(+1) 다시 덮어쓰는(Write) 비원자적 방식을 채택하고 있어, 분산 환경의 다중 쓰기 요청 시 경쟁 상태(Race Condition)가 유발됨.",
        solution: "1. 트랜잭션 충돌 오버헤드를 근본적으로 방지하기 위해 Firestore가 지원하는 원자적 연산 키워드인 'FieldValue.increment(1)' 구조로 실시간 비즈니스 로직 리팩토링.\n2. 임계 트래픽 분산을 고려하여 초당 단일 문서 쓰기 제한을 우회할 수 있는 샤딩 기반 분산 카운터(Distributed Counter) 패턴의 도입 설계 레이아웃 반영.",
        result: "동시 다발적인 사용자 이벤트 입력 환경 속에서도 카운트 데이터 유실률 0%의 완전한 무결성을 보증하였으며, 불필요한 트랜잭션 재시도 비용을 최적화함."
      }
    ]
  },
  {
    id: 2,
    title: "Fastival: 페스티벌 현장 O2O 주문 결제 및 실시간 밀집도 관제 시스템",
    subtitle: "대규모 페스티벌 현장 인파 관리 및 O2O 주문·결제 통합 플랫폼",
    period: "2026.06 - 현재 진행 중 (3인 팀 프로젝트 / 개발 진행 중)",
    summary: "대규모 축제 현장에서의 인파 사고 방지를 위한 SVG 도면 기반 실시간 밀집도 안전 관제 시스템과 대기열 최소화를 위한 O2O 타임슬롯 예약 주문 및 모바일 간편 결제를 통합 지원하는 풀스택 웹 플랫폼입니다.",
    tags: ["Spring Boot 4.0", "Java 21", "PostgreSQL", "Thymeleaf", "JPA", "Spring Security", "JWT"],
    architecture: ["Thymeleaf / SVG", "Spring Boot 4.0.6", "Spring Data JPA (Optimistic Lock)", "Supabase Cloud DB"],
    images: ["images/festival-1.png", "images/festival-2.png", "images/festival-3.png", "images/festival-4.png"],
    liveUrl: null, // 현재 개발 중이므로 라이브 주소는 제외 (버튼이 자동으로 비활성화됩니다)
    githubUrl: "https://github.com/rkdwlsdnjs9-prog/Fastival-management",
    role: "• 3인 팀 프로젝트 백엔드 핵심 도메인 아키텍처 설계 및 인프라 구축\n• 행사장 평면 도면 위 SVG 좌표 매핑을 통한 구역별(Zone) 실시간 체류 인원 모니터링 및 안전 수용인원 임계치 초과 시 단계별(NORMAL, CAUTION, DANGER) 관리자 경보 시스템 개발\n• 결제 과정 중 동시성 트래픽 집중에 대응한 가선점 재고(Reserved)와 가용 재고(Available)의 이원화 비즈니스 로직 설계\n• 입점 스토어별 수수료 공제 및 기간별 총매출 정산 자동화 시스템 구축 및 시각화 대시보드 연동\n• 다수 사용자의 티켓 동시 예매 시 오버부킹 차단을 위한 JPA 낙관적 락(Optimistic Lock) 구현 및 스태프 검수용 1회용 QR 코드 로깅 시스템 개발",
    troubleshooting: [
      {
        title: "외부 Supabase PostgreSQL 연동 장애 및 Connection Pooler 타임아웃 해결",
        problem: "Spring Boot 인프라와 Supabase 클라우드 데이터베이스 연동 과정에서, HikariCP 커넥션 풀 에러 및 타임아웃 예외가 빈번히 발생하여 로컬 개발 및 데이터 영속화 기능이 중단되는 현상 발생.",
        cause: "Supabase DB의 기본 호스트 주소가 IPv6 전용 환경이거나 트랜잭션 단위의 Connection Pooler 세션 설정이 맞물려, Spring Boot의 다중 스레드 쿼리 처리 시 prepareThreshold 및 캐시된 Statement 충돌이 발생하는 것이 원인이었음.",
        solution: "1. application.properties의 JDBC URL을 Supabase의 IPv4 호환 Connection Pooler 전용 포트(6543) 주소로 변경하여 재매핑.\n2. 연결 파라미터 옵션에 'prepareThreshold=0' 설정을 추가하여 SQL 구문 캐싱 오류를 엔진 레벨에서 근본적으로 방지함.",
        result: "서버 기동 및 대시보드 대용량 데이터 조회 쿼리 처리 속도가 안정화되었으며, HikariCP 커넥션 획득 실패율을 0%로 개선하여 영속성 계층 연동의 완벽한 안정성을 확보함."
      },
      {
        title: "비동기 API 통신 시 Spring Security JWT 401 Unauthorized 오류 디버깅 및 해결",
        problem: "정적 HTML 대시보드 화면에서 스토어 목록 조회 및 실시간 재고 상태 변경 API를 비동기 fetch 함수로 호출할 때, 요청이 지속적으로 거부되며 401 Unauthorized 에러가 반환되어 데이터 렌더링이 불가능한 현상 포착.",
        cause: "Spring Security 필터 체인에서 모든 API 경로에 대해 JWT 인증을 요구하고 있었으나, Vanilla JS 기반 프론트엔드 비동기 요청 시 로컬스토리지에 안전하게 저장되어 있던 JWT 발급 토큰을 Authorization 헤더에 적재하지 않아 인증 필터를 통과하지 못한 것이 원인이었음.",
        solution: "1. 프론트엔드 자바스크립트 내부에 공통 통신 헤더 인터셉터 로직을 도입하여 로컬스토리지 내 Bearer 토큰을 자동 바인딩하는 fetch 래퍼(Wrapper) 함수 적용.\n2. 백엔드 Spring Security Config 및 CORS 설정을 리팩토링하여 엔드포인트 별 명확한 접근 권한 세그먼트를 분리함.",
        result: "비동기 API 호출 시 권한 예외 없이 안전하고 실시간성 높게 대형 스토어 데이터를 송수신하게 되었으며, 백엔드-프론트엔드 간의 보안 통신 무결성을 강화함."
      },
      {
        title: "동시성 트래픽 집중에 따른 한정 상품/좌석 중복 선점 방지 (JPA 낙관적 락)",
        problem: "축제 당일 인기 푸드트럭 메뉴 주문 및 한정판 티켓 좌석 예매 시, 순간적으로 다수의 사용자가 동일 자원에 대한 결제를 시도할 때 제한된 수량을 초과해 판매되는 '오버부킹(Over-selling)' 현상 및 정합성 붕일치 위험 직면.",
        cause: "단순히 가용 수량을 SELECT 한 후 검증하여 UPDATE 하는 비동기적 트랜잭션 흐름 하에서, 다중 스레드가 격리 레벨을 무너뜨리고 진입하는 경쟁 상태(Race Condition)가 유발되어 다른 트랜잭션의 변경 사항을 덮어써 버리는 유실 현상이 발생함.",
        solution: "1. seat_map 및 product 엔티티 테이블 엔티티 내부에 @Version 필드를 선언하여 비관적 락 대비 비용이 낮은 JPA 낙관적 락(Optimistic Lock) 메커니즘을 구성함.\n2. 데이터 동시 수정 충돌 시 발생하는 ObjectOptimisticLockingFailureException 예외를 비즈니스 서비스 레이어에서 감지하여 트랜잭션을 안전하게 롤백하고, 커스텀 예외 메시지를 클라이언트에 반환하도록 설계함.",
        result: "대규모 다중 스레드 동시 구매 테스트 환경 속에서도 수량 및 좌석 초과 판매율 0%의 완전무결한 동시성 제어를 달성하여 시스템 비즈니스 신뢰성을 극대화함."
      }
    ]
  },
  {
    id: 3,
    title: "LC-MS 기반 AI 신약 물질 분석 및 가상 스크리닝 시스템",
    subtitle: "LC-MS 분석 데이터 정제부터 3D 분자 도킹 시뮬레이션까지 제공하는 연구용 플랫폼",
    period: "2026.05 - 2026.06 (개인 프로젝트 / 기여도 100%)",
    summary: "제약공학 도메인 지식과 AI 기술을 융합하여 LC-MS 실험 데이터를 정제하고, RAG 기반 AI 에이전트를 통해 약리기전을 분석하며, RDKit 및 py3Dmol을 활용한 3D 분자 도킹 시뮬레이션을 원스톱으로 제공하는 연구용 대시보드 플랫폼입니다.",
    tags: ["Streamlit", "Python", "RDKit", "ChromaDB", "AnythingLLM", "py3Dmol", "Docker"],
    architecture: ["LC-MS CSV", "Data Preprocessing", "RAG & Agent (ChromaDB)", "Cheminformatics (RDKit)", "3D Docking Visualizer (py3Dmol)"],
    images: ["images/lcms-1.png", "images/lcms-2.png", "images/lcms-3.png", "images/lcms-4.png", "images/lcms-5.png"],
    liveUrl: null,
    githubUrl: "https://github.com/rkdwlsdnjs9-prog/newdrug",
    role: "• 제약공학 전공 도메인 지식을 바탕으로 질량분석기(LC-MS) 데이터의 노이즈 필터링 기준 및 Adduct 역산 알고리즘(deduce_adducts) 자체 설계 및 구현\n• Vector DB(ChromaDB)와 NCBI PubChem/PubMed API를 결합한 하이브리드 RAG 및 API Fallback 파이프라인 개발로 내부 지식 검색 환각(Hallucination) 차단\n• 단백질 결정 구조 좌표계와 화합물 좌표계를 기하학적으로 일치시켜 웹 3D 뷰어(py3Dmol) 상의 활성 부위 중앙에 리간드를 안착시키는 좌표 변환 알고리즘 구현 및 동기화",
    troubleshooting: [
      {
        title: "3D 시각화 시 표적 단백질과 리간드 간 좌표 불일치로 인한 렌더링 오류 해결",
        problem: "PubChem에서 다운로드한 화합물(SDF) 파일과 RCSB에서 다운로드한 표적 단백질(PDB) 파일을 py3Dmol을 통해 하나의 공간에 렌더링했을 때, 각 파일의 원점 기준 좌표가 너무 멀어 뷰어 상에 분자 구조가 보이지 않거나 두 객체가 서로 수백 Å(Angstrom) 떨어져 렌더링되어 결합 시뮬레이션이 불가능한 현상이 발생함.",
        cause: "단백질 결정 구조의 절대 좌표계와 독립적으로 생성된 화합물 로컬 좌표계가 동기화되지 않아 발생한 문제였습니다.",
        solution: "1. PDB 파일 내 모든 아톰(ATOM, HETATM)의 3D 좌표 평균값을 계산하여 단백질 전체의 기하학적 중심 좌표(Px, Py, Pz)를 구함.\n2. 리간드 SDF 파일 원자들의 중심 좌표(Sx, Sy, Sz)를 계산한 후, 두 중심 간의 차이 벡터(Translation Vector) d = P - S를 유도.\n3. SDF 파일 내의 모든 원자 좌표에 이동 벡터 d를 더해주는 좌표 변환 알고리즘을 구현하여, 뷰어 로드 시 자동으로 단백질의 활성 부위 중앙에 리간드가 배치되도록 좌표를 강제 매핑하여 문제를 해결함.",
        result: "단백질과 리간드가 가상 공간 내에서 정상적으로 매핑되어 두 분자 간의 상호작용 및 결합 구조를 정확한 물리적 거리 내에서 3D 시뮬레이션할 수 있게 됨."
      },
      {
        title: "일반 거대언어모델(LLM)의 화학 구조(SMILES) Valence 규칙 위반 환각 문제 방어",
        problem: "미지 물질 발굴 모드에서 일반 텍스트 기반 LLM에게 미지 분자의 SMILES 구조식을 제안받아 RDKit으로 3D Conformer를 생성하려 할 때, LLM이 탄소의 5가 결합이나 질소의 원자가 결합 규칙을 무시한 가짜 구조식을 생성하여 RDKit 엔진이 에러를 뿜으며 중단되는 현상이 잦았음.",
        cause: "텍스트 생성 기반의 LLM은 통계적 패턴으로 글자를 나열하므로, 엄격한 물리화학적 결합 법칙(Valence Rule)을 완벽히 검증하여 문자열을 쓰기 어렵다는 한계가 있었음.",
        solution: "1. 화학 분야에 특화되거나 구조 분자 DB API를 래핑한 하위 화학 에이전트(ChemLLM/ChEMBL API)를 파이프라인 전면에 배치.\n2. 이 하위 에이전트가 실험 질량에 근접하며 물리적으로 유효성이 검증된 분자 골격 구조식(Scaffold SMILES)을 1차적으로 먼저 설계하도록 제한.\n3. 검증된 구조식 뼈대를 기반으로 일반 LLM(AnythingLLM)에게 약리 작용 추론 및 분석 리포트 작성을 하도록 역할을 이원화함.",
        result: "3D 분자 최적화 에러율을 0%로 낮춤과 동시에 화학적 정합성이 보장된 리간드 데이터를 바탕으로 신뢰성 높은 약리 기전 보고서를 추출하고자 하였지만 아직 많은 개선이 필요함."
      }
    ]
  }
];

// ==========================================================================
// Main Application Class
// ==========================================================================
class App {
  constructor() {
    this.initElements();
    this.initLightbox();
    this.initTheme();
    this.initEvents();
    this.renderProjects();
    this.initScrollReveal();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  initTheme() {
    this.themeToggleBtn = document.getElementById('theme-toggle');
    this.sunIcon = document.getElementById('theme-toggle-sun');
    this.moonIcon = document.getElementById('theme-toggle-moon');

    if (!this.themeToggleBtn) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      document.body.classList.add('light-mode');
      if (this.sunIcon) this.sunIcon.style.display = 'none';
      if (this.moonIcon) this.moonIcon.style.display = 'block';
    } else {
      document.body.classList.remove('light-mode');
      if (this.sunIcon) this.sunIcon.style.display = 'block';
      if (this.moonIcon) this.moonIcon.style.display = 'none';
    }

    this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const isLightMode = document.body.classList.toggle('light-mode');

    if (isLightMode) {
      localStorage.setItem('theme', 'light');
      if (this.sunIcon) this.sunIcon.style.display = 'none';
      if (this.moonIcon) this.moonIcon.style.display = 'block';
    } else {
      localStorage.setItem('theme', 'dark');
      if (this.sunIcon) this.sunIcon.style.display = 'block';
      if (this.moonIcon) this.moonIcon.style.display = 'none';
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  initElements() {
    this.header = document.querySelector('.header');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.projectsGrid = document.getElementById('projects-grid');
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalCloseBtn = document.getElementById('modal-close-btn');

    this.btnCopy = document.getElementById('btn-copy');
    this.emailText = document.getElementById('email-text');
    this.toast = document.getElementById('toast');
  }

  initEvents() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      this.updateActiveNavLink();
    });

    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('active');
      this.navMenu.classList.toggle('active');

      const lines = this.hamburger.querySelectorAll('span');
      if (this.hamburger.classList.contains('active')) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    });

    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        const lines = this.hamburger.querySelectorAll('span');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      });
    });

    this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) this.closeModal();
    });

    this.btnCopy.addEventListener('click', () => this.copyEmail());

    // 프로젝트 카드 내 슬라이더 제어 및 클릭 확대 이벤트
    if (this.projectsGrid) {
      this.projectsGrid.addEventListener('click', (e) => {
        // 이전 버튼 클릭
        if (e.target.classList.contains('slider-btn-prev')) {
          e.stopPropagation();
          const projectId = parseInt(e.target.getAttribute('data-project-id'));
          this.navigateCardSlider(projectId, -1);
        }
        // 다음 버튼 클릭
        else if (e.target.classList.contains('slider-btn-next')) {
          e.stopPropagation();
          const projectId = parseInt(e.target.getAttribute('data-project-id'));
          this.navigateCardSlider(projectId, 1);
        }
        // 이미지 클릭 (확대)
        else if (e.target.classList.contains('project-slider-img')) {
          const projectId = parseInt(e.target.getAttribute('data-project-id'));
          const currentIndex = parseInt(e.target.getAttribute('data-current-index') || '0');
          this.openLightbox(projectId, currentIndex);
        }
      });
    }
  }

  initLightbox() {
    const lightboxHtml = `
      <div id="image-lightbox" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(10, 15, 30, 0.95); z-index:10000; justify-content:center; align-items:center; opacity:0; transition:opacity 0.3s ease; backdrop-filter:blur(10px);">
        <span id="lightbox-close" style="position:absolute; top:20px; right:30px; font-size:40px; color:#fff; cursor:pointer; transition:color 0.2s;">&times;</span>
        <button id="lightbox-prev" style="position:absolute; left:30px; background:rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; width:60px; height:60px; font-size:24px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; z-index:10010;">&lt;</button>
        <div style="max-width:80%; max-height:80%; display:flex; align-items:center; justify-content:center;">
          <img id="lightbox-img" src="" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:12px; border: 1px solid var(--glass-border); box-shadow:0 10px 30px rgba(0,0,0,0.5);">
        </div>
        <button id="lightbox-next" style="position:absolute; right:30px; background:rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; width:60px; height:60px; font-size:24px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; z-index:10010;">&gt;</button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHtml);

    this.lightbox = document.getElementById('image-lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxClose = document.getElementById('lightbox-close');
    this.lightboxPrev = document.getElementById('lightbox-prev');
    this.lightboxNext = document.getElementById('lightbox-next');

    this.lightboxProjectId = null;
    this.lightboxImageIndex = 0;

    this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
    this.lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navigateLightbox(-1);
    });
    this.lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navigateLightbox(1);
    });

    window.addEventListener('keydown', (e) => {
      if (this.lightbox.style.display === 'flex') {
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
        if (e.key === 'ArrowRight') this.navigateLightbox(1);
      }
    });
  }

  openLightbox(projectId, imageIndex) {
    this.lightboxProjectId = projectId;
    this.lightboxImageIndex = imageIndex;
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project || !project.images || project.images.length === 0) return;

    this.lightboxImg.src = project.images[imageIndex];
    this.lightbox.style.display = 'flex';
    setTimeout(() => {
      this.lightbox.style.opacity = '1';
    }, 10);
  }

  closeLightbox() {
    this.lightbox.style.opacity = '0';
    setTimeout(() => {
      this.lightbox.style.display = 'none';
    }, 300);
  }

  navigateLightbox(direction) {
    const project = PROJECTS_DATA.find(p => p.id === this.lightboxProjectId);
    if (!project || !project.images || project.images.length === 0) return;

    this.lightboxImageIndex = (this.lightboxImageIndex + direction + project.images.length) % project.images.length;
    this.lightboxImg.src = project.images[this.lightboxImageIndex];
  }

  navigateCardSlider(projectId, direction) {
    const imgElement = document.getElementById(`project-img-${projectId}`);
    if (!imgElement) return;

    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project || !project.images || project.images.length === 0) return;

    let currentIndex = parseInt(imgElement.getAttribute('data-current-index') || '0');
    currentIndex = (currentIndex + direction + project.images.length) % project.images.length;

    imgElement.src = project.images[currentIndex];
    imgElement.setAttribute('data-current-index', currentIndex);
  }

  renderProjects() {
    if (!this.projectsGrid) return;

    this.projectsGrid.innerHTML = PROJECTS_DATA.map(project => {
      const techBadges = project.tags.map(tag => `<span class="badge">${tag}</span>`).join('');

      const hasMultipleImages = project.images && project.images.length > 1;
      const initialImage = project.images && project.images.length > 0 ? project.images[0] : '';

      const prevBtnMarkup = hasMultipleImages
        ? `<button class="slider-btn-prev" data-project-id="${project.id}" style="position:absolute; left:10px; z-index:10; background:rgba(15, 23, 42, 0.7); border:1px solid rgba(255,255,255,0.1); color:#fff; width:32px; height:32px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; font-weight:bold;">&lt;</button>`
        : '';

      const nextBtnMarkup = hasMultipleImages
        ? `<button class="slider-btn-next" data-project-id="${project.id}" style="position:absolute; right:10px; z-index:10; background:rgba(15, 23, 42, 0.7); border:1px solid rgba(255,255,255,0.1); color:#fff; width:32px; height:32px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; font-weight:bold;">&gt;</button>`
        : '';

      const mediaMarkup = initialImage
        ? `
          ${prevBtnMarkup}
          <img class="project-slider-img" id="project-img-${project.id}" src="${initialImage}" alt="${project.title}" style="width:100%; height:100%; object-fit:contain; display:block; cursor:pointer; transition:transform 0.3s ease;" data-project-id="${project.id}" data-current-index="0" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
          ${nextBtnMarkup}
        `
        : `<div class="project-img-placeholder">${project.title.split(':')[0].substring(0, 2)}</div>`;

      return `
        <article class="glass-card project-card reveal">
          <div class="project-img-wrapper" style="position:relative; overflow:hidden; height:200px; display:flex; align-items:center; justify-content:center; background:rgba(15, 23, 42, 0.6); padding:10px;">
            ${mediaMarkup}
          </div>
          <div class="project-info">
            <span class="project-date">${project.period.split(' ')[0]}</span>
            <h3 class="project-card-title">${project.title.split(':')[0]}</h3>
            <p class="project-card-desc">${project.summary}</p>
            <div class="project-techs">
              ${techBadges}
            </div>
            <button class="project-btn-detail" data-id="${project.id}">
              자세히 보기
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }

    document.querySelectorAll('.project-btn-detail').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        this.openModal(id);
      });
    });
  }

  openModal(id) {
    const project = PROJECTS_DATA.find(p => p.id === id);
    if (!project) return;

    const modalContent = document.getElementById('modal-content');

    const archFlowHTML = project.architecture.map((node, index) => {
      const isLast = index === project.architecture.length - 1;
      return `
        <span class="arch-node ${index === 1 || index === 2 ? 'highlight' : ''}">${node}</span>
        ${!isLast ? '<span class="arch-arrow">→</span>' : ''}
      `;
    }).join('');

    const techBadges = project.tags.map(tag => `<span class="badge badge-accent">${tag}</span>`).join('');

    const linkButtonsHTML = (project.liveUrl || project.githubUrl) ? `
      <div class="modal-links" style="display:flex; gap:10px; margin-top:15px; margin-bottom:5px;">
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="badge badge-accent" style="padding:6px 12px; text-decoration:none; display:inline-flex; align-items:center; gap:5px; background:var(--accent-cyan); color:#000;"><i data-lucide="external-link" style="width:14px; height:14px;"></i> Live 데모 방문</a>` : ''}
        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="badge" style="padding:6px 12px; text-decoration:none; display:inline-flex; align-items:center; gap:5px; border-color:rgba(255,255,255,0.2);"><i data-lucide="github" style="width:14px; height:14px;"></i> GitHub</a>` : ''}
      </div>
    ` : '';

    const troubleshootingCardsHTML = project.troubleshooting.map((item, idx) => `
      <div class="trouble-card" style="margin-bottom: 20px;">
        <div class="trouble-title">
          <span class="badge" style="background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2); color: #ef4444; font-size: 0.75rem;">ISSUE 0${idx + 1}</span>
          ${item.title || "엔지니어링 트러블슈팅"}
        </div>
        
        <div class="trouble-steps">
          <div class="trouble-step-item">
            <div class="trouble-step-label">1. 문제 상황 (Problem)</div>
            <div class="trouble-step-content">${item.problem}</div>
          </div>
          <div class="trouble-step-item">
            <div class="trouble-step-label">2. 원인 분석 (Root Cause)</div>
            <div class="trouble-step-content">${item.cause}</div>
          </div>
          <div class="trouble-step-item resolved">
            <div class="trouble-step-label resolved-label">3. 해결 방안 (Solution)</div>
            <div class="trouble-step-content" style="white-space: pre-line;">${item.solution}</div>
          </div>
          <div class="trouble-step-item resolved">
            <div class="trouble-step-label resolved-label">4. 결과 및 성과 (Result)</div>
            <div class="trouble-step-content" style="color: #10b981; font-weight: 600; white-space: pre-line;">${item.result}</div>
          </div>
        </div>
      </div>
    `).join('');

    modalContent.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">${project.title.split(':')[0]}</h2>
        <div class="modal-meta">
          <div class="modal-meta-item">
            <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
            <span>${project.period}</span>
          </div>
        </div>
        ${linkButtonsHTML}
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <i data-lucide="layers" style="color: var(--accent-cyan);"></i>
          프로젝트 아키텍처 요약
        </h3>
        <div class="architecture-box">
          <p class="text-secondary">${project.summary}</p>
          <div class="architecture-flow">
            ${archFlowHTML}
          </div>
        </div>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <i data-lucide="user" style="color: var(--accent-purple);"></i>
          내가 맡은 역할 및 핵심 기여도
        </h3>
        <p class="text-secondary" style="white-space: pre-line; line-height: 1.8;">${project.role}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title" style="color: #ef4444;">
          <i data-lucide="alert-triangle" style="color: #ef4444;"></i>
          핵심 트러블슈팅 (Troubleshooting) 경험
        </h3>
        
        ${troubleshootingCardsHTML}
      </div>

      <div class="modal-section" style="margin-bottom: 0;">
        <h3 class="modal-section-title">
          <i data-lucide="code-2" style="color: var(--accent-cyan);"></i>
          사용 기술 스택
        </h3>
        <div class="project-techs">
          ${techBadges}
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    this.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  copyEmail() {
    const email = this.emailText.innerText;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email)
        .then(() => {
          this.showToast();
        })
        .catch(err => {
          console.error("이메일 복사 실패, 폴백 사용:", err);
          this.fallbackCopyText(email);
        });
    } else {
      this.fallbackCopyText(email);
    }
  }

  fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast();
    } catch (err) {
      console.error('Fallback 복사 최종 실패:', err);
    }
    document.body.removeChild(textArea);
  }

  showToast() {
    this.toast.classList.add('show');
    setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2500);
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});