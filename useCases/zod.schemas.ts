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

export const CompanyReturnSchema = object({
  id: string(),
  name: string(),
  avatarUrl: string(),
});

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
    }).and(
      object({
        role: literal('member').or(literal('adminMember')),
        userId: string(),
        companyId: string(),
      })
    )
  )
);

export type CompanyMembersReturnSchema = Infer<
  typeof CompanyMembersReturnSchema
>;

export const DeleteCompanyReturnSchema = object({
  id: string(),
  name: string(),
  description: Null().or(string()),
  website: Null().or(string()),
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
});

export type DeleteCompanyReturnSchema = Infer<typeof DeleteCompanyReturnSchema>;

export const DeleteJobReturnSchema = object({ id: string() });

export type DeleteJobReturnSchema = Infer<typeof DeleteJobReturnSchema>;

export const DidApplyReturnSchema = boolean();

export type DidApplyReturnSchema = Infer<typeof DidApplyReturnSchema>;

export const DidRateInterviewReturnSchema = object({
  value: Null().or(number()),
  createdAt: InstanceOf(Date),
  reason: Null().or(string()),
  interviewId: string(),
  raterId: string(),
});

export type DidRateInterviewReturnSchema = Infer<
  typeof DidRateInterviewReturnSchema
>;

export const EditCompanyReturnSchema = object({
  id: string(),
  name: string(),
  description: Null().or(string()),
  website: Null().or(string()),
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
});

export type EditCompanyReturnSchema = Infer<typeof EditCompanyReturnSchema>;

export const HealthReturnSchema = object({ success: boolean() });

export type HealthReturnSchema = Infer<typeof HealthReturnSchema>;

export const InterviewReturnSchema = object({
  job: object({
    id: string(),
    description: Null().or(string()),
    companyId: string(),
    title: string(),
    deadline: InstanceOf(Date),
    questions: array(
      object({ id: string(), question: string(), time: number() })
    ),
    createdAt: InstanceOf(Date),
    updatedAt: InstanceOf(Date),
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
    avatarUrl: string(),
    avatarUploadUrl: string().or(Undefined()),
    resumeUrl: string(),
    resumeUploadUrl: string().or(Undefined()),
  }),
}).and(
  object({
    id: string(),
    status: literal('initialized')
      .or(literal('proccessing'))
      .or(literal('ready')),
    createdAt: InstanceOf(Date),
    updatedAt: InstanceOf(Date),
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

export const JobReturnSchema = object({
  id: string(),
  title: string(),
  deadline: InstanceOf(Date),
  description: Null().or(string()),
  questions: array(
    object({ id: string(), question: string(), time: number() })
  ),
});

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

export const MyCompanyReturnSchema = object({
  id: string(),
  name: string(),
  website: Null().or(string()),
  description: Null().or(string()),
  avatarUploadUrl: string().or(Undefined()),
  avatarUrl: string(),
});

export type MyCompanyReturnSchema = Infer<typeof MyCompanyReturnSchema>;

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
      company: object({ id: string(), name: string(), avatarUrl: string() }),
    }).and(
      object({
        id: string(),
        description: Null().or(string()),
        companyId: string(),
        title: string(),
        deadline: InstanceOf(Date),
        questions: array(
          object({ id: string(), question: string(), time: number() })
        ),
        createdAt: InstanceOf(Date),
        updatedAt: InstanceOf(Date),
      })
    ),
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
            name: string(),
            description: Null().or(string()),
            website: Null().or(string()),
            avatarUrl: string(),
            avatarUploadUrl: string().or(Undefined()),
          }),
        }).and(
          object({
            id: string(),
            description: Null().or(string()),
            companyId: string(),
            title: string(),
            deadline: InstanceOf(Date),
            questions: array(
              object({ id: string(), question: string(), time: number() })
            ),
            createdAt: InstanceOf(Date),
            updatedAt: InstanceOf(Date),
          })
        ),
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
          avatarUrl: string(),
          avatarUploadUrl: string().or(Undefined()),
          resumeUrl: string(),
          resumeUploadUrl: string().or(Undefined()),
        }),
        rates: array(
          object({
            value: Null().or(number()),
            createdAt: InstanceOf(Date),
            reason: Null().or(string()),
            interviewId: string(),
            raterId: string(),
          })
        ),
      }).and(
        object({
          id: string(),
          status: literal('initialized')
            .or(literal('proccessing'))
            .or(literal('ready')),
          createdAt: InstanceOf(Date),
          updatedAt: InstanceOf(Date),
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
      )
    ),
  }).and(
    object({
      value: Null().or(number()),
      createdAt: InstanceOf(Date),
      reason: Null().or(string()),
      interviewId: string(),
      raterId: string(),
    })
  )
);

export type PendingRatesReturnSchema = Infer<typeof PendingRatesReturnSchema>;

export const ProfileReturnSchema = object({
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
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
  resumeUrl: string(),
  resumeUploadUrl: string().or(Undefined()),
});

export type ProfileReturnSchema = Infer<typeof ProfileReturnSchema>;

export const PublicJobReturnSchema = object({
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
});

export type PublicJobReturnSchema = Infer<typeof PublicJobReturnSchema>;

export const RateInterviewReturnSchema = object({
  interview: Null().or(
    object({
      job: object({
        id: string(),
        description: Null().or(string()),
        companyId: string(),
        title: string(),
        deadline: InstanceOf(Date),
        questions: array(
          object({ id: string(), question: string(), time: number() })
        ),
        createdAt: InstanceOf(Date),
        updatedAt: InstanceOf(Date),
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
        avatarUrl: string(),
        avatarUploadUrl: string().or(Undefined()),
        resumeUrl: string(),
        resumeUploadUrl: string().or(Undefined()),
      }),
    }).and(
      object({
        id: string(),
        status: literal('initialized')
          .or(literal('proccessing'))
          .or(literal('ready')),
        createdAt: InstanceOf(Date),
        updatedAt: InstanceOf(Date),
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
    )
  ),
}).and(
  object({
    value: Null().or(number()),
    createdAt: InstanceOf(Date),
    reason: Null().or(string()),
    interviewId: string(),
    raterId: string(),
  })
);

export type RateInterviewReturnSchema = Infer<typeof RateInterviewReturnSchema>;

export const SetupCompanyReturnSchema = object({
  id: string(),
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
  avatarUrl: string(),
  avatarUploadUrl: string().or(Undefined()),
  resumeUrl: string(),
  resumeUploadUrl: string().or(Undefined()),
});

export type SkipOnboardingReturnSchema = Infer<
  typeof SkipOnboardingReturnSchema
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
