/**
 * Handles Inquiry submission and mock-delivers to console (ready for Resend integration).
 */
export async function submitInquiryAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;
  const fractionRef = formData.get('fractionRef') as string;
  const projectTitle = formData.get('projectTitle') as string;

  console.log('--- NEW INQUIRY SUBMITTED ---');
  console.log(`Interest in: ${fractionRef} (Project: ${projectTitle})`);
  console.log(`From: ${name} <${email}> (Phone: ${phone})`);
  console.log(`Message: ${message}`);
  console.log('------------------------------');

  // Simulated Delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return { success: true };
}