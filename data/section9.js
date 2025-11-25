// Section 9: Mémoire virtuelle et Pagination
// Diapos 81 à 90 du PDF 9

const section9Data = [
    {
        id: 81,
        title: "Un partitionnement avec moins d'inconvénients",
        resume: `
            <p><strong>Améliorations possibles</strong> du partitionnement :</p>
            <ul>
                <li><strong>Partitions de tailles différentes</strong>
                    <ul><li>Mais comment décider quelle taille attribuer ?</li></ul>
                </li>
                <li><strong>Nombre de partitions évolutif</strong>
                    <ul>
                        <li>Au fur et à mesure que de nouveaux processus sont créés</li>
                        <li>Mais quid de l'évolution de la consommation mémoire d'un processus ?</li>
                    </ul>
                </li>
                <li><strong>Support matériel</strong> pour empêcher les accès hors partition
                    <ul><li>Mais parfois on veut partager de la mémoire entre processus</li></ul>
                </li>
            </ul>
            <p class="key-point">Ces améliorations ne suffisent pas. Il faut une approche radicalement différente.</p>
        `,
        questions: [
            {
                q: "Citez les trois améliorations possibles du partitionnement mentionnées dans cette diapo.",
                r: "<strong>Partitions de tailles différentes</strong>, <strong>Nombre de partitions évolutif</strong>, et <strong>Support matériel</strong> pour empêcher les accès hors partition."
            },
            {
                q: "Selon cette diapo, quelle est la conclusion sur ces améliorations ?",
                r: "Ces améliorations ne suffisent pas. Il faut une approche <strong>radicalement différente</strong>."
            }
        ]
    },
    {
        id: 82,
        title: "Pagination",
        resume: `
            <p><strong>Pagination</strong> : pas de gros blocs par processus, mais de petites <strong>pages</strong> allouées au fur et à mesure.</p>
            <ul>
                <li>Généralement <strong>4 Ko</strong> (4096 octets), dépend de l'architecture</li>
            </ul>
            <p><strong>Avantages</strong> :</p>
            <ul>
                <li>Gestion de la mémoire à <strong>faible granularité</strong></li>
                <li>Pas (peu) de gaspillage mémoire</li>
            </ul>
            <p><strong>Inconvénients</strong> :</p>
            <ul>
                <li>Support matériel bien plus <strong>complexe</strong></li>
                <li>Pas de garantie que les pages soient <strong>contiguës</strong> en mémoire physique</li>
                <li>Problème : un objet à cheval sur deux pages n'a plus des adresses continues !</li>
            </ul>
            <p class="key-point">Et pourtant, c'est ce qui est utilisé par tous les OS modernes !</p>
        `,
        questions: [
            {
                q: "Quelle est la taille généralement utilisée pour les pages selon cette diapo ?",
                r: "Généralement <strong>4 Ko</strong> (4096 octets), dépend de l'architecture."
            },
            {
                q: "Citez les avantages et inconvénients de la pagination mentionnés dans cette diapo.",
                r: "Avantages : gestion de la mémoire à <strong>faible granularité</strong>, pas (peu) de gaspillage mémoire. Inconvénients : support matériel bien plus <strong>complexe</strong>, pas de garantie que les pages soient <strong>contiguës</strong> en mémoire physique."
            }
        ]
    },
    {
        id: 83,
        title: "Quels besoins mémoire ont les processus ?",
        resume: `
            <p><strong>Besoins des processus</strong> :</p>
            <ul>
                <li>Espace d'adressage <strong>contigu</strong> (au moins par gros morceaux)</li>
                <li>Allocation de plus ou moins de mémoire <strong>au cours du temps</strong></li>
                <li>Avoir <strong>assez</strong> de mémoire, voire <strong>toute</strong> la mémoire de la machine</li>
                <li>Pouvoir <strong>partager</strong> des espaces mémoires entre processus</li>
                <li>Mais par défaut <strong>empêcher</strong> les accès non autorisés</li>
            </ul>
            <p><strong>Autres caractéristiques</strong> :</p>
            <ul>
                <li>Les processus n'utilisent pas forcément toute la mémoire allouée</li>
                <li>Plusieurs processus peuvent charger les <strong>mêmes bibliothèques</strong> (libc, GTK...)</li>
                <li>Bibliothèques chargées en <strong>lecture seule</strong> → partageables</li>
            </ul>
        `,
        questions: [
            {
                q: "Citez les besoins mémoire des processus mentionnés dans cette diapo.",
                r: "Espace d'adressage <strong>contigu</strong>, allocation de plus ou moins de mémoire <strong>au cours du temps</strong>, avoir <strong>assez</strong> de mémoire voire <strong>toute</strong> la mémoire de la machine, pouvoir <strong>partager</strong> des espaces mémoires entre processus, et par défaut <strong>empêcher</strong> les accès non autorisés."
            },
            {
                q: "D'après cette diapo, pourquoi les bibliothèques sont-elles chargées en lecture seule ?",
                r: "Les bibliothèques chargées en <strong>lecture seule</strong> sont partageables entre plusieurs processus."
            }
        ]
    },
    {
        id: 84,
        title: "Mémoire virtuelle",
        resume: `
            <p><strong>Mémoire virtuelle</strong> : virtualiser la mémoire pour répondre à tous les besoins avec la pagination.</p>
            <ul>
                <li>Toujours une unique <strong>mémoire physique</strong></li>
                <li>Mais <strong>deux types d'adresses</strong></li>
            </ul>
            <p><strong>Adresse virtuelle</strong> :</p>
            <ul>
                <li>Manipulée par les processus, le noyau et le processeur</li>
                <li><code>printf("%p", &var);</code> affiche une adresse <strong>virtuelle</strong></li>
                <li>Chaque processus a <strong>tout l'espace d'adresses</strong> pour lui</li>
                <li>Une adresse virtuelle d'un processus <strong>n'a pas de sens</strong> pour un autre</li>
            </ul>
            <p><strong>Adresse physique</strong> :</p>
            <ul>
                <li>Manipulée au dernier moment pour accéder à la RAM</li>
                <li>Traduction adresse virtuelle → physique par le <strong>matériel</strong> (MMU)</li>
            </ul>
        `,
        questions: [
            {
                q: "Selon cette diapo, quels sont les deux types d'adresses ?",
                r: "Les <strong>adresses virtuelles</strong> (manipulées par les processus, le noyau et le processeur) et les <strong>adresses physiques</strong> (manipulées au dernier moment pour accéder à la RAM)."
            },
            {
                q: "D'après cette diapo, qu'affiche printf(\"%p\", &var) ?",
                r: "Une adresse <strong>virtuelle</strong>."
            },
            {
                q: "Selon cette diapo, qui fait la traduction d'adresse virtuelle vers physique ?",
                r: "La traduction est faite par le <strong>matériel</strong> (MMU)."
            }
        ]
    },
    {
        id: 85,
        title: "Des adresses vers quoi ?",
        resume: `
            <p>Une adresse désigne un <strong>octet</strong>.</p>
            <ul>
                <li>Les processeurs manipulent des octets, parfois par paquets (1, 2, 4, 8...)</li>
                <li>Contraintes d'<strong>alignement</strong> (une variable de 4 octets doit être à une adresse multiple de 4)</li>
            </ul>
            <p><strong>Accéder à un bit précis d'un octet</strong> :</p>
            <ol>
                <li>Charger l'<strong>octet entier</strong> dans un registre</li>
                <li>Utiliser des opérations <strong>bit-à-bit</strong> (&, |, ~, <<, >>)</li>
            </ol>
            <p><strong>Où sont les octets physiquement ?</strong></p>
            <ul>
                <li>Cache processeur, RAM, disque... <strong>peu importe</strong> !</li>
                <li>Avantage de la mémoire virtuelle : <strong>indépendant</strong> du stockage physique</li>
                <li>Géré au dernier moment par le matériel</li>
            </ul>
        `,
        questions: [
            {
                q: "Selon cette diapo, qu'est-ce qu'une adresse désigne ?",
                r: "Une adresse désigne un <strong>octet</strong>."
            },
            {
                q: "Comment accéder à un bit précis d'un octet d'après cette diapo ?",
                r: "Charger l'<strong>octet entier</strong> dans un registre, puis utiliser des opérations <strong>bit-à-bit</strong> (&, |, ~, <<, >>)."
            },
            {
                q: "D'après cette diapo, quel est l'avantage de la mémoire virtuelle concernant le stockage physique ?",
                r: "La mémoire virtuelle est <strong>indépendante</strong> du stockage physique (cache processeur, RAM, disque)."
            }
        ]
    },
    {
        id: 86,
        title: "Intérêts de la mémoire virtuelle",
        resume: `
            <p><strong>Avantages</strong> :</p>
            <ul>
                <li><strong>Abstraction</strong> du stockage physique (au pire, stocker sur disque)</li>
                <li>Code et données non utilisées peuvent rester sur le disque → chargement <strong>au dernier moment</strong></li>
                <li>Allocation des pages <strong>au dernier moment</strong> → on peut allouer plus que disponible !</li>
                <li>Chaque processus a l'espace d'adressage complet pour lui seul</li>
                <li><strong>Isolation</strong> de la mémoire de chaque processus</li>
                <li>Abstraction pour la programmation : adresses <strong>linéaires</strong></li>
                <li><strong>Mutualisation</strong> facile : plusieurs adresses virtuelles → même adresse physique</li>
                <li><strong>Droits d'accès</strong> à la granularité de la page (R, W, X)</li>
            </ul>
        `,
        questions: [
            {
                q: "Citez trois avantages de la mémoire virtuelle mentionnés dans cette diapo.",
                r: "<strong>Abstraction</strong> du stockage physique, chargement <strong>au dernier moment</strong>, <strong>isolation</strong> de la mémoire de chaque processus."
            },
            {
                q: "D'après cette diapo, comment la mémoire virtuelle permet-elle la mutualisation ?",
                r: "Plusieurs adresses virtuelles peuvent pointer vers la même adresse physique, permettant la <strong>mutualisation</strong> facile."
            },
            {
                q: "Selon cette diapo, à quelle granularité sont les droits d'accès ?",
                r: "Les droits d'accès (R, W, X) sont à la granularité de la <strong>page</strong>."
            }
        ]
    },
    {
        id: 87,
        title: "Inconvénients de la mémoire virtuelle",
        resume: `
            <p><strong>Inconvénients</strong> :</p>
            <ul>
                <li><strong>Complexité</strong>
                    <ul>
                        <li>Besoin de l'aide du matériel (MMU)</li>
                        <li>Mais le noyau gère quand même une bonne partie</li>
                    </ul>
                </li>
                <li><strong>Performances cruciales</strong>
                    <ul>
                        <li>Traduction nécessaire à <strong>chaque accès mémoire</strong> !</li>
                        <li>Doit être extrêmement rapide</li>
                    </ul>
                </li>
                <li><strong>Consommation mémoire</strong>
                    <ul>
                        <li>Il faut stocker les <strong>tables de traduction</strong></li>
                        <li>Overhead non négligeable</li>
                    </ul>
                </li>
            </ul>
            <p class="key-point">Malgré ces inconvénients, les avantages sont tels que tous les OS modernes utilisent la mémoire virtuelle.</p>
        `,
        questions: [
            {
                q: "Citez les trois inconvénients de la mémoire virtuelle mentionnés dans cette diapo.",
                r: "<strong>Complexité</strong> (besoin de l'aide du matériel MMU), <strong>performances cruciales</strong> (traduction nécessaire à chaque accès mémoire), et <strong>consommation mémoire</strong> (il faut stocker les tables de traduction)."
            },
            {
                q: "D'après cette diapo, pourquoi la traduction doit-elle être extrêmement rapide ?",
                r: "La traduction est nécessaire à <strong>chaque accès mémoire</strong>."
            }
        ]
    },
    {
        id: 88,
        title: "Traduire une adresse virtuelle en adresse physique",
        resume: `
            <p>Une adresse virtuelle est composée de :</p>
            <ul>
                <li><strong>Numéro de page</strong> (PFN : Page Frame Number)</li>
                <li><strong>Décalage</strong> (offset) au sein de la page</li>
            </ul>
            <p><strong>Processus de traduction</strong> :</p>
            <ol>
                <li>Le numéro de page sert d'<strong>indice</strong> dans la table de pages</li>
                <li>On récupère une <strong>PTE</strong> (Page Table Entry)</li>
                <li>La PTE contient l'adresse physique du <strong>début</strong> de la page physique</li>
                <li>On applique le même <strong>décalage</strong> sur l'adresse physique</li>
            </ol>
            <p class="key-point">Le décalage reste identique car les pages virtuelles et physiques ont la même taille.</p>
        `,
        questions: [
            {
                q: "Selon cette diapo, de quoi est composée une adresse virtuelle ?",
                r: "Une adresse virtuelle est composée du <strong>numéro de page</strong> (PFN : Page Frame Number) et du <strong>décalage</strong> (offset) au sein de la page."
            },
            {
                q: "D'après cette diapo, décrivez le processus de traduction d'une adresse virtuelle.",
                r: "Le numéro de page sert d'<strong>indice</strong> dans la table de pages, on récupère une <strong>PTE</strong> (Page Table Entry), la PTE contient l'adresse physique du <strong>début</strong> de la page physique, et on applique le même <strong>décalage</strong> sur l'adresse physique."
            },
            {
                q: "Pourquoi le décalage reste-t-il identique selon cette diapo ?",
                r: "Les pages virtuelles et physiques ont la <strong>même taille</strong>."
            }
        ]
    },
    {
        id: 89,
        title: "Les Page Table Entries",
        resume: `
            <p>Chaque processus possède sa <strong>table de pages</strong>, composée de <strong>PTE</strong>.</p>
            <p><strong>Contenu d'une PTE</strong> :</p>
            <ul>
                <li><strong>Adresse physique</strong> de la page</li>
                <li><strong>Bits de validité</strong> : la page physique existe-t-elle vraiment ?</li>
                <li><strong>Bits de protection</strong> : RO (lecture seule), RW (lecture/écriture), X (exécutable)</li>
                <li><strong>Bits d'état</strong> : modifié (dirty), accédé récemment...</li>
                <li><strong>Bits statistiques</strong></li>
            </ul>
            <p class="key-point">La structure exacte de la PTE dépend de l'architecture (x86, ARM...) et de l'OS.</p>
        `,
        questions: [
            {
                q: "Selon cette diapo, que contient une PTE ?",
                r: "<strong>Adresse physique</strong> de la page, <strong>bits de validité</strong>, <strong>bits de protection</strong> (RO, RW, X), <strong>bits d'état</strong> (modifié, accédé récemment), et <strong>bits statistiques</strong>."
            },
            {
                q: "D'après cette diapo, de quoi dépend la structure exacte de la PTE ?",
                r: "La structure exacte de la PTE dépend de l'<strong>architecture</strong> (x86, ARM...) et de l'<strong>OS</strong>."
            }
        ]
    },
    {
        id: 90,
        title: "Exemple de traduction d'adresse",
        resume: `
            <p><strong>Hypothèses</strong> :</p>
            <ul>
                <li>Adresse virtuelle sur <strong>32 bits</strong></li>
                <li>Adresse physique sur <strong>24 bits</strong></li>
                <li>Pages de <strong>4 Ko</strong> (4096 octets)</li>
            </ul>
            <p><strong>Calculs</strong> :</p>
            <ul>
                <li>Page de 4096 octets → besoin de <strong>12 bits</strong> pour le décalage</li>
                <li>Il reste 12 bits pour la page physique → max <strong>16 Mo</strong> de RAM (2^24)</li>
                <li>Pour l'adresse virtuelle : 12 bits décalage + 20 bits numéro de page</li>
                <li>Avec 20 bits → on peut adresser 2^32 = <strong>4 Go</strong> de mémoire virtuelle</li>
                <li>Besoin de <strong>2^20 PTE</strong> par processus !</li>
            </ul>
            <p class="key-point">1 million de PTE par processus = tables énormes. D'où les tables multi-niveaux.</p>
        `,
        questions: [
            {
                q: "Selon cette diapo, quelles sont les hypothèses de l'exemple de traduction ?",
                r: "Adresse virtuelle sur <strong>32 bits</strong>, adresse physique sur <strong>24 bits</strong>, pages de <strong>4 Ko</strong> (4096 octets)."
            },
            {
                q: "D'après cette diapo, combien de bits sont nécessaires pour le décalage avec des pages de 4096 octets ?",
                r: "<strong>12 bits</strong> pour le décalage."
            },
            {
                q: "Selon cette diapo, combien de mémoire virtuelle peut-on adresser avec 32 bits ?",
                r: "2^32 = <strong>4 Go</strong> de mémoire virtuelle."
            },
            {
                q: "Combien de PTE sont nécessaires par processus selon cette diapo ?",
                r: "<strong>2^20 PTE</strong> par processus."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(9, section9Data);
