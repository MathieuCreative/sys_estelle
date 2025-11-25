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
                q: "Citez les objectifs pour les tables de pages mentionnés dans cette diapo.",
                r: "Associer à chaque numéro de page une <strong>PTE</strong>, traduction la plus <strong>rapide</strong> possible, structure suffisamment simple pour être manipulable par du <strong>matériel dédié</strong>, et structure adaptée aux <strong>accès concurrents</strong>."
            },
            {
                q: "Quelle propriété peut-on exploiter selon cette diapo ?",
                r: "Une grande partie de l'espace d'adressage <strong>n'est pas utilisé</strong>."
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
                q: "Selon cette diapo, quel est le problème du tableau simple de PTE ?",
                r: "2^20 PTE de 4 octets = <strong>4 Mo par processus</strong>."
            },
            {
                q: "Citez les structures de données non entièrement allouées mentionnées dans cette diapo.",
                r: "<strong>Liste d'intervalles</strong> (mauvaise complexité O(n)), <strong>arbre binaire</strong> (support matériel difficile, modifications non atomiques), et <strong>table hachée</strong> (optimal en mémoire, temps de recherche non constant, complexe)."
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
                q: "Qu'est-ce qu'une table multi-niveaux selon cette diapo ?",
                r: "Un tableau d'indirection vers des sous-tableaux : tableau de niveau 1 avec N cases, N tableaux de niveau 2 avec M cases, etc."
            },
            {
                q: "D'après cette diapo, quel est l'intérêt des tables multi-niveaux ?",
                r: "Supprimer les tableaux de niveau > 1 pour les zones mémoires <strong>invalides</strong>."
            },
            {
                q: "Selon cette diapo, comment est découpée l'adresse virtuelle ?",
                r: "Premiers bits : entrée dans la table de niveau 1, bits suivants : entrée dans le niveau suivant, derniers bits : <strong>décalage dans la page</strong>."
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
                q: "D'après cette diapo, que se passe-t-il avec un processus qui a une seule page mémoire ?",
                r: "Une seule table allouée par niveau, <strong>très petit</strong> comparé à une table linéaire complète."
            },
            {
                q: "Selon cette diapo, que se passe-t-il avec un processus qui utilise toute la mémoire virtuelle ?",
                r: "Le dernier niveau fait la même taille qu'une table linéaire complète, plus les tables de niveaux inférieurs en plus. Mais c'est le <strong>pire cas</strong>, extrêmement rare."
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
                q: "Selon cette diapo, combien de niveaux sont utilisés dans Linux x86_64 ?",
                r: "<strong>4 niveaux</strong> utilisés (5 possibles avec le flag <code>la57</code>)."
            },
            {
                q: "Citez le découpage de l'adresse mentionné dans cette diapo.",
                r: "9 bits de <strong>PGD</strong> (Page Global Directory), 9 bits de <strong>PUD</strong> (Page Upper Directory), 9 bits de <strong>PMD</strong> (Page Middle Directory), 9 bits de <strong>PTE</strong> (Page Table Entry), et 12 bits de décalage dans la page."
            },
            {
                q: "D'après cette diapo, combien de bits d'adresse virtuelle sont réellement utilisés ?",
                r: "Seulement <strong>48 bits</strong> d'adresse virtuelle réellement utilisés."
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
                q: "Selon cette diapo, pourquoi utilise-t-on 9 bits par niveau ?",
                r: "Chaque (sous-)table doit tenir exactement dans une <strong>page</strong> (4096 octets). Une PTE = <strong>8 octets</strong>. 4096 / 8 = <strong>512 PTE</strong> par page. 512 = 2^9 → besoin de <strong>9 bits</strong> pour l'index dans la page."
            },
            {
                q: "D'après cette diapo, quelle est la taille d'une PTE ?",
                r: "Une PTE = <strong>8 octets</strong>."
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
                q: "Qu'est-ce que l'allocation paresseuse selon cette diapo ?",
                r: "Dire que l'allocation a réussi, créer la PTE, mais allouer la page physique <strong>au dernier moment</strong> (lors du <strong>premier accès</strong>)."
            },
            {
                q: "Citez les applications de l'allocation paresseuse mentionnées dans cette diapo.",
                r: "Ne pas dupliquer une page tant qu'elle n'est pas <strong>modifiée</strong>, et charger une page depuis le disque que lors de l'<strong>accès</strong>."
            },
            {
                q: "Qu'est-ce qu'un défaut de page d'après cette diapo ?",
                r: "Exception déclenchée lors de l'accès à une page non encore allouée physiquement."
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
                q: "Selon cette diapo, qu'est-ce qu'un défaut de page ?",
                r: "Accès à une page virtuelle qui n'a pas de page physique associée. Le processeur envoie une <strong>exception</strong> au noyau."
            },
            {
                q: "Citez les cas possibles de défaut de page mentionnés dans cette diapo.",
                r: "<strong>Mémoire pas allouée physiquement</strong> → allocation d'une page, <strong>page mémoire sur le disque</strong> (swap) → chargement en RAM, <strong>accès en écriture à une page CoW</strong> → duplication, <strong>adresse invalide / accès interdit</strong> → segmentation fault."
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
                q: "Qu'est-ce qu'une projection selon cette diapo ?",
                r: "Mapper une zone mémoire dans l'espace d'adressage d'un processus, depuis un <strong>fichier</strong> sur disque ou depuis une <strong>autre zone mémoire</strong>."
            },
            {
                q: "Citez les options de mmap() mentionnées dans cette diapo.",
                r: "<code>MAP_SHARED</code> (modifications répercutées dans le fichier), <code>MAP_PRIVATE</code> (modifications propres au processus, copy-on-write), et <code>MAP_ANONYMOUS</code> (pas de fichier, initialisation à zéro)."
            },
            {
                q: "D'après cette diapo, à quoi sert mmap() ?",
                r: "Utilisations : pile, tas, code, bibliothèques partagées. mmap() permet de <strong>mutualiser</strong> les zones mémoires communes."
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
                q: "Quel est le problème avec fork() selon cette diapo ?",
                r: "Les copies mémoires coûtent cher. <code>fork()</code> devrait dupliquer tout l'espace mémoire, mais est souvent suivi de <code>exec()</code> qui remplace tout."
            },
            {
                q: "Qu'est-ce que le Copy-on-Write d'après cette diapo ?",
                r: "Retarder au maximum les duplications. Les pages des deux processus pointent vers la <strong>même page physique</strong> et sont mises en <strong>lecture seule</strong>. Lors d'une modification → <strong>défaut de page</strong> → copie de la page physique."
            },
            {
                q: "Selon cette diapo, quel est l'impact du CoW sur fork() ?",
                r: "fork() devient quasi-instantané grâce au CoW, même pour des processus de plusieurs Go."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(10, section10Data);
