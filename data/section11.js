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
                q: "Qu'est-ce que le swap selon cette diapo ?",
                r: "« Espace d'échange », extension de la mémoire physique RAM, généralement stocké sur un <strong>disque dur</strong>."
            },
            {
                q: "D'après cette diapo, comment fonctionne le swap ?",
                r: "Si besoin de libérer de la RAM : <strong>déplacement de pages</strong> vers le swap. La PTE contient l'info que la page est dans le swap. <strong>Rechargement</strong> en RAM si besoin d'y accéder."
            },
            {
                q: "Selon cette diapo, quels types de pages sont swappées ?",
                r: "Seules les pages <strong>privées et/ou anonymes</strong> vont dans le swap. Les projections publiques (fichiers) → sauvegarde directement dans le fichier."
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
                q: "Qu'est-ce que la MMU selon cette diapo ?",
                r: "Circuit dédié du processeur pour <strong>traduire les adresses</strong>. Sait lire la table de pages, gère les droits d'accès, déclenche les exceptions pour défaut de page."
            },
            {
                q: "D'après cette diapo, où est stockée l'adresse du PGD sur x86 ?",
                r: "L'adresse du PGD est dans le registre <strong>CR3</strong>."
            },
            {
                q: "Qu'est-ce que le TLB selon cette diapo ?",
                r: "<strong>Cache</strong> des dernières traductions dans la MMU. Très rapide, mais petit : quelques centaines d'entrées. <strong>TLB miss</strong> → traduction par la MMU / l'OS."
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
                q: "Selon cette diapo, que se passe-t-il lors d'un changement de contexte ?",
                r: "Changement de processus → changement de table de pages, changement de l'adresse dans le registre <strong>CR3</strong> (sur x86), et <strong>vider le TLB</strong> (TLB flush)."
            },
            {
                q: "D'après cette diapo, pourquoi le vidage du TLB est-il coûteux ?",
                r: "Après un changement de contexte, les premiers accès mémoire sont lents (TLB misses)."
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
                q: "Selon cette diapo, quelles sont les caractéristiques de l'espace virtuel du noyau ?",
                r: "Accessible uniquement en <strong>mode privilégié</strong> et <strong>pas modifié</strong> lors des changements de contexte."
            },
            {
                q: "D'après cette diapo, quels sont les besoins du noyau ?",
                r: "Son code : binaire <strong>autosuffisant</strong> (pas de bibliothèques), fonctions de base réimplémentées (pas de libc), ses propres données. Tout petit : <strong>10-100 Mo</strong>."
            },
            {
                q: "Selon cette diapo, à quoi le noyau peut-il accéder ?",
                r: "Le noyau peut accéder à <strong>toute la mémoire</strong> de tous les processus."
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
                q: "Selon cette diapo, comment est divisé l'espace virtuel dans Linux 64 bits ?",
                r: "<strong>Mémoire pour le noyau</strong> (partie haute des adresses) et <strong>mémoire du processus courant</strong> (partie basse). 128 To virtuels chacun."
            },
            {
                q: "D'après cette diapo, quelles sont les caractéristiques de l'espace noyau ?",
                r: "L'espace noyau est <strong>partagé</strong> entre tous les processus, mais une seule fois en <strong>mémoire physique</strong>."
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
                q: "Selon cette diapo, que faire si toute la RAM et tout le swap sont complets ?",
                r: "<strong>Tuer un processus</strong> pour libérer de la mémoire, fait par le <strong>OOM-killer</strong> (Out Of Memory killer)."
            },
            {
                q: "Citez les critères pour choisir quel processus tuer mentionnés dans cette diapo.",
                r: "Un processus qui va libérer <strong>assez de mémoire</strong>, un processus pour lequel on ne va pas perdre <strong>beaucoup de données</strong>, et <strong>pas</strong> un processus nécessaire au système (init, serveur graphique...)."
            },
            {
                q: "Qu'est-ce que l'OOM-score d'après cette diapo ?",
                r: "Linux maintient un score pour chaque processus."
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
                q: "Qu'est-ce que NUMA selon cette diapo ?",
                r: "Non-Uniform Memory Access. Certaines zones mémoires sont plus <strong>proches</strong> d'un processeur que d'un autre, surtout dans les machines avec <strong>plusieurs processeurs</strong>."
            },
            {
                q: "D'après cette diapo, quelles sont les conséquences de NUMA ?",
                r: "Chaque processeur peut accéder à toute la mémoire, mais accéder à la mémoire <strong>hors de son banc</strong> coûte plus cher."
            },
            {
                q: "Selon cette diapo, quelle est l'allocation par défaut sur NUMA ?",
                r: "Allocation <strong>first touch</strong> (dans le banc du cœur qui accède en premier)."
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
                q: "Citez les appels système pour guider la gestion de la mémoire mentionnés dans cette diapo.",
                r: "<code>mmap()</code> (adresse virtuelle et permissions souhaitées), <code>mprotect()</code> (changer les permissions d'une page mémoire), <code>mlock()</code> (<strong>empêcher</strong> une page d'être swappée), <code>numa</code> ou <strong>Hwloc</strong> (choisir le nœud NUMA), et <code>madvise()</code> (indiquer comment la page sera utilisée)."
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
                q: "Selon cette diapo, que signifie VIRT dans top/htop ?",
                r: "<strong>VIRT</strong> : toute la mémoire virtuelle utilisée."
            },
            {
                q: "D'après cette diapo, que signifie RES dans top/htop ?",
                r: "<strong>RES</strong> (résiduelle) : mémoire physique utilisée (inclut SHR)."
            },
            {
                q: "Selon cette diapo, que montre la métrique 'Disponible' dans free -h ?",
                r: "Mémoire utilisable (RAM libre + cache récupérable). Linux utilise la mémoire libre comme <strong>cache I/O</strong>."
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
        questions: []
    }
];

// Enregistrement des données
registerSectionData(11, section11Data);
