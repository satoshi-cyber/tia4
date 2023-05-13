import { useUser } from '@/hooks/useUser';
import { UseCases } from '@/useCases';
import { MouseEvent } from 'react';

export const useProfile = () => {
  const { logout } = useUser();

  const { data, isLoading } = UseCases.profile.load();

  const label = data?.firstName
    ? `${data?.firstName} ${data?.lastName}`
    : 'Edit Profile';

  const avatarUrl = data?.avatarUrl || undefined;

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    logout();
  };

  return { isLoading, handleLogout, label, avatarUrl };
};
