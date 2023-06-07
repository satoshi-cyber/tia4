import {
  array,
  boolean,
  infer as Infer,
  instanceof as InstanceOf,
  literal,
  null as Null,
  number,
  object,
  string,
  undefined as Undefined,
} from 'zod';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const AuthenticateUserReturnSchema = object({ token: string() });

export type AuthenticateUserReturnSchema = Infer<
  typeof AuthenticateUserReturnSchema
>;

export const CompanyReturnSchema = Null().or(
  object({ id: string(), name: string(), avatarUrl: string() })
);

export type CompanyReturnSchema = Infer<typeof CompanyReturnSchema>;

export const CompanyMembersReturnSchema = array(
  object({
    role: literal('member').or(literal('adminMember')),
    companyId: string(),
    recipientEmail: string(),
  }).or(
    object({
      user: object({
        id: string(),
        avatarUrl: string(),
        firstName: Null().or(string()),
        lastName: Null().or(string()),
        role: literal('user').or(literal('admin')),
        email: string(),
      }),
      role: literal('member').or(literal('adminMember')),
      userId: string(),
      companyId: string(),
    })
  )
);

export type CompanyMembersReturnSchema = Infer<
  typeof CompanyMembersReturnSchema
>;

export const DeleteCompanyReturnSchema = object({
  id: string(),
  createdAt: InstanceOf(Date),
  updatedAt: InstanceOf(Date),
  name: string(),
  description: Null().or(string()),
  website: Null().or(string()),
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
});

export type DeleteCompanyReturnSchema = Infer<typeof DeleteCompanyReturnSchema>;

export const DeleteInterviewReturnSchema = object({
  id: string(),
  createdAt: InstanceOf(Date),
  updatedAt: InstanceOf(Date),
  status: literal('initialized')
    .or(literal('proccessing'))
    .or(literal('ready')),
  jobId: string(),
  intervieweeId: string(),
  answers: array(
    object({
      url: string(),
      uploadUrl: string().or(Undefined()),
      question: object({ id: string(), question: string(), time: number() }),
    })
  ),
  score: Null().or(number()),
  thumbnail: string(),
});

export type DeleteInterviewReturnSchema = Infer<
  typeof DeleteInterviewReturnSchema
>;

export const DeleteInviteReturnSchema = object({
  role: literal('member').or(literal('adminMember')),
  companyId: string(),
  recipientEmail: string(),
});

export type DeleteInviteReturnSchema = Infer<typeof DeleteInviteReturnSchema>;

export const DeleteJobReturnSchema = object({ id: string() });

export type DeleteJobReturnSchema = Infer<typeof DeleteJobReturnSchema>;

export const DeleteMemberReturnSchema = object({
  role: literal('member').or(literal('adminMember')),
  userId: string(),
  companyId: string(),
});

export type DeleteMemberReturnSchema = Infer<typeof DeleteMemberReturnSchema>;

export const DidApplyReturnSchema = boolean();

export type DidApplyReturnSchema = Infer<typeof DidApplyReturnSchema>;

export const DidRateInterviewReturnSchema = Null().or(
  object({
    createdAt: InstanceOf(Date),
    value: Null().or(number()),
    reason: Null().or(string()),
    interviewId: string(),
    raterId: string(),
  })
);

export type DidRateInterviewReturnSchema = Infer<
  typeof DidRateInterviewReturnSchema
>;

export const EditCompanyReturnSchema = object({
  id: string(),
  createdAt: InstanceOf(Date),
  updatedAt: InstanceOf(Date),
  name: string(),
  description: Null().or(string()),
  website: Null().or(string()),
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
});

export type EditCompanyReturnSchema = Infer<typeof EditCompanyReturnSchema>;

export const GeoReturnSchema = object({ lat: number(), lon: number() });

export type GeoReturnSchema = Infer<typeof GeoReturnSchema>;

export const HealthReturnSchema = object({ success: boolean() });

export type HealthReturnSchema = Infer<typeof HealthReturnSchema>;

