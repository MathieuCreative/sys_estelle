// Section 1: Introduction et Rappels
// Diapos 1 à 10 du PDF 1 - correspondance exacte

const section1Data = [
    {
        id: 1,
        title: "Page de titre",
        resume: `
            <p><em>Diapo de titre du cours</em></p>
        `,
        questions: [
            {
                q: "Qu'est-ce qu'un système d'exploitation ?",
                r: "Un OS est un logiciel qui gère les ressources matérielles (CPU, mémoire, disques) et fournit une interface simplifiée aux applications. Il fait le lien entre le matériel et les programmes utilisateur."
            }
        ]
    },
    {
        id: 2,
        title: "À propos de ce cours",
        resume: `
            <p><em>Diapo d'organisation du cours (5 séances, partiel, prérequis)</em></p>
        `,
        questions: [
            {
                q: "Qu'est-ce que la programmation système ?",
                r: "C'est l'écriture de programmes qui utilisent directement les services de l'OS via des <strong>appels système</strong> (syscalls) comme fork(), open(), read(). Ce cours explique comment l'OS traite ces appels en interne."
            }
        ]
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
                q: "Pourquoi les concepts des OS sont-ils dits 'génériques' ?",
                r: "Tous les OS modernes utilisent les mêmes concepts : processus, threads, mémoire virtuelle, ordonnancement, systèmes de fichiers. Ce qui change c'est l'implémentation. Donc ce qu'on apprend sur Linux s'applique aux autres OS."
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
        questions: [
            {
                q: "Quels sont les thèmes principaux d'un cours sur les OS ?",
                r: "1) <strong>Processus/Threads</strong> : comment les programmes s'exécutent. 2) <strong>Ordonnancement</strong> : qui utilise le CPU et quand. 3) <strong>Mémoire</strong> : pagination, mémoire virtuelle. 4) <strong>Systèmes de fichiers</strong>. 5) <strong>Synchronisation</strong> : comment éviter les conflits entre processus."
            }
        ]
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
                q: "Quelle est la différence entre cœur physique et cœur logique ?",
                r: "Un <strong>cœur physique</strong> est une vraie unité de calcul matérielle. Un <strong>cœur logique</strong> est une subdivision permise par l'Hyper-threading/SMT : le cœur physique partage ses ressources entre 2 threads. Le gain n'est que de 20-30% (pas x2) car les threads partagent les mêmes unités de calcul."
            },
            {
                q: "Que signifie SMT ?",
                r: "<strong>SMT = Simultaneous Multithreading</strong>. Permet à un cœur d'exécuter plusieurs threads en même temps en partageant ses ressources. Hyper-threading est le nom Intel pour cette technologie."
            },
            {
                q: "Pourquoi la RAM est-elle dite 'volatile' ?",
                r: "La RAM perd son contenu quand on coupe l'alimentation électrique. C'est pourquoi on doit sauvegarder sur disque (non-volatile) pour conserver les données."
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
                q: "Pourquoi un appel système est-il coûteux ?",
                r: "Il faut : 1) Sauvegarder tous les registres du processus. 2) Passer du mode utilisateur au mode noyau (changement de privilège). 3) Exécuter le code du noyau. 4) Restaurer le contexte. Ce va-et-vient prend ~100-1000 ns contre ~1 ns pour une instruction simple."
            },
            {
                q: "Qu'est-ce qu'une instruction atomique ?",
                r: "Une instruction qui s'exécute <strong>entièrement ou pas du tout</strong>, sans pouvoir être interrompue. Utilisée pour la synchronisation (ex: incrémenter un compteur partagé entre threads). Plus lente car doit verrouiller l'accès mémoire pour garantir la cohérence entre cœurs."
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
                q: "Pourquoi existe-t-il une hiérarchie mémoire (cache, RAM, disque) ?",
                r: "Compromis <strong>vitesse vs capacité vs coût</strong>. Les mémoires rapides sont chères et petites (cache), les mémoires grandes sont lentes et pas chères (disque). On utilise plusieurs niveaux pour avoir le meilleur des deux : les données fréquemment utilisées restent en cache."
            },
            {
                q: "Qu'est-ce qu'une interruption ?",
                r: "Signal (matériel ou logiciel) indiquant au CPU qu'un événement nécessite son attention. Quand elle arrive : 1) Le CPU sauvegarde son contexte. 2) Il exécute le <strong>handler</strong> (gestionnaire) de l'interruption. 3) Il restaure le contexte et reprend. Exemples : appui clavier, timer, paquet réseau reçu."
            },
            {
                q: "Pourquoi le HDD est-il beaucoup plus lent que le SSD ?",
                r: "Le HDD a des <strong>pièces mécaniques</strong> : un plateau qui tourne et une tête de lecture qui se déplace. Ce mouvement physique prend ~10ms. Le SSD utilise de la mémoire flash (électronique pure), donc ~100x plus rapide."
            }
        ]
    },
    {
        id: 10,
        title: "Concepts généraux",
        resume: `
            <p><em>Diapo de transition vers la section "Concepts généraux"</em></p>
        `,
        questions: [
            {
                q: "Quels sont les deux rôles principaux d'un OS ?",
                r: "1) <strong>Gestionnaire de ressources</strong> : partager le CPU, la mémoire et les périphériques entre tous les programmes de manière équitable. 2) <strong>Machine virtuelle</strong> : fournir des abstractions simples (fichiers, processus) qui cachent la complexité du matériel."
            },
            {
                q: "Pourquoi séparer mode utilisateur et mode noyau ?",
                r: "<strong>Sécurité</strong> : un programme ne peut pas accéder aux données des autres. <strong>Stabilité</strong> : un programme bugué ne peut pas planter tout le système. Seul le noyau a accès direct au matériel. Les programmes doivent passer par des appels système."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(1, section1Data);
