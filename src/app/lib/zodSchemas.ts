// zodSchemas.ts file is used to define the zod schemas for the form data on 'onBoarding' page

import { conformZodMessage } from "@conform-to/zod";
import { custom, z } from "zod";

export const onBoardingSchema = z.object({
    fullName: z.string().min(3).max(150),
    username: z.string().min(3).max(150).regex(/^[a-zA-Z0-9_]+$/, {
        message: "username can only contain letters, numbers and underscores",
    }),
})

// function to validate the onBoardingSchema with the option to check if the username is unique
export function onBoardingSchemaValidation(option?: { isUsernameUnique: () => Promise<boolean>; }) {
    return z.object({
        username: z
            .string()
            .min(3)
            .max(150)
            .regex(/^[a-zA-Z0-9_]+$/, {
                message: "username can only contain letters, numbers and underscores",
            })
            .pipe(
                z.string().superRefine((_, ctx) => {
                    if (typeof option?.isUsernameUnique !== 'function') {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: conformZodMessage.VALIDATION_UNDEFINED,
                            fatal: true,
                        });
                        return;
                    }

                    return option.isUsernameUnique().then((isUnique) => {
                        if (!isUnique) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: 'username is already taken'
                            });
                        }
                    });
                })
            ),
        fullName: z.string().min(3).max(150),
    });
}

// .pipe (
//     z.string().superRefine((_, ctx) => {
//         if(typeof option?.isUsernameUnique !== 'function') {
//             ctx.addIssue({
//                 code: custom,
//                 message: conformZodMessage.VALIDATION_UNDEFINED,
//                 fatal: true,
//             });
//             return;
//         }

//         return option.isUsernameUnique().then((isUnique) => {
//             if(!isUnique) {
//                 ctx.addIssue({
//                     code: custom,
//                     message: 'username is already taken'});
//             }
//         });
//     })
// )




export const aboutSettingsSchema = z.object({
    fullName: z.string().min(3).max(150),
  
    profileImage: z.string(),
  });



//   zod schema for dashboard/new(form submit event)
export const eventTypeSchema = z.object ({
    title: z.string().min(3).max(150),
    // duration: z.string().min(15).max(60),
    duration: z.string(),
    url: z.string().min(3).max(300),
    description: z.string().min(3).max(300),
    videoCallSoftware: z.string().min(3)
});