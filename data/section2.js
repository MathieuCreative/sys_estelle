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
                q: "Où se situe un OS selon cette diapo ?",
                r: "Un OS est un logiciel qui se situe <strong>entre le matériel et les applications</strong>."
            },
            {
                q: "Quels sont les trois rôles principaux d'un OS listés dans cette diapo ?",
                r: "1) <strong>Abstraction</strong> : cache les détails du matériel. 2) <strong>Multi-tâches</strong> : gère plusieurs programmes simultanément. 3) <strong>Multi-utilisateurs</strong> : permet le partage de la machine."
            },
            {
                q: "Que signifie le rôle 'Abstraction' de l'OS dans cette diapo ?",
                r: "Cacher les détails du matériel aux applications. Par exemple, plus besoin de connaître le modèle exact de disque dur."
            },
            {
                q: "Quel est le point clé à retenir de cette diapo ?",
                r: "Certains systèmes embarqués n'ont <strong>pas d'OS</strong> : le programme tourne directement sur le matériel."
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
                q: "Quelles sont les trois caractéristiques des OS qui les rendent complexes selon cette diapo ?",
                r: "1) <strong>Très proche du matériel</strong> : nécessite de comprendre l'architecture. 2) <strong>Performances critiques</strong> : chaque microseconde compte. 3) <strong>Compromis permanents</strong> : vitesse vs sécurité, simplicité vs fonctionnalités."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Les mêmes problématiques se retrouvent ailleurs : <strong>navigateurs web, JVM, bases de données</strong>."
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
                q: "Citez trois exemples d'éléments qui NE SONT PAS l'OS selon cette diapo.",
                r: "Les <strong>compilateurs</strong> (gcc, clang), les <strong>environnements de bureau</strong> (GNOME, KDE), et le <strong>shell</strong> (Bash, Zsh)."
            },
            {
                q: "Que sont les outils CLI (ls, cp, grep) selon cette diapo ?",
                r: "Ce sont des <strong>programmes utilisateur</strong>, pas des composants de l'OS."
            },
            {
                q: "Qu'est-ce que root selon cette diapo ?",
                r: "root est un <strong>utilisateur</strong>, pas le noyau."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Tous ces éléments sont des programmes qui tournent <strong>AU-DESSUS de l'OS</strong>."
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
                q: "Quels sont les trois éléments qui peuvent constituer l'OS selon cette diapo ?",
                r: "1) <strong>Le noyau (kernel)</strong> : le cœur, s'exécute en mode privilégié. 2) <strong>La libc</strong> : bibliothèque standard qui fournit les appels système. 3) <strong>Certains services système</strong> : démons essentiels."
            },
            {
                q: "Qu'est-ce que le noyau (kernel) selon cette diapo ?",
                r: "Le <strong>cœur</strong> de l'OS, qui s'exécute en <strong>mode privilégié</strong>."
            },
            {
                q: "Quel est le rôle de la libc selon cette diapo ?",
                r: "Bibliothèque standard qui <strong>fournit les appels système</strong>."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Les limites exactes d'un OS sont <strong>floues</strong>. Le noyau seul ne suffit pas à avoir un système utilisable."
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
                q: "Comment root est-il privilégié selon cette diapo ?",
                r: "Root est privilégié <strong>logiciellement</strong> par le noyau."
            },
            {
                q: "Comment le noyau est-il privilégié selon cette diapo ?",
                r: "Le noyau est privilégié <strong>matériellement</strong> par le processeur (Ring 0)."
            },
            {
                q: "Que peut faire root selon cette diapo ?",
                r: "Root peut <strong>installer des logiciels</strong> et <strong>modifier des fichiers système</strong>."
            },
            {
                q: "Qui décide de ce que root peut faire selon cette diapo ?",
                r: "Le <strong>noyau</strong> décide ce que root peut ou ne peut pas faire."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Le noyau est <strong>au-dessus de root</strong> dans la hiérarchie des privilèges."
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
                q: "Citez un exemple d'OS primitif mentionné dans cette diapo.",
                r: "<strong>MS-DOS</strong> (1981-2001)."
            },
            {
                q: "Quelles sont les quatre caractéristiques d'un OS primitif selon cette diapo ?",
                r: "1) Abstraction du matériel, mais <strong>pas de protection</strong>. 2) <strong>Un seul utilisateur</strong>. 3) <strong>Un seul programme</strong> s'exécute à la fois. 4) Hypothèse : les programmes sont bien codés et pas malveillants."
            },
            {
                q: "Combien de programmes peuvent s'exécuter à la fois dans un OS primitif selon cette diapo ?",
                r: "<strong>Un seul programme</strong> s'exécute à la fois."
            },
            {
                q: "Quel est le problème clé d'un OS primitif selon cette diapo ?",
                r: "Un programme bugué ou malveillant peut <strong>tout casser</strong>, accéder à <strong>toute la mémoire</strong>."
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
                q: "Que permet le multi-tâches selon cette diapo ?",
                r: "Plusieurs programmes s'exécutent \"en même temps\" et chaque programme a sa <strong>propre zone mémoire</strong>. Si un programme attend (I/O), un autre prend le relais."
            },
            {
                q: "Quelles sont les deux protections mentionnées dans cette diapo ?",
                r: "1) Un programme en <strong>boucle infinie</strong> ne bloque pas les autres. 2) Un programme ne peut pas <strong>lire la mémoire</strong> des autres."
            },
            {
                q: "Que permet le multi-utilisateurs selon cette diapo ?",
                r: "Répartition <strong>équitable</strong> des ressources et <strong>isolation entre utilisateurs</strong>."
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
                q: "Quelles sont les deux grandes architectures de noyau selon cette diapo ?",
                r: "<strong>Noyau monolithique</strong> et <strong>Micro-noyau</strong>."
            },
            {
                q: "Où s'exécute le code d'un noyau monolithique selon cette diapo ?",
                r: "Tout le code noyau tourne en <strong>mode privilégié</strong>."
            },
            {
                q: "Citez trois exemples de noyaux monolithiques mentionnés dans cette diapo.",
                r: "<strong>Linux, Windows, macOS</strong>."
            },
            {
                q: "Que contient un micro-noyau selon cette diapo ?",
                r: "Un noyau <strong>minimal</strong> : IPC, ordonnancement basique."
            },
            {
                q: "Où se trouvent les services dans un micro-noyau selon cette diapo ?",
                r: "Les services sont dans des <strong>processus séparés</strong> (serveurs)."
            },
            {
                q: "Citez un exemple de micro-noyau mentionné dans cette diapo.",
                r: "<strong>GNU Hurd</strong> ou <strong>QNX</strong>."
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
                q: "Quel type de noyau a de meilleures performances selon cette diapo ?",
                r: "Le noyau <strong>monolithique</strong> a de meilleures performances."
            },
            {
                q: "Quel est le problème de stabilité d'un noyau monolithique selon cette diapo ?",
                r: "Un bug = <strong>crash</strong> (de tout le système)."
            },
            {
                q: "Quel type de noyau a une meilleure stabilité selon cette diapo ?",
                r: "Le <strong>micro-noyau</strong> : les bugs sont <strong>isolés</strong>."
            },
            {
                q: "Quel est l'avantage du micro-noyau en termes de sécurité selon cette diapo ?",
                r: "Surface d'attaque <strong>réduite</strong> (moins de code en mode privilégié)."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Linux est monolithique mais <strong>modulaire</strong> : on peut charger/décharger des modules sans redémarrer."
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
                q: "Où est dominant Windows selon cette diapo ?",
                r: "Sur les <strong>PC de bureau</strong>."
            },
            {
                q: "Dans quels domaines trouve-t-on Linux selon cette diapo ?",
                r: "<strong>Serveurs, embarqué, Android</strong>."
            },
            {
                q: "Quelle est la base de macOS selon cette diapo ?",
                r: "macOS a une base <strong>Unix (BSD)</strong>."
            },
            {
                q: "Quel noyau utilise Android selon cette diapo ?",
                r: "Android utilise le <strong>noyau Linux</strong>."
            },
            {
                q: "Citez deux systèmes BSD mentionnés dans cette diapo.",
                r: "<strong>FreeBSD</strong> et <strong>OpenBSD</strong>."
            },
            {
                q: "Quel est le seul vrai OS micro-noyau mentionné dans cette diapo ?",
                r: "<strong>GNU Hurd</strong>, mais il n'a jamais été finalisé."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(2, section2Data);
