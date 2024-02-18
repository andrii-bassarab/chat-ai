export function generateRandomSentence() {
  const subjects = [
    'The cat ooooooooooooooooo',
    'A dog mmmmmmmmmmm',
    'A bird hghmmmmgg',
    'My friend hjmgyhmjghjm ',
    'An alien juyjuykuy',
  ];
  
  const verbs = ['runs', 'jumps', 'flies', 'sings', 'dances'];
  const adverbs = ['quickly', 'slowly', 'gracefully', 'loudly', 'silently'];
  
  const objects = [
    'in the park',
    'on the moon',
    'under the tree',
    'across the river',
    'around the corner',
  ];
  
  const makeLonger = (array: string[], repeatCount: number) => {
    return array.map(item => (item + " ").repeat(repeatCount));
  };
  
  const combinedSubjects = makeLonger(subjects, 3);
  const combinedVerbs = makeLonger(verbs, 2);
  const combinedAdverbs = makeLonger(adverbs, 4);
  const combinedObjects = makeLonger(objects, 3);

  const randomSubject = combinedSubjects[Math.floor(Math.random() * combinedSubjects.length)];
  const randomVerb = combinedVerbs[Math.floor(Math.random() * combinedVerbs.length)];
  const randomAdverb = combinedAdverbs[Math.floor(Math.random() * combinedAdverbs.length)];
  const randomObject = combinedObjects[Math.floor(Math.random() * combinedObjects.length)];

  return `${randomSubject} ${randomVerb} ${randomAdverb} ${randomObject}.`;
}

export const copyToClipBoard = async (copyMe: string) => {
  try {
    await navigator.clipboard.writeText(copyMe);
  } catch (err) {
    console.warn('Failed to copy!', err);
  }
};
