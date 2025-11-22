// Section 2: Concepts Généraux
// Diapos 11 à 20 du PDF 2 - correspondance exacte

const section2Data = [
    {
        id: 11,
        title: "Qu'est-ce qu'un système d'exploitation ?",
        resume: `
            <p><strong>Définition</strong> : un OS est un logiciel qui se situe <strong>entre le matériel et les applications</strong>.</p>
            <p><strong>Ses rôles principaux</strong> :</p>
            <ul>
                <li><strong>Abstraction</strong> : cache les détails du matériel aux applications (plus besoin de connaître le modèle exact de disque dur)</li>
                <li><strong>Multi-tâches</strong> : gère l'exécution de plusieurs programmes simultanément</li>
                <li><strong>Multi-utilisateurs</strong> : permet à plusieurs utilisateurs de partager la machine</li>
            </ul>
            <p class="key-point">Attention : certains systèmes embarqués n'ont pas d'OS (le programme tourne directement sur le matériel).</p>
        `,
        questions: [
            {
                q: "Quelles sont les deux grandes fonctions d'un OS ?",
                r: "1) <strong>Abstraction du matériel</strong> : fournir une interface simple aux applications, cacher la complexité. 2) <strong>Gestion des ressources</strong> : partager CPU, mémoire et périphériques entre les programmes de manière équitable et sécurisée."
            },
            {
                q: "Pourquoi un OS n'est-il pas toujours nécessaire ?",
                r: "Pour les <strong>systèmes embarqués simples</strong> (microcontrôleurs), un seul programme tourne en boucle. Pas besoin de multi-tâches ni d'abstraction complexe. Le programme accède directement au matériel."
            }
        ]
    },
    {
        id: 12,
        title: "Pourquoi étudier les systèmes d'exploitation ?",
        resume: `
            <p>Les OS sont parmi les <strong>logiciels les plus complexes</strong> qui existent :</p>
            <ul>
                <li><strong>Très proche du matériel</strong> : nécessite de comprendre l'architecture</li>
                <li><strong>Performances critiques</strong> : chaque microseconde compte</li>
                <li><strong>Compromis permanents</strong> : vitesse vs sécurité, simplicité vs fonctionnalités</li>
            </ul>
            <p class="key-point">Les mêmes problématiques se retrouvent ailleurs : navigateurs web, JVM, bases de données...</p>
        `,
        questions: [
            {
                q: "Pourquoi dit-on que les OS sont parmi les logiciels les plus complexes ?",
                r: "Ils cumulent : <strong>proximité matérielle</strong> (gestion bas-niveau), <strong>génie logiciel</strong> (millions de lignes de code), <strong>performances critiques</strong>, et des <strong>compromis difficiles</strong> (sécurité vs vitesse, simplicité vs puissance). Tout bug peut crasher le système entier."
            }
        ]
    },
    {
        id: 13,
        title: "Ceci n'est PAS le système d'exploitation",
        resume: `
            <p><strong>Ce qui n'est PAS l'OS</strong> (confusion fréquente) :</p>
            <ul>
                <li><strong>Compilateurs</strong> (gcc, clang) : outils de développement</li>
                <li><strong>Environnements de bureau</strong> (GNOME, KDE) : interface graphique</li>
                <li><strong>Shell</strong> (Bash, Zsh) : interpréteur de commandes</li>
                <li><strong>Outils CLI</strong> (ls, cp, grep) : programmes utilisateur</li>
                <li><strong>root</strong> : c'est un utilisateur, pas le noyau !</li>
            </ul>
            <p class="key-point">Tous ces éléments sont des programmes qui tournent AU-DESSUS de l'OS.</p>
        `,
        questions: [
            {
                q: "Pourquoi l'environnement de bureau (GNOME, KDE) n'est-il pas l'OS ?",
                r: "L'environnement de bureau est un <strong>programme utilisateur</strong> qui tourne au-dessus du noyau. Il utilise les services de l'OS pour dessiner les fenêtres, gérer la souris, etc. On peut changer d'environnement sans changer d'OS."
            },
            {
                q: "Quelle est la différence entre root et le noyau ?",
                r: "<strong>root</strong> est un <strong>utilisateur</strong> avec des privilèges étendus (accordés par le noyau). Le <strong>noyau</strong> est le code qui contrôle tout le matériel. root peut faire beaucoup de choses, mais reste limité par ce que le noyau autorise."
            }
        ]
    },
    {
        id: 14,
        title: "Ceci PEUT être le système d'exploitation",
        resume: `
            <p><strong>Ce qui constitue vraiment l'OS</strong> :</p>
            <ul>
                <li><strong>Le noyau (kernel)</strong> : le cœur, s'exécute en mode privilégié</li>
                <li><strong>La libc</strong> : bibliothèque standard qui fournit les appels système</li>
                <li><strong>Certains services système</strong> : démons essentiels (DNS, init...)</li>
            </ul>
            <p class="key-point">Les limites exactes d'un OS sont floues. Le noyau seul ne suffit pas à avoir un système utilisable.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce que la libc et pourquoi est-elle importante ?",
                r: "La <strong>libc</strong> (glibc sous Linux) est la bibliothèque C standard. Elle fournit les fonctions comme <code>printf()</code>, <code>malloc()</code> et surtout les <strong>wrappers des appels système</strong>. Sans elle, les programmes ne peuvent pas communiquer facilement avec le noyau."
            },
            {
                q: "Pourquoi dit-on que les limites d'un OS sont floues ?",
                r: "Le <strong>noyau seul</strong> ne permet pas d'utiliser un ordinateur (pas de shell, pas de commandes). Mais où s'arrête l'OS ? La libc ? Les outils de base ? L'environnement graphique ? Chaque distribution fait des choix différents."
            }
        ]
    },
    {
        id: 15,
        title: "Root vs Noyau",
        resume: `
            <p><strong>Root (super-utilisateur)</strong> :</p>
            <ul>
                <li>C'est un <strong>utilisateur</strong> avec des droits étendus</li>
                <li>Privilégié <strong>logiciellement</strong> par le noyau</li>
                <li>Peut installer des logiciels, modifier des fichiers système</li>
            </ul>
            <p><strong>Noyau</strong> :</p>
            <ul>
                <li><strong>Contrôle tout</strong>, accès direct au matériel</li>
                <li>Privilégié <strong>matériellement</strong> par le processeur (Ring 0)</li>
                <li>Décide ce que root peut ou ne peut pas faire</li>
            </ul>
            <p class="key-point">Le noyau est au-dessus de root dans la hiérarchie des privilèges !</p>
        `,
        questions: [
            {
                q: "Quelle est la différence fondamentale entre root et le noyau ?",
                r: "<strong>Root</strong> est privilégié par le <strong>logiciel</strong> (le noyau lui accorde des droits). Le <strong>noyau</strong> est privilégié par le <strong>matériel</strong> (le processeur lui-même). Root ne peut pas faire ce que le noyau interdit, mais le noyau peut tout faire."
            },
            {
                q: "Root peut-il modifier le noyau en cours d'exécution ?",
                r: "Partiellement. Root peut <strong>charger des modules</strong> noyau (drivers), modifier certains paramètres via <code>/proc</code> ou <code>/sys</code>. Mais il ne peut pas modifier le code noyau en mémoire arbitrairement. Le noyau se protège lui-même."
            }
        ]
    },
    {
        id: 16,
        title: "Que serait un système d'exploitation primitif ?",
        resume: `
            <p><strong>OS primitif</strong> (exemple : MS-DOS, 1981-2001) :</p>
            <ul>
                <li>Abstraction du matériel, mais <strong>pas de protection</strong></li>
                <li><strong>Un seul utilisateur</strong></li>
                <li><strong>Un seul programme</strong> s'exécute à la fois</li>
                <li>Hypothèse : les programmes sont bien codés et pas malveillants</li>
            </ul>
            <p class="key-point">Problème : un programme bugué ou malveillant peut tout casser, accéder à toute la mémoire.</p>
        `,
        questions: [
            {
                q: "Pourquoi MS-DOS n'avait-il pas de protection mémoire ?",
                r: "MS-DOS date d'une époque où : 1) Les PC étaient mono-utilisateur et mono-tâche. 2) Les programmes étaient supposés fiables. 3) Implémenter la protection aurait été coûteux en performances. Résultat : n'importe quel programme pouvait accéder à toute la mémoire."
            },
            {
                q: "Quels problèmes l'absence de multi-tâches pose-t-elle ?",
                r: "Sans multi-tâches : 1) On ne peut pas écouter de la musique en écrivant un document. 2) Si un programme attend une entrée réseau, tout le système est bloqué. 3) Impossible d'avoir plusieurs utilisateurs simultanés."
            }
        ]
    },
    {
        id: 17,
        title: "Problèmes traités par un système d'exploitation",
        resume: `
            <p><strong>Multi-tâches</strong> :</p>
            <ul>
                <li>Plusieurs programmes s'exécutent "en même temps"</li>
                <li>Chaque programme a sa <strong>propre zone mémoire</strong></li>
                <li>Si un programme attend (I/O), un autre prend le relais</li>
            </ul>
            <p><strong>Protection et isolation</strong> :</p>
            <ul>
                <li>Un programme en <strong>boucle infinie</strong> ne bloque pas les autres</li>
                <li>Un programme ne peut pas <strong>lire la mémoire</strong> des autres</li>
            </ul>
            <p><strong>Multi-utilisateurs</strong> :</p>
            <ul>
                <li>Répartition <strong>équitable</strong> des ressources</li>
                <li>Isolation entre utilisateurs</li>
            </ul>
        `,
        questions: [
            {
                q: "Comment l'OS empêche-t-il un programme d'accéder à la mémoire des autres ?",
                r: "Grâce à la <strong>mémoire virtuelle</strong> et la <strong>MMU</strong> (Memory Management Unit). Chaque processus a son propre espace d'adressage. Les adresses virtuelles sont traduites en adresses physiques par le matériel, qui vérifie les droits d'accès."
            },
            {
                q: "Comment l'OS gère-t-il un programme en boucle infinie ?",
                r: "L'<strong>interruption d'horloge</strong> (timer interrupt) se déclenche régulièrement (~1ms sous Linux). Le noyau reprend le contrôle et peut décider de donner le CPU à un autre processus. C'est le principe de l'<strong>ordonnancement préemptif</strong>."
            }
        ]
    },
    {
        id: 18,
        title: "Structures des systèmes d'exploitation",
        resume: `
            <p>Deux grandes architectures de noyau :</p>
            <p><strong>Noyau monolithique</strong> :</p>
            <ul>
                <li>Tout le code noyau tourne en <strong>mode privilégié</strong></li>
                <li>Un bloc unique : pilotes, système de fichiers, réseau...</li>
                <li>Exemples : <strong>Linux, Windows, macOS</strong></li>
            </ul>
            <p><strong>Micro-noyau</strong> :</p>
            <ul>
                <li>Noyau minimal (IPC, ordonnancement basique)</li>
                <li>Services dans des processus séparés (serveurs)</li>
                <li>Exemple : <strong>GNU Hurd, QNX</strong></li>
            </ul>
        `,
        questions: [
            {
                q: "Qu'est-ce qu'un noyau monolithique ?",
                r: "Un noyau où <strong>tout le code système</strong> (pilotes, système de fichiers, pile réseau, ordonnanceur) s'exécute en <strong>mode privilégié</strong> dans le même espace mémoire. Avantage : performances. Inconvénient : un bug dans un pilote peut crasher tout le système."
            },
            {
                q: "Qu'est-ce qu'un micro-noyau ?",
                r: "Un noyau <strong>minimal</strong> qui ne fait que l'essentiel (IPC, gestion mémoire basique, ordonnancement). Les pilotes et services tournent comme des <strong>processus utilisateur</strong>. Avantage : isolation, stabilité. Inconvénient : overhead de communication entre services."
            }
        ]
    },
    {
        id: 19,
        title: "Noyau monolithique vs micro-noyau",
        resume: `
            <table class="info-table">
                <tr><th>Critère</th><th>Monolithique</th><th>Micro-noyau</th></tr>
                <tr><td>Code privilégié</td><td>Tout</td><td>Minimum</td></tr>
                <tr><td>Performances</td><td>Meilleures</td><td>Overhead IPC</td></tr>
                <tr><td>Stabilité</td><td>Un bug = crash</td><td>Bug isolé</td></tr>
                <tr><td>Extensibilité</td><td>Redémarrage nécessaire</td><td>Facile</td></tr>
                <tr><td>Sécurité</td><td>Grande surface d'attaque</td><td>Réduite</td></tr>
            </table>
            <p class="key-point">Linux est monolithique mais <strong>modulaire</strong> : on peut charger/décharger des modules sans redémarrer.</p>
        `,
        questions: [
            {
                q: "Pourquoi Linux est-il monolithique et non micro-noyau ?",
                r: "Choix historique de Linus Torvalds pour les <strong>performances</strong>. Les communications entre composants sont plus rapides quand tout est dans le même espace mémoire. Le débat Tanenbaum-Torvalds (1992) opposait ces deux approches."
            },
            {
                q: "Comment Linux compense-t-il les inconvénients du monolithique ?",
                r: "Par les <strong>modules noyau</strong> : on peut charger/décharger des pilotes dynamiquement sans redémarrer. Cela offre une certaine flexibilité tout en gardant les performances du monolithique."
            }
        ]
    },
    {
        id: 20,
        title: "Quelques systèmes d'exploitation",
        resume: `
            <p><strong>Les plus utilisés</strong> :</p>
            <ul>
                <li><strong>Windows</strong> : dominant sur PC de bureau</li>
                <li><strong>Linux</strong> : serveurs, embarqué, Android</li>
                <li><strong>macOS</strong> : base Unix (BSD), machines Apple</li>
                <li><strong>Android/iOS</strong> : mobiles (Android = noyau Linux)</li>
                <li><strong>*BSD</strong> : FreeBSD, OpenBSD (serveurs, sécurité)</li>
            </ul>
            <p><strong>Plus marginaux</strong> :</p>
            <ul>
                <li><strong>GNU Hurd</strong> : seul vrai OS micro-noyau, jamais finalisé</li>
                <li><strong>Plan9</strong> : recherche (Bell Labs)</li>
            </ul>
        `,
        questions: [
            {
                q: "Quelle est la relation entre Linux et Android ?",
                r: "<strong>Android utilise le noyau Linux</strong> mais avec des modifications (Binder pour IPC, wakelocks pour batterie). Au-dessus, c'est très différent : pas de GNU, runtime Java/Kotlin, framework Android. C'est du \"Linux\" mais pas du \"GNU/Linux\"."
            },
            {
                q: "Pourquoi GNU Hurd n'a-t-il jamais remplacé Linux ?",
                r: "GNU Hurd (micro-noyau) était en développement depuis 1983 mais jamais stable. Quand Linux (monolithique) est sorti en 1991, il fonctionnait. La communauté a adopté Linux + outils GNU = GNU/Linux. Hurd reste expérimental."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(2, section2Data);
