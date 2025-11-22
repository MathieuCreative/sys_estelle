// Section 6: Ordonnancement - Bases
// Diapos 51 à 60 du PDF 6 - correspondance exacte

const section6Data = [
    {
        id: 51,
        title: "Comment faire attendre un processus ?",
        resume: `
            <p><strong>Trois types d'attente</strong> :</p>
            <p><strong>Attente active (busy waiting)</strong> :</p>
            <ul>
                <li>Le processus boucle en testant une condition</li>
                <li><strong>Consomme du CPU</strong> inutilement</li>
                <li>Utilisé quand l'attente est très courte (spinlocks)</li>
            </ul>
            <p><strong>Attente semi-active</strong> :</p>
            <ul>
                <li>Boucle avec <code>yield()</code> : rend le CPU volontairement</li>
                <li>Mieux que l'attente active, mais toujours du polling</li>
            </ul>
            <p><strong>Attente passive</strong> :</p>
            <ul>
                <li>Le processus est <strong>bloqué</strong> (état WAITING)</li>
                <li>Le noyau le réveille quand l'événement arrive</li>
                <li><strong>Optimal</strong> : aucun CPU consommé pendant l'attente</li>
            </ul>
        `,
        questions: [
            {
                q: "Pourquoi l'attente active est-elle généralement à éviter ?",
                r: "L'attente active <strong>gaspille du temps CPU</strong> en bouclant continuellement. Le processeur pourrait exécuter d'autres tâches utiles. Elle n'est justifiée que pour des attentes <strong>très courtes</strong> (quelques cycles) où le coût du changement de contexte serait supérieur."
            },
            {
                q: "Quelle est la différence entre yield() et une vraie attente passive ?",
                r: "<code>yield()</code> rend le CPU mais le processus reste <strong>prêt à s'exécuter</strong> (READY). En attente passive, le processus passe en état <strong>WAITING</strong> et n'est plus dans la file d'attente. Il sera réveillé uniquement quand l'événement attendu se produit."
            }
        ]
    },
    {
        id: 52,
        title: "Interactions entre processus",
        resume: `
            <p><strong>IPC</strong> (Inter-Process Communication) : mécanismes pour que les processus communiquent.</p>
            <p><strong>Principaux mécanismes</strong> :</p>
            <ul>
                <li><strong>Pipes</strong> : flux unidirectionnel entre processus (ex: <code>ls | grep</code>)</li>
                <li><strong>Mémoire partagée</strong> : zone mémoire accessible par plusieurs processus</li>
                <li><strong>Signaux</strong> : notifications asynchrones (SIGKILL, SIGTERM, SIGINT...)</li>
                <li><strong>Sockets</strong> : communication réseau ou locale (Unix sockets)</li>
                <li><strong>Files de messages</strong> : messages stockés dans une queue</li>
            </ul>
            <p class="key-point">L'IPC nécessite souvent de la synchronisation pour éviter les race conditions.</p>
        `,
        questions: [
            {
                q: "Quelle est la différence entre un pipe et de la mémoire partagée ?",
                r: "Un <strong>pipe</strong> est un flux : les données sont lues dans l'ordre d'écriture, puis disparaissent. La <strong>mémoire partagée</strong> est une zone où tous les processus voient les mêmes données en temps réel. Le pipe est plus simple mais impose un ordre, la mémoire partagée est plus flexible mais nécessite une synchronisation explicite."
            },
            {
                q: "Qu'est-ce qu'un signal Unix ?",
                r: "C'est une <strong>notification asynchrone</strong> envoyée à un processus. Exemples : <strong>SIGKILL</strong> (tue immédiatement), <strong>SIGTERM</strong> (demande de terminer proprement), <strong>SIGINT</strong> (Ctrl+C). Le processus peut définir un handler pour certains signaux, sauf SIGKILL."
            }
        ]
    },
    {
        id: 53,
        title: "Ordonnancement",
        resume: `
            <p><em>Diapo de titre de la section sur l'ordonnancement</em></p>
        `,
        questions: [
            {
                q: "Qu'est-ce que l'ordonnancement ?",
                r: "C'est le mécanisme qui décide <strong>quel processus</strong> s'exécute sur <strong>quel CPU</strong> et <strong>pendant combien de temps</strong>. L'ordonnanceur (scheduler) fait ces choix selon une politique définie, en cherchant à optimiser différents critères (équité, latence, débit...)."
            }
        ]
    },
    {
        id: 54,
        title: "Un ensemble de tâches",
        resume: `
            <p><strong>L'ordonnanceur gère un ensemble de tâches</strong> prêtes à s'exécuter.</p>
            <p><strong>Objectifs contradictoires</strong> :</p>
            <ul>
                <li><strong>Équité</strong> : chaque processus doit avoir du temps CPU</li>
                <li><strong>Efficacité</strong> : maximiser l'utilisation du CPU</li>
                <li><strong>Temps de réponse</strong> : minimiser la latence pour les tâches interactives</li>
                <li><strong>Débit</strong> : maximiser le nombre de tâches terminées par unité de temps</li>
            </ul>
            <p class="key-point">Impossible d'optimiser tous les critères simultanément → compromis selon le contexte (serveur, desktop, temps réel).</p>
        `,
        questions: [
            {
                q: "Pourquoi ne peut-on pas optimiser tous les critères d'ordonnancement ?",
                r: "Ces critères sont <strong>contradictoires</strong>. Par exemple, maximiser le débit favorise les longues tâches (moins de changements de contexte), mais dégrade le temps de réponse des tâches interactives. L'équité parfaite peut réduire l'efficacité globale. Il faut choisir des compromis."
            },
            {
                q: "Quelle différence entre débit et temps de réponse ?",
                r: "Le <strong>débit</strong> (throughput) = nombre de tâches terminées par seconde. Le <strong>temps de réponse</strong> = délai entre une requête et le début de son traitement. Un serveur batch optimise le débit, un desktop optimise le temps de réponse pour l'interactivité."
            }
        ]
    },
    {
        id: 55,
        title: "Passer d'une tâche à l'autre",
        resume: `
            <p><strong>Changement de contexte</strong> (context switch) :</p>
            <ul>
                <li>Le CPU passe d'un processus à un autre</li>
                <li>Il faut <strong>sauvegarder</strong> l'état du processus actuel</li>
                <li>Puis <strong>restaurer</strong> l'état du nouveau processus</li>
            </ul>
            <p><strong>Ce qui est sauvegardé</strong> :</p>
            <ul>
                <li>Tous les <strong>registres CPU</strong> (PC, SP, registres généraux)</li>
                <li>L'état de la <strong>FPU/SIMD</strong></li>
                <li>Le <strong>pointeur vers la table des pages</strong> (CR3 sur x86)</li>
            </ul>
            <p class="key-point">Un changement de contexte coûte ~1-10 µs + invalidation des caches.</p>
        `,
        questions: [
            {
                q: "Pourquoi le changement de contexte a-t-il un coût ?",
                r: "Coût <strong>direct</strong> : sauvegarde/restauration des registres (~1-10 µs). Coût <strong>indirect</strong> (souvent plus important) : les caches CPU contiennent les données de l'ancien processus → <strong>cache misses</strong> au début de l'exécution du nouveau processus. La TLB doit aussi être invalidée."
            },
            {
                q: "Que contient le contexte d'un processus ?",
                r: "Le <strong>contexte</strong> = tout ce qu'il faut pour reprendre l'exécution : <strong>registres généraux</strong>, <strong>Program Counter</strong> (où on en était), <strong>Stack Pointer</strong>, <strong>flags</strong>, état de la FPU, et le <strong>CR3</strong> (pointeur vers la table des pages pour la mémoire virtuelle)."
            }
        ]
    },
    {
        id: 56,
        title: "Changement de contexte",
        resume: `
            <p><em>Diapo illustrant le mécanisme de changement de contexte</em></p>
            <p><strong>Étapes du context switch</strong> :</p>
            <ol>
                <li>Interruption (timer, syscall, I/O)</li>
                <li>Sauvegarde du contexte dans le PCB du processus courant</li>
                <li>L'ordonnanceur choisit le prochain processus</li>
                <li>Restauration du contexte depuis le PCB du nouveau processus</li>
                <li>Reprise de l'exécution</li>
            </ol>
        `,
        questions: [
            {
                q: "Qu'est-ce que le PCB (Process Control Block) ?",
                r: "Le <strong>PCB</strong> est une structure de données du noyau qui contient toutes les informations sur un processus : son <strong>état</strong> (running, ready, waiting), son <strong>contexte</strong> sauvegardé, son <strong>PID</strong>, ses <strong>fichiers ouverts</strong>, ses <strong>pages mémoire</strong>, etc. Un PCB par processus."
            }
        ]
    },
    {
        id: 57,
        title: "Ordonnancement / Ordonnanceur",
        resume: `
            <p><strong>Ordonnanceur (scheduler)</strong> : composant du noyau qui décide quel processus exécuter.</p>
            <p><strong>Deux niveaux</strong> :</p>
            <ul>
                <li><strong>Ordonnanceur à court terme</strong> : choisit le prochain processus à exécuter (très fréquent)</li>
                <li><strong>Ordonnanceur à long terme</strong> : contrôle le degré de multiprogrammation (admission des processus)</li>
            </ul>
            <p><strong>Politique d'ordonnancement</strong> : l'algorithme utilisé pour faire les choix (FIFO, Round-Robin, priorités...).</p>
        `,
        questions: [
            {
                q: "Quelle est la différence entre l'ordonnanceur court terme et long terme ?",
                r: "L'ordonnanceur <strong>court terme</strong> (ou CPU scheduler) décide à chaque instant quel processus prêt obtient le CPU (exécuté très souvent). L'ordonnanceur <strong>long terme</strong> décide quels processus sont admis dans le système (contrôle la charge globale, moins fréquent)."
            }
        ]
    },
    {
        id: 58,
        title: "Ordonnancement (pseudo-)coopératif",
        resume: `
            <p><strong>Ordonnancement coopératif</strong> :</p>
            <ul>
                <li>Le processus garde le CPU <strong>jusqu'à ce qu'il le rende volontairement</strong></li>
                <li>Se produit lors d'un appel système bloquant ou d'un yield()</li>
                <li>Utilisé dans : Windows 3.1, Mac OS classic</li>
            </ul>
            <p><strong>Problèmes</strong> :</p>
            <ul>
                <li>Un processus en boucle infinie <strong>bloque tout le système</strong></li>
                <li>Pas d'équité : un processus égoïste peut monopoliser le CPU</li>
                <li>Dépend de la bonne volonté des programmes</li>
            </ul>
            <p class="key-point">Abandonné sur les OS modernes sauf cas très spécifiques (certains systèmes embarqués).</p>
        `,
        questions: [
            {
                q: "Pourquoi l'ordonnancement coopératif a-t-il été abandonné ?",
                r: "Il suppose que les programmes sont <strong>bien écrits</strong> et <strong>non malveillants</strong>. Un seul programme bugué ou malveillant peut bloquer tout le système. Inacceptable pour un OS multi-utilisateurs ou un système devant rester réactif."
            },
            {
                q: "Quand un processus rend-il le CPU en mode coopératif ?",
                r: "Lors d'un <strong>appel système bloquant</strong> (read sur un fichier, attente réseau) ou d'un appel explicite à <code>yield()</code>. Si le processus fait uniquement du calcul sans jamais appeler le système, il garde le CPU indéfiniment."
            }
        ]
    },
    {
        id: 59,
        title: "Préemption",
        resume: `
            <p><strong>Ordonnancement préemptif</strong> :</p>
            <ul>
                <li>Le noyau peut <strong>retirer le CPU</strong> à un processus à tout moment</li>
                <li>Même si le processus ne le veut pas</li>
                <li>Garanti par une <strong>interruption matérielle</strong> (timer)</li>
            </ul>
            <p><strong>Avantages</strong> :</p>
            <ul>
                <li>Un processus en boucle infinie <strong>ne bloque plus le système</strong></li>
                <li><strong>Équité</strong> : tous les processus obtiennent du temps CPU</li>
                <li>Meilleur <strong>temps de réponse</strong> pour les tâches interactives</li>
            </ul>
            <p class="key-point">Tous les OS modernes (Linux, Windows, macOS) utilisent la préemption.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce que la préemption ?",
                r: "C'est la capacité du noyau à <strong>interrompre un processus</strong> en cours d'exécution pour donner le CPU à un autre, <strong>sans que le processus ne le demande</strong>. Cela garantit que l'OS garde toujours le contrôle, même face à des programmes malveillants ou buggés."
            },
            {
                q: "Comment le noyau peut-il reprendre le contrôle d'un processus qui ne coopère pas ?",
                r: "Grâce à l'<strong>interruption timer</strong>. Le matériel génère une interruption à intervalles réguliers (ex: toutes les 1-4 ms). Cette interruption force le CPU à exécuter le code du noyau, qui peut alors décider de changer de processus."
            }
        ]
    },
    {
        id: 60,
        title: "Comment/quand préempter ?",
        resume: `
            <p><strong>L'interruption timer</strong> permet la préemption :</p>
            <ul>
                <li>Se déclenche à <strong>intervalle régulier</strong> (~1-4 ms sous Linux)</li>
                <li>Force le passage en mode noyau</li>
                <li>Le noyau vérifie s'il faut changer de processus</li>
            </ul>
            <p><strong>Quantum (time slice)</strong> :</p>
            <ul>
                <li>Durée maximale qu'un processus peut garder le CPU</li>
                <li>Typiquement 4-100 ms selon les systèmes</li>
                <li>Compromis : court = réactif mais overhead, long = efficace mais latence</li>
            </ul>
            <p>La préemption peut aussi arriver quand un processus plus prioritaire devient prêt.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce que le quantum (time slice) ?",
                r: "C'est la <strong>durée maximale</strong> pendant laquelle un processus peut s'exécuter avant d'être préempté. Si le quantum est de 10ms, après 10ms le timer interrompt et l'ordonnanceur peut choisir un autre processus. Le quantum est un paramètre clé de l'ordonnanceur."
            },
            {
                q: "Comment choisir la durée du quantum ?",
                r: "<strong>Quantum court</strong> (1-10ms) : bonne réactivité, temps de réponse faible, mais beaucoup de changements de contexte (overhead). <strong>Quantum long</strong> (50-100ms) : moins d'overhead, meilleur débit, mais latence élevée pour les tâches interactives. Linux utilise un quantum variable selon la charge."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(6, section6Data);