export const InterviewReturnSchema = Null().or(
  object({
    job: object({
      id: string(),
      createdAt: InstanceOf(Date),
      updatedAt: InstanceOf(Date),
      description: Null().or(string()),
      companyId: string(),
      title: string(),
      deadline: InstanceOf(Date),
      questions: array(
        object({ id: string(), question: string(), time: number() })
      ),
    }),
    interviewee: object({
      id: string(),
      email: string(),
      firstName: Null().or(string()),
      lastName: Null().or(string()),
      bio: Null().or(string()),
      issuer: string(),
      publicAddress: string(),
      linkedInProfile: Null().or(string()),
      resumeFileName: Null().or(string()),
      role: literal('user').or(literal('admin')),
      onboarded: boolean(),
      createdAt: InstanceOf(Date),
      updatedAt: InstanceOf(Date),
      avatarUrl: string(),
      avatarUploadUrl: string().or(Undefined()),
      resumeUrl: string(),
      resumeUploadUrl: string().or(Undefined()),
    }),
    id: string(),
    createdAt: InstanceOf(Date),
    updatedAt: InstanceOf(Date),
    status: literal('initialized')
      .or(literal('proccessing'))
      .or(literal('ready')),
    jobId: string(),
    intervieweeId: string(),
    answers: array(
      object({
        url: string(),
        uploadUrl: string().or(Undefined()),
        question: object({ id: string(), question: string(), time: number() }),
      })
    ),
    score: Null().or(number()),
    thumbnail: string(),
  })
);

export type InterviewReturnSchema = Infer<typeof InterviewReturnSchema>;

export const InterviewsReturnSchema = array(
  object({
    votesLeft: number(),
    id: string(),
    createdAt: InstanceOf(Date),
    score: Null().or(number()),
    status: literal('initialized')
      .or(literal('proccessing'))
      .or(literal('ready')),
    answers: array(
      object({
        url: string(),
        uploadUrl: string().or(Undefined()),
        question: object({ id: string(), question: string(), time: number() }),
      })
    ),
    thumbnail: string(),
    interviewee: object({
      id: string(),
      firstName: Null().or(string()),
      lastName: Null().or(string()),
      avatarUrl: string(),
    }),
    rates: array(object({ value: Null().or(number()) })),
  })
);

export type InterviewsReturnSchema = Infer<typeof InterviewsReturnSchema>;

export const InviteCompanyMembersReturnSchema = array(
  Null().or(literal(false)).or(literal(true))
);

export type InviteCompanyMembersReturnSchema = Infer<
  typeof InviteCompanyMembersReturnSchema
>;

export const JobReturnSchema = Null().or(
  object({
    id: string(),
    title: string(),
    deadline: InstanceOf(Date),
    description: Null().or(string()),
    questions: array(
      object({ id: string(), question: string(), time: number() })
    ),
  })
);

export type JobReturnSchema = Infer<typeof JobReturnSchema>;

export const JobsReturnSchema = array(
  object({ id: string(), title: string(), deadline: InstanceOf(Date) })
);

export type JobsReturnSchema = Infer<typeof JobsReturnSchema>;

export const JoinCompanyReturnSchema = Null().or(
  object({
    role: literal('member').or(literal('adminMember')),
    userId: string(),
    companyId: string(),
  })
);

export type JoinCompanyReturnSchema = Infer<typeof JoinCompanyReturnSchema>;

export const MarkInterviewReadyReturnSchema = boolean();

export type MarkInterviewReadyReturnSchema = Infer<
  typeof MarkInterviewReadyReturnSchema
>;

export const MyCompanyReturnSchema = Null().or(
  object({
    id: string(),
    name: string(),
    website: Null().or(string()),
    description: Null().or(string()),
    avatarUploadUrl: string().or(Undefined()),
    avatarUrl: string(),
  })
);

export type MyCompanyReturnSchema = Infer<typeof MyCompanyReturnSchema>;

export const MyInterviewReturnSchema = Null().or(
  object({
    job: object({
      company: object({
        id: string(),
        createdAt: InstanceOf(Date),
        updatedAt: InstanceOf(Date),
        name: string(),
        description: Null().or(string()),
        website: Null().or(string()),
        avatarUrl: string(),
        avatarUploadUrl: string().or(Undefined()),
      }),
      id: string(),
      createdAt: InstanceOf(Date),
      updatedAt: InstanceOf(Date),
      description: Null().or(string()),
      companyId: string(),
      title: string(),
      deadline: InstanceOf(Date),
      questions: array(
        object({ id: string(), question: string(), time: number() })
      ),
    }),
    interviewee: object({
      id: string(),
      email: string(),
      firstName: Null().or(string()),
      lastName: Null().or(string()),
      bio: Null().or(string()),
      issuer: string(),
      publicAddress: string(),
      linkedInProfile: Null().or(string()),
      resumeFileName: Null().or(string()),
      role: literal('user').or(literal('admin')),
      onboarded: boolean(),
      createdAt: InstanceOf(Date),
      updatedAt: InstanceOf(Date),
      avatarUrl: string(),
      avatarUploadUrl: string().or(Undefined()),
      resumeUrl: string(),
      resumeUploadUrl: string().or(Undefined()),
    }),
    id: string(),
    createdAt: InstanceOf(Date),
    updatedAt: InstanceOf(Date),
    status: literal('initialized')
      .or(literal('proccessing'))
      .or(literal('ready')),
    jobId: string(),
    intervieweeId: string(),
    answers: array(
      object({
        url: string(),
        uploadUrl: string().or(Undefined()),
        question: object({ id: string(), question: string(), time: number() }),
      })
    ),
    score: Null().or(number()),
    thumbnail: string(),
  })
);

