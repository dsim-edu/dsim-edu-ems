export const getBase64String = (file: File | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target!.result as string);
      };

      reader.onerror = () => {
        reject("empty");
      };

      reader.readAsDataURL(file);
    } else {
      resolve("empty");
    }
  });
};
