export default class Conversion {

  static toRupeesWithIcon(value: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(this.toRuppesCoversion(value))
  }
  static addRupeesIcon(value: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
  }
  static toRuppesCoversion(paise: number) {
    return paise / 100
  }
  static toPaiseConversion(rs: number) {
    return parseFloat(rs.toFixed(2)) * 100
  }
  static toDateFormat(value: number){
    return `${new Date(value).getDate()} ${new Date(value).toDateString().slice(4, 7)} ${new Date(value).getUTCFullYear()}`
  }

  static toDateAndTimeFormat(value: number){
    return `${new Date(value).getDate()} ${new Date(value).toDateString().slice(4, 7)} ${new Date(value).getUTCFullYear() } ${new Date(value).toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })}`
  }

  //The Below fun is used to make the words capatilize it accepts string nd returns the string

  static capitalizeWords(value: string): string {
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  static async convertToWebP(file: File, newFileName: string): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                // Create a new File object with the renamed filename
                const webPFile = new File([blob], newFileName, { type: 'image/webp' });
                resolve(webPFile);
              } else {
                reject(new Error('Failed to convert image to WebP.'));
              }
            },
            'image/webp',
            0.8 // Quality (80%)
          );
        } else {
          reject(new Error('Failed to get canvas context.'));
        }
      };
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = URL.createObjectURL(file);
    });
  }

  static  formatStringWithSpaces(str: string): string {
    // Match groups of letters and numbers
    const regex = /([a-zA-Z]+)(\d+)([a-zA-Z]*)(\d+)/;

    // Apply the regex to the string and format accordingly
    const match = str.match(regex);

    if (match) {
      // If a match is found, return the formatted string
      const [_, part1, part2, part3, part4] = match;
      let result = `${part1} ${part2}`;

      // Check if there are remaining letters and numbers and add space
      if (part3) {
        result += ` ${part3}`;
      }
      if (part4) {
        result += ` ${part4}`;
      }
      return result;
    }

    // If the pattern doesn't match, return the original string
    return str;
  }

}
