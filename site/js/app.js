// Application principale pour la revision des systemes d'exploitation

// Donnees des sections (sera peuple par les fichiers de donnees)
const sectionsData = {};
let currentSection = 1;

// Configuration des sections
const sectionsConfig = [
    { id: 1, title: "Introduction et Rappels", description: "Presentation du cours et rappels sur l'architecture" },
    { id: 2, title: "Concepts Generaux", description: "Les concepts fondamentaux des systemes d'exploitation" },
    { id: 3, title: "Demarrage du Systeme", description: "Que se passe-t-il au demarrage ?" },
    { id: 4, title: "Execution par le Processeur", description: "Comment le processeur execute les programmes" },
    { id: 5, title: "Processus", description: "Creation et gestion des processus" },
    { id: 6, title: "Threads", description: "Threads et execution parallele" },
    { id: 7, title: "Ordonnancement", description: "Algorithmes d'ordonnancement" },
    { id: 8, title: "Gestion Memoire - Bases", description: "Concepts de base de la gestion memoire" },
    { id: 9, title: "Memoire Virtuelle", description: "Pagination et memoire virtuelle" },
    { id: 10, title: "Stockage - Bases", description: "Systemes de fichiers et stockage" },
    { id: 11, title: "Systemes de Fichiers", description: "Organisation des systemes de fichiers" },
    { id: 12, title: "Virtualisation", description: "Machines virtuelles et conteneurs" },
    { id: 13, title: "Securite", description: "Securite des systemes d'exploitation" },
    { id: 14, title: "Concepts Avances", description: "Sujets avances et complementaires" },
    { id: 15, title: "Resume et Revision", description: "Points cles a retenir pour l'examen" }
];

// Initialisation de l'application
function initApp() {
    generateNavigation();
    loadSection(1);
    setupEventListeners();
}

// Generation de la navigation laterale
function generateNavigation() {
    const navList = document.getElementById('navList');
    navList.innerHTML = '';

    sectionsConfig.forEach(section => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.id = `nav-section-${section.id}`;

        const a = document.createElement('a');
        a.href = `#section-${section.id}`;
        a.textContent = `${section.id}. ${section.title}`;
        a.onclick = (e) => {
            e.preventDefault();
            loadSection(section.id);
            closeSidebar();
        };

        li.appendChild(a);
        navList.appendChild(li);
    });
}

// Chargement d'une section
function loadSection(sectionId) {
    currentSection = sectionId;

    // Mise a jour de la navigation active
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(`nav-section-${sectionId}`)?.classList.add('active');

    // Mise a jour du header
    const config = sectionsConfig.find(s => s.id === sectionId);
    document.getElementById('sectionTitle').textContent = `Section ${sectionId}: ${config.title}`;
    document.getElementById('sectionDescription').textContent = config.description;

    // Chargement des slides
    const data = sectionsData[sectionId];
    if (data) {
        renderSlides(data);
    } else {
        document.getElementById('slidesContainer').innerHTML = `
            <div class="slide-card">
                <div class="slide-content">
                    <p>Cette section n'est pas encore disponible. Le contenu sera ajoute prochainement.</p>
                </div>
            </div>
        `;
    }

    // Mise a jour des boutons de navigation
    updateNavigationButtons();

    // Scroll vers le haut
    window.scrollTo(0, 0);
}

// Rendu des slides
function renderSlides(slides) {
    const container = document.getElementById('slidesContainer');
    container.innerHTML = '';

    slides.forEach(slide => {
        const slideElement = createSlideElement(slide);
        container.appendChild(slideElement);
    });

    // Ajouter le récapitulatif des questions à la fin
    const allQuestions = [];
    slides.forEach(slide => {
        if (slide.questions && slide.questions.length > 0) {
            slide.questions.forEach(q => {
                allQuestions.push({ ...q, slideId: slide.id, slideTitle: slide.title });
            });
        }
    });

    if (allQuestions.length > 0) {
        const recap = createQuestionsRecap(allQuestions);
        container.appendChild(recap);
    }
}

// Création du récapitulatif des questions
function createQuestionsRecap(questions) {
    const recap = document.createElement('div');
    recap.className = 'questions-recap';
    recap.innerHTML = `
        <div class="recap-header">
            <h2>Toutes les questions de la section</h2>
            <p>${questions.length} questions pour réviser</p>
        </div>
    `;

    const qaContainer = document.createElement('div');
    qaContainer.className = 'recap-questions';

    questions.forEach((item, index) => {
        const qaItem = document.createElement('div');
        qaItem.className = 'qa-item';
        qaItem.innerHTML = `
            <div class="qa-question" onclick="toggleQA(this)">
                <span class="q-number">${index + 1}</span>
                ${item.q}
            </div>
            <div class="qa-answer">
                <div class="qa-answer-content">
                    <span class="q-source">Diapo ${item.slideId}</span>
                    ${item.r}
                </div>
            </div>
        `;
        qaContainer.appendChild(qaItem);
    });

    recap.appendChild(qaContainer);
    return recap;
}

// Creation d'un element slide
function createSlideElement(slide) {
    const card = document.createElement('div');
    card.className = 'slide-card';
    card.id = `slide-${slide.id}`;

    // Header cliquable
    const header = document.createElement('div');
    header.className = 'slide-header';
    header.innerHTML = `
        <span class="slide-number">${slide.id}</span>
        <span class="slide-title">${slide.title}</span>
        <span class="slide-toggle">▼</span>
    `;
    header.onclick = () => card.classList.toggle('open');
    card.appendChild(header);

    // Body (contenu + Q&A)
    const body = document.createElement('div');
    body.className = 'slide-body';

    // Resume
    const content = document.createElement('div');
    content.className = 'slide-content';
    content.innerHTML = `<h3>A retenir</h3>${slide.resume}`;
    body.appendChild(content);

    // Section Q&A
    if (slide.questions && slide.questions.length > 0) {
        const qaSection = document.createElement('div');
        qaSection.className = 'qa-section';
        qaSection.innerHTML = '<div class="qa-title">Questions de controle</div>';

        slide.questions.forEach((item, index) => {
            const qaItem = document.createElement('div');
            qaItem.className = 'qa-item';
            qaItem.innerHTML = `
                <div class="qa-question" onclick="toggleQA(this)">${item.q}</div>
                <div class="qa-answer">
                    <div class="qa-answer-content">${item.r}</div>
                </div>
            `;
            qaSection.appendChild(qaItem);
        });

        body.appendChild(qaSection);
    }

    card.appendChild(body);
    return card;
}

// Toggle Q&A
function toggleQA(element) {
    const parent = element.parentElement;
    parent.classList.toggle('open');
}

// Mise a jour des boutons de navigation
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevSection');
    const nextBtn = document.getElementById('nextSection');

    prevBtn.disabled = currentSection <= 1;
    nextBtn.disabled = currentSection >= sectionsConfig.length;

    prevBtn.onclick = () => loadSection(currentSection - 1);
    nextBtn.onclick = () => loadSection(currentSection + 1);
}

// Event listeners
function setupEventListeners() {
    // Menu toggle mobile
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Fermer sidebar sur click en dehors
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Raccourcis clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentSection > 1) {
            loadSection(currentSection - 1);
        } else if (e.key === 'ArrowRight' && currentSection < sectionsConfig.length) {
            loadSection(currentSection + 1);
        }
    });
}

// Fermer la sidebar (mobile)
function closeSidebar() {
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

// Enregistrement des donnees de section
function registerSectionData(sectionId, data) {
    sectionsData[sectionId] = data;
}
