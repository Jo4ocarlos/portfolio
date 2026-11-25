import { Card, CardTitle } from '@/components/Card/Card';
import { ExternalLink } from '@/components/ExternalLink/ExternalLink';
import { GithubIcon } from '@/components/icons';
import { CommitCalendar } from './CommitCalendar';
import styles from './GithubBanner.module.css';

interface GithubBannerProps {
  username: string;
  profileUrl: string;
  className?: string;
}

export function GithubBanner({ username, profileUrl, className = '' }: GithubBannerProps) {
  return (
    <Card as="section" aria-labelledby="github-title" className={`${styles.banner} ${className}`}>
      <div className={styles.text}>
        <CardTitle as="h2" id="github-title" className={styles.title}>
          <GithubIcon />
          <ExternalLink href={profileUrl} className={styles.link}>Commits recentes</ExternalLink>
        </CardTitle>
        <p className={styles.subtitle}>Explore meus repositórios e atualizações recentes.</p>
      </div>

      <div className={styles.calendar}>
        <div className={styles.calendarInner}>
          <CommitCalendar username={username} />
        </div>
      </div>
    </Card>
  );
}
