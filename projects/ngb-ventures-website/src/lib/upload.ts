import "server-only";

export const MAX_UPLOAD = 4 * 1024 * 1024; // 4 MB (fits serverless body limits)
const SIGS: { type: string; ext: string; test: (b: Uint8Array) => boolean }[] = [
  { type: "image/jpeg", ext: "jpg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { type: "image/png", ext: "png", test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { type: "image/webp", ext: "webp", test: (b) => b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50 },
  { type: "application/pdf", ext: "pdf", test: (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 },
];

export type Attachment = { filename: string; contentType: string; base64: string; size: number };

/** Validates an uploaded reference file by size and magic bytes (not by the client-supplied MIME type). */
export async function readAttachment(file: File | null): Promise<{ ok: true; attachment: Attachment | null } | { ok: false; message: string }> {
  if (!file || file.size === 0) return { ok: true, attachment: null };
  if (file.size > MAX_UPLOAD) return { ok: false, message: "The reference file is larger than 4 MB. Please upload a smaller image or PDF." };
  const buf = new Uint8Array(await file.arrayBuffer());
  const sig = SIGS.find((s) => s.test(buf));
  if (!sig) return { ok: false, message: "Please upload a JPG, PNG, WebP or PDF file." };
  const safeName = (file.name || "reference").replace(/[^\w.\-]+/g, "_").slice(0, 80).replace(/\.[^.]*$/, "") + "." + sig.ext;
  return { ok: true, attachment: { filename: safeName, contentType: sig.type, base64: Buffer.from(buf).toString("base64"), size: buf.length } };
}
