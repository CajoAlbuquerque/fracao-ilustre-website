// import { cookies } from 'next/headers';
// import { revalidatePath } from 'next/cache';

/**
 * Updates the NEXT_LOCALE cookie to switch site language.
 */
export async function setLanguageAction(locale: 'pt' | 'en') {
  console.log('cookies test')
  // const cookieStore = await cookies();
  // cookieStore.set('NEXT_LOCALE', locale, {
  //   path: '/',
  //   maxAge: 60 * 60 * 24 * 365, // 1 year
  // });
  // revalidatePath('/');
}

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