import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: 'experimental-edge',
};

const ENCRYPTION_KEY = "*F-JaNdRgUkXp2s5u8x/A?D(G+KbPeSh";

const encryptAES = async (data: string) => {
    const encoder = new TextEncoder();

    const key_algorithm = { name: 'AES-CBC', length: 256 };
    const keyData = encoder.encode(ENCRYPTION_KEY);

    const key = await crypto.subtle.importKey('raw', keyData, key_algorithm, false, ['encrypt', 'decrypt']);

    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, key, encoder.encode(data));
    const encryptedBytes = new Uint8Array(encryptedData);
    const encryptedHex = Array.from(encryptedBytes).map(b => b.toString(16).padStart(2, '0')).join('');
    const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');

    return ivHex + ':' + encryptedHex;

}

export default async (req: NextRequest) => {
    const q = req.nextUrl.searchParams.get('q')

    const jobTitle = await encryptAES(`Write a job title from this information: ${q}`)

    const jobDescription = await encryptAES(`Write a long job description and include Responsibilities as Requirements sections. from this information: ${q}`)

    return NextResponse.json([`http://51.158.201.188:9000/sse?p=${jobTitle}`, `http://51.158.201.188:9000/sse?p=${jobDescription}`]);
};