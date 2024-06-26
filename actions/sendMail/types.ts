export type EmailTemplateProps = {
  Rate: {
    interviewId: string;
    jobTitle: string;
    candidate: {
      fullName?: string;
      bio?: string;
      avatar?: string;
    };
  };
  InviteMember: {
    company: {
      id: string;
      name?: string;
      avatar?: string;
    };
  };
  CadidateDisqualified: {
    score: number;
    jobTitle: string;
    candidate: {
      fullName?: string;
      avatar?: string;
      email: string;
    };
  };
  CadidateQualified: {
    score: number;
    jobTitle: string;
    candidate: {
      resumeUrl?: string;
      fullName?: string;
      avatar?: string;
      email: string;
    };
  };
};
