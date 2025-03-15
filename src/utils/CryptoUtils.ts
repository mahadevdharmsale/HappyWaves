import CryptoJS from 'crypto-js'

export default class CryptoUtil {
  static getKeyFromString(keyString: string): CryptoJS.lib.WordArray {
    return CryptoJS.enc.Utf8.parse(keyString) // Parse the string directly to WordArray
  }

  static encrypt(data: string): string {
    if(import.meta.env.VITE_IS_DEBUG === 'true') {
      return data
    }
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, this.getKeyFromString(import.meta.env.VITE_SECRET_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    const ivAndEncrypted = iv.concat(encrypted.ciphertext) // Prepend IV to encrypted data
    return CryptoJS.enc.Base64.stringify(ivAndEncrypted)
  }

  static decrypt(encryptedData: string): string {
    if(import.meta.env.VITE_IS_DEBUG === 'true') {
      return encryptedData
    }
    const ivAndEncrypted = CryptoJS.enc.Base64.parse(encryptedData)
    const iv = CryptoJS.lib.WordArray.create(ivAndEncrypted.words.slice(0, 4))
    const ciphertext = CryptoJS.lib.WordArray.create(ivAndEncrypted.words.slice(4))
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: ciphertext
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, this.getKeyFromString(import.meta.env.VITE_SECRET_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
