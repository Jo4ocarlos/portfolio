import Image from 'next/image';
import { Card } from '@/components/Card/Card';
import { ExternalLink } from '@/components/ExternalLink/ExternalLink';
import { GlobeIcon } from '@/components/icons';
import type { Profile } from '@/types/portfolio';
import { EmailButton } from './EmailButton';
import styles from './profileCard.module.css';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const { name, title, location, avatarUrl, links } = profile;

  return (
    <Card as="section" aria-labelledby="profile-name" className={styles.card}>
      <div className={styles.photo}>
        <Image
          src={avatarUrl}
          alt={`Foto de ${name}`}
          fill
          className={styles.photoImage}
          sizes="(min-width: 1024px) 380px, 100vw"
          preload
        />
      </div>

      <div>
        <h1 id="profile-name" className={styles.name}>Hey, sou o {name}</h1>
        <p className={styles.role}>{title}</p>
      </div>

      <p className={styles.location}>
        <GlobeIcon />
        {location}
      </p>

      <div className={styles.contacts}>
        <ExternalLink href={links.github} className={styles.contact}>
          GitHub <span aria-hidden="true">↗</span>
        </ExternalLink>
        <ExternalLink href={links.linkedin} className={styles.contact}>
          LinkedIn <span aria-hidden="true">↗</span>
        </ExternalLink>
        <EmailButton email={links.email} className={`${styles.contact} ${styles.contactWide}`} />
      </div>
    </Card>
  );
}
