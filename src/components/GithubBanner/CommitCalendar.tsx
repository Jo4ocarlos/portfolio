'use client';

import dynamic from 'next/dynamic';
import styles from './GithubBanner.module.css';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((module) => module.GitHubCalendar),
  { ssr: false, loading: () => <div className={styles.calendarPlaceholder} /> },
);

interface CommitCalendarProps {
  username: string;
}

export function CommitCalendar({ username }: CommitCalendarProps) {
  return <GitHubCalendar username={username} colorScheme="dark" blockSize={11} blockMargin={4} fontSize={12} />;
}
