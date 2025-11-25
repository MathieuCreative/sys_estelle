// Section 13: Montage et Systèmes de fichiers avancés
// Diapos 121 à 130 du PDF 13

const section13Data = [
    {
        id: 121,
        title: "Accès aux disques",
        resume: `
            <p><strong>I/O Scheduling</strong> : ordonnancer l'accès au disque.</p>
            <p><strong>Pourquoi ?</strong></p>
            <ul>
                <li>De nombreux processus font des <strong>requêtes concurrentes</strong></li>
                <li>Éviter de passer trop de temps à bouger les têtes de lecture</li>
                <li>Pertinent pour les <strong>HDD</strong>, pas les SSD</li>
            </ul>
            <p><strong>Différents algorithmes</strong> :</p>
            <ul>
                <li><strong>CFQ</strong> (Completely Fair Queuing) : équité entre processus</li>
                <li><strong>NOOP</strong> : FIFO simple, bon pour SSD</li>
                <li><strong>Deadline</strong> : évite la famine avec des deadlines</li>
                <li><strong>mq-deadline</strong> : version multi-queue moderne</li>
            </ul>
            <p>Configuration : <code>/sys/block/sda/queue/scheduler</code></p>
        `,
        questions: [
            {
                q: "Qu'est-ce que l'I/O Scheduling selon cette diapo ?",
                r: "Ordonnancer l'accès au disque. Pertinent pour les <strong>HDD</strong>, pas les SSD."
            },
            {
                q: "Citez les différents algorithmes d'ordonnancement I/O mentionnés dans cette diapo.",
                r: "<strong>CFQ</strong> (Completely Fair Queuing : équité entre processus), <strong>NOOP</strong> (FIFO simple, bon pour SSD), <strong>Deadline</strong> (évite la famine avec des deadlines), et <strong>mq-deadline</strong> (version multi-queue moderne)."
            }
        ]
    },
    {
        id: 122,
        title: "Montage",
        resume: `
            <p><strong>Montage</strong> : attache un système de fichiers à un point de l'arborescence.</p>
            <p><strong>Syntaxe</strong> : <code>mount [-t type] [-o options] device mountpoint</code></p>
            <p><strong>Exemples</strong> :</p>
            <ul>
                <li><code>mount /dev/sdb1 /mnt/usb</code></li>
                <li><code>mount -t nfs server:/share /mnt/nfs</code></li>
                <li><code>mount -o loop image.iso /mnt/iso</code></li>
            </ul>
            <p><strong>Démontage</strong> : <code>umount /mnt/usb</code></p>
            <ul>
                <li>Impossible si des fichiers sont ouverts</li>
                <li><code>lsof</code> pour voir qui utilise le point de montage</li>
            </ul>
            <p><strong>/etc/fstab</strong> : montages automatiques au démarrage.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce que le montage selon cette diapo ?",
                r: "Attache un système de fichiers à un point de l'arborescence."
            },
            {
                q: "Citez des exemples de montage mentionnés dans cette diapo.",
                r: "<code>mount /dev/sdb1 /mnt/usb</code>, <code>mount -t nfs server:/share /mnt/nfs</code>, et <code>mount -o loop image.iso /mnt/iso</code>."
            },
            {
                q: "D'après cette diapo, quand le démontage est-il impossible ?",
                r: "Si des fichiers sont ouverts. Utiliser <code>lsof</code> pour voir qui utilise le point de montage."
            }
        ]
    },
    {
        id: 123,
        title: "Implémentation d'un système de fichiers",
        resume: `
            <p><strong>Plusieurs possibilités</strong> :</p>
            <ul>
                <li><strong>Dans le noyau</strong> : performances maximales, complexe à développer</li>
                <li><strong>En espace utilisateur</strong> avec <strong>FUSE</strong> (Filesystem in Userspace)</li>
            </ul>
            <p><strong>FUSE</strong> :</p>
            <ul>
                <li>Module noyau qui redirige les appels vers un processus utilisateur</li>
                <li>Le processus implémente les opérations (open, read, write...)</li>
                <li>Plus facile à développer et déboguer</li>
                <li>Moins performant (changements de contexte)</li>
            </ul>
            <p><strong>Exemples FUSE</strong> : sshfs, ntfs-3g, encfs, s3fs...</p>
        `,
        questions: [
            {
                q: "Citez les possibilités d'implémentation d'un système de fichiers mentionnées dans cette diapo.",
                r: "<strong>Dans le noyau</strong> (performances maximales, complexe à développer) et <strong>en espace utilisateur</strong> avec <strong>FUSE</strong> (Filesystem in Userspace)."
            },
            {
                q: "Qu'est-ce que FUSE selon cette diapo ?",
                r: "Module noyau qui redirige les appels vers un processus utilisateur. Le processus implémente les opérations (open, read, write...). Plus facile à développer et déboguer, moins performant (changements de contexte)."
            },
            {
                q: "Citez des exemples FUSE mentionnés dans cette diapo.",
                r: "sshfs, ntfs-3g, encfs, s3fs."
            }
        ]
    },
    {
        id: 124,
        title: "Systèmes de fichiers particuliers",
        resume: `
            <p><strong>Pseudo-systèmes de fichiers</strong> : pas de stockage réel, interface vers le noyau.</p>
            <p><strong>procfs</strong> (<code>/proc</code>) :</p>
            <ul>
                <li>Informations sur les processus (<code>/proc/[pid]/</code>)</li>
                <li>Paramètres système (<code>/proc/sys/</code>)</li>
                <li><code>/proc/cpuinfo</code>, <code>/proc/meminfo</code>...</li>
            </ul>
            <p><strong>sysfs</strong> (<code>/sys</code>) :</p>
            <ul>
                <li>Représentation du matériel et des drivers</li>
                <li><code>/sys/class/</code>, <code>/sys/block/</code>...</li>
            </ul>
            <p><strong>tmpfs</strong> : système de fichiers en <strong>RAM</strong>.</p>
            <ul>
                <li>Très rapide, contenu perdu au redémarrage</li>
                <li>Utilisé pour <code>/tmp</code>, <code>/run</code></li>
            </ul>
        `,
        questions: [
            {
                q: "Qu'est-ce que procfs selon cette diapo ?",
                r: "Monté sur <code>/proc</code>. Informations sur les processus (<code>/proc/[pid]/</code>), paramètres système (<code>/proc/sys/</code>), <code>/proc/cpuinfo</code>, <code>/proc/meminfo</code>..."
            },
            {
                q: "Qu'est-ce que sysfs d'après cette diapo ?",
                r: "Monté sur <code>/sys</code>. Représentation du matériel et des drivers (<code>/sys/class/</code>, <code>/sys/block/</code>...)."
            },
            {
                q: "Qu'est-ce que tmpfs selon cette diapo ?",
                r: "Système de fichiers en <strong>RAM</strong>. Très rapide, contenu perdu au redémarrage. Utilisé pour <code>/tmp</code>, <code>/run</code>."
            }
        ]
    },
    {
        id: 125,
        title: "Types de fichiers",
        resume: `
            <p><strong>Types de fichiers sous Unix</strong> (visibles avec <code>ls -l</code>) :</p>
            <ul>
                <li><strong>-</strong> : fichier régulier</li>
                <li><strong>d</strong> : répertoire (directory)</li>
                <li><strong>l</strong> : lien symbolique</li>
                <li><strong>c</strong> : périphérique caractère (character device)</li>
                <li><strong>b</strong> : périphérique bloc (block device)</li>
                <li><strong>p</strong> : tube nommé (named pipe / FIFO)</li>
                <li><strong>s</strong> : socket Unix</li>
            </ul>
            <p class="key-point">"Tout est fichier" sous Unix : même les périphériques sont accessibles via le système de fichiers.</p>
        `,
        questions: [
            {
                q: "Citez les types de fichiers sous Unix mentionnés dans cette diapo.",
                r: "<strong>-</strong> (fichier régulier), <strong>d</strong> (répertoire), <strong>l</strong> (lien symbolique), <strong>c</strong> (périphérique caractère), <strong>b</strong> (périphérique bloc), <strong>p</strong> (tube nommé / FIFO), <strong>s</strong> (socket Unix)."
            }
        ]
    },
    {
        id: 126,
        title: "Fichiers spéciaux",
        resume: `
            <p><strong>Fichiers spéciaux</strong> dans <code>/dev</code> :</p>
            <ul>
                <li><strong>/dev/null</strong> : trou noir, absorbe tout ce qu'on écrit</li>
                <li><strong>/dev/zero</strong> : génère des octets nuls à l'infini</li>
                <li><strong>/dev/random</strong> : générateur d'aléa (bloquant si entropie insuffisante)</li>
                <li><strong>/dev/urandom</strong> : générateur d'aléa (non bloquant)</li>
                <li><strong>/dev/full</strong> : simule un disque plein (retourne ENOSPC)</li>
            </ul>
            <p><strong>Création</strong> : <code>mknod</code> crée des fichiers spéciaux.</p>
            <p><code>mknod /dev/mydevice c 240 0</code> (caractère, majeur 240, mineur 0)</p>
        `,
        questions: [
            {
                q: "Citez les fichiers spéciaux dans /dev mentionnés dans cette diapo.",
                r: "<strong>/dev/null</strong> (trou noir, absorbe tout ce qu'on écrit), <strong>/dev/zero</strong> (génère des octets nuls à l'infini), <strong>/dev/random</strong> (générateur d'aléa bloquant), <strong>/dev/urandom</strong> (générateur d'aléa non bloquant), <strong>/dev/full</strong> (simule un disque plein)."
            },
            {
                q: "Selon cette diapo, comment crée-t-on des fichiers spéciaux ?",
                r: "<code>mknod</code> crée des fichiers spéciaux. Exemple : <code>mknod /dev/mydevice c 240 0</code>."
            }
        ]
    },
    {
        id: 127,
        title: "Path Lookup",
        resume: `
            <p><strong>Path Lookup</strong> : résolution d'un chemin vers un fichier.</p>
            <p><strong>Étapes pour</strong> <code>/home/user/file.txt</code> :</p>
            <ol>
                <li>Partir de la <strong>racine</strong> (<code>/</code>)</li>
                <li>Chercher l'entrée <code>home</code> dans le répertoire racine</li>
                <li>Suivre l'inode, vérifier que c'est un répertoire</li>
                <li>Chercher l'entrée <code>user</code></li>
                <li>Suivre l'inode, chercher <code>file.txt</code></li>
                <li>Retourner l'inode du fichier</li>
            </ol>
            <p><strong>Optimisation</strong> : le noyau maintient un <strong>dentry cache</strong> pour éviter de relire le disque à chaque lookup.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce que le Path Lookup selon cette diapo ?",
                r: "Résolution d'un chemin vers un fichier."
            },
            {
                q: "Décrivez les étapes du Path Lookup pour /home/user/file.txt selon cette diapo.",
                r: "Partir de la <strong>racine</strong> (<code>/</code>), chercher l'entrée <code>home</code> dans le répertoire racine, suivre l'inode et vérifier que c'est un répertoire, chercher l'entrée <code>user</code>, suivre l'inode et chercher <code>file.txt</code>, retourner l'inode du fichier."
            },
            {
                q: "Quelle optimisation est utilisée pour le Path Lookup d'après cette diapo ?",
                r: "Le noyau maintient un <strong>dentry cache</strong> pour éviter de relire le disque à chaque lookup."
            }
        ]
    },
    {
        id: 128,
        title: "Filesystem Hierarchy Standard",
        resume: `
            <p><strong>FHS</strong> : standard définissant l'organisation des répertoires sous Linux.</p>
            <p><strong>Répertoires principaux</strong> :</p>
            <ul>
                <li><strong>/bin, /sbin</strong> : binaires essentiels (souvent liens vers /usr/bin)</li>
                <li><strong>/etc</strong> : fichiers de configuration</li>
                <li><strong>/home</strong> : répertoires personnels des utilisateurs</li>
                <li><strong>/root</strong> : répertoire personnel de root</li>
                <li><strong>/tmp</strong> : fichiers temporaires</li>
                <li><strong>/usr</strong> : programmes et bibliothèques installés</li>
                <li><strong>/var</strong> : données variables (logs, bases de données...)</li>
                <li><strong>/opt</strong> : logiciels optionnels/tiers</li>
                <li><strong>/proc, /sys</strong> : pseudo-FS noyau</li>
            </ul>
        `,
        questions: [
            {
                q: "Qu'est-ce que le FHS selon cette diapo ?",
                r: "Standard définissant l'organisation des répertoires sous Linux."
            },
            {
                q: "Citez les répertoires principaux du FHS mentionnés dans cette diapo.",
                r: "<strong>/bin, /sbin</strong> (binaires essentiels), <strong>/etc</strong> (fichiers de configuration), <strong>/home</strong> (répertoires personnels), <strong>/root</strong> (répertoire de root), <strong>/tmp</strong> (fichiers temporaires), <strong>/usr</strong> (programmes et bibliothèques), <strong>/var</strong> (données variables), <strong>/opt</strong> (logiciels optionnels), <strong>/proc, /sys</strong> (pseudo-FS noyau)."
            }
        ]
    },
    {
        id: 129,
        title: "chroot",
        resume: `
            <p><strong>chroot</strong> : change la racine du système de fichiers pour un processus.</p>
            <p><strong>Syntaxe</strong> : <code>chroot /new/root /bin/bash</code></p>
            <p><strong>Usages</strong> :</p>
            <ul>
                <li><strong>Isolation</strong> : le processus ne voit que /new/root comme racine</li>
                <li><strong>Récupération système</strong> : booter sur live USB, chroot dans le système à réparer</li>
                <li><strong>Compilation</strong> : environnement de build isolé</li>
                <li><strong>Test de distributions</strong> : debootstrap + chroot</li>
            </ul>
            <p><strong>Limites</strong> : root peut s'échapper d'un chroot ! Ce n'est <strong>pas</strong> un mécanisme de sécurité robuste.</p>
            <p class="key-point">Pour une vraie isolation, utiliser des conteneurs (namespaces, cgroups) ou des VMs.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce que chroot selon cette diapo ?",
                r: "Change la racine du système de fichiers pour un processus."
            },
            {
                q: "Citez les usages de chroot mentionnés dans cette diapo.",
                r: "<strong>Isolation</strong> (le processus ne voit que /new/root comme racine), <strong>récupération système</strong> (booter sur live USB, chroot dans le système à réparer), <strong>compilation</strong> (environnement de build isolé), et <strong>test de distributions</strong> (debootstrap + chroot)."
            },
            {
                q: "Quelles sont les limites de chroot d'après cette diapo ?",
                r: "Root peut s'échapper d'un chroot. Ce n'est <strong>pas</strong> un mécanisme de sécurité robuste. Pour une vraie isolation, utiliser des conteneurs (namespaces, cgroups) ou des VMs."
            }
        ]
    },
    {
        id: 130,
        title: "Systèmes de fichiers distribués",
        resume: `
            <p><strong>FS distribués</strong> : données réparties sur plusieurs machines.</p>
            <p><strong>Protocoles réseau</strong> :</p>
            <ul>
                <li><strong>NFS</strong> (Network File System) : standard Unix, simple</li>
                <li><strong>SMB/CIFS</strong> : protocole Windows, Samba sous Linux</li>
                <li><strong>sshfs</strong> : montage via SSH (FUSE)</li>
            </ul>
            <p><strong>FS distribués à grande échelle</strong> :</p>
            <ul>
                <li><strong>GlusterFS</strong> : agrège le stockage de plusieurs serveurs</li>
                <li><strong>CephFS</strong> : stockage distribué hautement disponible</li>
                <li><strong>HDFS</strong> : Hadoop, Big Data</li>
                <li><strong>S3</strong> : stockage objet Amazon (pas vraiment un FS)</li>
            </ul>
            <p class="key-point">Les FS distribués gèrent la réplication, la tolérance aux pannes, et la cohérence.</p>
        `,
        questions: [
            {
                q: "Qu'est-ce qu'un FS distribué selon cette diapo ?",
                r: "Données réparties sur plusieurs machines."
            },
            {
                q: "Citez les protocoles réseau pour FS distribués mentionnés dans cette diapo.",
                r: "<strong>NFS</strong> (Network File System : standard Unix, simple), <strong>SMB/CIFS</strong> (protocole Windows, Samba sous Linux), et <strong>sshfs</strong> (montage via SSH avec FUSE)."
            },
            {
                q: "Citez les FS distribués à grande échelle mentionnés dans cette diapo.",
                r: "<strong>GlusterFS</strong> (agrège le stockage de plusieurs serveurs), <strong>CephFS</strong> (stockage distribué hautement disponible), <strong>HDFS</strong> (Hadoop, Big Data), et <strong>S3</strong> (stockage objet Amazon)."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(13, section13Data);
