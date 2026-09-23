const DB_NAME = 'streamlive_offline_db';
const DB_VERSION = 1;
const STORE_NAME = 'media_downloads';

function openDB() {
  if (!('indexedDB' in window)) throw new Error('IndexedDB non disponible.');
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Impossible d’ouvrir IndexedDB.'));
  });
}

async function putMedia(item) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(item);
    tx.oncomplete = () => { db.close(); resolve(item); };
    tx.onerror = () => { db.close(); reject(tx.error || new Error('Échec du stockage offline.')); };
  });
}

export async function getOfflineMedia(mediaId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(String(mediaId));
    request.onsuccess = () => { db.close(); resolve(request.result || null); };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}

export async function listOfflineMedia() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll();
    request.onsuccess = () => { db.close(); resolve((request.result || []).sort((a,b) => String(b.savedAt||'').localeCompare(String(a.savedAt||'')))); };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}

export async function deleteOfflineMedia(mediaId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(String(mediaId));
    tx.oncomplete = () => { db.close(); resolve(true); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

function safeFileName(title, mediaId) {
  const base = String(title || 'streamlive')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^\.+|\.+$/g, '')
    .slice(0, 100) || 'streamlive';
  return base + '_' + String(mediaId).replace(/[^a-zA-Z0-9_-]/g, '_') + '.mp4';
}

async function saveToDevice(blob, fileName) {
  if ('showSaveFilePicker' in window && window.isSecureContext) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: 'Vidéo MP4', accept: { 'video/mp4': ['.mp4'] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return 'device';
    } catch (error) {
      if (error && error.name === 'AbortError') return 'cancelled';
    }
  }

  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    return 'browser';
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 15000);
  }
}

export async function processMediaDownload({ mediaId, title, onProgress, signal } = {}) {
  const id = String(mediaId || '').trim();
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) throw new Error('Identifiant média invalide.');

  const token = localStorage.getItem('token') || '';
  const headers = { Accept: 'video/mp4' };
  if (token) headers.Authorization = 'Bearer ' + token;

  const response = await fetch('/api/download/media?id=' + encodeURIComponent(id), {
    credentials: 'same-origin',
    headers,
    signal
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error((body && body.error) || 'Erreur serveur: ' + response.status);
  }
  if (!response.body) throw new Error('Le navigateur ne fournit pas de flux de téléchargement.');

  const total = Number(response.headers.get('content-length')) || 0;
  let loaded = 0;
  const reader = response.body.getReader();
  const chunks = [];

  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      chunks.push(result.value);
      loaded += result.value.byteLength;
      if (total && onProgress) onProgress(Math.min(100, Math.round(loaded / total * 100)));
    }
  } finally {
    reader.releaseLock();
  }

  const blob = new Blob(chunks, { type: response.headers.get('content-type') || 'video/mp4' });
  const fileName = safeFileName(title, id);
  const savedAt = new Date().toISOString();
  const deviceResult = await saveToDevice(blob, fileName);

  await putMedia({ id, title: String(title || id), blob, contentType: blob.type, savedAt, fileName });
  if (onProgress) onProgress(100);
  return { success: true, savedTo: deviceResult, id, fileName };
}
