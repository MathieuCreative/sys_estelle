// Section 1: Introduction et Rappels
// Diapos 1 à 10 du PDF 1 - correspondance exacte

const section1Data = [
    {
        id: 1,
        title: "Page de titre",
        resume: `
            <p><em>Diapo de titre du cours</em></p>
        `,
        questions: []
    },
    {
        id: 2,
        title: "À propos de ce cours",
        resume: `
            <p><em>Diapo d'organisation du cours (5 séances, partiel, prérequis)</em></p>
        `,
        questions: []
    },
    {
        id: 3,
        title: "Positionnement de ce cours",
        resume: `
            <p>Ce cours se situe <strong>entre</strong> la programmation système (au-dessus) et l'architecture processeur (en-dessous).</p>
            <p>Point clé : les concepts (processus, mémoire virtuelle, ordonnancement) sont <strong>universels</strong> à tous les OS. Seule l'implémentation change entre Linux, Windows, macOS.</p>
        `,
        questions: [
            {
                q: "Où se situe ce cours dans la hiérarchie informatique ?",
                r: "Ce cours se situe <strong>entre</strong> la programmation système (au-dessus) et l'architecture processeur (en-dessous)."
            },
            {
                q: "Quels sont les concepts universels mentionnés dans cette diapo ?",
                r: "Les processus, la mémoire virtuelle et l'ordonnancement sont des concepts <strong>universels</strong> à tous les OS."
            },
            {
                q: "Qu'est-ce qui change entre Linux, Windows et macOS selon cette diapo ?",
                r: "Seule l'<strong>implémentation</strong> change. Les concepts restent les mêmes."
            }
        ]
    },
    {
        id: 4,
        title: "Ressources et crédits",
        resume: `
            <p><em>Diapo de références bibliographiques</em></p>
            <p>Livre de référence : <strong>"Systèmes d'exploitation" de Tanenbaum</strong> (la bible du domaine).</p>
        `,
        questions: []
    },
    {
        id: 5,
        title: "Sommaire",
        resume: `
            <p><em>Diapo listant les chapitres du cours</em></p>
        `,
        questions: []
    },
    {
        id: 6,
        title: "Avant de commencer...",
        resume: `
            <p><em>Diapo de transition vers les rappels matériels</em></p>
        `,
        questions: []
    },
    {
        id: 7,
        title: "Rappels sur l'architecture d'un ordinateur",
        resume: `
            <p><strong>CPU (processeur)</strong> : contient plusieurs <strong>cœurs</strong>. Chaque cœur peut exécuter un programme indépendamment des autres.</p>
            <p><strong>Cœur physique vs logique</strong> : un cœur physique est une vraie unité de calcul. L'Hyper-threading (Intel) ou SMT (AMD) fait apparaître 1 cœur physique comme 2 cœurs logiques pour mieux utiliser les ressources (gain ~20-30%, pas x2).</p>
            <p><strong>RAM</strong> : mémoire rapide mais volatile (perdue à l'extinction) et limitée en taille.</p>
            <p><strong>Périphériques</strong> : tout ce qui n'est pas CPU/RAM (disques, réseau, écran...).</p>
        `,
        questions: [
            {
                q: "Que contient un CPU selon cette diapo ?",
                r: "Le CPU contient plusieurs <strong>cœurs</strong>. Chaque cœur peut exécuter un programme indépendamment des autres."
            },
            {
                q: "Quelle est la différence entre cœur physique et cœur logique selon cette diapo ?",
                r: "Un cœur physique est une vraie unité de calcul. L'Hyper-threading (Intel) ou SMT (AMD) fait apparaître 1 cœur physique comme <strong>2 cœurs logiques</strong> pour mieux utiliser les ressources."
            },
            {
                q: "Quel est le gain de performance de l'Hyper-threading mentionné dans cette diapo ?",
                r: "Le gain est d'environ <strong>20-30%</strong>, pas x2, car les threads partagent les mêmes unités de calcul."
            },
            {
                q: "Quelles sont les caractéristiques de la RAM mentionnées dans cette diapo ?",
                r: "La RAM est <strong>rapide</strong> mais <strong>volatile</strong> (perdue à l'extinction) et <strong>limitée en taille</strong>."
            },
            {
                q: "Comment cette diapo définit-elle les périphériques ?",
                r: "Les périphériques sont tout ce qui n'est pas CPU/RAM : disques, réseau, écran, etc."
            }
        ]
    },
    {
        id: 8,
        title: "Ordres de grandeur - Exécution",
        resume: `
            <p><strong>L'essentiel à retenir</strong> : un appel système est ~100 à 1000 fois plus lent qu'une instruction normale.</p>
            <p><strong>Pourquoi ?</strong> L'appel système nécessite un <strong>changement de contexte</strong> : sauvegarder l'état du programme, passer en mode noyau, exécuter le code noyau, restaurer l'état. Tout ça prend du temps.</p>
            <p><strong>Instruction atomique</strong> : opération qui ne peut pas être interrompue (utilisée pour la synchronisation). Plus lente car doit coordonner tous les cœurs.</p>
        `,
        questions: [
            {
                q: "Combien de fois plus lent est un appel système par rapport à une instruction normale selon cette diapo ?",
                r: "Un appel système est environ <strong>100 à 1000 fois plus lent</strong> qu'une instruction normale."
            },
            {
                q: "Pourquoi un appel système nécessite-t-il un changement de contexte ?",
                r: "Il faut : sauvegarder l'état du programme, <strong>passer en mode noyau</strong>, exécuter le code noyau, puis restaurer l'état. Tout ce processus prend du temps."
            },
            {
                q: "Qu'est-ce qu'une instruction atomique selon cette diapo ?",
                r: "Une opération qui <strong>ne peut pas être interrompue</strong>, utilisée pour la synchronisation. Plus lente car doit coordonner tous les cœurs."
            }
        ]
    },
    {
        id: 9,
        title: "Ordres de grandeur - Mémoire et I/O",
        resume: `
            <p><strong>Hiérarchie de vitesse</strong> (du plus rapide au plus lent) :</p>
            <ul>
                <li><strong>Registres/Cache</strong> → <strong>RAM</strong> → <strong>SSD</strong> → <strong>HDD</strong></li>
                <li>Chaque niveau est environ <strong>100x plus lent</strong> que le précédent</li>
            </ul>
            <p><strong>Pourquoi c'est important ?</strong> Ces écarts énormes expliquent les choix de conception des OS :</p>
            <ul>
                <li>Le <strong>cache</strong> existe car la RAM est trop lente pour le CPU</li>
                <li>La <strong>mémoire virtuelle</strong> existe car la RAM est limitée → on utilise le disque en complément</li>
                <li>Le <strong>buffering I/O</strong> existe car le disque est très lent → on regroupe les accès</li>
            </ul>
            <p><strong>Interruption</strong> : signal qui prévient le CPU qu'un événement s'est produit (touche clavier, paquet réseau...). Le CPU arrête ce qu'il fait, traite l'événement, puis reprend.</p>
        `,
        questions: [
            {
                q: "Quelle est la hiérarchie de vitesse mémoire selon cette diapo (du plus rapide au plus lent) ?",
                r: "<strong>Registres/Cache</strong> → <strong>RAM</strong> → <strong>SSD</strong> → <strong>HDD</strong>"
            },
            {
                q: "Quel est le facteur de ralentissement entre chaque niveau de la hiérarchie mémoire ?",
                r: "Chaque niveau est environ <strong>100x plus lent</strong> que le précédent."
            },
            {
                q: "Pourquoi le cache existe-t-il selon cette diapo ?",
                r: "Le cache existe car la <strong>RAM est trop lente pour le CPU</strong>."
            },
            {
                q: "Pourquoi la mémoire virtuelle existe-t-elle selon cette diapo ?",
                r: "La mémoire virtuelle existe car la RAM est <strong>limitée</strong>. On utilise le disque en complément."
            },
            {
                q: "Pourquoi utilise-t-on le buffering I/O selon cette diapo ?",
                r: "Le buffering I/O existe car le <strong>disque est très lent</strong>. On regroupe les accès pour minimiser le nombre d'opérations."
            },
            {
                q: "Comment cette diapo définit-elle une interruption ?",
                r: "Un <strong>signal</strong> qui prévient le CPU qu'un événement s'est produit (touche clavier, paquet réseau...). Le CPU arrête ce qu'il fait, traite l'événement, puis reprend."
            }
        ]
    },
    {
        id: 10,
        title: "Concepts généraux",
        resume: `
            <p><em>Diapo de transition vers la section "Concepts généraux"</em></p>
        `,
        questions: []
    }
];

// Enregistrement des données
registerSectionData(1, section1Data);
