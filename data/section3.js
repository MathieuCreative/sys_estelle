// Section 3: Démarrage du Système
// Diapos 21 à 30 du PDF 3 - correspondance exacte

const section3Data = [
    {
        id: 21,
        title: "Linux vs GNU/Linux vs *BSD",
        resume: `
            <p><strong>Linux</strong> = juste le <strong>noyau</strong>, créé par Linus Torvalds en 1991.</p>
            <p><strong>GNU</strong> = projet de Richard Stallman (1983) : outils (gcc, bash, coreutils...) mais le noyau Hurd n'a jamais été prêt.</p>
            <p><strong>GNU/Linux</strong> = noyau Linux + outils GNU = ce qu'on appelle couramment "Linux".</p>
            <p><strong>*BSD</strong> (FreeBSD, OpenBSD, NetBSD) :</p>
            <ul>
                <li>Dérivés d'Unix (Berkeley)</li>
                <li>Noyau + outils = un tout cohérent</li>
                <li>Très utilisés pour serveurs et équipements réseau</li>
            </ul>
        `,
        questions: [
            {
                q: "Qu'est-ce que Linux selon cette diapo ?",
                r: "Linux = juste le <strong>noyau</strong>, créé par Linus Torvalds en 1991."
            },
            {
                q: "Qui a créé le projet GNU et en quelle année selon cette diapo ?",
                r: "<strong>Richard Stallman</strong> en 1983."
            },
            {
                q: "Que contient le projet GNU selon cette diapo ?",
                r: "Des outils : <strong>gcc, bash, coreutils</strong>... Mais le noyau Hurd n'a jamais été prêt."
            },
            {
                q: "Qu'est-ce que GNU/Linux selon cette diapo ?",
                r: "<strong>Noyau Linux + outils GNU</strong> = ce qu'on appelle couramment \"Linux\"."
            },
            {
                q: "Citez trois systèmes BSD mentionnés dans cette diapo.",
                r: "<strong>FreeBSD, OpenBSD, NetBSD</strong>."
            },
            {
                q: "Comment sont composés les systèmes BSD selon cette diapo ?",
                r: "<strong>Noyau + outils = un tout cohérent</strong>."
            }
        ]
    },
    {
        id: 22,
        title: "L'arbre généalogique",
        resume: `
            <p><em>Diapo montrant l'arbre généalogique des systèmes Unix</em></p>
            <p><strong>Points clés</strong> :</p>
            <ul>
                <li><strong>Unix</strong> (1969, Bell Labs) : l'ancêtre commun</li>
                <li><strong>BSD</strong> (1977) : branche Berkeley → FreeBSD, OpenBSD, macOS</li>
                <li><strong>System V</strong> : branche AT&T → Solaris, HP-UX</li>
                <li><strong>Linux</strong> (1991) : inspiré d'Unix mais code from scratch</li>
            </ul>
            <p class="key-point">macOS est basé sur Darwin, qui vient de BSD (donc Unix).</p>
        `,
        questions: [
            {
                q: "Quand et où a été créé Unix selon cette diapo ?",
                r: "<strong>1969, Bell Labs</strong>."
            },
            {
                q: "Quand a été créée la branche BSD selon cette diapo ?",
                r: "En <strong>1977</strong> (branche Berkeley)."
            },
            {
                q: "Citez deux systèmes issus de BSD selon cette diapo.",
                r: "<strong>FreeBSD, OpenBSD, macOS</strong>."
            },
            {
                q: "Citez deux systèmes issus de System V selon cette diapo.",
                r: "<strong>Solaris, HP-UX</strong>."
            },
            {
                q: "Comment Linux a-t-il été créé selon cette diapo ?",
                r: "Linux (1991) est <strong>inspiré d'Unix</strong> mais le code a été écrit <strong>from scratch</strong>."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "macOS est basé sur <strong>Darwin</strong>, qui vient de <strong>BSD</strong> (donc Unix)."
            }
        ]
    },
    {
        id: 23,
        title: "Linux : un noyau monolithique modulaire",
        resume: `
            <p>Linux est monolithique mais <strong>modulaire</strong> :</p>
            <ul>
                <li><strong>Modules noyau</strong> : code chargeable/déchargeable dynamiquement</li>
                <li>Utilisé pour : pilotes de périphériques, systèmes de fichiers, fonctionnalités réseau</li>
                <li><strong>Avantages</strong> :
                    <ul>
                        <li>Pas besoin de redémarrer pour ajouter un pilote</li>
                        <li>Le noyau de base reste petit</li>
                        <li>Distribution indépendante des modules</li>
                    </ul>
                </li>
            </ul>
            <p>Commandes utiles : <code>lsmod</code>, <code>modprobe</code>, <code>insmod</code>, <code>rmmod</code></p>
        `,
        questions: [
            {
                q: "Que sont les modules noyau selon cette diapo ?",
                r: "Du <strong>code chargeable/déchargeable dynamiquement</strong>."
            },
            {
                q: "À quoi servent les modules noyau selon cette diapo ?",
                r: "Pilotes de périphériques, systèmes de fichiers, fonctionnalités réseau."
            },
            {
                q: "Citez deux avantages des modules noyau mentionnés dans cette diapo.",
                r: "1) <strong>Pas besoin de redémarrer</strong> pour ajouter un pilote. 2) Le noyau de base reste <strong>petit</strong>."
            },
            {
                q: "Citez trois commandes utiles pour les modules mentionnées dans cette diapo.",
                r: "<code>lsmod</code>, <code>modprobe</code>, <code>insmod</code>, <code>rmmod</code>."
            }
        ]
    },
    {
        id: 24,
        title: "Composants du noyau Linux",
        resume: `
            <p><em>Diapo montrant la carte des composants du noyau Linux</em></p>
            <p><strong>Principaux sous-systèmes</strong> :</p>
            <ul>
                <li><strong>Process Management</strong> : création, ordonnancement des processus/threads</li>
                <li><strong>Memory Management</strong> : mémoire virtuelle, pagination, allocation</li>
                <li><strong>Virtual File System</strong> : abstraction des systèmes de fichiers</li>
                <li><strong>Network Stack</strong> : protocoles réseau (TCP/IP, sockets)</li>
                <li><strong>Device Drivers</strong> : interface avec le matériel</li>
            </ul>
        `,
        questions: [
            {
                q: "Que gère le sous-système 'Process Management' selon cette diapo ?",
                r: "<strong>Création</strong> et <strong>ordonnancement</strong> des processus/threads."
            },
            {
                q: "Que gère le sous-système 'Memory Management' selon cette diapo ?",
                r: "<strong>Mémoire virtuelle, pagination, allocation</strong>."
            },
            {
                q: "Qu'est-ce que le Virtual File System selon cette diapo ?",
                r: "<strong>Abstraction des systèmes de fichiers</strong>."
            },
            {
                q: "Que contient le Network Stack selon cette diapo ?",
                r: "Les <strong>protocoles réseau</strong> (TCP/IP, sockets)."
            },
            {
                q: "Quel est le rôle des Device Drivers selon cette diapo ?",
                r: "<strong>Interface avec le matériel</strong>."
            }
        ]
    },
    {
        id: 25,
        title: "Et les distributions ?",
        resume: `
            <p>Une <strong>distribution</strong> = ensemble cohérent de logiciels pré-configurés :</p>
            <ul>
                <li>Un <strong>noyau</strong> (souvent Linux)</li>
                <li>Une <strong>libc</strong> (glibc, musl)</li>
                <li>Un <strong>gestionnaire de services</strong> (systemd, OpenRC)</li>
                <li>Un <strong>gestionnaire de paquets</strong> (apt, dnf, pacman)</li>
                <li>Des <strong>logiciels utilisateurs</strong> (Firefox, LibreOffice...)</li>
            </ul>
            <p><strong>Exemples</strong> : Debian, Ubuntu, Fedora, Arch Linux, Gentoo</p>
            <p class="key-point">Les différences sont surtout dans la gestion des paquets et la philosophie (stabilité vs nouveauté).</p>
        `,
        questions: [
            {
                q: "Qu'est-ce qu'une distribution selon cette diapo ?",
                r: "Un <strong>ensemble cohérent de logiciels pré-configurés</strong>."
            },
            {
                q: "Citez quatre composants d'une distribution mentionnés dans cette diapo.",
                r: "1) Un <strong>noyau</strong>. 2) Une <strong>libc</strong>. 3) Un <strong>gestionnaire de services</strong>. 4) Un <strong>gestionnaire de paquets</strong>."
            },
            {
                q: "Citez deux exemples de gestionnaires de services mentionnés dans cette diapo.",
                r: "<strong>systemd</strong>, <strong>OpenRC</strong>."
            },
            {
                q: "Citez deux exemples de gestionnaires de paquets mentionnés dans cette diapo.",
                r: "<strong>apt, dnf, pacman</strong>."
            },
            {
                q: "Citez trois distributions mentionnées dans cette diapo.",
                r: "<strong>Debian, Ubuntu, Fedora, Arch Linux, Gentoo</strong>."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Les différences sont surtout dans la <strong>gestion des paquets</strong> et la <strong>philosophie</strong> (stabilité vs nouveauté)."
            }
        ]
    },
    {
        id: 26,
        title: "Que se passe-t-il au démarrage ?",
        resume: `
            <p><em>Diapo de transition vers la séquence de boot</em></p>
        `,
        questions: []
    },
    {
        id: 27,
        title: "Que se passe-t-il lors du démarrage ? - Mise sous tension",
        resume: `
            <p><strong>À la mise sous tension</strong> :</p>
            <ul>
                <li>La <strong>RAM est vide</strong> (mémoire volatile)</li>
                <li>Les cœurs ne savent pas quoi exécuter</li>
                <li>Le <strong>Bootstrap Processor</strong> (premier cœur) commence</li>
                <li>Il lit une <strong>adresse fixe</strong> câblée en dur → pointe vers la ROM</li>
                <li>Cette ROM contient le <strong>BIOS/UEFI</strong></li>
            </ul>
            <p class="key-point">Le CPU est "câblé" pour commencer à une adresse précise (ex: 0xFFFFFFF0 sur x86).</p>
        `,
        questions: [
            {
                q: "Quel est l'état de la RAM à la mise sous tension selon cette diapo ?",
                r: "La <strong>RAM est vide</strong> (mémoire volatile)."
            },
            {
                q: "Quel cœur commence en premier selon cette diapo ?",
                r: "Le <strong>Bootstrap Processor</strong> (premier cœur)."
            },
            {
                q: "Que lit le Bootstrap Processor selon cette diapo ?",
                r: "Il lit une <strong>adresse fixe</strong> câblée en dur qui pointe vers la ROM."
            },
            {
                q: "Que contient cette ROM selon cette diapo ?",
                r: "Le <strong>BIOS/UEFI</strong>."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Le CPU est \"câblé\" pour commencer à une <strong>adresse précise</strong> (ex: 0xFFFFFFF0 sur x86)."
            }
        ]
    },
    {
        id: 28,
        title: "Que se passe-t-il lors du démarrage ? - BIOS/UEFI",
        resume: `
            <p><strong>BIOS</strong> (Basic Input Output System) ou <strong>UEFI</strong> (Unified Extensible Firmware Interface) :</p>
            <ul>
                <li>Premier logiciel exécuté</li>
                <li><strong>Détecte le matériel</strong> (RAM, disques, périphériques)</li>
                <li><strong>Initialise</strong> les composants de base</li>
                <li>Permet la <strong>configuration</strong> (ordre de boot, paramètres)</li>
                <li>Cherche un <strong>bootloader</strong> sur les périphériques de boot</li>
            </ul>
            <p><strong>MBR vs GPT</strong> :</p>
            <ul>
                <li><strong>MBR</strong> (Master Boot Record) : ancien, 4 partitions max, 2 To max</li>
                <li><strong>GPT</strong> (GUID Partition Table) : moderne, 128 partitions, taille énorme</li>
            </ul>
        `,
        questions: [
            {
                q: "Que signifie BIOS selon cette diapo ?",
                r: "<strong>Basic Input Output System</strong>."
            },
            {
                q: "Que signifie UEFI selon cette diapo ?",
                r: "<strong>Unified Extensible Firmware Interface</strong>."
            },
            {
                q: "Citez trois rôles du BIOS/UEFI mentionnés dans cette diapo.",
                r: "1) <strong>Détecte le matériel</strong> (RAM, disques, périphériques). 2) <strong>Initialise</strong> les composants de base. 3) Cherche un <strong>bootloader</strong>."
            },
            {
                q: "Quelles sont les limites du MBR selon cette diapo ?",
                r: "MBR : ancien, <strong>4 partitions max</strong>, <strong>2 To max</strong>."
            },
            {
                q: "Que signifie GPT selon cette diapo ?",
                r: "<strong>GUID Partition Table</strong>."
            },
            {
                q: "Quelles sont les caractéristiques de GPT selon cette diapo ?",
                r: "GPT : moderne, <strong>128 partitions</strong>, <strong>taille énorme</strong>."
            }
        ]
    },
    {
        id: 29,
        title: "Que se passe-t-il lors du démarrage ? - Boot Loader",
        resume: `
            <p><strong>Boot Loader</strong> (ex: <strong>GRUB</strong>) :</p>
            <ul>
                <li>Mini-OS intermédiaire</li>
                <li>Permet de <strong>choisir quel OS</strong> démarrer (dual boot)</li>
                <li>Passe des <strong>paramètres</strong> au noyau</li>
                <li>Sait lire les systèmes de fichiers pour trouver le noyau</li>
                <li><strong>Charge le noyau en RAM</strong> et lui donne le contrôle</li>
            </ul>
            <p><strong>GRUB</strong> (GRand Unified Bootloader) :</p>
            <ul>
                <li>Bootloader le plus utilisé sous Linux</li>
                <li>Configuration : <code>/etc/default/grub</code>, <code>/boot/grub/grub.cfg</code></li>
            </ul>
        `,
        questions: [
            {
                q: "Citez un exemple de Boot Loader mentionné dans cette diapo.",
                r: "<strong>GRUB</strong> (GRand Unified Bootloader)."
            },
            {
                q: "Citez trois rôles du Boot Loader mentionnés dans cette diapo.",
                r: "1) Permet de <strong>choisir quel OS</strong> démarrer (dual boot). 2) Passe des <strong>paramètres</strong> au noyau. 3) <strong>Charge le noyau en RAM</strong>."
            },
            {
                q: "Que peut faire le bootloader que le BIOS/UEFI ne peut pas faire selon cette diapo ?",
                r: "Il sait <strong>lire les systèmes de fichiers</strong> pour trouver le noyau."
            },
            {
                q: "Que signifie GRUB selon cette diapo ?",
                r: "<strong>GRand Unified Bootloader</strong>."
            },
            {
                q: "Citez un fichier de configuration de GRUB mentionné dans cette diapo.",
                r: "<code>/etc/default/grub</code> ou <code>/boot/grub/grub.cfg</code>."
            }
        ]
    },
    {
        id: 30,
        title: "Que se passe-t-il lors du démarrage ? - Exécution de l'OS",
        resume: `
            <p><strong>Démarrage du noyau</strong> :</p>
            <ul>
                <li>Initialise ses <strong>structures de données</strong> internes</li>
                <li>Configure la <strong>gestion mémoire</strong></li>
                <li>Détecte et initialise les <strong>périphériques</strong></li>
                <li>Démarre les <strong>autres cœurs</strong></li>
                <li>Lance quelques <strong>threads noyau</strong> (kthreadd, ksoftirqd...)</li>
            </ul>
            <p><strong>Lancement de l'init</strong> (PID 1) :</p>
            <ul>
                <li>Premier processus <strong>utilisateur</strong></li>
                <li>Aujourd'hui : <strong>systemd</strong> (aussi : OpenRC, runit)</li>
                <li>Lance tous les <strong>services</strong> : réseau, affichage, login...</li>
                <li>Adopte les processus <strong>orphelins</strong></li>
            </ul>
            <p class="key-point">Si l'init crash, le système s'arrête : c'est le processus le plus critique.</p>
        `,
        questions: [
            {
                q: "Citez trois actions du noyau au démarrage selon cette diapo.",
                r: "1) Initialise ses <strong>structures de données</strong> internes. 2) Configure la <strong>gestion mémoire</strong>. 3) Détecte et initialise les <strong>périphériques</strong>."
            },
            {
                q: "Que fait le noyau avec les autres cœurs selon cette diapo ?",
                r: "Il <strong>démarre les autres cœurs</strong>."
            },
            {
                q: "Citez deux exemples de threads noyau mentionnés dans cette diapo.",
                r: "<strong>kthreadd, ksoftirqd</strong>."
            },
            {
                q: "Quel est le PID de l'init selon cette diapo ?",
                r: "<strong>PID 1</strong>."
            },
            {
                q: "Quel est le type de processus de l'init selon cette diapo ?",
                r: "Le premier processus <strong>utilisateur</strong>."
            },
            {
                q: "Citez deux exemples d'init mentionnés dans cette diapo.",
                r: "<strong>systemd</strong>, OpenRC, runit."
            },
            {
                q: "Que lance l'init selon cette diapo ?",
                r: "Tous les <strong>services</strong> : réseau, affichage, login, etc."
            },
            {
                q: "Quel rôle l'init a-t-il avec les processus orphelins selon cette diapo ?",
                r: "Il <strong>adopte</strong> les processus orphelins."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Si l'init crash, le <strong>système s'arrête</strong> : c'est le processus le plus critique."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(3, section3Data);
