/**
 * Images from public/client-pic folder.
 * 1–7.jpg = Founder (Dr. Manju Agrawal) — used across Hero, About, Founder section.
 * testimonial1–3.jpg = Testimonial avatars.
 * client1–12.jpg = Client Presence grid.
 */
const BASE = process.env.PUBLIC_URL || '';

export const clientPic = (filename) => `${BASE}/client-pic/${filename}`;

/** Founder (Manju) photos: 1.jpg through 11.jpg */
export const founderImageCount = 11;
export const founderImage = (n) => clientPic(`${n}.jpg`);

/** Background images */
export const heroBgImage = clientPic('hero-bg.jpg');
export const forestBgImage = clientPic('forest-bg.jpg');

/** Testimonials: testimonial1.jpg, testimonial2.jpg, testimonial3.jpg */
export const testimonialAvatar = (index) => clientPic(`testimonial${index + 1}.jpg`);

/** Client Presence grid: client1.jpg … client12.jpg (not 1–7; those are founder) */
export const clientPresenceSlots = 12;
export const clientPresenceImage = (n, usePng = false) =>
  clientPic(usePng ? `client${n}.png` : `client${n}.jpg`);
