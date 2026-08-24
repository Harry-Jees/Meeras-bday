export type Memory = { label: string; src?: string; tone: string; crop?: string };

// Add real files to public/images, then set `src: '/images/filename.jpg'` here.
// No image is assumed to represent a particular memory.
export const memories: Memory[] = [
  { label: 'Harry & Meera', src: '/images/harry-meera.jpg', tone: 'peach', crop: 'portrait-duo' },
  { label: 'friends at the mall', src: '/images/mall-group.jpg', tone: 'violet', crop: 'wide-group' },
  { label: 'friends together', src: '/images/friends-group.jpg', tone: 'gold', crop: 'wide-group' },
  { label: 'fun call moment', src: '/images/booth-mall-selfie.jpg', tone: 'rose', crop: 'fun-screenshot' },
  { label: 'school-day selfie', src: '/images/booth-school-selfie.jpg', tone: 'blue', crop: 'portrait-duo' },
  { label: 'mall-day selfie', src: '/images/booth-mall-selfie.jpg', tone: 'lime', crop: 'portrait-duo' },
  { label: 'evening together', src: '/images/booth-evening-duo.jpg', tone: 'peach', crop: 'portrait-duo' },
  { label: 'friends group selfie', src: '/images/booth-group-selfie.jpg', tone: 'violet', crop: 'wide-group' },
  { label: 'pop comic moment', src: '/images/booth-pop-comic.jpg', tone: 'gold', crop: 'pop-comic' },
];
export const photoBooth = {
  photos: [
    { label: 'mall group', src: '/images/mall-group.jpg' },
    { label: 'Harry and Meera', src: '/images/harry-meera.jpg' },
    { label: 'friends together', src: '/images/friends-group.jpg' },
    { label: 'fun call moment', src: '/images/booth-mall-selfie.jpg' },
    { label: 'your next memory' },
  ],
} as { photos: Array<{ label: string; src?: string }> };
