/**
 * Images from public/client-pic folder.
 * 1–10.jpeg = Gallery images.
 * intro_one.jpeg = Founder intro photo.
 * testimonial1–3.jpg = Testimonial avatars.
 * client1–12.jpg = Client Presence grid.
 */
const BASE = process.env.PUBLIC_URL || '';

export const clientPic = (filename) => `${BASE}/client-pic/${filename}`;

/** Gallery photos: 1.jpeg through 10.jpeg */
export const galleryImageCount = 10;
export const galleryImage = (n) => clientPic(`${n}.jpeg`);

/** Founder intro photo */
export const founderIntroImage = clientPic('intro_one.jpeg');

/** Background images */
export const heroBgImage = clientPic('hero-bg.jpg');
export const forestBgImage = clientPic('forest-bg.jpg');

/** Testimonials: testimonial1.jpg, testimonial2.jpg, testimonial3.jpg */
export const testimonialAvatar = (index) => clientPic(`testimonial${index + 1}.jpg`);

/** Client Presence grid: client1.jpg … client12.jpg (not 1–7; those are founder) */
export const clientPresenceSlots = 12;
export const clientPresenceImage = (n, usePng = false) =>
  clientPic(usePng ? `client${n}.png` : `client${n}.jpg`);
