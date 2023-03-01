import { CompanyInvite, CompanyMemberRole } from "@/graphql";

export const CLASS_NAMES = {
  formContainer: 'w-full',
  form: 'w-full',
  listContainer: "grid grid-cols-1 gap-4 w-full"
}

export const SKELETON_MEMBERS: CompanyInvite[] = [{ role: CompanyMemberRole.AdminMember, 'recipientEmail': 'lorem1@ipsum.com', __typename: 'CompanyInvite' }, { role: CompanyMemberRole.AdminMember, 'recipientEmail': 'lorem2@ipsum.com', __typename: 'CompanyInvite' }, { role: CompanyMemberRole.AdminMember, 'recipientEmail': 'lorem3@ipsum.com', __typename: 'CompanyInvite' }]

export const TRANSITION_PROPS = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  appear: true
}

export const SEND_INVITE_BUTTON_PROPS = {
  title: "Send invite"
}

export const INVITE_TEAM_MEMBERS_BUTTON_PROPS = {
  className: "w-auto mb-14",
  title: "Invite team members"
}

export const INVITE_TEAM_MEMBERS_ICON_PROPS = {
  className: "text-white",
  size: 30,
  name: "HiPlusCircle"
} as const

export const TOAST_MESSAGE = {
  many: {
    success: "Invites send successfuly",
    error: "Error sending some invites"
  },
  one: {
    success: "Invite send successfuly",
    error: "Error sending an invite"
  }
}
