// src/components/bento/ProfileCard.tsx
import Image from 'next/image';
import styles from './profile.module.css';
import { Profile } from '@/types/portfolio';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <>
      <div className={styles.bentoCard}>
        <div className={styles.imageWrapper}>
          <Image
            src="/foto-perfil.jpg"
            alt={`Foto de ${profile.name}`}
            fill
            className={styles.profileImage}
            sizes="(max-width: 768px) 100vw, 380px"
            priority
          />
        </div>
        <h1 className={styles.greeting}>Hey, sou o {profile.name}</h1>
        <h2 className={styles.role}>{profile.title}</h2>

        {profile.availability && (
          <div className={styles.locationBadge}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {profile.location}
          </div>
        )}

        <div className={styles.socialGrid}>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className={styles.socialBtn}>
            GitHub <span>↗</span>
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className={styles.socialBtn}>
            LinkedIn <span>↗</span>
          </a>
          <a href={profile.socials.email} className={`${styles.socialBtn} ${styles.socialBtnSpan2}`}>
            E-mail <span>↗</span>
          </a>
        </div>
      </div>

      <div className={`${styles.bentoCard} ${styles.bioCard}`}>
        <h3 className={styles.bioTitle}>Sobre mim</h3>
        <p className={styles.bioText}>{profile.bio}</p>
      </div>
    </>
  );
}