// Cierra con candado un Worker para la entrega: node cerrar.mjs archivo.js  →  archivo.js.cerrado
import fs from 'node:fs'; import crypto from 'node:crypto';
const pub = fs.readFileSync(new URL('./llave_cerrar.pem', import.meta.url));
for (const f of process.argv.slice(2)) {
  const llave = crypto.randomBytes(32), iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', llave, iv);
  const data = Buffer.concat([c.update(fs.readFileSync(f)), c.final()]);
  const k = crypto.publicEncrypt({ key: pub, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, llave);
  fs.writeFileSync(f + '.cerrado', JSON.stringify({ v: 1, k: k.toString('base64'), iv: iv.toString('base64'), tag: c.getAuthTag().toString('base64'), data: data.toString('base64') }));
  console.log('cerrado', f);
}
