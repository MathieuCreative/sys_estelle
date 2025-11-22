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
                q: "Pourquoi l'ordonnancement I/O est-il important pour les HDD ?",
                r: "Un HDD a une <strong>tête de lecture mécanique</strong>. L'algorithme d'ordonnancement peut regrouper les requêtes proches physiquement pour minimiser les déplacements de la tête. C'est l'équivalent de l'algorithme de l'ascenseur."
            },
            {
                q: "Quel scheduler utiliser pour un SSD ?",
                r: "<strong>NOOP</strong> ou <strong>none</strong>. Les SSD n'ont pas de tête mécanique, donc l'optimisation des déplacements est inutile. Un scheduler simple type FIFO est préférable pour minimiser la latence et la charge CPU."
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
                q: "Que se passe-t-il si on monte sur un répertoire non vide ?",
                r: "Le contenu original du répertoire est <strong>masqué</strong> (pas supprimé). On ne voit que le contenu du système de fichiers monté. Après démontage, le contenu original réapparaît."
            },
            {
                q: "Pourquoi le démontage peut-il échouer ?",
                r: "Si des fichiers sont <strong>ouverts</strong> ou si un processus a son <strong>répertoire courant</strong> dans le point de montage. Utiliser <code>lsof +D /mnt/usb</code> ou <code>fuser -m /mnt/usb</code> pour identifier les processus."
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
                q: "Quels sont les avantages de FUSE ?",
                r: "1) <strong>Simplicité</strong> : développement en espace utilisateur, pas besoin de recompiler le noyau. 2) <strong>Sécurité</strong> : un bug ne crashe pas le système. 3) <strong>Portabilité</strong> : disponible sur Linux, macOS, FreeBSD. Idéal pour des FS expérimentaux ou réseau."
            },
            {
                q: "Comment fonctionne sshfs ?",
                r: "sshfs utilise FUSE pour monter un répertoire distant via <strong>SSH</strong>. Chaque opération fichier (open, read...) est traduite en commandes SFTP. C'est transparent pour les applications : elles voient un répertoire local."
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
                q: "Comment lire le PID du processus courant via procfs ?",
                r: "<code>cat /proc/self/stat</code> ou simplement <code>echo $$</code> dans bash. Le répertoire <code>/proc/self</code> est un lien symbolique vers <code>/proc/[pid du processus courant]</code>."
            },
            {
                q: "Pourquoi utiliser tmpfs pour /tmp ?",
                r: "1) <strong>Performance</strong> : accès en RAM, pas de disque. 2) <strong>Sécurité</strong> : contenu effacé au redémarrage. 3) <strong>Usure</strong> : évite les écritures inutiles sur SSD. Attention : consomme de la RAM !"
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
                q: "Quelle est la différence entre périphérique caractère et bloc ?",
                r: "<strong>Caractère</strong> : accès séquentiel octet par octet (terminal, souris, port série). <strong>Bloc</strong> : accès par blocs, supporte le seek (disques, partitions). Les périphériques bloc peuvent être montés, pas les caractère."
            },
            {
                q: "À quoi servent les sockets Unix ?",
                r: "Les <strong>sockets Unix</strong> permettent la communication inter-processus (IPC) sur la même machine. Plus rapides que les sockets réseau car pas de pile TCP/IP. Utilisées par systemd, X11, Docker..."
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
                q: "Comment supprimer la sortie d'une commande ?",
                r: "Rediriger vers <code>/dev/null</code> : <code>commande > /dev/null 2>&1</code>. Cela supprime stdout et stderr. Utile pour les scripts où on ne veut que le code de retour."
            },
            {
                q: "Quelle différence entre /dev/random et /dev/urandom ?",
                r: "<strong>/dev/random</strong> bloque si le pool d'entropie est épuisé (très sécurisé mais lent). <strong>/dev/urandom</strong> ne bloque jamais, utilise un PRNG si nécessaire. Pour la plupart des usages, urandom est suffisant et recommandé."
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
                q: "Combien d'accès disque pour ouvrir /a/b/c/d/file ?",
                r: "Sans cache : potentiellement <strong>5 lectures</strong> (racine, a, b, c, d) plus la lecture de l'inode de file. Avec le <strong>dentry cache</strong>, souvent 0 lectures si le chemin est en cache. C'est pourquoi le cache est crucial."
            },
            {
                q: "Que se passe-t-il si un élément du chemin est un lien symbolique ?",
                r: "Le noyau <strong>suit le lien</strong> et continue la résolution avec le chemin cible. Il y a une limite (ELOOP) pour éviter les boucles infinies de liens symboliques pointant les uns vers les autres."
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
                q: "Pourquoi séparer /usr et / ?",
                r: "Historiquement, <code>/</code> contenait le minimum pour démarrer, <code>/usr</code> était sur un autre disque. Aujourd'hui, cette séparation permet de monter <code>/usr</code> en <strong>lecture seule</strong> pour la sécurité, ou de le partager en réseau."
            },
            {
                q: "Où placer les logs d'une application ?",
                r: "Dans <code>/var/log/</code>. Le répertoire <code>/var</code> est prévu pour les données qui <strong>changent</strong> pendant l'exécution : logs, caches, spool de mail, bases de données..."
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
                q: "Comment réparer un système Linux qui ne démarre plus ?",
                r: "1) Booter sur un <strong>live USB</strong>. 2) Monter la partition racine : <code>mount /dev/sda1 /mnt</code>. 3) Monter /dev, /proc, /sys avec bind. 4) <code>chroot /mnt</code>. 5) Réparer (reinstaller grub, corriger fstab...)."
            },
            {
                q: "Pourquoi chroot n'est-il pas sécurisé ?",
                r: "Un processus <strong>root</strong> dans un chroot peut s'en échapper : créer un device avec mknod, utiliser des appels système qui ne respectent pas le chroot, exploiter des file descriptors ouverts avant le chroot. Les <strong>conteneurs</strong> utilisent des namespaces pour une vraie isolation."
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
                q: "Quels sont les défis des systèmes de fichiers distribués ?",
                r: "1) <strong>Cohérence</strong> : que voit-on si deux clients modifient le même fichier ? 2) <strong>Latence</strong> : le réseau est lent par rapport au disque local. 3) <strong>Tolérance aux pannes</strong> : que faire si un serveur tombe ? 4) <strong>Partitionnement</strong> : comment gérer une coupure réseau ?"
            },
            {
                q: "Quelle différence entre NFS et sshfs ?",
                r: "<strong>NFS</strong> : protocole dédié, performant, nécessite une configuration serveur. <strong>sshfs</strong> : utilise SSH existant, simple à mettre en place (juste un compte SSH), moins performant mais chiffré par défaut. sshfs est idéal pour un usage ponctuel."
            }
        ]
    }
];

// Enregistrement des données
registerSectionData(13, section13Data);
