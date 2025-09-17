'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function sendContactEmail(formData: z.infer<typeof contactFormSchema>) {
  // This function is no longer used to send email via server,
  // but we keep it in case we want to re-enable server-side sending later.
  // The client-side will now construct a mailto link.
  console.log('Form data received:', formData);
  return { success: true, message: 'Mail client should be opened.' };
}
