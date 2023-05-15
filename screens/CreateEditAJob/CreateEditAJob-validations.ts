import { z } from 'zod';

export const createAJobSchema = z.object({
  title: z.string().min(1, 'You must set a title!'),
  deadline: z.coerce.date().min(new Date(), 'Deadline must be in the future'),
  description: z.string().min(1, 'You must write a job description!'),
  questions: z
    .array(
      z.object({
        id: z.string().min(1, 'You must set the question'),
        question: z.string().min(1, 'You must set the question'),
        time: z.coerce.number({
          required_error: 'You must set question duration',
        }),
      })
    )
    .min(1),
});