export type MyInterviewReturnSchema = Infer<typeof MyInterviewReturnSchema>;

export const MyInterviewsReturnSchema = array(
  object({
    id: string(),
    createdAt: InstanceOf(Date),
    status: literal('initialized')
      .or(literal('proccessing'))
      .or(literal('ready')),
    answers: array(
      object({
        url: string(),
        uploadUrl: string().or(Undefined()),
        question: object({ id: string(), question: string(), time: number() }),
      })
    ),
    thumbnail: string(),
    job: object({
      id: string(),
      title: string(),
      company: object({ id: string(), name: string(), avatarUrl: string() }),
    }),
  })
);

export type MyInterviewsReturnSchema = Infer<typeof MyInterviewsReturnSchema>;

export const PendingRatesReturnSchema = array(
  object({
    interview: Null().or(
      object({
        job: object({
          company: object({
            id: string(),
            createdAt: InstanceOf(Date),
            updatedAt: InstanceOf(Date),
            name: string(),
            description: Null().or(string()),
            website: Null().or(string()),
            avatarUrl: string(),
            avatarUploadUrl: string().or(Undefined()),
          }),
          id: string(),
          createdAt: InstanceOf(Date),
          updatedAt: InstanceOf(Date),
          description: Null().or(string()),
          companyId: string(),
          title: string(),
          deadline: InstanceOf(Date),
          questions: array(
            object({ id: string(), question: string(), time: number() })
          ),
        }),
        interviewee: object({
          id: string(),
          email: string(),
          firstName: Null().or(string()),
          lastName: Null().or(string()),
          bio: Null().or(string()),
          issuer: string(),
          publicAddress: string(),
          linkedInProfile: Null().or(string()),
          resumeFileName: Null().or(string()),
          role: literal('user').or(literal('admin')),
          onboarded: boolean(),
          createdAt: InstanceOf(Date),
          updatedAt: InstanceOf(Date),
          avatarUrl: string(),
          avatarUploadUrl: string().or(Undefined()),
          resumeUrl: string(),
          resumeUploadUrl: string().or(Undefined()),
        }),
        rates: array(
          object({
            createdAt: InstanceOf(Date),
            value: Null().or(number()),
            reason: Null().or(string()),
            interviewId: string(),
            raterId: string(),
          })
        ),
        id: string(),
        createdAt: InstanceOf(Date),
        updatedAt: InstanceOf(Date),
        status: literal('initialized')
          .or(literal('proccessing'))
          .or(literal('ready')),
        jobId: string(),
        intervieweeId: string(),
        answers: array(
          object({
            url: string(),
            uploadUrl: string().or(Undefined()),
            question: object({
              id: string(),
              question: string(),
              time: number(),
            }),
          })
        ),
        score: Null().or(number()),
        thumbnail: string(),
      })
    ),
    createdAt: InstanceOf(Date),
    value: Null().or(number()),
    reason: Null().or(string()),
    interviewId: string(),
    raterId: string(),
  })
);

export type PendingRatesReturnSchema = Infer<typeof PendingRatesReturnSchema>;

export const ProcessInterviewReturnSchema = boolean();

export type ProcessInterviewReturnSchema = Infer<
  typeof ProcessInterviewReturnSchema
>;

export const ProfileReturnSchema = Null().or(
  object({
    id: string(),
    email: string(),
    firstName: Null().or(string()),
    lastName: Null().or(string()),
    bio: Null().or(string()),
    issuer: string(),
    publicAddress: string(),
    linkedInProfile: Null().or(string()),
    resumeFileName: Null().or(string()),
    role: literal('user').or(literal('admin')),
    onboarded: boolean(),
    createdAt: InstanceOf(Date),
    updatedAt: InstanceOf(Date),
    avatarUrl: string(),
    avatarUploadUrl: string().or(Undefined()),
    resumeUrl: string(),
    resumeUploadUrl: string().or(Undefined()),
  })
);

export type ProfileReturnSchema = Infer<typeof ProfileReturnSchema>;

export const PublicJobReturnSchema = Null().or(
  object({
    id: string(),
    title: string(),
    company: object({
      name: string(),
      website: Null().or(string()),
      avatarUrl: string(),
    }),
    description: Null().or(string()),
    questions: array(
      object({ id: string(), question: string(), time: number() })
    ),
  })
);

export type PublicJobReturnSchema = Infer<typeof PublicJobReturnSchema>;

