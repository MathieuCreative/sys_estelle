// Section 10: Tables de pages multi-niveaux et Pagination fainéante
// Diapos 91 à 100 du PDF 10

const section10Data = [
    {
        id: 91,
        title: "Stockage des tables de pages : cahier des charges",
        resume: `
            <p><strong>Objectifs</strong> pour les tables de pages :</p>
            <ul>
                <li>Associer à chaque numéro de page une <strong>PTE</strong></li>
                <li>Traduction la plus <strong>rapide</strong> possible</li>
                <li>Structure suffisamment simple pour être manipulable par du <strong>matériel dédié</strong></li>
                <li>Structure adaptée aux <strong>accès concurrents</strong></li>
            </ul>
            <p><strong>Propriété à exploiter</strong> : une grande partie de l'espace d'adressage <strong>n'est pas utilisé</strong>.</p>
            <p class="key-point">La structure idéale doit être rapide, compacte pour les zones utilisées, et gérable par le matériel.</p>
        `,
        questions: [
            {
                q: "Pourquoi le matériel doit-il pouvoir manipuler directement les tables ?",
                r: "La traduction d'adresse se fait à <strong>chaque accès mémoire</strong> (milliards de fois par seconde). Si le noyau devait intervenir à chaque fois, ce serait beaucoup trop lent. Le matériel (MMU) fait la traduction <strong>automatiquement</strong>."
            },
            {
                q: "Pourquoi les accès concurrents sont-ils un problème ?",
                r: "Sur une machine multi-cœurs, plusieurs cœurs peuvent accéder aux tables <strong>simultanément</strong>. Si un cœur modifie une PTE pendant qu'un autre la lit, des incohérences peuvent survenir. La structure doit permettre des modifications <strong>atomiques</strong>."
            }
        ]
    },
    {
        id: 92,
        title: "Structures de données pour les tables de pages",
        resume: `
            <p><strong>Tableau simple de PTE</strong> :</p>
            <ul>
                <li>Table entièrement allouée pour tester la validité</li>
                <li><strong>Problème</strong> : 2^20 PTE de 4 octets = 4 Mo par processus</li>
            </ul>
            <p><strong>Table pas entièrement allouée</strong> :</p>
            <ul>
                <li><strong>Liste d'intervalles</strong> : mauvaise complexité O(n)</li>
                <li><strong>Arbre binaire</strong> : support matériel difficile, modifications non atomiques</li>
                <li><strong>Table hachée</strong> (IA64, PowerPC) : optimal en mémoire, temps de recherche non constant, complexe</li>
            </ul>
            <p class="key-point">Aucune de ces solutions n'est idéale. Les tables multi-niveaux offrent un bon compromis.</p>
        `,
        questions: [
            {
                q: "Pourquoi une table hachée n'est-elle pas idéale ?",
                r: "Les <strong>collisions</strong> de hachage créent des listes à parcourir → temps de recherche <strong>non constant</strong>. De plus, le matériel doit implémenter la fonction de hachage et le parcours de liste, ce qui est complexe."
            },
            {
                q: "Quel est l'avantage principal des tables multi-niveaux ?",
                r: "On peut <strong>ne pas allouer</strong> les sous-tables pour les zones inutilisées. Si un processus n'utilise que quelques Mo de mémoire, seules quelques sous-tables sont allouées, pas toute la table de 4 Mo."
            }
        ]
    },
    {
        id: 93,
        title: "Autre structure : table de pages à plusieurs niveaux",
        resume: `
            <p><strong>Table multi-niveaux</strong> : un tableau d'indirection vers des sous-tableaux.</p>
            <ul>
                <li>Tableau de niveau 1 avec N cases</li>
                <li>N tableaux de niveau 2 avec M cases</li>
                <li>etc.</li>
            </ul>
            <p><strong>Intérêt</strong> : supprimer les tableaux de niveau > 1 pour les zones mémoires <strong>invalides</strong>.</p>
            <ul>
                <li>Seul le tableau de niveau 1 est forcément entièrement alloué</li>
            </ul>
            <p><strong>Découpage de l'adresse virtuelle</strong> :</p>
            <ul>
                <li>Premiers bits : entrée dans la table de niveau 1</li>
                <li>Bits suivants : entrée dans le niveau suivant</li>
                <li>Derniers bits : décalage dans la page</li>
            </ul>
            <p class="key-point">Tous les bits ne sont pas forcément utilisés (ex: 48 bits sur 64 en x86_64).</p>
        `,
        questions: [
            {
                q: "Comment la table multi-niveaux économise-t-elle de la mémoire ?",
                r: "Si une entrée de niveau 1 pointe vers une zone non utilisée, on met un <strong>pointeur NULL</strong> au lieu d'allouer une sous-table. Les millions de PTE invalides ne sont tout simplement <strong>pas allouées</strong>."
            },
            {
                q: "Quel est le coût d'une table multi-niveaux ?",
                r: "La traduction est plus lente car il faut <strong>plusieurs accès mémoire</strong> (un par niveau). Avec 4 niveaux, 4 accès sont nécessaires avant d'avoir l'adresse physique. Le <strong>TLB</strong> atténue ce coût en cachant les traductions."
            }
        ]
    },
    {
        id: 94,
        title: "Cas extrêmes des tables de pages à plusieurs niveaux",
        resume: `
            <p><strong>Processus avec une seule page mémoire</strong> :</p>
            <ul>
                <li>Une seule table allouée par niveau</li>
                <li><strong>Très petit</strong> comparé à une table linéaire complète</li>
            </ul>
            <p><strong>Processus qui utilise toute la mémoire virtuelle</strong> :</p>
            <ul>
                <li>Le dernier niveau fait la même taille qu'une table linéaire complète</li>
                <li>Plus les tables de niveaux inférieurs en plus</li>
                <li>Mais c'est le <strong>pire cas</strong>, extrêmement rare !</li>
            </ul>
            <p class="key-point">En pratique, les tables multi-niveaux sont presque toujours plus efficaces qu'une table plate.</p>
        `,
        questions: [
            {
                q: "Pourquoi le pire cas est-il rare ?",
                r: "Aucun processus n'utilise vraiment toute la mémoire virtuelle disponible (256 To en 64 bits !). Même les plus gros programmes utilisent quelques dizaines de Go au maximum. Les tables multi-niveaux sont donc <strong>presque toujours gagnantes</strong>."
            },
            {
                q: "Combien de mémoire pour un processus minimaliste avec des tables multi-niveaux ?",
                r: "Avec 4 niveaux et des pages de 4 Ko : une table de 4 Ko par niveau = <strong>16 Ko</strong> total. Comparez à 4 Mo pour une table plate ! C'est une économie de facteur 250."
            }
        ]
    },
    {
        id: 95,
        title: "Table de page à 4 niveaux dans Linux x86_64",
        resume: `
            <p><strong>4 niveaux</strong> utilisés (5 possibles avec le flag <code>la57</code>) :</p>
            <ul>
                <li>Pointeurs de <strong>8 octets</strong> (64 bits)</li>
                <li>Seulement <strong>48 bits</strong> d'adresse virtuelle réellement utilisés</li>
            </ul>
            <p><strong>Découpage</strong> :</p>
            <ul>
                <li>9 bits de <strong>PGD</strong> (Page Global Directory)</li>
                <li>9 bits de <strong>PUD</strong> (Page Upper Directory)</li>
                <li>9 bits de <strong>PMD</strong> (Page Middle Directory)</li>
                <li>9 bits de <strong>PTE</strong> (Page Table Entry)</li>
                <li>12 bits de décalage dans la page</li>
            </ul>
            <p class="key-point">9 + 9 + 9 + 9 + 12 = 48 bits → permet d'adresser 256 To de mémoire virtuelle !</p>
        `,
        questions: [
            {
                q: "Pourquoi seulement 48 bits sur les 64 disponibles ?",
                r: "48 bits permettent déjà d'adresser <strong>256 To</strong>, bien plus que n'importe quel système actuel. Utiliser plus de bits augmenterait la taille des tables sans bénéfice pratique. Les bits 48-63 sont réservés pour le futur."
            },
            {
                q: "Que fait le flag la57 ?",
                r: "Il active le <strong>5ème niveau</strong> de tables de pages, passant de 48 à 57 bits d'adresse. Cela permet d'adresser <strong>128 Po</strong> (pétaoctets) de mémoire virtuelle. Utile uniquement pour les très grosses machines."
            }
        ]
    },
    {
        id: 96,
        title: "Table de page à 4 niveaux dans Linux x86_64 (suite)",
        resume: `
            <p><strong>Pourquoi 9 bits par niveau ?</strong></p>
            <ul>
                <li>Chaque (sous-)table doit tenir exactement dans une <strong>page</strong></li>
                <li>Une page = <strong>4096 octets</strong></li>
                <li>Une PTE = <strong>8 octets</strong></li>
                <li>4096 / 8 = <strong>512 PTE</strong> par page</li>
                <li>512 = 2^9 → besoin de <strong>9 bits</strong> pour l'index dans la page</li>
            </ul>
            <p>Même calcul pour les pointeurs (8 octets) : 512 pointeurs par page = 9 bits.</p>
            <p class="key-point">Cette conception permet d'allouer les tables par pages entières, simplifiant la gestion mémoire.</p>
        `,
        questions: [
            {
                q: "Pourquoi aligner les tables sur des pages est-il avantageux ?",
                r: "1) L'allocation de pages est simple et rapide. 2) Les tables sont automatiquement <strong>alignées</strong> en mémoire. 3) On peut utiliser les mêmes mécanismes de pagination pour les tables elles-mêmes. 4) Facilite le swap des tables."
            },
            {
                q: "Combien d'entrées maximum par niveau ?",
                r: "Avec 9 bits, chaque niveau peut avoir <strong>512 entrées</strong> (2^9). Donc : niveau 1 = 512 entrées vers niveau 2, niveau 2 = 512×512 entrées possibles, etc. Au total : 512^4 = 2^36 pages de 4 Ko = 2^48 octets adressables."
            }
        ]
    },
    {
        id: 97,
        title: "Pagination fainéante",
        resume: `
            <p><strong>Allocation paresseuse</strong> (lazy allocation) :</p>
            <ul>
                <li>Allouer de la mémoire physique prend du <strong>temps</strong></li>
                <li>Solution : dire que l'allocation a réussi, créer la PTE, mais allouer <strong>au dernier moment</strong></li>
                <li>La page physique est allouée lors du <strong>premier accès</strong></li>
            </ul>
            <p><strong>Applications</strong> :</p>
            <ul>
                <li>Ne pas dupliquer une page tant qu'elle n'est pas <strong>modifiée</strong></li>
                <li>Charger une page depuis le disque que lors de l'<strong>accès</strong></li>
            </ul>
            <p><strong>Défaut de page</strong> : exception déclenchée lors de l'accès à une page non encore allouée physiquement.</p>
        `,
        questions: [
            {
                q: "Quel est l'avantage de la pagination fainéante ?",
                r: "Un programme peut allouer 1 Go mais n'utiliser que 10 Mo. Sans allocation paresseuse, 1 Go de RAM serait réservé inutilement. Avec, seuls les 10 Mo réellement utilisés consomment de la RAM. <strong>Énorme économie</strong> de mémoire."
            },
            {
                q: "Qu'est-ce que le demand paging ?",
                r: "C'est le chargement des pages de code/données depuis le disque <strong>à la demande</strong>. Au lancement d'un programme, seules quelques pages sont chargées. Le reste est chargé quand le code y accède, via des défauts de page."
            }
        ]
    },
    {
        id: 98,
        title: "Défaut de page",
        resume: `
            <p><strong>Défaut de page</strong> : accès à une page virtuelle qui n'a pas de page physique associée.</p>
            <ul>
                <li>Le processeur ne sait pas quoi faire</li>
                <li>Il envoie une <strong>exception</strong> au noyau</li>
            </ul>
            <p><strong>Cas possibles</strong> :</p>
            <ul>
                <li><strong>Mémoire pas allouée physiquement</strong> → allocation d'une page</li>
                <li><strong>Page mémoire sur le disque</strong> (swap) → chargement en RAM</li>
                <li><strong>Accès en écriture à une page CoW</strong> → duplication (copy-on-write)</li>
                <li><strong>Adresse invalide / accès interdit</strong> → <strong>segmentation fault</strong></li>
            </ul>
            <p class="key-point">Le noyau analyse la cause et réagit en conséquence. Seul le dernier cas tue le processus.</p>
        `,
        questions: [
            {
                q: "Comment le noyau distingue-t-il les différents cas de défaut de page ?",
                r: "Le noyau consulte ses <strong>structures internes</strong> (VMA - Virtual Memory Areas) pour savoir si l'adresse est valide et quel type de page c'est. Il regarde aussi le type d'accès (lecture/écriture/exécution) et les permissions."
            },
            {
                q: "Un défaut de page est-il coûteux ?",
                r: "Un défaut de page \"mineur\" (allocation simple) coûte quelques <strong>microsecondes</strong>. Un défaut \"majeur\" (chargement depuis le disque) peut coûter des <strong>millisecondes</strong> (1000× plus lent). Trop de défauts majeurs = système très lent (thrashing)."
            }
        ]
    },
    {
        id: 99,
        title: "Projections (mmap)",
        resume: `
            <p><strong>Projection</strong> : mapper une zone mémoire dans l'espace d'adressage d'un processus.</p>
            <ul>
                <li>Depuis un <strong>fichier</strong> sur disque</li>
                <li>Depuis une <strong>autre zone mémoire</strong></li>
            </ul>
            <p><strong>Appel système mmap()</strong> :</p>
            <ul>
                <li><code>MAP_SHARED</code> : modifications répercutées dans le fichier</li>
                <li><code>MAP_PRIVATE</code> : modifications propres au processus (copy-on-write)</li>
                <li><code>MAP_ANONYMOUS</code> : pas de fichier, initialisation à zéro</li>
            </ul>
            <p><strong>Utilisations</strong> : pile, tas, code, bibliothèques partagées...</p>
            <p class="key-point">mmap() permet de mutualiser les zones mémoires communes (bibliothèques).</p>
        `,
        questions: [
            {
                q: "Quelle est la différence entre MAP_SHARED et MAP_PRIVATE pour un fichier ?",
                r: "<strong>MAP_SHARED</strong> : les modifications sont écrites dans le fichier et visibles par les autres processus. <strong>MAP_PRIVATE</strong> : les modifications créent une copie privée (CoW), le fichier original n'est pas modifié."
            },
            {
                q: "Pourquoi utiliser mmap() plutôt que read()/write() ?",
                r: "Avec mmap(), le fichier est directement accessible comme de la mémoire. Pas besoin de copier les données vers un buffer. Les accès sont gérés par la pagination → <strong>plus efficace</strong> pour les gros fichiers ou les accès aléatoires."
            }
        ]
    },
    {
        id: 100,
        title: "Fork et copy-on-write",
        resume: `
            <p><strong>Problème</strong> : les copies mémoires coûtent cher.</p>
            <ul>
                <li><code>fork()</code> devrait dupliquer tout l'espace mémoire</li>
                <li>Mais souvent suivi de <code>exec()</code> qui remplace tout !</li>
            </ul>
            <p><strong>Copy-on-Write (CoW)</strong> :</p>
            <ul>
                <li>Retarder au maximum les duplications</li>
                <li>Les pages des deux processus pointent vers la <strong>même page physique</strong></li>
                <li>Économise également la mémoire physique</li>
                <li>Les pages sont mises en <strong>lecture seule</strong></li>
                <li>Lors d'une modification → <strong>défaut de page</strong> → copie de la page physique</li>
            </ul>
            <p class="key-point">fork() devient quasi-instantané grâce au CoW, même pour des processus de plusieurs Go.</p>
        `,
        questions: [
            {
                q: "Pourquoi fork() + exec() est-il un pattern si courant ?",
                r: "C'est la façon Unix de créer un nouveau processus : <code>fork()</code> crée une copie, <code>exec()</code> remplace son code par un autre programme. Sans CoW, fork() copierait des Go de mémoire... juste pour les jeter immédiatement avec exec()."
            },
            {
                q: "Comment le noyau sait-il quand faire la copie ?",
                r: "Les pages CoW sont marquées <strong>lecture seule</strong>. Quand un processus écrit, le matériel déclenche un défaut de page (violation de permission). Le noyau vérifie que c'est du CoW, crée une copie de la page, et retente l'écriture."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(10, section10Data);
