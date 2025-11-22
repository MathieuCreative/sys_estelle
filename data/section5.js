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
                q: "Pourquoi chaque processus croit-il être seul sur la machine ?",
                r: "Grâce à deux mécanismes : 1) <strong>Mémoire virtuelle</strong> : chaque processus a son propre espace d'adressage (0 à 2^64). 2) <strong>Ordonnancement</strong> : le CPU alterne entre processus si vite qu'ils semblent tourner en parallèle. L'OS maintient cette illusion."
            },
            {
                q: "Qu'est-ce que l'isolation des processus apporte ?",
                r: "<strong>Sécurité</strong> : un processus ne peut pas lire les données d'un autre. <strong>Stabilité</strong> : si un processus plante, les autres continuent. <strong>Simplicité</strong> : le programmeur n'a pas à se soucier des autres programmes."
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
                q: "Quelle est la différence entre la pile et le tas ?",
                r: "<strong>Pile (stack)</strong> : allocation automatique, variables locales, appels de fonctions. Rapide mais taille limitée. <strong>Tas (heap)</strong> : allocation manuelle (<code>malloc/free</code>), durée de vie contrôlée par le programmeur. Plus lent mais flexible."
            },
            {
                q: "Pourquoi la pile et le tas grandissent-ils en sens opposé ?",
                r: "Pour <strong>maximiser l'espace disponible</strong>. La pile grandit vers le bas, le tas vers le haut. Ils se partagent l'espace libre entre eux. Si l'un a besoin de plus, il peut utiliser l'espace libre sans empiéter sur l'autre (tant qu'ils ne se rencontrent pas)."
            },
            {
                q: "Qu'est-ce qu'un descripteur de fichier ?",
                r: "Un <strong>entier</strong> qui identifie un fichier ouvert pour le processus. 0=stdin, 1=stdout, 2=stderr par convention. Quand on ouvre un fichier, le noyau retourne le prochain numéro disponible. Ce numéro sert pour read(), write(), close()."
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
                q: "Qu'est-ce que le PCB (Process Control Block) ?",
                r: "C'est la <strong>structure de données du noyau</strong> qui contient toutes les informations sur un processus : PID, état, contexte CPU, mémoire, fichiers ouverts, statistiques. Le noyau maintient un PCB pour chaque processus. Sous Linux : <code>task_struct</code>."
            },
            {
                q: "Pourquoi le noyau sauvegarde-t-il les registres dans le PCB ?",
                r: "Pour le <strong>changement de contexte</strong>. Quand le noyau passe à un autre processus, il doit sauvegarder les registres du processus actuel (dans son PCB) et restaurer ceux du nouveau. Sinon, le processus perdrait son état en reprenant."
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
                q: "Pourquoi les processus forment-ils un arbre ?",
                r: "Chaque processus est créé par un autre (via <code>fork()</code>). Le créateur devient le <strong>parent</strong>. Le premier processus (init, PID 1) est créé par le noyau. Cela forme une hiérarchie utilisée pour : signaux, héritage des fichiers, gestion des zombies."
            },
            {
                q: "Que se passe-t-il quand un processus parent meurt ?",
                r: "Ses enfants deviennent <strong>orphelins</strong>. Le noyau les <strong>réattache à init</strong> (PID 1). Init devient leur nouveau parent et pourra récupérer leur code de retour quand ils termineront (évite les zombies permanents)."
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
                q: "Pourquoi fork() retourne-t-il des valeurs différentes au parent et à l'enfant ?",
                r: "C'est le seul moyen de <strong>distinguer</strong> parent et enfant après le fork. Le code est identique, donc on teste la valeur de retour : <code>if (fork() == 0) { /* enfant */ } else { /* parent */ }</code>. Le parent reçoit le PID de l'enfant pour pouvoir le suivre."
            },
            {
                q: "Pourquoi séparer fork() et exec() ?",
                r: "Pour permettre des opérations <strong>entre les deux</strong> : rediriger stdin/stdout, changer de répertoire, modifier les variables d'environnement... Le parent peut configurer l'enfant avant qu'il n'exécute le nouveau programme. C'est le <strong>modèle Unix</strong>."
            },
            {
                q: "La mémoire est-elle vraiment copiée lors d'un fork() ?",
                r: "Non, grâce au <strong>Copy-On-Write (COW)</strong>. Au fork, parent et enfant partagent les mêmes pages mémoire (en lecture seule). Une copie n'est faite que si l'un écrit. Cela rend fork() très rapide même avec beaucoup de mémoire."
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
                q: "Quelle est la différence fondamentale entre processus et thread ?",
                r: "<strong>Processus</strong> : espace mémoire isolé, création coûteuse, communication difficile (IPC). <strong>Thread</strong> : partage la mémoire du processus, création légère, communication simple (variables partagées). Un processus contient un ou plusieurs threads."
            },
            {
                q: "Pourquoi chaque thread a-t-il sa propre pile ?",
                r: "La pile stocke les <strong>variables locales</strong> et les <strong>adresses de retour</strong> des fonctions. Chaque thread exécute potentiellement des fonctions différentes, donc a besoin de sa propre pile pour ne pas interférer avec les autres threads."
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
                q: "Quand utiliser des processus vs des threads ?",
                r: "<strong>Processus</strong> : quand on veut l'<strong>isolation</strong> (sécurité, stabilité), ou exécuter un programme différent. <strong>Threads</strong> : quand on veut le <strong>parallélisme</strong> dans un même programme, avec partage de données. Exemple : serveur web = souvent threads, navigateur = processus par onglet (isolation)."
            },
            {
                q: "Qu'est-ce que le modèle 1:1 pour les threads ?",
                r: "Chaque <strong>thread utilisateur</strong> correspond à un <strong>thread noyau</strong>. Le noyau voit et ordonnance chaque thread individuellement. Alternative : modèle N:1 (threads gérés en espace utilisateur, invisibles au noyau) ou M:N (hybride)."
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
                q: "Que se passe-t-il si on ne fait pas pthread_join() ?",
                r: "Le thread termine mais ses ressources ne sont pas libérées (similaire à un zombie). Pour éviter ça : soit faire <code>pthread_join()</code>, soit créer le thread en mode <strong>detached</strong> (<code>pthread_detach()</code>) pour qu'il se nettoie automatiquement."
            },
            {
                q: "Un thread peut-il terminer le processus entier ?",
                r: "Oui. Si un thread appelle <code>exit()</code> (et non <code>pthread_exit()</code>), <strong>tout le processus</strong> termine. Aussi, si le thread main() retourne, le processus termine. Enfin, le dernier thread vivant qui termine provoque la fin du processus."
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
                q: "Qu'est-ce qu'un processus zombie ?",
                r: "Un processus qui a <strong>terminé</strong> mais dont le parent n'a pas encore récupéré le code de retour avec <code>wait()</code>. Il ne consomme plus de CPU/mémoire mais garde une entrée dans la table des processus. Trop de zombies = plus de PIDs disponibles."
            },
            {
                q: "Comment éviter les zombies ?",
                r: "1) Le parent fait <code>wait()</code> ou <code>waitpid()</code>. 2) Le parent ignore <code>SIGCHLD</code> (les enfants sont auto-reaped). 3) Double fork : l'enfant fork et termine, le petit-enfant est adopté par init qui fait le wait. 4) Utiliser <code>sigaction()</code> avec <code>SA_NOCLDWAIT</code>."
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
                q: "Quelle est la différence entre Interruptible et Uninterruptible Sleep ?",
                r: "<strong>Interruptible (S)</strong> : le processus peut être réveillé par un <strong>signal</strong>. Utilisé pour les attentes normales (réseau, terminal). <strong>Uninterruptible (D)</strong> : attente d'I/O critique (disque). Même SIGKILL ne peut pas l'interrompre. Évite la corruption de données."
            },
            {
                q: "Pourquoi un processus peut-il rester bloqué en état D ?",
                r: "L'état D (Uninterruptible) est utilisé pendant les <strong>I/O disque</strong>. Si le disque ne répond pas (panne, NFS bloqué), le processus reste en D indéfiniment. On ne peut pas le tuer avec kill -9 car il attend une opération atomique. Seul un reboot ou la résolution du problème I/O le débloque."
            },
            {
                q: "Comment voir l'état des processus ?",
                r: "Avec <code>ps aux</code> : colonne STAT. R=Running/Ready, S=Sleeping, D=Disk sleep, Z=Zombie, T=Stopped. Avec <code>top</code> ou <code>htop</code> : colonne S ou STATE. Les suffixes : <=haute priorité, N=basse priorité, l=multi-thread, s=session leader."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(5, section5Data);