export const RateInterviewReturnSchema = object({
  interview: Null().or(
    object({
      job: object({
        id: string(),
        createdAt: InstanceOf(Date),
        updatedAt: InstanceOf(Date),
        description: Null().or(string()),
        companyId: string(),
        title: string(),
        deadline: InstanceOf(Date),
        questions: array(
          object({ id: string(), question: string(), time: number() })
        ),
      }),
      interviewee: object({
        id: string(),
        email: string(),
        firstName: Null().or(string()),
        lastName: Null().or(string()),
        bio: Null().or(string()),
        issuer: string(),
        publicAddress: string(),
        linkedInProfile: Null().or(string()),
        resumeFileName: Null().or(string()),
        role: literal('user').or(literal('admin')),
        onboarded: boolean(),
        createdAt: InstanceOf(Date),
        updatedAt: InstanceOf(Date),
        avatarUrl: string(),
        avatarUploadUrl: string().or(Undefined()),
        resumeUrl: string(),
        resumeUploadUrl: string().or(Undefined()),
      }),
      id: string(),
      createdAt: InstanceOf(Date),
      updatedAt: InstanceOf(Date),
      status: literal('initialized')
        .or(literal('proccessing'))
        .or(literal('ready')),
      jobId: string(),
      intervieweeId: string(),
      answers: array(
        object({
          url: string(),
          uploadUrl: string().or(Undefined()),
          question: object({
            id: string(),
            question: string(),
            time: number(),
          }),
        })
      ),
      score: Null().or(number()),
      thumbnail: string(),
    })
  ),
  createdAt: InstanceOf(Date),
  value: Null().or(number()),
  reason: Null().or(string()),
  interviewId: string(),
  raterId: string(),
});

export type RateInterviewReturnSchema = Infer<typeof RateInterviewReturnSchema>;

export const RefreshClaimsReturnSchema = object({ token: string() });

export type RefreshClaimsReturnSchema = Infer<typeof RefreshClaimsReturnSchema>;

export const SetupCompanyReturnSchema = object({
  id: string(),
  createdAt: InstanceOf(Date),
  updatedAt: InstanceOf(Date),
  name: string(),
  description: Null().or(string()),
  website: Null().or(string()),
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
});

export type SetupCompanyReturnSchema = Infer<typeof SetupCompanyReturnSchema>;

export const SkipOnboardingReturnSchema = object({
  id: string(),
  email: string(),
  firstName: Null().or(string()),
  lastName: Null().or(string()),
  bio: Null().or(string()),
  issuer: string(),
  publicAddress: string(),
  linkedInProfile: Null().or(string()),
  resumeFileName: Null().or(string()),
  role: literal('user').or(literal('admin')),
  onboarded: boolean(),
  createdAt: InstanceOf(Date),
  updatedAt: InstanceOf(Date),
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
  resumeUrl: string(),
  resumeUploadUrl: string().or(Undefined()),
});

export type SkipOnboardingReturnSchema = Infer<
  typeof SkipOnboardingReturnSchema
>;

export const SubmitInterviewReturnSchema = object({
  id: string(),
  createdAt: InstanceOf(Date),
  updatedAt: InstanceOf(Date),
  status: literal('initialized')
    .or(literal('proccessing'))
    .or(literal('ready')),
  jobId: string(),
  intervieweeId: string(),
  answers: array(
    object({
      url: string(),
      uploadUrl: string().or(Undefined()),
      question: object({ id: string(), question: string(), time: number() }),
    })
  ),
  score: Null().or(number()),
  thumbnail: string(),
});

export type SubmitInterviewReturnSchema = Infer<
  typeof SubmitInterviewReturnSchema
>;

export const UpdateProfileReturnSchema = object({
  id: string(),
  email: string(),
  firstName: Null().or(string()),
  lastName: Null().or(string()),
  bio: Null().or(string()),
  issuer: string(),
  publicAddress: string(),
  linkedInProfile: Null().or(string()),
  resumeFileName: Null().or(string()),
  role: literal('user').or(literal('admin')),
  onboarded: boolean(),
  createdAt: InstanceOf(Date),
  updatedAt: InstanceOf(Date),
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
  resumeUrl: string(),
  resumeUploadUrl: string().or(Undefined()),
});

export type UpdateProfileReturnSchema = Infer<typeof UpdateProfileReturnSchema>;

export const UpdateResumeReturnSchema = object({ id: string() });

export type UpdateResumeReturnSchema = Infer<typeof UpdateResumeReturnSchema>;

export const UpsertJobReturnSchema = object({ id: string() }).or(
  object({ id: string() })
);

export type UpsertJobReturnSchema = Infer<typeof UpsertJobReturnSchema>;
