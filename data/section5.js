// Section 5: Processus
// Diapos 41 à 50 du PDF 5 - correspondance exacte

const section5Data = [
    {
        id: 41,
        title: "Pourquoi des processus ?",
        resume: `
            <p><strong>Rôles du processus</strong> :</p>
            <ul>
                <li><strong>Multi-tâches</strong> : exécuter plusieurs programmes "en même temps"</li>
                <li><strong>Unité de protection</strong> : isolation mémoire, droits d'accès</li>
                <li><strong>Unité d'allocation</strong> : CPU, mémoire, fichiers attribués au processus</li>
            </ul>
            <p><strong>Chaque processus a l'impression d'être seul</strong> sur la machine :</p>
            <ul>
                <li>Son propre espace mémoire</li>
                <li>Son propre CPU (virtuel)</li>
                <li>Ses propres fichiers ouverts</li>
            </ul>
            <p class="key-point">L'OS crée cette illusion grâce à la mémoire virtuelle et l'ordonnancement.</p>
        `,
        questions: [
            {
                q: "Citez les trois rôles principaux du processus listés dans cette diapo.",
                r: "1) <strong>Multi-tâches</strong> : exécuter plusieurs programmes \"en même temps\". 2) <strong>Unité de protection</strong> : isolation mémoire, droits d'accès. 3) <strong>Unité d'allocation</strong> : CPU, mémoire, fichiers attribués au processus."
            },
            {
                q: "Selon cette diapo, de quoi chaque processus a-t-il l'impression ?",
                r: "Chaque processus a l'impression d'<strong>être seul</strong> sur la machine : son propre espace mémoire, son propre CPU (virtuel), ses propres fichiers ouverts."
            }
        ]
    },
    {
        id: 42,
        title: "Que voit un processus ?",
        resume: `
            <p><strong>L'espace mémoire d'un processus</strong> (de bas en haut) :</p>
            <ul>
                <li><strong>Zone de code</strong> (text) : instructions du programme, <strong>lecture seule</strong></li>
                <li><strong>Zone de données</strong> : variables globales et statiques</li>
                <li><strong>Tas (heap)</strong> : mémoire allouée dynamiquement (<code>malloc</code>), grandit vers le haut</li>
                <li><strong>Zone libre</strong> : espace disponible</li>
                <li><strong>Pile (stack)</strong> : variables locales, appels de fonctions, grandit vers le bas</li>
            </ul>
            <p><strong>Autres ressources</strong> :</p>
            <ul>
                <li><strong>Table des descripteurs de fichiers</strong> (0=stdin, 1=stdout, 2=stderr)</li>
                <li><strong>Contexte d'exécution</strong> : registres, PC</li>
            </ul>
        `,
        questions: [
            {
                q: "Selon cette diapo, quelles sont les cinq parties de l'espace mémoire d'un processus (de bas en haut) ?",
                r: "1) <strong>Zone de code</strong> (text), 2) <strong>Zone de données</strong>, 3) <strong>Tas (heap)</strong>, 4) <strong>Zone libre</strong>, 5) <strong>Pile (stack)</strong>."
            },
            {
                q: "D'après cette diapo, dans quel sens grandit le tas ?",
                r: "Le tas grandit vers le <strong>haut</strong>."
            },
            {
                q: "Selon cette diapo, la zone de code est-elle modifiable ?",
                r: "Non, elle est en <strong>lecture seule</strong>."
            },
            {
                q: "Citez les trois descripteurs de fichiers standards mentionnés dans cette diapo.",
                r: "<strong>0=stdin</strong>, <strong>1=stdout</strong>, <strong>2=stderr</strong>."
            }
        ]
    },
    {
        id: 43,
        title: "Comment le noyau voit un processus ?",
        resume: `
            <p><strong>PCB</strong> (Process Control Block) = structure de données du noyau pour chaque processus :</p>
            <ul>
                <li><strong>PID</strong> : identifiant unique</li>
                <li><strong>État</strong> : Running, Ready, Sleeping, Zombie...</li>
                <li><strong>Priorité</strong> : pour l'ordonnancement</li>
                <li><strong>Program Counter</strong> : où en est l'exécution</li>
                <li><strong>Registres sauvegardés</strong> : contexte CPU</li>
                <li><strong>Adresses mémoire</strong> : table des pages</li>
                <li><strong>Table des fichiers ouverts</strong></li>
                <li><strong>Statistiques</strong> : temps CPU, temps d'attente</li>
                <li><strong>Utilisateur (UID)</strong> : pour les droits</li>
            </ul>
            <p>Sous Linux : structure <code>task_struct</code></p>
        `,
        questions: [
            {
                q: "Citez cinq éléments contenus dans le PCB selon cette diapo.",
                r: "1) <strong>PID</strong>, 2) <strong>État</strong>, 3) <strong>Priorité</strong>, 4) <strong>Program Counter</strong>, 5) <strong>Registres sauvegardés</strong>."
            },
            {
                q: "Selon cette diapo, comment s'appelle le PCB sous Linux ?",
                r: "Sous Linux, c'est la structure <code>task_struct</code>."
            }
        ]
    },
    {
        id: 44,
        title: "Généalogie des processus",
        resume: `
            <p><strong>Chaque processus a un parent</strong> (<code>getppid()</code>) :</p>
            <ul>
                <li>Forme un <strong>arbre de processus</strong></li>
                <li>Le parent peut <strong>attendre</strong> la fin de ses enfants</li>
                <li>Et récupérer leur <strong>code de retour</strong></li>
            </ul>
            <p><strong>Cas des orphelins</strong> :</p>
            <ul>
                <li>Si le parent meurt avant l'enfant</li>
                <li>L'enfant est <strong>adopté par init</strong> (PID 1)</li>
            </ul>
            <p><strong>Visualiser l'arbre</strong> :</p>
            <ul>
                <li><code>pstree</code> : affiche l'arbre des processus</li>
                <li><code>top</code> + touche V : vue hiérarchique</li>
                <li><code>htop</code> + F5 : vue arborescente</li>
            </ul>
        `,
        questions: [
            {
                q: "Selon cette diapo, qui adopte un processus orphelin ?",
                r: "L'enfant est <strong>adopté par init</strong> (PID 1)."
            },
            {
                q: "Citez deux commandes pour visualiser l'arbre des processus selon cette diapo.",
                r: "<code>pstree</code> et <code>htop</code> + F5 (vue arborescente)."
            }
        ]
    },
    {
        id: 45,
        title: "Création d'un processus",
        resume: `
            <p><strong>Étape 1 : <code>fork()</code></strong></p>
            <ul>
                <li><strong>Duplique</strong> le processus appelant</li>
                <li>Crée un <strong>clone</strong> : même code, même mémoire, mêmes fichiers</li>
                <li>Seules différences : <strong>PID</strong> et <strong>valeur de retour</strong> de fork()
                    <ul>
                        <li>Parent reçoit le PID de l'enfant</li>
                        <li>Enfant reçoit 0</li>
                    </ul>
                </li>
            </ul>
            <p><strong>Étape 2 : <code>exec()</code></strong> (optionnel)</p>
            <ul>
                <li><strong>Remplace</strong> le programme du processus</li>
                <li>Charge un nouvel exécutable</li>
                <li>Le PID reste le même</li>
            </ul>
            <p class="key-point">fork() + exec() = pattern classique pour lancer un nouveau programme.</p>
        `,
        questions: [
            {
                q: "Selon cette diapo, que retourne fork() au parent et à l'enfant ?",
                r: "Le parent reçoit le <strong>PID de l'enfant</strong>, l'enfant reçoit <strong>0</strong>."
            },
            {
                q: "D'après cette diapo, que fait exec() ?",
                r: "<code>exec()</code> <strong>remplace</strong> le programme du processus par un nouvel exécutable (le PID reste le même)."
            },
            {
                q: "Selon cette diapo, quel est le pattern classique pour lancer un nouveau programme ?",
                r: "<code>fork()</code> + <code>exec()</code>."
            }
        ]
    },
    {
        id: 46,
        title: "Threads",
        resume: `
            <p><strong>Thread</strong> = fil d'exécution dans un processus :</p>
            <ul>
                <li>Aussi appelé <strong>processus léger</strong></li>
                <li>Unité de traitement <strong>ordonnancée par le noyau</strong></li>
            </ul>
            <p><strong>Ce que les threads partagent</strong> (dans un même processus) :</p>
            <ul>
                <li>Espace mémoire (code, données, tas)</li>
                <li>Fichiers ouverts</li>
                <li>Signaux</li>
            </ul>
            <p><strong>Ce que chaque thread a de propre</strong> :</p>
            <ul>
                <li>Sa <strong>pile</strong> (stack)</li>
                <li>Ses <strong>registres</strong></li>
                <li>Son <strong>Program Counter</strong></li>
            </ul>
            <p><strong>Création</strong> : <code>pthread_create()</code>, <code>clone()</code>, <code>thrd_create()</code> (C11)</p>
        `,
        questions: [
            {
                q: "Citez trois éléments que les threads partagent selon cette diapo.",
                r: "1) Espace mémoire (code, données, tas), 2) Fichiers ouverts, 3) Signaux."
            },
            {
                q: "Citez trois éléments que chaque thread a de propre selon cette diapo.",
                r: "1) Sa <strong>pile</strong> (stack), 2) Ses <strong>registres</strong>, 3) Son <strong>Program Counter</strong>."
            },
            {
                q: "Citez une fonction de création de thread mentionnée dans cette diapo.",
                r: "<code>pthread_create()</code> ou <code>clone()</code> ou <code>thrd_create()</code> (C11)."
            }
        ]
    },
    {
        id: 47,
        title: "Processus vs threads",
        resume: `
            <p><strong>Avantages des threads</strong> :</p>
            <ul>
                <li><strong>Parallélisme réel</strong> : un thread par cœur</li>
                <li><strong>Création rapide</strong> : pas de copie mémoire</li>
                <li><strong>Communication facile</strong> : mémoire partagée</li>
                <li><strong>Recouvrement I/O</strong> : un thread bloqué, l'autre continue</li>
            </ul>
            <p><strong>Inconvénients des threads</strong> :</p>
            <ul>
                <li><strong>Synchronisation complexe</strong> : race conditions, deadlocks</li>
                <li><strong>Pas d'isolation</strong> : un bug affecte tout le processus</li>
            </ul>
            <p><strong>Sous Linux</strong> : modèle <strong>1:1</strong> (un thread noyau = un thread utilisateur)</p>
            <ul>
                <li>Threads gérés par l'ordonnanceur du noyau</li>
                <li>Processus multi-threadés peuvent être avantagés</li>
            </ul>
        `,
        questions: [
            {
                q: "Citez trois avantages des threads listés dans cette diapo.",
                r: "1) <strong>Parallélisme réel</strong> : un thread par cœur, 2) <strong>Création rapide</strong> : pas de copie mémoire, 3) <strong>Communication facile</strong> : mémoire partagée."
            },
            {
                q: "Citez deux inconvénients des threads listés dans cette diapo.",
                r: "1) <strong>Synchronisation complexe</strong> : race conditions, deadlocks, 2) <strong>Pas d'isolation</strong> : un bug affecte tout le processus."
            },
            {
                q: "Selon cette diapo, quel modèle de threads utilise Linux ?",
                r: "Linux utilise le modèle <strong>1:1</strong> (un thread noyau = un thread utilisateur)."
            }
        ]
    },
    {
        id: 48,
        title: "Fin d'un thread",
        resume: `
            <p><strong>Terminaison d'un thread</strong> :</p>
            <ul>
                <li><code>pthread_exit()</code> : termine le thread appelant</li>
                <li>Retour de la fonction du thread : appelle implicitement <code>pthread_exit()</code></li>
                <li><code>pthread_cancel()</code> : demande l'annulation d'un autre thread</li>
            </ul>
            <p><strong>Attendre un thread</strong> :</p>
            <ul>
                <li><code>pthread_join()</code> : attend la fin d'un thread et récupère sa valeur de retour</li>
                <li>Similaire à <code>wait()</code> pour les processus</li>
            </ul>
            <p class="key-point">Le dernier thread qui termine appelle implicitement <code>exit()</code> et termine le processus entier.</p>
        `,
        questions: [
            {
                q: "Citez deux façons de terminer un thread selon cette diapo.",
                r: "1) <code>pthread_exit()</code> : termine le thread appelant, 2) Retour de la fonction du thread."
            },
            {
                q: "Selon cette diapo, que fait pthread_join() ?",
                r: "<code>pthread_join()</code> attend la fin d'un thread et récupère sa valeur de retour (similaire à <code>wait()</code> pour les processus)."
            },
            {
                q: "D'après cette diapo, que se passe-t-il quand le dernier thread termine ?",
                r: "Le dernier thread qui termine appelle implicitement <code>exit()</code> et termine le <strong>processus entier</strong>."
            }
        ]
    },
    {
        id: 49,
        title: "Fin d'un processus",
        resume: `
            <p><strong>Terminaison</strong> :</p>
            <ul>
                <li><code>return</code> de <code>main()</code> : code de retour</li>
                <li><code>exit()</code> : termine explicitement</li>
                <li>Signal fatal (SIGKILL, SIGSEGV...)</li>
            </ul>
            <p><strong>Le parent attend l'enfant</strong> :</p>
            <ul>
                <li><code>wait()</code> ou <code>waitpid()</code> : bloque jusqu'à la fin d'un enfant</li>
                <li>Signal <code>SIGCHLD</code> : notification non bloquante</li>
                <li>Récupère le <strong>code de retour</strong> (0 = succès, autre = erreur)</li>
            </ul>
            <p><strong>État Zombie</strong> :</p>
            <ul>
                <li>Processus terminé mais <strong>pas encore attendu</strong> par son parent</li>
                <li>Garde une entrée dans la table des processus (pour le code de retour)</li>
                <li>Libéré quand le parent fait <code>wait()</code></li>
            </ul>
        `,
        questions: [
            {
                q: "Citez trois façons de terminer un processus selon cette diapo.",
                r: "1) <code>return</code> de <code>main()</code>, 2) <code>exit()</code>, 3) Signal fatal (SIGKILL, SIGSEGV...)."
            },
            {
                q: "Selon cette diapo, qu'est-ce qu'un processus zombie ?",
                r: "Un processus <strong>terminé</strong> mais <strong>pas encore attendu</strong> par son parent. Il garde une entrée dans la table des processus (pour le code de retour)."
            },
            {
                q: "D'après cette diapo, comment le parent récupère-t-il le code de retour de l'enfant ?",
                r: "Avec <code>wait()</code> ou <code>waitpid()</code>."
            }
        ]
    },
    {
        id: 50,
        title: "États d'un processus",
        resume: `
            <p><strong>États principaux</strong> :</p>
            <ul>
                <li><strong>Running (R)</strong> : en cours d'exécution sur un CPU</li>
                <li><strong>Ready (R)</strong> : prêt à s'exécuter, attend un CPU</li>
                <li><strong>Interruptible Sleep (S)</strong> : bloqué, en attente d'un événement (peut recevoir des signaux)</li>
                <li><strong>Uninterruptible Sleep (D)</strong> : bloqué sur I/O, ne peut pas être interrompu</li>
                <li><strong>Zombie (Z)</strong> : terminé, attend que le parent récupère le code de retour</li>
            </ul>
            <p><strong>Transitions</strong> :</p>
            <ul>
                <li>Ready ↔ Running : décision de l'<strong>ordonnanceur</strong></li>
                <li>Running → Sleep : <strong>appel système bloquant</strong></li>
                <li>Sleep → Ready : <strong>événement</strong> attendu arrivé</li>
                <li>Running → Zombie : <strong>terminaison</strong></li>
            </ul>
        `,
        questions: [
            {
                q: "Citez les cinq états principaux d'un processus listés dans cette diapo.",
                r: "1) <strong>Running (R)</strong>, 2) <strong>Ready (R)</strong>, 3) <strong>Interruptible Sleep (S)</strong>, 4) <strong>Uninterruptible Sleep (D)</strong>, 5) <strong>Zombie (Z)</strong>."
            },
            {
                q: "Selon cette diapo, quelle est la différence entre Interruptible Sleep et Uninterruptible Sleep ?",
                r: "<strong>Interruptible Sleep (S)</strong> : bloqué, en attente d'un événement, peut recevoir des signaux. <strong>Uninterruptible Sleep (D)</strong> : bloqué sur I/O, ne peut pas être interrompu."
            },
            {
                q: "D'après cette diapo, qui décide de la transition entre Ready et Running ?",
                r: "C'est la décision de l'<strong>ordonnanceur</strong>."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(5, section5Data);
