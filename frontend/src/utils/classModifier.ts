export default (mainClass: string, modifier: string | Array<string | boolean> = ''): string => {
  if (!modifier) {
    return mainClass;
  }

  let result: string = mainClass;

  if (!Array.isArray(modifier)) {
    return result += ` ${mainClass}--${modifier}`;
  }

  modifier.forEach(modifier => {
    if (modifier) {
      result += ` ${mainClass}--${modifier}`;
    }
  });

  return result;
};