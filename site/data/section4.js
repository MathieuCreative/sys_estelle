// Section 4: Exécution par le Processeur
// Diapos 31 à 40 du PDF 4 - correspondance exacte

const section4Data = [
    {
        id: 31,
        title: "Exécution par le processeur",
        resume: `
            <p><em>Diapo de titre de la section sur l'exécution processeur</em></p>
        `,
        questions: [
            {
                q: "Que doit gérer l'OS concernant l'exécution processeur ?",
                r: "L'OS doit gérer : 1) Les <strong>modes d'exécution</strong> (privilégié/utilisateur). 2) Les <strong>interruptions</strong> et exceptions. 3) Les <strong>appels système</strong>. 4) Le <strong>changement de contexte</strong> entre processus. Le CPU fournit les mécanismes matériels, l'OS les utilise."
            }
        ]
    },
    {
        id: 32,
        title: "Exécution dans les processeurs",
        resume: `
            <p><strong>Exécution des instructions</strong> :</p>
            <ul>
                <li>Une instruction par cycle par <strong>pipeline</strong></li>
                <li>Plusieurs pipelines dans chaque cœur</li>
                <li>La <strong>fréquence varie</strong> selon la charge et la température</li>
            </ul>
            <p><strong>Contexte d'exécution</strong> = tout ce qui définit l'état d'un programme :</p>
            <ul>
                <li><strong>Registres de données</strong> : les valeurs manipulées</li>
                <li><strong>Registres d'adresses</strong> : pile, tas, pointeur d'instruction</li>
                <li><strong>Program Counter (PC)</strong> : adresse de la prochaine instruction</li>
                <li><strong>Registres de statut</strong> : flags (overflow, zero, carry...)</li>
            </ul>
        `,
        questions: [
            {
                q: "Qu'est-ce que le contexte d'exécution d'un processus ?",
                r: "C'est l'<strong>ensemble des informations</strong> nécessaires pour reprendre l'exécution d'un processus : valeur de tous les registres (PC, SP, données), état de la FPU, table des pages mémoire. Sauvegardé lors d'un changement de contexte."
            },
            {
                q: "Qu'est-ce que le Program Counter ?",
                r: "Le <strong>Program Counter (PC)</strong>, aussi appelé Instruction Pointer (IP), contient l'<strong>adresse de la prochaine instruction</strong> à exécuter. Après chaque instruction, il est incrémenté (sauf pour les sauts/branchements)."
            }
        ]
    },
    {
        id: 33,
        title: "Modes d'exécution",
        resume: `
            <p>Le processeur a <strong>plusieurs niveaux de privilège</strong> (sur x86 : Ring 0 à Ring 3) :</p>
            <p><strong>Mode noyau (Ring 0)</strong> :</p>
            <ul>
                <li>Peut <strong>tout faire</strong> : accéder à tout le matériel</li>
                <li>Modifier la table des pages (gestion mémoire)</li>
                <li>Exécuter les instructions privilégiées (IN/OUT, HLT...)</li>
            </ul>
            <p><strong>Mode utilisateur (Ring 3)</strong> :</p>
            <ul>
                <li>Accès <strong>limité</strong> à sa propre mémoire</li>
                <li>Pas d'accès direct au matériel</li>
                <li>Doit passer par des <strong>appels système</strong></li>
            </ul>
            <p class="key-point">C'est le MATÉRIEL qui empêche l'utilisateur d'accéder à ce qui est interdit.</p>
        `,
        questions: [
            {
                q: "Pourquoi les modes d'exécution sont-ils implémentés en matériel ?",
                r: "Pour que la <strong>protection soit incontournable</strong>. Si c'était logiciel, un programme malveillant pourrait le contourner. Le processeur vérifie à chaque instruction si elle est autorisée dans le mode courant. Impossible à bypasser."
            },
            {
                q: "Quelles opérations sont interdites en mode utilisateur ?",
                r: "En Ring 3 : <strong>accès aux ports I/O</strong> (instructions IN/OUT), <strong>modification de la table des pages</strong> (registre CR3), <strong>désactivation des interruptions</strong> (CLI), <strong>halt du CPU</strong> (HLT), accès à certaines zones mémoire (noyau)."
            }
        ]
    },
    {
        id: 34,
        title: "Exceptions et interruptions",
        resume: `
            <p>Ce sont des <strong>événements qui interrompent</strong> l'exécution normale :</p>
            <ul>
                <li>Le CPU <strong>saute immédiatement</strong> à un <strong>traitant</strong> (handler)</li>
                <li>Le traitant s'exécute en <strong>mode privilégié</strong></li>
                <li>Défini par le noyau au démarrage (table des vecteurs d'interruption)</li>
                <li>Après traitement, <strong>retour à l'exécution normale</strong></li>
            </ul>
            <p><strong>Différence clé</strong> :</p>
            <ul>
                <li><strong>Exception</strong> : causée par le CPU lui-même (erreur, instruction spéciale)</li>
                <li><strong>Interruption</strong> : causée par un périphérique externe</li>
            </ul>
        `,
        questions: [
            {
                q: "Quelle est la différence entre exception et interruption ?",
                r: "<strong>Exception</strong> : générée par le CPU suite à une instruction (division par zéro, page fault, syscall). <strong>Synchrone</strong>. <strong>Interruption</strong> : générée par un périphérique externe (clavier, disque, timer). <strong>Asynchrone</strong>, peut arriver n'importe quand."
            },
            {
                q: "Qu'est-ce que la table des vecteurs d'interruption ?",
                r: "C'est un tableau en mémoire où chaque entrée contient l'<strong>adresse du traitant</strong> pour un type d'interruption/exception. Configurée par le noyau au boot. Quand l'interruption N arrive, le CPU saute à l'adresse stockée à l'index N."
            }
        ]
    },
    {
        id: 35,
        title: "Exception",
        resume: `
            <p>Une <strong>exception</strong> est une interruption générée par le processeur lui-même :</p>
            <ul>
                <li>Se produit pendant l'<strong>exécution d'une instruction</strong></li>
                <li>Nécessite un <strong>contexte d'exécution</strong> (un programme qui tourne)</li>
            </ul>
            <p><strong>Exemples d'exceptions</strong> :</p>
            <ul>
                <li><strong>Division par zéro</strong></li>
                <li><strong>Page fault</strong> : accès à une page non mappée</li>
                <li><strong>Segmentation fault</strong> : accès mémoire interdit</li>
                <li><strong>Invalid opcode</strong> : instruction inconnue</li>
            </ul>
            <p><strong>Traitement</strong> : le traitant essaie de corriger. Succès → reprise. Échec → <strong>le processus est tué</strong>.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce qu'un Page Fault et pourquoi ce n'est pas toujours une erreur ?",
                r: "Un <strong>page fault</strong> se produit quand on accède à une page non présente en RAM. Ce n'est pas toujours une erreur : la page peut être sur le <strong>disque (swap)</strong> ou jamais allouée (<strong>lazy allocation</strong>). Le noyau charge la page et reprend l'exécution. C'est une erreur seulement si l'adresse est vraiment invalide."
            },
            {
                q: "Que se passe-t-il lors d'une segmentation fault ?",
                r: "Le processus a tenté d'accéder à une adresse <strong>non autorisée</strong> (hors de son espace, ou en écriture sur une zone read-only). Le noyau ne peut pas corriger → il envoie le signal <strong>SIGSEGV</strong> au processus, qui le tue par défaut (avec un core dump si activé)."
            }
        ]
    },
    {
        id: 36,
        title: "Interruptions",
        resume: `
            <p><strong>IRQ</strong> (Interrupt Request) : signal d'un périphérique au CPU.</p>
            <p><strong>Mécanismes</strong> :</p>
            <ul>
                <li>Signal électrique sur une broche du processeur</li>
                <li>Ou écriture à une adresse spéciale (MMIO)</li>
            </ul>
            <p><strong>Exemples</strong> :</p>
            <ul>
                <li>Appui sur une touche clavier</li>
                <li>Paquet réseau reçu</li>
                <li>Disque a fini une opération</li>
                <li><strong>Timer/horloge</strong> : interruption régulière (~1ms sous Linux)</li>
            </ul>
            <p class="key-point">L'interruption timer est cruciale : elle permet au noyau de reprendre le contrôle régulièrement (ordonnancement préemptif).</p>
            <p>Voir les interruptions : <code>cat /proc/interrupts</code></p>
        `,
        questions: [
            {
                q: "Pourquoi l'interruption timer est-elle si importante ?",
                r: "Elle permet l'<strong>ordonnancement préemptif</strong>. Sans elle, un processus qui ne fait pas d'appel système pourrait garder le CPU indéfiniment. Le timer interrompt régulièrement (~1ms) pour que le noyau puisse décider de changer de processus."
            },
            {
                q: "Comment le CPU sait-il quel périphérique a généré une interruption ?",
                r: "Chaque périphérique a un <strong>numéro d'IRQ</strong> attribué. Le contrôleur d'interruptions (APIC) indique au CPU le numéro de l'IRQ. Le CPU consulte la table des vecteurs pour trouver le bon traitant (dans le pilote du périphérique)."
            }
        ]
    },
    {
        id: 37,
        title: "Une exception particulière : l'appel système",
        resume: `
            <p>L'<strong>appel système (syscall)</strong> est une exception <strong>volontaire</strong> :</p>
            <ul>
                <li>Déclenché par le programme pour demander un service au noyau</li>
                <li>Provoque le <strong>passage en mode privilégié</strong></li>
                <li>Exemples : <code>open()</code>, <code>read()</code>, <code>write()</code>, <code>fork()</code></li>
            </ul>
            <p><strong>Pourquoi passer par le noyau ?</strong></p>
            <ul>
                <li>Accéder au <strong>matériel</strong> (disque, réseau)</li>
                <li>Créer des <strong>processus</strong></li>
                <li>Allouer de la <strong>mémoire</strong></li>
                <li>Communiquer avec d'autres <strong>processus</strong></li>
            </ul>
        `,
        questions: [
            {
                q: "Pourquoi les appels système sont-ils nécessaires ?",
                r: "Les programmes utilisateur n'ont <strong>pas accès au matériel</strong> directement (mode utilisateur). Pour lire un fichier, envoyer un paquet réseau, ou créer un processus, ils doivent demander au noyau qui a les privilèges. L'appel système est cette demande."
            },
            {
                q: "Quelle est la différence entre un appel système et un appel de fonction ?",
                r: "Un appel de fonction reste en <strong>mode utilisateur</strong>. Un appel système provoque un <strong>changement de mode</strong> (user → kernel), une sauvegarde du contexte, l'exécution de code noyau, puis le retour. C'est ~100-1000x plus lent qu'un appel de fonction."
            }
        ]
    },
    {
        id: 38,
        title: "Fonctionnement d'un appel système",
        resume: `
            <p><strong>Étapes d'un syscall</strong> (x86) :</p>
            <ol>
                <li>Numéro du syscall dans <code>%eax</code></li>
                <li>Paramètres dans <code>%ebx, %ecx, %edx, %esi, %edi</code></li>
                <li>Instruction <code>syscall</code> (ou <code>int 0x80</code>)</li>
                <li>CPU passe en Ring 0, saute au traitant</li>
                <li>Noyau vérifie les paramètres et droits</li>
                <li>Exécute le code du syscall</li>
                <li>Résultat dans <code>%eax</code></li>
                <li>Retour en mode utilisateur</li>
            </ol>
            <p><strong>Outils</strong> :</p>
            <ul>
                <li><code>strace</code> : trace les appels système d'un programme</li>
                <li><a href="https://syscalls.mebeim.net">syscalls.mebeim.net</a> : liste des syscalls Linux</li>
            </ul>
        `,
        questions: [
            {
                q: "Comment fonctionne l'instruction syscall ?",
                r: "L'instruction <code>syscall</code> (x86-64) fait : 1) Sauvegarde du PC et flags. 2) Passage en Ring 0. 3) Saut à une adresse fixe (configurée dans un MSR). Le noyau utilise le numéro dans %rax pour indexer sa table de syscalls et appeler la bonne fonction."
            },
            {
                q: "Pourquoi le noyau vérifie-t-il les paramètres d'un syscall ?",
                r: "Le programme pourrait être <strong>malveillant ou bugué</strong>. Le noyau vérifie : 1) Les <strong>pointeurs</strong> sont-ils dans l'espace utilisateur ? 2) L'utilisateur a-t-il les <strong>droits</strong> ? 3) Les valeurs sont-elles <strong>valides</strong> ? Sans ces vérifications, un processus pourrait faire crasher le noyau."
            },
            {
                q: "À quoi sert strace ?",
                r: "<code>strace</code> affiche tous les <strong>appels système</strong> faits par un programme : quel syscall, avec quels arguments, quel résultat. Très utile pour <strong>débugger</strong> : voir pourquoi un fichier ne s'ouvre pas, comprendre ce que fait un programme, détecter des problèmes de permissions."
            }
        ]
    },
    {
        id: 39,
        title: "Processus et threads",
        resume: `
            <p><em>Diapo de transition vers la section Processus et Threads</em></p>
        `,
        questions: [
            {
                q: "Quelle est la relation entre processus et threads ?",
                r: "Un <strong>processus</strong> est un conteneur : espace mémoire, fichiers ouverts, PID. Un <strong>thread</strong> est un fil d'exécution dans ce conteneur. Un processus a au minimum 1 thread. Plusieurs threads partagent la mémoire du processus mais ont chacun leur pile."
            }
        ]
    },
    {
        id: 40,
        title: "Qu'est-ce qu'un processus ?",
        resume: `
            <p><strong>Processus</strong> = instance d'un programme en cours d'exécution.</p>
            <ul>
                <li><strong>Programme</strong> : fichier statique sur disque (exécutable)</li>
                <li><strong>Processus</strong> : programme chargé en mémoire, avec son contexte</li>
            </ul>
            <p><strong>Points importants</strong> :</p>
            <ul>
                <li>L'OS exécute <strong>plusieurs processus simultanément</strong></li>
                <li>Plusieurs processus peuvent exécuter le <strong>même programme</strong></li>
                <li>Attention : plusieurs fenêtres Firefox = souvent le même processus !</li>
            </ul>
            <p class="key-point">Programme = recette de cuisine. Processus = plat en train d'être cuisiné.</p>
        `,
        questions: [
            {
                q: "Quelle est la différence entre un programme et un processus ?",
                r: "Le <strong>programme</strong> est un fichier sur le disque (code compilé). Le <strong>processus</strong> est ce programme en cours d'exécution : chargé en mémoire, avec un PID, des fichiers ouverts, un état. Un même programme peut donner plusieurs processus indépendants."
            },
            {
                q: "Plusieurs fenêtres d'une application = plusieurs processus ?",
                r: "Pas forcément ! Beaucoup d'applications modernes sont <strong>multi-threadées</strong> : un seul processus avec plusieurs threads (et fenêtres). Mais certaines (comme Chrome) utilisent un <strong>processus par onglet</strong> pour l'isolation. Ça dépend de l'architecture de l'application."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(4, section4Data);
