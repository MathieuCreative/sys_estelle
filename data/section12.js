// Section 12: Stockage et Systèmes de fichiers
// Diapos 111 à 120 du PDF 12

const section12Data = [
    {
        id: 111,
        title: "Stockage",
        resume: `
            <p><em>Diapo de titre introduisant la section sur le stockage et les systèmes de fichiers.</em></p>
        `,
        questions: []
    },
    {
        id: 112,
        title: "I/O",
        resume: `
            <p><strong>I/O</strong> : Input/Output (Entrées/Sorties).</p>
            <ul>
                <li>Entrées/sorties de données dans l'ensemble {processeur, RAM}</li>
            </ul>
            <p><strong>Peut désigner</strong> :</p>
            <ul>
                <li><strong>Tous les périphériques</strong> : cartes PCI, USB, clavier, souris, réseau, écran, son, console série...</li>
                <li>La <strong>mémoire non-volatile</strong> : disques</li>
            </ul>
            <p class="key-point">Dans cette section, on se concentre sur le stockage sur disques.</p>
        `,
        questions: [
            {
                q: "Que signifie I/O selon cette diapo ?",
                r: "Input/Output (Entrées/Sorties), entrées/sorties de données dans l'ensemble {processeur, RAM}."
            },
            {
                q: "Que peut désigner I/O d'après cette diapo ?",
                r: "<strong>Tous les périphériques</strong> (cartes PCI, USB, clavier, souris, réseau, écran, son, console série...) et la <strong>mémoire non-volatile</strong> (disques)."
            }
        ]
    },
    {
        id: 113,
        title: "Problématiques du stockage de fichiers",
        resume: `
            <p><strong>Problématiques</strong> :</p>
            <ul>
                <li><strong>Intégrité</strong> des données</li>
                <li><strong>Performance</strong></li>
                <li>Comment stocker les <strong>données</strong> ?</li>
                <li>Et les <strong>métadonnées</strong> ? (attributs, taille, droits...)</li>
                <li>Comment <strong>récupérer</strong> les données après un crash ?</li>
                <li>Comment gérer les <strong>accès concurrents</strong> de différents processus ?</li>
            </ul>
            <p><strong>Solution</strong> : utiliser des <strong>systèmes de fichiers</strong>.</p>
        `,
        questions: [
            {
                q: "Citez les problématiques du stockage de fichiers mentionnées dans cette diapo.",
                r: "<strong>Intégrité</strong> des données, <strong>performance</strong>, comment stocker les <strong>données</strong> et les <strong>métadonnées</strong>, comment <strong>récupérer</strong> les données après un crash, et comment gérer les <strong>accès concurrents</strong>."
            },
            {
                q: "Quelle est la solution à ces problématiques selon cette diapo ?",
                r: "Utiliser des <strong>systèmes de fichiers</strong>."
            }
        ]
    },
    {
        id: 114,
        title: "Systèmes de fichiers",
        resume: `
            <p><strong>Système de fichiers</strong> : définit comment sont stockées les (méta-)données sur le disque.</p>
            <ul>
                <li>Distingue le stockage <strong>physique</strong> (octets) des représentations <strong>logiques</strong> (fichiers, répertoires)</li>
                <li><strong>Abstrait</strong> le type de support physique</li>
            </ul>
            <p><strong>Sans système de fichiers ?</strong></p>
            <ul>
                <li>On peut ouvrir directement le <strong>périphérique bloc</strong> pour lire/écrire des octets</li>
                <li>Par exemple : <code>/dev/sda3</code></li>
                <li>Les processus doivent se mettre d'accord sur qui écrit où</li>
            </ul>
            <p class="key-point">Le système de fichiers fournit une abstraction essentielle : fichiers, répertoires, permissions.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce qu'un système de fichiers selon cette diapo ?",
                r: "Définit comment sont stockées les (méta-)données sur le disque. Distingue le stockage <strong>physique</strong> (octets) des représentations <strong>logiques</strong> (fichiers, répertoires). <strong>Abstrait</strong> le type de support physique."
            },
            {
                q: "D'après cette diapo, que peut-on faire sans système de fichiers ?",
                r: "Ouvrir directement le <strong>périphérique bloc</strong> pour lire/écrire des octets (par exemple : <code>/dev/sda3</code>). Les processus doivent se mettre d'accord sur qui écrit où."
            }
        ]
    },
    {
        id: 115,
        title: "Pile d'accès au stockage",
        resume: `
            <p><strong>Couches d'accès au stockage</strong> :</p>
            <ol>
                <li><strong>Interface haut niveau</strong> : fopen, fread, fwrite (bibliothèque C)</li>
                <li><strong>Appels système</strong> : open, read, write</li>
                <li><strong>Virtual File System</strong> (VFS) : abstraction des systèmes de fichiers</li>
                <li><strong>Systèmes de fichiers</strong> : Ext4, NTFS, ZFS, BTRFS, NFS, SSHFS (FUSE)...</li>
                <li><strong>Block Device Layer</strong> : virtualisation des blocs (RAID, LVM, chiffrement)</li>
                <li><strong>Drivers</strong> : IDE, SATA, NVME...</li>
                <li><strong>Périphériques</strong> : stockage physique des blocs</li>
            </ol>
        `,
        questions: [
            {
                q: "Citez les couches d'accès au stockage mentionnées dans cette diapo.",
                r: "<strong>Interface haut niveau</strong> (fopen, fread, fwrite), <strong>appels système</strong> (open, read, write), <strong>Virtual File System</strong> (VFS), <strong>systèmes de fichiers</strong> (Ext4, NTFS, ZFS, BTRFS, NFS, SSHFS), <strong>Block Device Layer</strong>, <strong>drivers</strong> (IDE, SATA, NVME), et <strong>périphériques</strong>."
            }
        ]
    },
    {
        id: 116,
        title: "Partitions",
        resume: `
            <p>Le disque peut être découpé en zones : <strong>partitions</strong>.</p>
            <p><strong>Table de partitions</strong> :</p>
            <ul>
                <li>Dans les premiers octets du disque</li>
                <li>Format actuel : <strong>GPT</strong> (GUID Partition Table)</li>
                <li>Ancien format : <strong>MBR</strong> (Master Boot Record)</li>
            </ul>
            <p><strong>Contenu d'une entrée</strong> :</p>
            <ul>
                <li><strong>GUID</strong> : identifiant unique</li>
                <li>Première et dernière adresse</li>
                <li>Attributs (amorçable, lecture seule...)</li>
                <li>Nom</li>
            </ul>
            <p><strong>Dans une partition</strong> : un système de fichiers ou un agrégateur (LVM).</p>
            <p>Commandes : <code>lsblk -f</code>, <code>sudo fdisk -l</code></p>
        `,
        questions: [
            {
                q: "Qu'est-ce qu'une partition selon cette diapo ?",
                r: "Le disque peut être découpé en zones : <strong>partitions</strong>."
            },
            {
                q: "D'après cette diapo, où se trouve la table de partitions ?",
                r: "Dans les premiers octets du disque. Format actuel : <strong>GPT</strong> (GUID Partition Table). Ancien format : <strong>MBR</strong> (Master Boot Record)."
            },
            {
                q: "Selon cette diapo, que contient une entrée de partition ?",
                r: "<strong>GUID</strong> (identifiant unique), première et dernière adresse, attributs (amorçable, lecture seule...), et nom."
            }
        ]
    },
    {
        id: 117,
        title: "LVM : Logical Volume Manager",
        resume: `
            <p><strong>LVM</strong> : abstrait les partitions physiques en <strong>volumes logiques</strong>.</p>
            <p><strong>Avantages</strong> :</p>
            <ul>
                <li>Un système de fichiers peut s'étendre sur <strong>plusieurs disques</strong></li>
                <li><strong>Redimensionnement</strong> facilité</li>
                <li><strong>Instantanés</strong> (snapshots)</li>
                <li>Gestion beaucoup plus <strong>flexible</strong></li>
            </ul>
            <p><strong>Architecture</strong> :</p>
            <ul>
                <li><strong>PV</strong> (Physical Volumes) : partitions physiques</li>
                <li><strong>VG</strong> (Volume Group) : agrégat de PV</li>
                <li><strong>LV</strong> (Logical Volumes) : \"partitions\" logiques dans un VG</li>
            </ul>
            <p>Complètement logiciel ! cf <a href="https://doc.ubuntu-fr.org/lvm">doc.ubuntu-fr.org/lvm</a></p>
        `,
        questions: [
            {
                q: "Qu'est-ce que LVM selon cette diapo ?",
                r: "Abstrait les partitions physiques en <strong>volumes logiques</strong>."
            },
            {
                q: "Citez les avantages de LVM mentionnés dans cette diapo.",
                r: "Un système de fichiers peut s'étendre sur <strong>plusieurs disques</strong>, <strong>redimensionnement</strong> facilité, <strong>instantanés</strong> (snapshots), et gestion beaucoup plus <strong>flexible</strong>."
            },
            {
                q: "D'après cette diapo, quelle est l'architecture de LVM ?",
                r: "<strong>PV</strong> (Physical Volumes : partitions physiques), <strong>VG</strong> (Volume Group : agrégat de PV), et <strong>LV</strong> (Logical Volumes : \"partitions\" logiques dans un VG)."
            }
        ]
    },
    {
        id: 118,
        title: "RAID : Redundant Array of Independent Disks",
        resume: `
            <p><strong>RAID</strong> : répartir les données sur plusieurs disques.</p>
            <p><strong>Objectifs</strong> :</p>
            <ul>
                <li><strong>Performances</strong> : parallélisation des accès</li>
                <li><strong>Redondance</strong> : permet de perdre ≥ 1 disque(s)</li>
            </ul>
            <p><strong>Niveaux courants</strong> :</p>
            <ul>
                <li><strong>RAID 0</strong> : striping, performances, pas de redondance</li>
                <li><strong>RAID 1</strong> : mirroring, redondance, 50% capacité perdue</li>
                <li><strong>RAID 5</strong> : striping + parité, tolère 1 panne</li>
                <li><strong>RAID 6</strong> : double parité, tolère 2 pannes</li>
            </ul>
            <p><strong>Implémentation</strong> : matérielle (carte mère/contrôleur) ou logicielle (mdadm, ZFS, BTRFS...)</p>
        `,
        questions: [
            {
                q: "Qu'est-ce que RAID selon cette diapo ?",
                r: "Répartir les données sur plusieurs disques."
            },
            {
                q: "Citez les objectifs du RAID mentionnés dans cette diapo.",
                r: "<strong>Performances</strong> (parallélisation des accès) et <strong>redondance</strong> (permet de perdre ≥ 1 disque(s))."
            },
            {
                q: "D'après cette diapo, quels sont les niveaux RAID courants ?",
                r: "<strong>RAID 0</strong> (striping, performances, pas de redondance), <strong>RAID 1</strong> (mirroring, redondance, 50% capacité perdue), <strong>RAID 5</strong> (striping + parité, tolère 1 panne), <strong>RAID 6</strong> (double parité, tolère 2 pannes)."
            }
        ]
    },
    {
        id: 119,
        title: "Structure des systèmes de fichiers",
        resume: `
            <p>Lecture brute d'un FS : ensemble d'<strong>octets</strong> organisés par le système de fichiers.</p>
            <p><strong>Organisation en arbre</strong> :</p>
            <ul>
                <li><strong>Feuilles</strong> : fichiers</li>
                <li><strong>Nœuds intermédiaires</strong> : répertoires</li>
            </ul>
            <p><strong>Types d'éléments</strong> :</p>
            <ul>
                <li><strong>Fichier</strong> : suite d'octets (sens uniquement pour l'application)</li>
                <li><strong>Répertoire</strong> : suite de descripteurs d'enfants</li>
                <li><strong>Liens symboliques</strong> (<code>ln -s</code>) : fichier contenant le chemin cible</li>
                <li><strong>Liens physiques</strong> (<code>ln</code>) : deux entrées vers le même inode</li>
            </ul>
            <p><strong>I-node</strong> : métadonnées d'un nœud (taille, droits, type, dates...)</p>
        `,
        questions: [
            {
                q: "Selon cette diapo, comment est organisé un système de fichiers ?",
                r: "Organisation en arbre : <strong>feuilles</strong> (fichiers) et <strong>nœuds intermédiaires</strong> (répertoires)."
            },
            {
                q: "Citez les types d'éléments mentionnés dans cette diapo.",
                r: "<strong>Fichier</strong> (suite d'octets), <strong>répertoire</strong> (suite de descripteurs d'enfants), <strong>liens symboliques</strong> (<code>ln -s</code>, fichier contenant le chemin cible), et <strong>liens physiques</strong> (<code>ln</code>, deux entrées vers le même inode)."
            },
            {
                q: "Qu'est-ce qu'un i-node d'après cette diapo ?",
                r: "Métadonnées d'un nœud (taille, droits, type, dates...)."
            }
        ]
    },
    {
        id: 120,
        title: "Stockage des fichiers sur disque",
        resume: `
            <p>Les fichiers sont découpés par <strong>blocs / secteurs</strong>.</p>
            <ul>
                <li>On ne peut pas allouer plus petit sur le disque</li>
                <li>Les blocs d'un fichier <strong>pas forcément contigus</strong></li>
            </ul>
            <p><strong>Fragmentation</strong> :</p>
            <ul>
                <li>Blocs dispersés → <strong>défragmentation</strong> nécessaire (HDD)</li>
                <li>Optimisations du FS pour éviter la fragmentation</li>
            </ul>
            <p><strong>Fichiers à trous</strong> (sparse files) :</p>
            <ul>
                <li>Seuls les blocs utiles sont alloués</li>
                <li>Écrire à la fin en laissant du vide au début</li>
                <li>Taille du fichier ≠ occupation sur le disque</li>
            </ul>
            <p class="key-point">On retrouve des questions similaires à la gestion de la mémoire !</p>
        `,
        questions: [
            {
                q: "Selon cette diapo, comment sont stockés les fichiers sur disque ?",
                r: "Les fichiers sont découpés par <strong>blocs / secteurs</strong>. On ne peut pas allouer plus petit sur le disque. Les blocs d'un fichier <strong>pas forcément contigus</strong>."
            },
            {
                q: "Qu'est-ce que la fragmentation d'après cette diapo ?",
                r: "Blocs dispersés → <strong>défragmentation</strong> nécessaire (HDD). Optimisations du FS pour éviter la fragmentation."
            },
            {
                q: "Qu'est-ce qu'un fichier à trous selon cette diapo ?",
                r: "Seuls les blocs utiles sont alloués. Écrire à la fin en laissant du vide au début. Taille du fichier ≠ occupation sur le disque."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(12, section12Data);
