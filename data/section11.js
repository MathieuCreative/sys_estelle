// Section 11: Swap, Support matériel et Mémoire du noyau
// Diapos 101 à 110 du PDF 11

const section11Data = [
    {
        id: 101,
        title: "Swap",
        resume: `
            <p><strong>Swap</strong> : « Espace d'échange », extension de la mémoire physique RAM.</p>
            <ul>
                <li>Généralement stocké sur un <strong>disque dur</strong> → lent !</li>
                <li>Peut être une <strong>partition dédiée</strong> ou un <strong>fichier</strong></li>
                <li>Ou même en RAM avec compression (<strong>zRAM</strong>)</li>
            </ul>
            <p><strong>Fonctionnement</strong> :</p>
            <ul>
                <li>Si besoin de libérer de la RAM : <strong>déplacement de pages</strong> vers le swap</li>
                <li>La PTE contient l'info que la page est dans le swap</li>
                <li><strong>Rechargement</strong> en RAM si besoin d'y accéder</li>
            </ul>
            <p><strong>Types de pages swappées</strong> :</p>
            <ul>
                <li>Seules les pages <strong>privées et/ou anonymes</strong> vont dans le swap</li>
                <li>Les projections publiques (fichiers) → sauvegarde directement dans le fichier</li>
            </ul>
            <p class="key-point">Le swap est entièrement géré par l'OS : quand swapper, quelles pages swapper...</p>
        `,
        questions: [
            {
                q: "Pourquoi le swap est-il lent ?",
                r: "Le swap est sur disque. Un accès disque HDD prend ~10ms, SSD ~0.1ms, contre ~100ns pour la RAM. C'est <strong>1000 à 100000× plus lent</strong>. Un processus qui swap beaucoup devient extrêmement lent (\"thrashing\")."
            },
            {
                q: "Qu'est-ce que zRAM ?",
                r: "<strong>zRAM</strong> compresse les pages en RAM au lieu de les écrire sur disque. Une page de 4 Ko peut être compressée à 1 Ko. C'est beaucoup plus rapide que le swap disque, au prix de quelques cycles CPU pour la compression/décompression."
            },
            {
                q: "Pourquoi les pages de fichiers ne vont-elles pas dans le swap ?",
                r: "Elles ont déjà un <strong>backing store</strong> : le fichier lui-même. Si la page est propre (non modifiée), on peut simplement la jeter et la recharger depuis le fichier. Si elle est modifiée (dirty), on la sauvegarde dans le fichier original."
            }
        ]
    },
    {
        id: 102,
        title: "Support matériel",
        resume: `
            <p><strong>MMU (Memory Management Unit)</strong> :</p>
            <ul>
                <li>Circuit dédié du processeur pour <strong>traduire les adresses</strong></li>
                <li>Sait lire la table de pages, gère les droits d'accès</li>
                <li>Déclenche les exceptions pour défaut de page</li>
                <li>Sur x86 : l'adresse du PGD est dans le registre <strong>CR3</strong></li>
            </ul>
            <p><strong>Problème</strong> : reste trop lent (plusieurs accès mémoire pour une traduction)</p>
            <p><strong>Note</strong> : certaines architectures (MIPS) n'ont pas de MMU → traduction logicielle.</p>
            <p><strong>TLB (Translation Lookaside Buffer)</strong> :</p>
            <ul>
                <li><strong>Cache</strong> des dernières traductions dans la MMU</li>
                <li>Très rapide, mais petit : quelques centaines d'entrées</li>
                <li><strong>TLB miss</strong> → traduction par la MMU / l'OS</li>
            </ul>
            <p class="key-point">Le TLB est crucial pour les performances : sans lui, chaque accès mémoire serait ~5× plus lent.</p>
        `,
        questions: [
            {
                q: "Pourquoi la MMU seule ne suffit-elle pas ?",
                r: "Avec 4 niveaux de tables, une traduction nécessite <strong>4 accès mémoire</strong> avant d'accéder à la donnée. Soit 5 accès au total au lieu de 1. Inacceptable pour les performances. Le <strong>TLB</strong> cache les traductions récentes."
            },
            {
                q: "Que se passe-t-il lors d'un TLB miss ?",
                r: "La MMU doit parcourir la table de pages pour trouver la traduction. Elle place ensuite le résultat dans le TLB pour les accès futurs. Si la page est invalide, un <strong>défaut de page</strong> est déclenché."
            }
        ]
    },
    {
        id: 103,
        title: "Changement de contexte",
        resume: `
            <p>Chaque processus a sa <strong>table des pages</strong>.</p>
            <p><strong>Lors d'un changement de contexte</strong> :</p>
            <ul>
                <li>Changement de processus → changement de table de pages</li>
                <li>Changement de l'adresse dans le registre <strong>CR3</strong> (sur x86)</li>
                <li><strong>Vider le TLB</strong> (TLB flush)</li>
            </ul>
            <p class="key-point">Le vidage du TLB est coûteux : après un changement de contexte, les premiers accès mémoire sont lents (TLB misses).</p>
        `,
        questions: [
            {
                q: "Pourquoi faut-il vider le TLB lors d'un changement de contexte ?",
                r: "Le TLB contient des traductions pour l'<strong>ancien processus</strong>. L'adresse virtuelle 0x1000 du processus A ne pointe pas vers la même page physique que 0x1000 du processus B. Utiliser les anciennes entrées serait une <strong>faille de sécurité</strong>."
            },
            {
                q: "Existe-t-il des optimisations pour éviter le flush complet du TLB ?",
                r: "Oui, les <strong>ASIDs</strong> (Address Space IDs) permettent de taguer les entrées TLB par processus. On peut garder les entrées de plusieurs processus et juste changer l'ASID actif. Réduit le coût des context switches."
            }
        ]
    },
    {
        id: 104,
        title: "Et la mémoire du noyau ?",
        resume: `
            <p><strong>Espace virtuel du noyau</strong> :</p>
            <ul>
                <li>Accessible uniquement en <strong>mode privilégié</strong></li>
                <li><strong>Pas modifié</strong> lors des changements de contexte</li>
            </ul>
            <p><strong>Le noyau est un contexte d'exécution</strong> :</p>
            <ul>
                <li>A un espace virtuel qui lui est propre</li>
                <li>Et donc une table de pages</li>
                <li>Peut accéder à <strong>toute la mémoire</strong> de tous les processus</li>
            </ul>
            <p><strong>Besoins du noyau</strong> :</p>
            <ul>
                <li>Son code : binaire <strong>autosuffisant</strong> (pas de bibliothèques)</li>
                <li>Fonctions de base réimplémentées (pas de libc)</li>
                <li>Ses propres données</li>
                <li>Tout petit : <strong>10-100 Mo</strong> !</li>
            </ul>
        `,
        questions: [
            {
                q: "Pourquoi le noyau n'utilise-t-il pas la libc ?",
                r: "La libc est en <strong>espace utilisateur</strong> et dépend du noyau (appels système). Le noyau ne peut pas dépendre de quelque chose qui dépend de lui ! Il réimplémente les fonctions de base (strcpy, memcpy...) en interne."
            },
            {
                q: "Pourquoi l'espace noyau n'est-il pas modifié lors des context switches ?",
                r: "Le noyau est <strong>partagé</strong> par tous les processus. Les tables de pages de chaque processus incluent le mapping du noyau. Ainsi, quand on entre en mode noyau, on a toujours accès au code du noyau, quel que soit le processus."
            }
        ]
    },
    {
        id: 105,
        title: "Espace virtuel dans Linux 64 bits",
        resume: `
            <p><strong>Division en deux espaces</strong> :</p>
            <ul>
                <li><strong>Mémoire pour le noyau</strong> : partie haute des adresses</li>
                <li><strong>Mémoire du processus courant</strong> : partie basse</li>
                <li>128 To virtuels chacun</li>
            </ul>
            <p><strong>Caractéristiques</strong> :</p>
            <ul>
                <li>L'espace noyau est <strong>partagé</strong> entre tous les processus</li>
                <li>Mais une seule fois en <strong>mémoire physique</strong></li>
            </ul>
            <p class="key-point">Avec 48 bits d'adresses : 0x0000000000000000 - 0x00007FFFFFFFFFFF pour l'utilisateur, 0xFFFF800000000000 - 0xFFFFFFFFFFFFFFFF pour le noyau.</p>
        `,
        questions: [
            {
                q: "Comment le noyau accède-t-il à la mémoire d'un processus utilisateur ?",
                r: "Le noyau peut accéder à <strong>tout l'espace d'adressage</strong> quand il s'exécute dans le contexte d'un processus. Il peut lire/écrire dans l'espace utilisateur (ex: pour copy_from_user()). Mais il doit vérifier les permissions."
            },
            {
                q: "Pourquoi y a-t-il un \"trou\" entre l'espace utilisateur et l'espace noyau ?",
                r: "C'est la zone <strong>non-canonique</strong> en x86_64. Les bits 48-63 doivent être tous 0 (utilisateur) ou tous 1 (noyau). Les adresses avec un mélange sont invalides. Cela crée naturellement une séparation."
            }
        ]
    },
    {
        id: 106,
        title: "Que faire si toute la mémoire physique est utilisée ?",
        resume: `
            <p><strong>Situation</strong> : toute la RAM et tout le swap sont complets.</p>
            <p><strong>Solution</strong> : <strong>tuer un processus</strong> pour libérer de la mémoire.</p>
            <ul>
                <li>Fait par le <strong>OOM-killer</strong> (Out Of Memory killer)</li>
            </ul>
            <p><strong>Quel processus tuer ?</strong></p>
            <ul>
                <li>Celui qui demande de la mémoire ? Peut-être innocent...</li>
                <li>Un processus qui va libérer <strong>assez de mémoire</strong></li>
                <li>Un processus pour lequel on ne va pas perdre <strong>beaucoup de données</strong></li>
                <li><strong>Pas</strong> un processus nécessaire au système (init, serveur graphique...)</li>
            </ul>
            <p><strong>OOM-score</strong> : Linux maintient un score pour chaque processus.</p>
            <p>cf <code>man proc_pid_oom_score_adj</code></p>
        `,
        questions: [
            {
                q: "Pourquoi le processus qui demande la mémoire n'est-il pas forcément le coupable ?",
                r: "Avec l'<strong>allocation paresseuse</strong>, un processus peut avoir alloué 10 Go il y a longtemps sans les utiliser. Un autre processus innocent qui touche une page déclenche l'allocation réelle et... OOM ! C'est injuste mais inévitable."
            },
            {
                q: "Comment ajuster le OOM-score d'un processus ?",
                r: "Écrire dans <code>/proc/PID/oom_score_adj</code>. Valeurs de -1000 (ne jamais tuer) à +1000 (tuer en premier). Les processus critiques comme init ont -1000. Un processus gourmand non essentiel peut avoir +500."
            }
        ]
    },
    {
        id: 107,
        title: "Machines NUMA",
        resume: `
            <p><strong>NUMA</strong> : Non-Uniform Memory Access.</p>
            <ul>
                <li>Certaines zones mémoires sont plus <strong>proches</strong> d'un processeur que d'un autre</li>
                <li>Surtout dans les machines avec <strong>plusieurs processeurs</strong></li>
                <li>Possible même au sein d'un unique processeur (sub-numa clustering)</li>
            </ul>
            <p>On parle de <strong>banc NUMA</strong> ou <strong>nœud NUMA</strong>.</p>
            <p><strong>Conséquences</strong> :</p>
            <ul>
                <li>Chaque processeur peut accéder à toute la mémoire</li>
                <li>Mais accéder à la mémoire <strong>hors de son banc</strong> coûte plus cher</li>
            </ul>
            <p><strong>Questions</strong> :</p>
            <ul>
                <li>Sur quel banc NUMA allouer la mémoire ?</li>
                <li>Manque de place : allouer ailleurs ou migrer des pages ?</li>
            </ul>
            <p><strong>Par défaut</strong> : allocation <strong>first touch</strong> (dans le banc du cœur qui accède en premier).</p>
        `,
        questions: [
            {
                q: "Pourquoi l'accès à la mémoire distante est-il plus lent ?",
                r: "La mémoire locale est connectée <strong>directement</strong> au processeur. La mémoire distante doit passer par l'<strong>interconnect</strong> (ex: QPI, UPI chez Intel) vers l'autre processeur. Cela ajoute de la latence (~50% de plus typiquement)."
            },
            {
                q: "Qu'est-ce que l'allocation first touch ?",
                r: "La page physique est allouée dans le <strong>banc NUMA du cœur</strong> qui y accède pour la première fois. Si le thread 0 sur le nœud 0 initialise un tableau, il sera alloué sur le nœud 0, même si le thread 1 sur le nœud 1 l'utilisera ensuite."
            }
        ]
    },
    {
        id: 108,
        title: "Guider la gestion de la mémoire",
        resume: `
            <p>On peut donner des <strong>indications au noyau</strong> :</p>
            <ul>
                <li><code>mmap()</code> : adresse virtuelle et permissions souhaitées</li>
                <li><code>mprotect()</code> : changer les permissions d'une page mémoire</li>
                <li><code>mlock()</code> : <strong>empêcher</strong> une page d'être swappée</li>
                <li><code>numa</code> (man 3 numa) ou <strong>Hwloc</strong> : choisir le nœud NUMA</li>
                <li><code>madvise()</code> : indiquer comment la page sera utilisée</li>
            </ul>
            <p class="key-point">Ces appels système permettent d'optimiser la gestion mémoire pour des cas spécifiques.</p>
        `,
        questions: [
            {
                q: "Quand utiliser mlock() ?",
                r: "Pour les applications <strong>temps-réel</strong> ou sensibles à la latence. Un défaut de page peut prendre des millisecondes (si swap). mlock() garantit que la page reste en RAM. Aussi utilisé pour les données sensibles (éviter qu'elles soient écrites sur disque)."
            },
            {
                q: "Que permet madvise() ?",
                r: "Informer le noyau du <strong>pattern d'accès</strong> prévu : <code>MADV_SEQUENTIAL</code> (accès séquentiel, précharger), <code>MADV_RANDOM</code> (accès aléatoire, ne pas précharger), <code>MADV_DONTNEED</code> (données plus nécessaires, libérer)."
            }
        ]
    },
    {
        id: 109,
        title: "Métriques de la consommation mémoire",
        resume: `
            <p><strong>Par processus</strong> :</p>
            <ul>
                <li><code>cat /proc/$pid/maps</code> : mapping mémoire détaillé</li>
                <li>Dans <code>top</code> / <code>htop</code> :</li>
                <ul>
                    <li><strong>VIRT</strong> : toute la mémoire virtuelle utilisée</li>
                    <li><strong>SHR</strong> (shared) : mémoire partagée entre processus</li>
                    <li><strong>RES</strong> (résiduelle) : mémoire physique utilisée (inclut SHR)</li>
                    <li><strong>MEM%</strong> : RES / quantité de RAM</li>
                </ul>
            </ul>
            <p><strong>Vue globale</strong> (<code>free -h</code>) :</p>
            <ul>
                <li>RAM totale, partagée, buffers, cache</li>
                <li><strong>Disponible</strong> : mémoire utilisable (RAM libre + cache récupérable)</li>
                <li>Linux utilise la mémoire libre comme <strong>cache I/O</strong></li>
            </ul>
        `,
        questions: [
            {
                q: "Quelle est la différence entre VIRT et RES ?",
                r: "<strong>VIRT</strong> = tout ce qui est mappé virtuellement (y compris non alloué physiquement). <strong>RES</strong> = seulement ce qui est réellement en RAM. Un processus peut avoir 10 Go VIRT mais 100 Mo RES (allocation paresseuse)."
            },
            {
                q: "Pourquoi \"free\" montre-t-il peu de mémoire libre même si le système va bien ?",
                r: "Linux utilise la RAM \"libre\" pour le <strong>cache disque</strong>. C'est intelligent : mieux vaut utiliser la RAM que la laisser vide. Ce cache est libéré automatiquement si un processus a besoin de mémoire. Regardez la colonne \"available\", pas \"free\"."
            }
        ]
    },
    {
        id: 110,
        title: "Résumons !",
        resume: `
            <p><em>Diapo de synthèse sur la gestion de la mémoire.</em></p>
            <p><strong>Points clés à retenir</strong> :</p>
            <ul>
                <li>La <strong>mémoire virtuelle</strong> isole les processus et abstrait la mémoire physique</li>
                <li>La <strong>pagination</strong> découpe la mémoire en pages de 4 Ko</li>
                <li>Les <strong>tables de pages multi-niveaux</strong> économisent de la mémoire</li>
                <li>Le <strong>TLB</strong> cache les traductions pour la performance</li>
                <li>L'<strong>allocation paresseuse</strong> et le <strong>CoW</strong> optimisent l'utilisation mémoire</li>
                <li>Le <strong>swap</strong> étend la RAM au prix de la performance</li>
                <li>L'<strong>OOM-killer</strong> intervient en dernier recours</li>
            </ul>
        `,
        questions: [
            {
                q: "Résumez le trajet d'un accès mémoire.",
                r: "1) Processus utilise une <strong>adresse virtuelle</strong>. 2) <strong>TLB</strong> vérifie si traduction en cache. 3) Si miss, <strong>MMU</strong> parcourt la table de pages. 4) Si page invalide, <strong>défaut de page</strong> → noyau alloue/charge la page. 5) Adresse <strong>physique</strong> obtenue, accès à la RAM."
            },
            {
                q: "Quels mécanismes permettent le partage de mémoire entre processus ?",
                r: "1) <strong>Bibliothèques partagées</strong> : même page physique, mappée en lecture seule. 2) <strong>mmap() MAP_SHARED</strong> : mémoire partagée explicite. 3) <strong>fork()</strong> avec CoW : pages partagées jusqu'à modification. 4) <strong>Shared memory</strong> (shm_open, shmget)."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(11, section11Data);
