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
                q: "Selon cette diapo, qu'est-ce que l'attente active (busy waiting) ?",
                r: "Le processus <strong>boucle en testant une condition</strong> et <strong>consomme du CPU</strong> inutilement. Utilisée quand l'attente est très courte (spinlocks)."
            },
            {
                q: "D'après cette diapo, que fait yield() dans l'attente semi-active ?",
                r: "Boucle avec <code>yield()</code> qui <strong>rend le CPU volontairement</strong>. Mieux que l'attente active, mais toujours du polling."
            },
            {
                q: "Selon cette diapo, qu'est-ce que l'attente passive ?",
                r: "Le processus est <strong>bloqué</strong> (état WAITING). Le noyau le réveille quand l'événement arrive. <strong>Optimal</strong> : aucun CPU consommé pendant l'attente."
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
                q: "Que signifie IPC selon cette diapo ?",
                r: "<strong>Inter-Process Communication</strong> : mécanismes pour que les processus communiquent."
            },
            {
                q: "Citez quatre mécanismes d'IPC mentionnés dans cette diapo.",
                r: "1) <strong>Pipes</strong> : flux unidirectionnel, 2) <strong>Mémoire partagée</strong>, 3) <strong>Signaux</strong> : notifications asynchrones, 4) <strong>Sockets</strong>."
            },
            {
                q: "Selon cette diapo, que permet un pipe ?",
                r: "Un flux <strong>unidirectionnel entre processus</strong> (ex: <code>ls | grep</code>)."
            },
            {
                q: "Citez deux exemples de signaux mentionnés dans cette diapo.",
                r: "<strong>SIGKILL, SIGTERM, SIGINT</strong>."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "L'IPC nécessite souvent de la <strong>synchronisation</strong> pour éviter les race conditions."
            }
        ]
    },
    {
        id: 53,
        title: "Ordonnancement",
        resume: `
            <p><em>Diapo de titre de la section sur l'ordonnancement</em></p>
        `,
        questions: []
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
                q: "Citez trois objectifs d'ordonnancement mentionnés dans cette diapo.",
                r: "1) <strong>Équité</strong> : chaque processus doit avoir du temps CPU, 2) <strong>Efficacité</strong> : maximiser l'utilisation du CPU, 3) <strong>Temps de réponse</strong> : minimiser la latence."
            },
            {
                q: "Selon cette diapo, peut-on optimiser tous les critères simultanément ?",
                r: "<strong>Impossible</strong> d'optimiser tous les critères simultanément. Il faut faire des compromis selon le contexte (serveur, desktop, temps réel)."
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
                q: "Selon cette diapo, que faut-il sauvegarder lors d'un changement de contexte ?",
                r: "1) Tous les <strong>registres CPU</strong> (PC, SP, registres généraux), 2) L'état de la <strong>FPU/SIMD</strong>, 3) Le <strong>pointeur vers la table des pages</strong> (CR3 sur x86)."
            },
            {
                q: "D'après cette diapo, quel est le coût d'un changement de contexte ?",
                r: "Un changement de contexte coûte environ <strong>1-10 µs</strong> + invalidation des caches."
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
                q: "Citez les cinq étapes du context switch selon cette diapo.",
                r: "1) <strong>Interruption</strong> (timer, syscall, I/O), 2) Sauvegarde du contexte dans le PCB, 3) L'ordonnanceur choisit le prochain processus, 4) Restauration du contexte depuis le PCB, 5) Reprise de l'exécution."
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
                q: "Selon cette diapo, quels sont les deux niveaux d'ordonnanceur ?",
                r: "1) <strong>Ordonnanceur à court terme</strong> : choisit le prochain processus à exécuter (très fréquent), 2) <strong>Ordonnanceur à long terme</strong> : contrôle le degré de multiprogrammation (admission des processus)."
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
                q: "Selon cette diapo, qu'est-ce que l'ordonnancement coopératif ?",
                r: "Le processus garde le CPU <strong>jusqu'à ce qu'il le rende volontairement</strong>. Se produit lors d'un appel système bloquant ou d'un yield()."
            },
            {
                q: "Citez deux systèmes qui utilisaient l'ordonnancement coopératif selon cette diapo.",
                r: "<strong>Windows 3.1</strong>, <strong>Mac OS classic</strong>."
            },
            {
                q: "Quel est le problème principal de l'ordonnancement coopératif selon cette diapo ?",
                r: "Un processus en boucle infinie <strong>bloque tout le système</strong>. Pas d'équité : un processus égoïste peut monopoliser le CPU."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "<strong>Abandonné</strong> sur les OS modernes sauf cas très spécifiques (certains systèmes embarqués)."
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
                q: "Selon cette diapo, qu'est-ce que l'ordonnancement préemptif ?",
                r: "Le noyau peut <strong>retirer le CPU</strong> à un processus à tout moment, même si le processus ne le veut pas. Garanti par une <strong>interruption matérielle</strong> (timer)."
            },
            {
                q: "Citez deux avantages de la préemption listés dans cette diapo.",
                r: "1) Un processus en boucle infinie <strong>ne bloque plus le système</strong>, 2) <strong>Équité</strong> : tous les processus obtiennent du temps CPU."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Tous les OS modernes (<strong>Linux, Windows, macOS</strong>) utilisent la préemption."
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
                q: "Selon cette diapo, à quelle fréquence se déclenche l'interruption timer sous Linux ?",
                r: "À intervalle régulier : environ <strong>1-4 ms</strong> sous Linux."
            },
            {
                q: "D'après cette diapo, qu'est-ce que le quantum (time slice) ?",
                r: "La <strong>durée maximale</strong> qu'un processus peut garder le CPU. Typiquement <strong>4-100 ms</strong> selon les systèmes."
            },
            {
                q: "Selon cette diapo, quel est le compromis du quantum ?",
                r: "Quantum <strong>court</strong> = réactif mais overhead. Quantum <strong>long</strong> = efficace mais latence."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(6, section6Data);
