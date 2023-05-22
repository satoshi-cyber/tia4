import { CompanyRoles } from '@/types';

export const CLASS_NAMES = {
  container:
    'flex w-full flex-row justify-between items-center border p-4 rounded-full',
  left: 'flex flex-row items-center mr-4',
  details:
    'flex flex-row items-center text-md md:text-lg text-gray-800 mr-2 break-all',
};

export const AVATAR_PROPS = {
  size: 40,
  className: 'mr-2 flex-none',
};

export const LABEL_PROPS = {
  as: 'span',
  className: 'mr-2',
  skeletonProps: { width: 120 },
};

export const ROLE_PROPS = {
  as: 'span',
  className: 'text-sm flex-none',
  skeletonProps: { width: 60 },
};

export const ROLE_LABEL = {
  [CompanyRoles.adminMember]: 'admin member',
  [CompanyRoles.member]: 'member',
};

export const TOAST_MESSAGE = {
  deleteInvite: {
    success: 'Invite is deleted successfuly',
    error: 'Error deleting invite',
  },
  deleteMember: {
    success: 'Member is deleted successfuly',
    error: 'Error deleting member',
  },
};
