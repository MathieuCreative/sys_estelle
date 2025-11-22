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
                q: "Pourquoi dit-on GNU/Linux et pas juste Linux ?",
                r: "<strong>Linux</strong> n'est que le noyau. Ce qu'on utilise au quotidien (shell, compilateur, commandes de base) vient du projet <strong>GNU</strong>. Dire \"GNU/Linux\" reconnaît les deux contributions. En pratique, beaucoup disent juste \"Linux\" par abus de langage."
            },
            {
                q: "Quelle est la différence entre GNU/Linux et BSD ?",
                r: "<strong>GNU/Linux</strong> = noyau Linux + outils GNU (deux projets séparés). <strong>BSD</strong> = noyau et outils développés ensemble, descendant direct d'Unix. Licences différentes aussi : GPL (GNU) vs BSD (plus permissive)."
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
                q: "Linux est-il un Unix ?",
                r: "Non, Linux est <strong>\"Unix-like\"</strong>. Il est inspiré d'Unix et compatible POSIX, mais son code a été écrit from scratch par Linus Torvalds. Il n'a pas de filiation directe avec le code Unix original (contrairement à BSD)."
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
                q: "Qu'est-ce qu'un module noyau ?",
                r: "C'est du <strong>code compilé</strong> qu'on peut charger dans le noyau en cours d'exécution. Il s'exécute en mode privilégié (Ring 0). Exemples : pilotes de carte graphique, systèmes de fichiers (NTFS), protocoles réseau."
            },
            {
                q: "Quelle est la différence entre insmod et modprobe ?",
                r: "<code>insmod</code> charge un module spécifique (fichier .ko). <code>modprobe</code> est plus intelligent : il résout les <strong>dépendances</strong> automatiquement et cherche le module dans les chemins standards."
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
                q: "Qu'est-ce que le VFS (Virtual File System) ?",
                r: "C'est une <strong>couche d'abstraction</strong> qui permet d'utiliser la même interface (open, read, write) quel que soit le système de fichiers réel (ext4, NTFS, FAT32). Les appels passent par le VFS qui redirige vers le bon driver."
            },
            {
                q: "Pourquoi les pilotes sont-ils dans le noyau ?",
                r: "Les pilotes doivent accéder <strong>directement au matériel</strong> (ports I/O, mémoire mappée). Cela nécessite le mode privilégié. Dans un micro-noyau, les pilotes seraient en espace utilisateur mais avec un overhead de communication."
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
                q: "Quelle est la différence entre Debian et Ubuntu ?",
                r: "<strong>Ubuntu est basé sur Debian</strong>. Debian privilégie la <strong>stabilité</strong> (versions plus anciennes mais testées). Ubuntu sort des versions régulières avec des logiciels plus récents. Ubuntu ajoute des outils d'installation et configuration."
            },
            {
                q: "Pourquoi y a-t-il autant de distributions Linux ?",
                r: "Chaque distribution fait des <strong>choix différents</strong> : politique de mise à jour (rolling vs fixed), gestionnaire de paquets, philosophie (libre only vs pragmatique), public cible (serveurs, desktop, embarqué). Le code source ouvert permet à chacun de créer sa distribution."
            }
        ]
    },
    {
        id: 26,
        title: "Que se passe-t-il au démarrage ?",
        resume: `
            <p><em>Diapo de transition vers la séquence de boot</em></p>
        `,
        questions: [
            {
                q: "Quelles sont les grandes étapes du démarrage d'un ordinateur ?",
                r: "1) <strong>Mise sous tension</strong> : CPU lit une adresse fixe. 2) <strong>BIOS/UEFI</strong> : initialise le matériel. 3) <strong>Bootloader</strong> (GRUB) : charge le noyau. 4) <strong>Noyau</strong> : initialise le système. 5) <strong>Init</strong> (systemd) : lance les services utilisateur."
            }
        ]
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
                q: "Pourquoi le CPU sait-il où commencer à exécuter du code ?",
                r: "C'est <strong>câblé dans le processeur</strong>. À la mise sous tension, le Program Counter est initialisé à une adresse fixe (dépend de l'architecture). Cette adresse pointe vers une mémoire <strong>non volatile</strong> (ROM/Flash) contenant le firmware."
            },
            {
                q: "Qu'est-ce que le Bootstrap Processor ?",
                r: "Sur un système multi-cœurs, <strong>un seul cœur</strong> démarre initialement : le Bootstrap Processor (BSP). Les autres cœurs (Application Processors) sont réveillés plus tard par le noyau, une fois l'initialisation de base terminée."
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
                q: "Quelle est la différence entre BIOS et UEFI ?",
                r: "<strong>BIOS</strong> : ancien (1981), mode 16 bits, interface texte, boot via MBR. <strong>UEFI</strong> : moderne, mode 32/64 bits, interface graphique possible, boot via ESP (partition FAT32), support Secure Boot. UEFI remplace progressivement le BIOS."
            },
            {
                q: "Qu'est-ce que le MBR ?",
                r: "Le <strong>Master Boot Record</strong> est le premier secteur (512 octets) d'un disque. Il contient : 1) Du code de boot (446 octets). 2) La table des partitions (64 octets). 3) Une signature (2 octets). Le BIOS charge ce code qui lance le bootloader."
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
                q: "Pourquoi a-t-on besoin d'un bootloader ?",
                r: "Le <strong>BIOS/UEFI</strong> ne connaît pas les systèmes de fichiers complexes et ne sait pas où trouver le noyau. Le bootloader fait l'intermédiaire : il sait lire ext4, localiser le fichier du noyau, et le charger en mémoire avec les bons paramètres."
            },
            {
                q: "Que contient la ligne de commande du noyau ?",
                r: "Des paramètres passés au noyau au boot : <code>root=/dev/sda1</code> (partition racine), <code>quiet</code> (moins de messages), <code>init=/bin/bash</code> (pour recovery), <code>mem=4G</code> (limiter la RAM). Visible dans <code>/proc/cmdline</code>."
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
                q: "Qu'est-ce que systemd et pourquoi PID 1 ?",
                r: "<strong>systemd</strong> est le gestionnaire de services de la plupart des distributions Linux modernes. Il a le <strong>PID 1</strong> car c'est le premier processus utilisateur lancé par le noyau. Il est l'ancêtre de tous les autres processus."
            },
            {
                q: "Que se passe-t-il si l'init meurt ?",
                r: "<strong>Kernel panic</strong>. Le noyau suppose que l'init (PID 1) tourne toujours. S'il meurt, le noyau ne sait plus quoi faire (plus de processus pour adopter les orphelins, plus de gestion des services). Le système devient inutilisable."
            },
            {
                q: "Pourquoi l'init adopte-t-il les processus orphelins ?",
                r: "Quand un processus meurt, ses enfants deviennent <strong>orphelins</strong>. Ils doivent avoir un parent pour que quelqu'un puisse récupérer leur code de retour (sinon ils deviennent zombies). L'init les adopte automatiquement."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(3, section3Data);
