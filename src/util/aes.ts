import { AES, enc, mode, pad } from 'crypto-ts';
import { Encoding } from 'crypto-ts/src/enc/Encoding';
import { WordArray } from 'crypto-ts/src/lib/WordArray';
import { BlockCipherMode } from 'crypto-ts/src/mode/BlockCipherMode';
import { Padding } from 'crypto-ts/src/pad/Padding';

// 32bytes
const KEY = process.env.AES_KEY || '-THIS-IS-AES-256-ENCRYPTION-KEY-';

let instance: Aes;

class Aes {
  private readonly key: WordArray;
  private readonly iv: WordArray;
  private readonly mode: typeof BlockCipherMode;
  private readonly padding: Padding;
  private readonly encoder: Encoding;

  constructor(key: string) {
    if (instance)
      return instance;

    this.key = enc.Utf8.parse(key);
    this.iv = enc.Utf8.parse(key.substring(0, 16));
    this.mode = mode.CBC;
    this.padding = pad.PKCS7;
    this.encoder = enc.Utf8;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    instance = this;
  }

  encrypt(plainText: string) {
    const encoded = enc.Utf8.parse(plainText);
    const encrypted = AES.encrypt(encoded, this.key, {
      iv: this.iv,
      mode: this.mode,
      padding: this.padding,
    });
    return encrypted.toString();
  }

  decrypt(cipherText: string) {
    const decrypted = AES.decrypt(cipherText, this.key, {
      iv: this.iv,
      mode: this.mode,
      padding: this.padding,
    });
    return decrypted.toString(this.encoder);
  }
}

export default new Aes(KEY);
