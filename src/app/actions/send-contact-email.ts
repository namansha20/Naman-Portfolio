'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function sendContactEmail(formData: z.infer<typeof contactFormSchema>) {
  const validatedData = contactFormSchema.parse(formData);
  const recipient = process.env.EMAIL_RECIPIENT;

  if (!recipient) {
    console.error('EMAIL_RECIPIENT environment variable is not set.');
    throw new Error('Server configuration error.');
  }

  const prompt = `You have received a new message from your portfolio contact form.

  From: ${validatedData.name} <${validatedData.email}>
  Message:
  ${validatedData.message}

  This email was sent to ${recipient}.
  `;

  try {
    // This is a placeholder for a real email sending service.
    // In a real application, you would use a service like SendGrid, Resend, or Nodemailer.
    // For this prototype, we'll just generate the email content.
    const { output } = await ai.generate({
      prompt: `Generate an email with the following content: ${prompt}`,
      output: {
        format: 'text'
      }
    });
    console.log('Email content generated:');
    console.log(output);
    console.log(`(This is a simulation. In a real app, an email would be sent to ${recipient})`);
    
    // Simulate email sending
    return { success: true, message: 'Email sent successfully (simulated).' };

  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send message.');
  }
}
