// Section 8: Ordonnancement temps-réel et Introduction à la Mémoire
// Diapos 71 à 80 du PDF 8

const section8Data = [
    {
        id: 71,
        title: "Ordonnanceur temps-réel",
        resume: `
            <p><strong>Temps-réel</strong> : garantie qu'un événement sera traité avant un délai fixé.</p>
            <p><strong>Contexte</strong> :</p>
            <ul>
                <li>Normalement, <strong>pas de garantie</strong> sur quand un processus s'exécutera</li>
                <li>Certains domaines nécessitent ces garanties : <strong>embarqué, robotique, santé, audio, vidéo</strong></li>
            </ul>
            <p><strong>Linux et temps-réel</strong> :</p>
            <ul>
                <li>Par défaut, Linux <strong>n'est pas temps réel</strong></li>
                <li>Pendant longtemps : un patch PREEMPT_RT à appliquer au noyau</li>
                <li><strong>Patch fusionné</strong> dans Linux depuis la version 6.12</li>
                <li>Rend préemptibles des sections critiques du noyau</li>
                <li>Ajoute un ordonnanceur temps-réel (complexe)</li>
            </ul>
            <p class="key-point">Il faut explicitement indiquer qu'on souhaite utiliser l'ordonnanceur temps-réel.</p>
        `,
        questions: [
            {
                q: "Quelle est la différence entre un système temps-réel et un système classique ?",
                r: "Un système <strong>temps-réel</strong> garantit qu'une tâche sera terminée avant une <strong>deadline</strong> (échéance). Un système classique fait de son mieux mais ne donne aucune garantie temporelle. Pour l'audio/vidéo, un retard = saccades perceptibles."
            },
            {
                q: "Pourquoi Linux n'était-il pas temps-réel par défaut ?",
                r: "Le noyau Linux contient des <strong>sections critiques</strong> non préemptibles où les interruptions sont désactivées. Pendant ces sections, aucune tâche temps-réel ne peut s'exécuter. Le patch PREEMPT_RT rend ces sections préemptibles, mais c'est complexe et peut impacter les performances."
            }
        ]
    },
    {
        id: 72,
        title: "Exécution simultanée ?",
        resume: `
            <p><strong>Question</strong> : Si on a un unique cœur, a-t-on vraiment une exécution simultanée de plusieurs processus ?</p>
            <p><em>Cette diapo pose la question pour introduire la réflexion...</em></p>
        `,
        questions: [
            {
                q: "Peut-on avoir une vraie exécution simultanée sur un seul cœur ?",
                r: "<strong>Non</strong>. Sur un unique cœur, il n'y a qu'<strong>une seule unité d'exécution</strong>. Un seul processus peut s'exécuter à la fois. Ce qu'on perçoit comme \"simultané\" est en fait une alternance très rapide entre processus."
            }
        ]
    },
    {
        id: 73,
        title: "Exécution simultanée ? (réponse)",
        resume: `
            <p><strong>Réponse</strong> : <strong>Non</strong>, avec un unique cœur, il n'y a pas d'exécution vraiment simultanée.</p>
            <ul>
                <li>Uniquement une <strong>alternance d'exécution</strong> de processus</li>
                <li>Mais c'est <strong>transparent</strong> pour les processus</li>
            </ul>
            <p class="key-point">Les processus ne savent pas qu'ils partagent le CPU. Chacun croit avoir le processeur pour lui seul.</p>
        `,
        questions: [
            {
                q: "Pourquoi dit-on que l'alternance est \"transparente\" pour les processus ?",
                r: "Le processus ne sait pas qu'il a été interrompu. Quand il reprend, tous ses registres et son contexte sont restaurés exactement comme avant. Du point de vue du processus, l'exécution est <strong>continue</strong>, même si en réalité elle a été fragmentée."
            },
            {
                q: "Comment appelle-t-on cette illusion de simultanéité ?",
                r: "On parle de <strong>pseudo-parallélisme</strong> ou de <strong>concurrence</strong> (par opposition au vrai <strong>parallélisme</strong> qui nécessite plusieurs cœurs). Le multitâche préemptif crée cette illusion en alternant très rapidement entre les processus."
            }
        ]
    },
    {
        id: 74,
        title: "Et les machines multi-cœurs ?",
        resume: `
            <p><strong>Multi-cœurs</strong> : plusieurs flux d'exécutions <strong>vraiment simultanés</strong>.</p>
            <ul>
                <li>Un flux d'exécution par cœur</li>
                <li>Toujours de la <strong>préemption</strong> (généralement plus de tâches que de cœurs)</li>
            </ul>
            <p><strong>Nouvelle question</strong> : sur quel cœur exécuter quelle tâche ?</p>
            <ul>
                <li><strong>Localité / Affinité</strong> : garder un processus proche de la mémoire/matériel qu'il utilise</li>
                <li>Changer de cœur pendant l'exécution → <strong>défauts de cache</strong></li>
                <li>Dilemme : casser l'affinité parce qu'un cœur est libre ?</li>
            </ul>
            <p class="key-point">L'ordonnancement multi-cœurs doit équilibrer la charge tout en préservant la localité des données.</p>
        `,
        questions: [
            {
                q: "Pourquoi changer de cœur cause-t-il des défauts de cache ?",
                r: "Chaque cœur a son propre <strong>cache L1/L2</strong>. Quand un processus migre vers un autre cœur, ses données ne sont plus dans le cache local → il faut les recharger depuis la RAM ou le cache L3 partagé. C'est le <strong>cache miss</strong>, qui coûte des centaines de cycles."
            },
            {
                q: "Qu'est-ce que l'affinité processeur ?",
                r: "C'est la tendance à garder un processus sur le <strong>même cœur</strong> (ou groupe de cœurs) pour profiter des données déjà en cache. Linux essaie de respecter l'affinité mais peut migrer un processus si un cœur est libre et un autre surchargé."
            }
        ]
    },
    {
        id: 75,
        title: "Structures de données pour machines multicœurs",
        resume: `
            <p>Le cœur sur lequel s'exécuter introduit une <strong>dimension supplémentaire</strong> à la runqueue.</p>
            <p><strong>Une seule runqueue (Load Sharing)</strong> :</p>
            <ul>
                <li>Tous les cœurs y piochent</li>
                <li><strong>Contention</strong> pour y accéder si beaucoup de cœurs</li>
                <li>Simple à implémenter</li>
                <li>Difficile de garder une trace des affinités</li>
            </ul>
            <p><strong>Une runqueue par cœur (Load Balancing)</strong> :</p>
            <ul>
                <li>Chaque cœur a sa propre runqueue</li>
                <li><strong>Pas de contention</strong></li>
                <li>Question : comment/quand équilibrer les différentes runqueues ?</li>
            </ul>
            <p class="key-point">Linux utilise une runqueue par cœur avec un mécanisme de load balancing périodique.</p>
        `,
        questions: [
            {
                q: "Pourquoi une seule runqueue pose-t-elle des problèmes de scalabilité ?",
                r: "Avec une seule runqueue, tous les cœurs doivent prendre un <strong>verrou</strong> pour accéder à la file. Plus il y a de cœurs, plus la contention est forte. C'est un <strong>goulot d'étranglement</strong> qui limite le passage à l'échelle."
            },
            {
                q: "Comment fonctionne le load balancing entre runqueues ?",
                r: "Périodiquement, le noyau vérifie si certains cœurs sont surchargés et d'autres sous-utilisés. Si un déséquilibre est détecté, des processus sont <strong>migrés</strong> d'une runqueue à une autre. C'est un compromis entre équité et localité."
            }
        ]
    },
    {
        id: 76,
        title: "Mémoire",
        resume: `
            <p><em>Diapo de titre introduisant la section sur la gestion de la mémoire.</em></p>
        `,
        questions: [
            {
                q: "Pourquoi la gestion de la mémoire est-elle un sujet central des OS ?",
                r: "La mémoire est une ressource <strong>limitée</strong> et <strong>partagée</strong> entre tous les processus. L'OS doit : allouer la mémoire équitablement, <strong>isoler</strong> les processus entre eux, permettre le partage quand nécessaire, et gérer le manque de mémoire physique."
            }
        ]
    },
    {
        id: 77,
        title: "Rappel : différents types de mémoire",
        resume: `
            <p><strong>Mémoire volatile</strong> (s'efface sans courant) :</p>
            <ul>
                <li><strong>Registres</strong> des cœurs (ultra-rapide, quelques octets)</li>
                <li><strong>Caches</strong> des cœurs (L1, L2, L3 - très rapide, Ko à Mo)</li>
                <li><strong>RAM</strong> (rapide, Go)</li>
            </ul>
            <p><strong>Mémoire non-volatile</strong> (stockage persistant) :</p>
            <ul>
                <li><strong>Disques durs</strong> mécaniques, SSD, NVMe</li>
                <li>Disquettes, CD, DVD, Blu-Ray...</li>
                <li><strong>Bandes magnétiques</strong> (oui, encore utilisées pour l'archivage !)</li>
            </ul>
            <p class="key-point">Plus la mémoire est rapide, plus elle est chère et petite. C'est la hiérarchie mémoire.</p>
        `,
        questions: [
            {
                q: "Pourquoi utilise-t-on encore des bandes magnétiques ?",
                r: "Les bandes sont <strong>très bon marché</strong> par Go et ont une excellente durabilité pour l'archivage à long terme. Les datacenters les utilisent pour les sauvegardes cold storage. L'accès est séquentiel et lent, mais pour des archives rarement consultées, c'est idéal."
            },
            {
                q: "Qu'est-ce que la hiérarchie mémoire ?",
                r: "C'est l'organisation en niveaux : <strong>registres → cache L1 → L2 → L3 → RAM → SSD → HDD</strong>. En montant dans la hiérarchie : plus rapide, plus cher, plus petit. L'OS et le matériel gèrent automatiquement le placement des données dans cette hiérarchie."
            }
        ]
    },
    {
        id: 78,
        title: "Cache vs bufferisation",
        resume: `
            <p><strong>Cache</strong> :</p>
            <ul>
                <li>Zone de stockage <strong>intermédiaire</strong>, plus rapide mais plus petite</li>
                <li>Données <strong>récemment accédées</strong> pour y accéder à nouveau</li>
                <li>Préchargement de données qui pourraient être bientôt chargées</li>
                <li><strong>Évincement</strong> : déplacement vers mémoire plus lente quand plus de place</li>
            </ul>
            <p><strong>Exemples de cache</strong> : cache disque (matériel), caches L1/L2/L3 (matériel), cache des pages mémoires (logiciel)</p>
            <p><strong>Bufferisation</strong> :</p>
            <ul>
                <li>Stockage dans une zone <strong>temporaire</strong></li>
                <li>Traitement des données <strong>quand il y en a assez</strong></li>
                <li>Exemples : buffer clavier, buffer d'écriture disque</li>
            </ul>
        `,
        questions: [
            {
                q: "Quelle est la différence fondamentale entre cache et buffer ?",
                r: "Le <strong>cache</strong> garde une copie des données pour un accès futur rapide. Le <strong>buffer</strong> accumule des données avant traitement (ex: écrire sur disque par blocs plutôt qu'octet par octet). Le cache optimise la <strong>lecture</strong>, le buffer optimise le <strong>traitement par lots</strong>."
            },
            {
                q: "Quelles données évincer du cache quand il est plein ?",
                r: "Algorithmes classiques : <strong>LRU</strong> (Least Recently Used) évince les données les moins récemment utilisées, <strong>LFU</strong> (Least Frequently Used) évince les moins fréquemment utilisées. LRU est le plus courant car simple et efficace."
            }
        ]
    },
    {
        id: 79,
        title: "Encore une ressource à partager",
        resume: `
            <p><strong>Constat</strong> :</p>
            <ul>
                <li>Chaque processus a besoin de mémoire pour être exécuté</li>
                <li>Plusieurs processus existent simultanément → leur mémoire aussi</li>
            </ul>
            <p><strong>Question centrale</strong> : Comment répartir la mémoire entre processus ?</p>
            <p class="key-point">On retrouve les mêmes problématiques qu'avec le CPU : partage équitable, isolation, efficacité.</p>
        `,
        questions: [
            {
                q: "Quels sont les défis du partage de mémoire entre processus ?",
                r: "1) <strong>Isolation</strong> : un processus ne doit pas accéder à la mémoire des autres. 2) <strong>Flexibilité</strong> : les besoins mémoire varient dans le temps. 3) <strong>Efficacité</strong> : éviter le gaspillage. 4) <strong>Partage contrôlé</strong> : permettre le partage volontaire (bibliothèques, IPC)."
            }
        ]
    },
    {
        id: 80,
        title: "Une solution : le partitionnement",
        resume: `
            <p><strong>Partitionnement</strong> : découper la mémoire en n partitions de même taille pour n processus.</p>
            <p><strong>Inconvénients</strong> :</p>
            <ul>
                <li>Au maximum <strong>n processus</strong></li>
                <li>Chaque processus obtient la <strong>même quantité</strong> de mémoire</li>
                <li>Processus qui n'utilise pas tout → <strong>gaspillage</strong></li>
                <li>Processus qui a besoin de plus → <strong>famine</strong></li>
                <li>Chaque processus a un intervalle d'adresses fixes</li>
            </ul>
            <p><strong>Problème de sécurité</strong> : que se passe-t-il si un processus lit/écrit une adresse en-dehors de sa partition ?</p>
            <p class="key-point">Le partitionnement simple est trop rigide. Il faut une solution plus flexible.</p>
        `,
        questions: [
            {
                q: "Pourquoi le partitionnement fixe est-il problématique ?",
                r: "Les processus ont des besoins mémoire <strong>différents et variables</strong>. Un navigateur web peut avoir besoin de gigaoctets, un petit script de quelques Mo. Avec des partitions fixes, soit on gaspille, soit on manque de mémoire."
            },
            {
                q: "Comment empêcher un processus d'accéder à la mémoire des autres ?",
                r: "Il faut un mécanisme de <strong>protection matérielle</strong>. Le processeur vérifie à chaque accès mémoire que l'adresse est dans les limites autorisées. Si non, il génère une exception (segmentation fault). C'est la base de la <strong>mémoire virtuelle</strong>."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(8, section8Data);
