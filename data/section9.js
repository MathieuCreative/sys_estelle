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
                q: "Pourquoi est-il difficile de prévoir la taille de partition nécessaire ?",
                r: "La consommation mémoire dépend des <strong>données d'entrée</strong> et de l'utilisation. Un éditeur de texte peut avoir besoin de 10 Mo pour un petit fichier ou 1 Go pour un fichier énorme. Impossible de prévoir à l'avance."
            },
            {
                q: "Comment permettre le partage de mémoire tout en assurant l'isolation ?",
                r: "Il faut un mécanisme qui permette de <strong>désigner explicitement</strong> les zones partagées. Par défaut tout est isolé, mais sur demande (ex: shared memory), deux processus peuvent accéder à la même zone physique."
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
                q: "Pourquoi des pages de 4 Ko ?",
                r: "C'est un compromis : pages trop <strong>petites</strong> = trop de métadonnées à gérer (tables de pages énormes). Pages trop <strong>grandes</strong> = gaspillage (fragmentation interne). 4 Ko est un bon équilibre pour la plupart des workloads."
            },
            {
                q: "Comment résoudre le problème des pages non contiguës ?",
                r: "La <strong>mémoire virtuelle</strong> ! Chaque processus voit un espace d'adresses <strong>virtuel contigu</strong>. Le matériel traduit ces adresses virtuelles en adresses physiques (potentiellement dispersées). Le processus ne voit jamais les \"trous\"."
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
                q: "Pourquoi les bibliothèques partagées économisent-elles de la mémoire ?",
                r: "Si 100 processus utilisent la libc, au lieu de charger 100 copies en RAM, on charge <strong>une seule copie</strong> et tous les processus y accèdent. Comme c'est en lecture seule, pas de conflit. Économie massive de RAM."
            },
            {
                q: "Qu'est-ce que cela signifie que les processus n'utilisent pas toute leur mémoire allouée ?",
                r: "Un processus peut allouer 1 Go avec malloc() mais n'utiliser que 100 Mo. Grâce à l'<strong>allocation paresseuse</strong>, l'OS n'alloue la mémoire physique que quand elle est vraiment accédée. Le reste n'existe que virtuellement."
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
                q: "Pourquoi une adresse virtuelle n'a-t-elle pas de sens pour un autre processus ?",
                r: "Chaque processus a sa propre <strong>table de pages</strong>. L'adresse virtuelle 0x1000 dans le processus A pointe vers une page physique différente de 0x1000 dans le processus B. Même adresse virtuelle, <strong>contenus différents</strong>."
            },
            {
                q: "Comment le processus peut-il utiliser \"toute la mémoire\" s'il y a plusieurs processus ?",
                r: "Chaque processus <strong>croit</strong> avoir toute la mémoire (ex: 256 To d'espace virtuel en 64 bits). Mais il n'utilise qu'une petite partie, qui est traduite vers de la mémoire physique réelle. Les zones non utilisées ne consomment pas de RAM."
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
                q: "Pourquoi l'alignement mémoire est-il important ?",
                r: "Un accès mémoire <strong>non aligné</strong> (ex: lire un int de 4 octets à l'adresse 0x1001) peut nécessiter <strong>deux accès mémoire</strong> au lieu d'un, car les données chevauchent deux mots mémoire. Certains processeurs refusent même ces accès."
            },
            {
                q: "Comment la mémoire virtuelle abstrait-elle le stockage physique ?",
                r: "Une page virtuelle peut être : en <strong>cache CPU</strong>, en <strong>RAM</strong>, sur le <strong>disque</strong> (swap), ou <strong>pas encore allouée</strong>. Le processus utilise la même adresse virtuelle. Le matériel et l'OS gèrent transparently où sont vraiment les données."
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
                q: "Comment peut-on allouer plus de mémoire que disponible physiquement ?",
                r: "Grâce à l'<strong>allocation paresseuse</strong> (lazy allocation). Quand un processus demande de la mémoire, l'OS dit \"OK\" mais n'alloue rien. La page physique n'est allouée qu'au premier accès. Si le processus n'utilise jamais certaines zones, elles ne consomment jamais de RAM."
            },
            {
                q: "Comment fonctionne la mutualisation mémoire ?",
                r: "Plusieurs processus peuvent avoir des pages virtuelles qui pointent vers la <strong>même page physique</strong>. Utilisé pour les bibliothèques partagées, le code exécutable (fork), et la mémoire partagée explicite (shm). Une seule copie en RAM, visible par tous."
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
                q: "Pourquoi la traduction doit-elle être ultra-rapide ?",
                r: "Chaque instruction peut accéder à la mémoire (lecture instruction, lecture/écriture données). Si la traduction prend 10ns et qu'on fait 1 milliard d'accès/seconde, c'est 10 secondes de overhead ! Le <strong>TLB</strong> (cache de traduction) est indispensable."
            },
            {
                q: "Combien de mémoire consomment les tables de pages ?",
                r: "En 64 bits avec 4 niveaux de tables, une table = 4 Ko. Pour un processus utilisant quelques Go, les tables peuvent prendre plusieurs Mo. Avec des centaines de processus, ça s'accumule. D'où l'importance des tables <strong>multi-niveaux</strong> qui n'allouent que le nécessaire."
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
                q: "Pourquoi le décalage reste-t-il identique entre virtuel et physique ?",
                r: "Les pages virtuelles et physiques ont la <strong>même taille</strong> (ex: 4 Ko). Si l'octet est au 100ème offset dans la page virtuelle, il sera au 100ème offset dans la page physique. Seule l'adresse de <strong>base</strong> de la page change."
            },
            {
                q: "Combien de bits pour le décalage avec des pages de 4 Ko ?",
                r: "4 Ko = 4096 = 2^12 octets. Il faut donc <strong>12 bits</strong> pour adresser n'importe quel octet dans la page (de 0 à 4095). Les bits restants de l'adresse forment le numéro de page."
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
                q: "À quoi sert le bit \"dirty\" ?",
                r: "Il indique si la page a été <strong>modifiée</strong> depuis son chargement. C'est crucial pour le swap : si la page est dirty, il faut la <strong>sauvegarder</strong> sur disque avant de la remplacer. Si elle n'est pas dirty, on peut simplement la jeter (on la rechargera depuis le fichier original)."
            },
            {
                q: "Comment les bits de protection implémentent-ils la sécurité ?",
                r: "À chaque accès, le matériel vérifie les permissions. Écriture sur page RO ? <strong>Segmentation fault</strong>. Exécution de code sur page non-X ? <strong>Segmentation fault</strong>. C'est la base de la protection contre les buffer overflows (stack non-exécutable)."
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
                q: "Combien de mémoire pour stocker 2^20 PTE ?",
                r: "Si chaque PTE fait 4 octets : 2^20 × 4 = <strong>4 Mo</strong> par processus juste pour la table de pages ! Avec 100 processus = 400 Mo gaspillés. Inacceptable, surtout que la plupart des PTE sont invalides."
            },
            {
                q: "Pourquoi la plupart des PTE sont-elles invalides ?",
                r: "Un processus n'utilise qu'une <strong>petite fraction</strong> de ses 4 Go virtuels. La pile en haut, le tas en bas, le code au milieu... D'énormes zones ne sont jamais utilisées. Stocker des PTE invalides pour ces zones est du gaspillage."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(9, section9Data);
