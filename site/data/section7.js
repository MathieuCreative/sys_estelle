// Section 7: Algorithmes d'Ordonnancement
// Diapos 61 à 70 du PDF 7 - correspondance exacte

const section7Data = [
    {
        id: 61,
        title: "Algorithmes d'ordonnancement",
        resume: `
            <p><em>Diapo de titre de la section sur les algorithmes d'ordonnancement</em></p>
        `,
        questions: [
            {
                q: "Quels sont les principaux algorithmes d'ordonnancement ?",
                r: "Les algorithmes classiques sont : <strong>FIFO/FCFS</strong> (premier arrivé, premier servi), <strong>Round-Robin</strong> (tourniquet avec quantum), <strong>Priorités</strong> (fixes ou dynamiques), <strong>SJF</strong> (plus court d'abord), <strong>MLFQ</strong> (files multi-niveaux). Chacun a ses avantages selon le contexte."
            }
        ]
    },
    {
        id: 62,
        title: "FIFO / FCFS",
        resume: `
            <p><strong>FIFO</strong> (First In, First Out) ou <strong>FCFS</strong> (First Come, First Served) :</p>
            <ul>
                <li>Les processus sont exécutés dans l'<strong>ordre d'arrivée</strong></li>
                <li>Pas de préemption : un processus garde le CPU jusqu'à la fin ou blocage</li>
                <li>Très <strong>simple</strong> à implémenter</li>
            </ul>
            <p><strong>Problèmes</strong> :</p>
            <ul>
                <li><strong>Effet convoi</strong> : un long processus bloque tous les autres</li>
                <li>Temps de réponse <strong>très mauvais</strong> pour les petites tâches</li>
                <li>Non adapté aux systèmes interactifs</li>
            </ul>
        `,
        questions: [
            {
                q: "Qu'est-ce que l'effet convoi (convoy effect) ?",
                r: "C'est quand un <strong>processus long</strong> (CPU-bound) s'exécute en premier et fait attendre tous les autres. Même si les processus suivants sont très courts, ils doivent attendre la fin du long processus. Comme des voitures bloquées derrière un camion lent."
            },
            {
                q: "Quand FIFO est-il acceptable ?",
                r: "FIFO convient pour les <strong>systèmes batch</strong> où l'ordre d'arrivée est significatif et où les tâches ont des durées similaires. Aussi utilisé comme base dans des algorithmes plus complexes (ex: Round-Robin = FIFO avec préemption)."
            }
        ]
    },
    {
        id: 63,
        title: "Round-Robin",
        resume: `
            <p><strong>Round-Robin</strong> (tourniquet) :</p>
            <ul>
                <li>Chaque processus reçoit un <strong>quantum</strong> de temps CPU</li>
                <li>Après le quantum, le processus est <strong>préempté</strong> et remis en fin de file</li>
                <li>Équité : tous les processus obtiennent du temps CPU</li>
            </ul>
            <p><strong>Caractéristiques</strong> :</p>
            <ul>
                <li>Temps de réponse <strong>prévisible</strong> et borné</li>
                <li>Bon pour les systèmes <strong>interactifs</strong></li>
                <li>Overhead dû aux changements de contexte fréquents</li>
            </ul>
            <p class="key-point">Le choix du quantum est crucial : trop court = overhead, trop long = mauvaise réactivité.</p>
        `,
        questions: [
            {
                q: "Comment Round-Robin garantit-il l'équité ?",
                r: "Chaque processus prêt obtient exactement un <strong>quantum</strong> avant de céder la place au suivant. Avec N processus et un quantum Q, chaque processus obtient 1/N du CPU et attend au maximum (N-1)*Q avant sa prochaine exécution. C'est mathématiquement équitable."
            },
            {
                q: "Quel est l'impact du quantum sur les performances ?",
                r: "<strong>Quantum court</strong> : beaucoup de context switches → overhead important mais bonne réactivité. <strong>Quantum long</strong> : peu d'overhead mais si un processus calcule pendant tout son quantum, les autres attendent longtemps. Typiquement 10-100ms."
            }
        ]
    },
    {
        id: 64,
        title: "Ordonnancement par priorités",
        resume: `
            <p><strong>Priorités</strong> : chaque processus a une priorité, le plus prioritaire s'exécute.</p>
            <p><strong>Types de priorités</strong> :</p>
            <ul>
                <li><strong>Statiques</strong> : fixées à la création, ne changent pas</li>
                <li><strong>Dynamiques</strong> : ajustées selon le comportement du processus</li>
            </ul>
            <p><strong>Problème majeur : la famine (starvation)</strong></p>
            <ul>
                <li>Un processus de faible priorité peut <strong>ne jamais s'exécuter</strong></li>
                <li>Si des processus prioritaires arrivent sans cesse</li>
            </ul>
            <p><strong>Solution : vieillissement (aging)</strong></p>
            <ul>
                <li>Augmenter la priorité des processus qui attendent longtemps</li>
            </ul>
        `,
        questions: [
            {
                q: "Qu'est-ce que la famine (starvation) en ordonnancement ?",
                r: "C'est quand un processus de <strong>basse priorité</strong> ne s'exécute jamais car des processus plus prioritaires monopolisent le CPU. Le processus \"meurt de faim\". Problème grave car un processus légitime peut attendre indéfiniment."
            },
            {
                q: "Comment l'aging résout-il le problème de famine ?",
                r: "L'<strong>aging</strong> augmente progressivement la priorité d'un processus qui attend. Après un certain temps d'attente, même un processus initialement peu prioritaire devient suffisamment prioritaire pour s'exécuter. Cela garantit que tout processus finira par obtenir du CPU."
            }
        ]
    },
    {
        id: 65,
        title: "Nice et priorités sous Linux",
        resume: `
            <p><strong>Nice</strong> : valeur de -20 à +19 qui influence la priorité.</p>
            <ul>
                <li><strong>Nice négatif</strong> (-20) : plus prioritaire (\"moins gentil\" avec les autres)</li>
                <li><strong>Nice positif</strong> (+19) : moins prioritaire (\"plus gentil\")</li>
                <li>Valeur par défaut : <strong>0</strong></li>
            </ul>
            <p><strong>Commandes</strong> :</p>
            <ul>
                <li><code>nice -n 10 commande</code> : lance avec nice +10</li>
                <li><code>renice -n 5 -p PID</code> : change le nice d'un processus existant</li>
            </ul>
            <p class="key-point">Seul root peut diminuer le nice (augmenter la priorité).</p>
        `,
        questions: [
            {
                q: "Pourquoi le nice s'appelle-t-il \"nice\" ?",
                r: "Un processus avec un nice élevé est <strong>\"gentil\"</strong> avec les autres : il leur cède volontairement de la priorité. Un processus avec nice négatif est \"moins gentil\" car il prend plus de ressources. C'est une métaphore de politesse."
            },
            {
                q: "Pourquoi seul root peut-il diminuer le nice ?",
                r: "Si tout utilisateur pouvait augmenter sa priorité, chacun le ferait et l'équité serait brisée. Permettre uniquement d'<strong>augmenter</strong> le nice (baisser sa priorité) évite les abus. Root peut tout modifier car il est supposé savoir ce qu'il fait."
            }
        ]
    },
    {
        id: 66,
        title: "Files d'attente multi-niveaux (MLFQ)",
        resume: `
            <p><strong>Multi-Level Feedback Queue</strong> : combinaison de plusieurs files avec priorités.</p>
            <ul>
                <li>Plusieurs <strong>files</strong> avec priorités différentes</li>
                <li>Les processus peuvent <strong>changer de file</strong> selon leur comportement</li>
            </ul>
            <p><strong>Règles typiques</strong> :</p>
            <ul>
                <li>Nouveau processus → file de <strong>haute priorité</strong></li>
                <li>Si utilise tout son quantum → <strong>descend</strong> d'une file (CPU-bound)</li>
                <li>Si bloque avant la fin → <strong>reste</strong> ou monte (I/O-bound)</li>
            </ul>
            <p class="key-point">MLFQ favorise naturellement les processus interactifs (I/O-bound) car ils bloquent souvent.</p>
        `,
        questions: [
            {
                q: "Pourquoi MLFQ favorise-t-il les processus interactifs ?",
                r: "Les processus <strong>interactifs</strong> font beaucoup d'I/O donc bloquent souvent avant d'épuiser leur quantum. Ils restent dans les files de haute priorité. Les processus <strong>CPU-bound</strong> utilisent tout leur quantum et descendent vers les files de basse priorité."
            },
            {
                q: "Comment MLFQ évite-t-il la famine ?",
                r: "Périodiquement, tous les processus sont <strong>remontés</strong> dans la file de plus haute priorité (priority boost). Cela garantit que même les processus CPU-bound qui sont descendus tout en bas auront une chance de s'exécuter régulièrement."
            }
        ]
    },
    {
        id: 67,
        title: "Où stocker les tâches prêtes ?",
        resume: `
            <p><strong>Runqueue</strong> : structure de données contenant les processus prêts à s'exécuter.</p>
            <p><strong>Options de structure de données</strong> :</p>
            <ul>
                <li><strong>Liste chaînée</strong> : simple mais recherche en O(n)</li>
                <li><strong>Tableau de listes</strong> (par priorité) : O(1) pour trouver le plus prioritaire</li>
                <li><strong>Arbre rouge-noir</strong> : utilisé par CFS de Linux (O(log n))</li>
            </ul>
            <p class="key-point">Linux CFS utilise un arbre rouge-noir trié par "virtual runtime" : le processus avec le moins de temps CPU virtuel est choisi.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce que le CFS (Completely Fair Scheduler) ?",
                r: "C'est l'ordonnanceur par défaut de Linux depuis 2007. Il vise une <strong>équité parfaite</strong> : chaque processus devrait avoir exactement sa part de CPU. Il utilise un arbre rouge-noir trié par <strong>virtual runtime</strong> (temps CPU virtuel pondéré par la priorité)."
            },
            {
                q: "Pourquoi utiliser un arbre rouge-noir plutôt qu'une simple liste ?",
                r: "Avec une liste, trouver le processus le plus prioritaire est en <strong>O(n)</strong>. L'arbre rouge-noir permet de toujours avoir le minimum (plus petit vruntime) en <strong>O(log n)</strong> pour l'insertion/suppression, et <strong>O(1)</strong> pour trouver le minimum (c'est le nœud le plus à gauche)."
            }
        ]
    },
    {
        id: 68,
        title: "Structures de données pour l'ordonnanceur",
        resume: `
            <p><em>Diapo détaillant les structures de données de l'ordonnanceur</em></p>
            <p><strong>Linux CFS</strong> :</p>
            <ul>
                <li>Chaque processus a un <strong>vruntime</strong> (virtual runtime)</li>
                <li>vruntime = temps CPU réel × (poids de référence / poids du processus)</li>
                <li>Le poids dépend du nice : nice bas = poids élevé = vruntime augmente lentement</li>
                <li>On choisit toujours le processus avec le <strong>plus petit vruntime</strong></li>
            </ul>
            <p class="key-point">Un processus prioritaire (nice bas) voit son vruntime augmenter plus lentement → il est choisi plus souvent.</p>
        `,
        questions: [
            {
                q: "Comment le vruntime implémente-t-il les priorités dans CFS ?",
                r: "Le vruntime est le temps CPU <strong>pondéré par le poids</strong> (inverse de la priorité). Un processus prioritaire a un poids élevé, donc son vruntime augmente <strong>lentement</strong>. Il reste plus longtemps \"en avance\" des autres et est choisi plus souvent pour rattraper."
            },
            {
                q: "Pourquoi CFS est-il dit \"complètement équitable\" ?",
                r: "CFS essaie de donner à chaque processus sa <strong>part proportionnelle</strong> de CPU (selon son poids). Si tous ont le même poids, chacun obtient 1/N du CPU. Le vruntime mesure cette équité : il devrait être égal pour tous à terme."
            }
        ]
    },
    {
        id: 69,
        title: "Ordonnancement sous Linux",
        resume: `
            <p><strong>Classes d'ordonnancement</strong> sous Linux :</p>
            <ul>
                <li><strong>SCHED_FIFO</strong> : temps réel, FIFO sans préemption (sauf par plus prioritaire)</li>
                <li><strong>SCHED_RR</strong> : temps réel, Round-Robin avec quantum</li>
                <li><strong>SCHED_OTHER/NORMAL</strong> : par défaut, utilise CFS</li>
                <li><strong>SCHED_BATCH</strong> : pour tâches batch, optimise le débit</li>
                <li><strong>SCHED_IDLE</strong> : très basse priorité, s'exécute quand rien d'autre</li>
            </ul>
            <p class="key-point">Les classes temps réel (FIFO, RR) ont toujours priorité sur les classes normales.</p>
        `,
        questions: [
            {
                q: "Quelle est la différence entre SCHED_FIFO et SCHED_RR ?",
                r: "Les deux sont temps réel. <strong>SCHED_FIFO</strong> : un processus garde le CPU jusqu'à ce qu'il bloque ou qu'un processus plus prioritaire arrive. <strong>SCHED_RR</strong> : comme FIFO mais avec un quantum → les processus de même priorité alternent."
            },
            {
                q: "Pourquoi les processus temps réel sont-ils dangereux ?",
                r: "Un processus temps réel (SCHED_FIFO/RR) qui ne bloque jamais <strong>monopolise le CPU</strong> car il a toujours priorité sur les processus normaux. Même le shell ne peut plus répondre. Seul root peut créer des processus temps réel pour cette raison."
            }
        ]
    },
    {
        id: 70,
        title: "Voir l'ordonnancement",
        resume: `
            <p><strong>Outils pour observer l'ordonnancement</strong> :</p>
            <ul>
                <li><code>top</code> / <code>htop</code> : voir les processus et leur utilisation CPU</li>
                <li><code>ps -eo pid,ni,pri,cls,comm</code> : nice, priorité, classe d'ordonnancement</li>
                <li><code>chrt -p PID</code> : voir/modifier la politique d'ordonnancement</li>
                <li><code>taskset</code> : affinité CPU (sur quels cœurs le processus peut tourner)</li>
            </ul>
            <p><strong>Fichiers système</strong> :</p>
            <ul>
                <li><code>/proc/[pid]/sched</code> : statistiques d'ordonnancement détaillées</li>
                <li><code>/proc/[pid]/stat</code> : informations sur l'état du processus</li>
            </ul>
        `,
        questions: [
            {
                q: "Comment voir la politique d'ordonnancement d'un processus ?",
                r: "Avec <code>chrt -p PID</code> qui affiche la politique (SCHED_OTHER, SCHED_FIFO, etc.) et la priorité temps réel. Ou avec <code>ps -o cls</code> qui montre la classe (TS pour time-sharing/CFS, FF pour FIFO, RR pour Round-Robin)."
            },
            {
                q: "Qu'est-ce que l'affinité CPU ?",
                r: "L'<strong>affinité</strong> définit sur quels <strong>cœurs</strong> un processus peut s'exécuter. Par défaut, un processus peut tourner sur n'importe quel cœur. Avec <code>taskset</code>, on peut le restreindre à certains cœurs (utile pour isoler des charges de travail ou optimiser les caches)."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(7, section7Data);
