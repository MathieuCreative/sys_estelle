// Section 7: Algorithmes d'Ordonnancement
// Diapos 61 à 70 du PDF 7 - correspondance exacte

const section7Data = [
    {
        id: 61,
        title: "Algorithmes d'ordonnancement",
        resume: `
            <p><em>Diapo de titre de la section sur les algorithmes d'ordonnancement</em></p>
        `,
        questions: []
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
                q: "Citez les trois caractéristiques de FIFO/FCFS mentionnées dans cette diapo.",
                r: "1) Les processus sont exécutés dans l'<strong>ordre d'arrivée</strong>. 2) Pas de préemption : un processus garde le CPU jusqu'à la fin ou blocage. 3) Très <strong>simple</strong> à implémenter."
            },
            {
                q: "Citez les trois problèmes de FIFO listés dans cette diapo.",
                r: "1) <strong>Effet convoi</strong> : un long processus bloque tous les autres. 2) Temps de réponse <strong>très mauvais</strong> pour les petites tâches. 3) Non adapté aux systèmes interactifs."
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
                q: "Citez les trois principes de Round-Robin listés dans cette diapo.",
                r: "1) Chaque processus reçoit un <strong>quantum</strong> de temps CPU. 2) Après le quantum, le processus est <strong>préempté</strong> et remis en fin de file. 3) Équité : tous les processus obtiennent du temps CPU."
            },
            {
                q: "Quel est le point clé de cette diapo sur le choix du quantum ?",
                r: "Le choix du quantum est crucial : trop court = overhead, trop long = mauvaise réactivité."
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
                q: "Citez les deux types de priorités mentionnés dans cette diapo.",
                r: "<strong>Statiques</strong> : fixées à la création, ne changent pas. <strong>Dynamiques</strong> : ajustées selon le comportement du processus."
            },
            {
                q: "Quel est le problème majeur et sa solution selon cette diapo ?",
                r: "<strong>Problème majeur : la famine (starvation)</strong> - un processus de faible priorité peut <strong>ne jamais s'exécuter</strong>. <strong>Solution : vieillissement (aging)</strong> - augmenter la priorité des processus qui attendent longtemps."
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
                q: "Quelle est la plage de valeurs et la valeur par défaut du nice selon cette diapo ?",
                r: "<strong>Nice</strong> : valeur de -20 à +19 qui influence la priorité. Valeur par défaut : <strong>0</strong>."
            },
            {
                q: "Quel est le point clé de cette diapo sur le nice ?",
                r: "Seul root peut diminuer le nice (augmenter la priorité)."
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
                q: "Citez les trois règles typiques de MLFQ listées dans cette diapo.",
                r: "1) Nouveau processus → file de <strong>haute priorité</strong>. 2) Si utilise tout son quantum → <strong>descend</strong> d'une file (CPU-bound). 3) Si bloque avant la fin → <strong>reste</strong> ou monte (I/O-bound)."
            },
            {
                q: "Quel est le point clé de cette diapo sur MLFQ ?",
                r: "MLFQ favorise naturellement les processus interactifs (I/O-bound) car ils bloquent souvent."
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
                q: "Citez les trois options de structure de données listées dans cette diapo.",
                r: "<strong>Liste chaînée</strong> : simple mais recherche en O(n). <strong>Tableau de listes</strong> (par priorité) : O(1) pour trouver le plus prioritaire. <strong>Arbre rouge-noir</strong> : utilisé par CFS de Linux (O(log n))."
            },
            {
                q: "Quel est le point clé de cette diapo sur Linux CFS ?",
                r: "Linux CFS utilise un arbre rouge-noir trié par \"virtual runtime\" : le processus avec le moins de temps CPU virtuel est choisi."
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
                q: "Citez les quatre points clés sur le vruntime dans Linux CFS selon cette diapo.",
                r: "1) Chaque processus a un <strong>vruntime</strong> (virtual runtime). 2) vruntime = temps CPU réel × (poids de référence / poids du processus). 3) Le poids dépend du nice : nice bas = poids élevé = vruntime augmente lentement. 4) On choisit toujours le processus avec le <strong>plus petit vruntime</strong>."
            },
            {
                q: "Quel est le point clé de cette diapo sur le vruntime et la priorité ?",
                r: "Un processus prioritaire (nice bas) voit son vruntime augmenter plus lentement → il est choisi plus souvent."
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
                q: "Citez les cinq classes d'ordonnancement sous Linux mentionnées dans cette diapo.",
                r: "<strong>SCHED_FIFO</strong> : temps réel, FIFO sans préemption (sauf par plus prioritaire). <strong>SCHED_RR</strong> : temps réel, Round-Robin avec quantum. <strong>SCHED_OTHER/NORMAL</strong> : par défaut, utilise CFS. <strong>SCHED_BATCH</strong> : pour tâches batch, optimise le débit. <strong>SCHED_IDLE</strong> : très basse priorité, s'exécute quand rien d'autre."
            },
            {
                q: "Quel est le point clé de cette diapo sur les classes temps réel ?",
                r: "Les classes temps réel (FIFO, RR) ont toujours priorité sur les classes normales."
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
                q: "Citez les quatre outils pour observer l'ordonnancement mentionnés dans cette diapo.",
                r: "<code>top</code> / <code>htop</code> : voir les processus et leur utilisation CPU. <code>ps -eo pid,ni,pri,cls,comm</code> : nice, priorité, classe d'ordonnancement. <code>chrt -p PID</code> : voir/modifier la politique d'ordonnancement. <code>taskset</code> : affinité CPU (sur quels cœurs le processus peut tourner)."
            },
            {
                q: "Citez les deux fichiers système pour l'ordonnancement mentionnés dans cette diapo.",
                r: "<code>/proc/[pid]/sched</code> : statistiques d'ordonnancement détaillées. <code>/proc/[pid]/stat</code> : informations sur l'état du processus."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(7, section7Data);
