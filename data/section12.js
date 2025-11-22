// Section 12: Stockage et Systèmes de fichiers
// Diapos 111 à 120 du PDF 12

const section12Data = [
    {
        id: 111,
        title: "Stockage",
        resume: `
            <p><em>Diapo de titre introduisant la section sur le stockage et les systèmes de fichiers.</em></p>
        `,
        questions: [
            {
                q: "Pourquoi le stockage est-il un sujet important en OS ?",
                r: "Le stockage est <strong>persistant</strong> (survit aux redémarrages) et <strong>partagé</strong> entre processus et utilisateurs. L'OS doit gérer l'organisation des données (systèmes de fichiers), les performances (cache, ordonnancement I/O), et la fiabilité (intégrité, journalisation)."
            }
        ]
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
                q: "Pourquoi les I/O sont-elles généralement le goulot d'étranglement ?",
                r: "Le CPU traite des milliards d'opérations par seconde. Un disque HDD fait ~100 opérations/seconde, un SSD ~100 000. C'est <strong>10 000 à 10 millions de fois</strong> plus lent. Les programmes passent souvent plus de temps à attendre les I/O qu'à calculer."
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
                q: "Que se passe-t-il si le système crashe pendant une écriture ?",
                r: "Sans précaution, les données peuvent être <strong>corrompues</strong> : écriture partielle, métadonnées incohérentes avec les données. Les systèmes de fichiers modernes utilisent la <strong>journalisation</strong> ou le <strong>copy-on-write</strong> pour garantir la cohérence."
            },
            {
                q: "Pourquoi les accès concurrents sont-ils problématiques ?",
                r: "Si deux processus écrivent au même endroit d'un fichier simultanément, le résultat est <strong>indéterminé</strong>. Le système de fichiers et l'OS fournissent des mécanismes de <strong>verrouillage</strong> (flock, fcntl) pour coordonner les accès."
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
                q: "Quand accède-t-on directement au périphérique bloc ?",
                r: "Pour : créer/formater un système de fichiers (<code>mkfs</code>), faire des images disque (<code>dd</code>), récupérer des données sur un FS corrompu, bases de données à haute performance qui gèrent leur propre stockage."
            },
            {
                q: "Citez quelques systèmes de fichiers courants.",
                r: "<strong>Linux</strong> : ext4 (défaut), btrfs, xfs. <strong>Windows</strong> : NTFS, FAT32. <strong>macOS</strong> : APFS, HFS+. <strong>Réseau</strong> : NFS, SMB/CIFS. <strong>Spéciaux</strong> : tmpfs (RAM), procfs, sysfs."
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
                q: "Quel est le rôle du VFS ?",
                r: "Le VFS fournit une <strong>interface uniforme</strong> pour tous les systèmes de fichiers. Le code utilisateur utilise les mêmes appels (open, read...) que le FS soit ext4, NTFS, ou NFS. Le VFS traduit vers les opérations spécifiques de chaque FS."
            },
            {
                q: "Quelle est la différence entre fopen() et open() ?",
                r: "<code>fopen()</code> est une fonction de la <strong>libc</strong> qui fournit du buffering et retourne un FILE*. <code>open()</code> est un <strong>appel système</strong> qui retourne un file descriptor (entier). fopen() appelle open() en interne."
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
                q: "Quelle est la différence entre GPT et MBR ?",
                r: "<strong>MBR</strong> : limité à 4 partitions primaires, disques de 2 To max, 32 bits. <strong>GPT</strong> : 128 partitions, disques de 9 Zo (zettaoctets), 64 bits, redondance de la table. GPT est le standard moderne, requis pour UEFI."
            },
            {
                q: "Pourquoi utiliser plusieurs partitions ?",
                r: "1) Séparer <strong>OS et données</strong> (réinstaller l'OS sans perdre les données). 2) <strong>Différents FS</strong> selon l'usage. 3) <strong>Limiter l'impact</strong> d'un FS plein. 4) <strong>Sécurité</strong> : partition /tmp montée noexec."
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
                q: "Comment LVM permet-il les snapshots ?",
                r: "LVM utilise le <strong>copy-on-write</strong>. Le snapshot référence les mêmes blocs que l'original. Quand un bloc est modifié, l'ancienne version est copiée vers le snapshot. On peut ainsi revenir à un état antérieur."
            },
            {
                q: "Peut-on agrandir un volume logique sans arrêter le système ?",
                r: "<strong>Oui</strong>, avec LVM on peut agrandir un LV en ligne (<code>lvextend</code>), puis agrandir le système de fichiers (<code>resize2fs</code> pour ext4). C'est une des grandes forces de LVM par rapport aux partitions traditionnelles."
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
                q: "Pourquoi RAID 5 ou 6 sont-ils souvent préférés au RAID 1 ?",
                r: "RAID 1 perd <strong>50% de capacité</strong>. RAID 5 avec N disques perd seulement 1/N (ex: 4 disques = 25% perdu). RAID 5/6 offrent un bon compromis capacité/redondance. RAID 6 est recommandé pour les gros disques (temps de reconstruction long)."
            },
            {
                q: "Le RAID remplace-t-il les sauvegardes ?",
                r: "<strong>NON !</strong> Le RAID protège contre les <strong>pannes matérielles</strong>. Il ne protège pas contre : suppression accidentelle, corruption logicielle, ransomware, vol/incendie. Les sauvegardes restent <strong>indispensables</strong>."
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
                q: "Quelle est la différence entre lien symbolique et lien physique ?",
                r: "<strong>Lien symbolique</strong> : fichier spécial contenant un chemin. Peut pointer vers un autre FS. Si la cible est supprimée, le lien est \"cassé\". <strong>Lien physique</strong> : nouvelle entrée dans le répertoire pointant vers le même inode. Le fichier existe tant qu'un lien existe."
            },
            {
                q: "Qu'est-ce qu'un inode ?",
                r: "L'<strong>inode</strong> contient toutes les métadonnées d'un fichier SAUF son nom : taille, permissions, dates, propriétaire, et pointeurs vers les blocs de données. Le nom est dans l'entrée du répertoire parent, qui pointe vers l'inode."
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
                q: "Pourquoi la fragmentation est-elle un problème pour les HDD ?",
                r: "Un HDD a une <strong>tête de lecture mécanique</strong>. Lire des blocs dispersés nécessite des déplacements physiques (~10ms chacun). Un fichier fragmenté en 100 blocs peut prendre 1 seconde à lire au lieu de 0.01s s'il était contigu."
            },
            {
                q: "Pourquoi les SSD ne nécessitent-ils pas de défragmentation ?",
                r: "Les SSD n'ont <strong>pas de partie mobile</strong>. Accéder à n'importe quel bloc prend le même temps (~0.1ms). La fragmentation n'impacte pas les performances. Pire, la défragmentation <strong>use</strong> les cellules flash inutilement."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(12, section12Data);
