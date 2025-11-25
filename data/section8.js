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
                q: "Citez les domaines nécessitant des garanties temps-réel mentionnés dans cette diapo.",
                r: "<strong>embarqué, robotique, santé, audio, vidéo</strong>"
            },
            {
                q: "Selon cette diapo, depuis quelle version le patch PREEMPT_RT est-il fusionné dans Linux ?",
                r: "<strong>Patch fusionné</strong> dans Linux depuis la version 6.12"
            },
            {
                q: "Quel est le point clé de cette diapo sur l'ordonnanceur temps-réel ?",
                r: "Il faut explicitement indiquer qu'on souhaite utiliser l'ordonnanceur temps-réel."
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
        questions: []
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
                q: "D'après cette diapo, a-t-on une vraie exécution simultanée avec un unique cœur ?",
                r: "<strong>Réponse</strong> : <strong>Non</strong>, avec un unique cœur, il n'y a pas d'exécution vraiment simultanée. Uniquement une <strong>alternance d'exécution</strong> de processus. Mais c'est <strong>transparent</strong> pour les processus."
            },
            {
                q: "Quel est le point clé de cette diapo sur la perception des processus ?",
                r: "Les processus ne savent pas qu'ils partagent le CPU. Chacun croit avoir le processeur pour lui seul."
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
                q: "Citez les deux caractéristiques du multi-cœurs listées dans cette diapo.",
                r: "Un flux d'exécution par cœur. Toujours de la <strong>préemption</strong> (généralement plus de tâches que de cœurs)."
            },
            {
                q: "Quel est le point clé de cette diapo sur l'ordonnancement multi-cœurs ?",
                r: "L'ordonnancement multi-cœurs doit équilibrer la charge tout en préservant la localité des données."
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
                q: "Citez les deux approches de runqueue pour machines multicœurs mentionnées dans cette diapo.",
                r: "<strong>Une seule runqueue (Load Sharing)</strong> : tous les cœurs y piochent, <strong>contention</strong> pour y accéder si beaucoup de cœurs. <strong>Une runqueue par cœur (Load Balancing)</strong> : chaque cœur a sa propre runqueue, <strong>pas de contention</strong>."
            },
            {
                q: "Quel est le point clé de cette diapo sur l'approche de Linux ?",
                r: "Linux utilise une runqueue par cœur avec un mécanisme de load balancing périodique."
            }
        ]
    },
    {
        id: 76,
        title: "Mémoire",
        resume: `
            <p><em>Diapo de titre introduisant la section sur la gestion de la mémoire.</em></p>
        `,
        questions: []
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
                q: "Citez les types de mémoire volatile listés dans cette diapo.",
                r: "<strong>Registres</strong> des cœurs (ultra-rapide, quelques octets). <strong>Caches</strong> des cœurs (L1, L2, L3 - très rapide, Ko à Mo). <strong>RAM</strong> (rapide, Go)."
            },
            {
                q: "Quel est le point clé de cette diapo sur la hiérarchie mémoire ?",
                r: "Plus la mémoire est rapide, plus elle est chère et petite. C'est la hiérarchie mémoire."
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
                q: "Citez les caractéristiques du cache listées dans cette diapo.",
                r: "Zone de stockage <strong>intermédiaire</strong>, plus rapide mais plus petite. Données <strong>récemment accédées</strong> pour y accéder à nouveau. Préchargement de données qui pourraient être bientôt chargées. <strong>Évincement</strong> : déplacement vers mémoire plus lente quand plus de place."
            },
            {
                q: "Citez les caractéristiques de la bufferisation listées dans cette diapo.",
                r: "Stockage dans une zone <strong>temporaire</strong>. Traitement des données <strong>quand il y en a assez</strong>."
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
                q: "Quelle est la question centrale de cette diapo ?",
                r: "Comment répartir la mémoire entre processus ?"
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "On retrouve les mêmes problématiques qu'avec le CPU : partage équitable, isolation, efficacité."
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
                q: "Citez les inconvénients du partitionnement listés dans cette diapo.",
                r: "Au maximum <strong>n processus</strong>. Chaque processus obtient la <strong>même quantité</strong> de mémoire. Processus qui n'utilise pas tout → <strong>gaspillage</strong>. Processus qui a besoin de plus → <strong>famine</strong>. Chaque processus a un intervalle d'adresses fixes."
            },
            {
                q: "Quel est le point clé de cette diapo ?",
                r: "Le partitionnement simple est trop rigide. Il faut une solution plus flexible."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(8, section8Data);
