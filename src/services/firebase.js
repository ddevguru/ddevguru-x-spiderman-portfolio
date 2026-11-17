/**
 * =========================================================================
 * 🕷️ SPIDER-MAN PORTFOLIO - OFFICIAL FIREBASE FIRESTORE CLOUD SYNC SERVICE
 * =========================================================================
 * Real-Time Multi-Device Sticky Notes Sync via Firebase Cloud Firestore
 * Project: ddevguru-portfolio
 * =========================================================================
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  increment,
  query,
  orderBy,
} from "firebase/firestore";

// Official Firebase Configuration for Deepak Mishra (ddevguru-portfolio)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCiNT_3w98dp0ZVRj3dgiJDvQ4fm03mplk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ddevguru-portfolio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ddevguru-portfolio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ddevguru-portfolio.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "849774852904",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:849774852904:web:e5fb125c6b9548fb5dae1d",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QJC9PVTXJP",
};

export const isCloudConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey.length > 5
);

export const isFirebaseReady = isCloudConfigured;

let app = null;
let db = null;

if (isCloudConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firebase initialization warning:", err.message);
  }
}

const STORAGE_KEY = "spiderman_portfolio_ddevguru_notes_v1";

/**
 * Real-time subscription to Sticky Notes via Firestore onSnapshot
 * @param {Function} onNotesReceived - Callback when fresh data arrives
 * @param {Function} onError - Callback on sync error
 * @returns {Function} Unsubscribe cleanup function
 */
export function subscribeToStickyNotes(onNotesReceived, onError) {
  // If Firebase is not yet initialized, use localStorage fallback
  if (!db) {
    const local = getLocalFallbackNotes();
    onNotesReceived(local);
    const handleStorage = () => {
      onNotesReceived(getLocalFallbackNotes());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }

  try {
    const notesRef = collection(db, "sticky_notes");
    const q = query(notesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notes = [];
        snapshot.forEach((docSnap) => {
          notes.push({ id: docSnap.id, ...docSnap.data() });
        });
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch (e) {}
        onNotesReceived(notes);
      },
      (err) => {
        console.warn("Firestore onSnapshot error:", err.message);
        if (typeof onError === "function") onError(err);
        onNotesReceived(getLocalFallbackNotes());
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn("Subscribe error:", err.message);
    onNotesReceived(getLocalFallbackNotes());
    return () => {};
  }
}

/**
 * Create a new Sticky Note in Firestore
 * @param {Object} newNote
 * @returns {Promise<boolean>}
 */
export async function createCloudStickyNote(newNote) {
  saveNoteLocally(newNote);

  if (!db) {
    return true;
  }

  try {
    const noteRef = doc(db, "sticky_notes", newNote.id);
    await setDoc(noteRef, {
      ...newNote,
      createdAt: typeof newNote.createdAt === "number" ? newNote.createdAt : Date.now(),
      reactions: newNote.reactions || { love: 0, zap: 0, fire: 0, web: 0 },
    });
    return true;
  } catch (err) {
    console.error("Error creating note in Firestore:", err);
    return false;
  }
}

/**
 * Delete a note from Firestore
 * @param {string} noteId
 */
export async function deleteCloudStickyNote(noteId) {
  removeNoteLocally(noteId);

  if (!db) return;

  try {
    const noteRef = doc(db, "sticky_notes", noteId);
    await deleteDoc(noteRef);
  } catch (err) {
    console.warn("Error deleting note from Firestore:", err.message);
  }
}

/**
 * Increment or decrement a reaction counter in Firestore
 * @param {string} noteId
 * @param {string} reactionKey ('love' | 'zap' | 'fire' | 'web')
 * @param {boolean} isAdding
 */
export async function updateCloudReaction(noteId, reactionKey, isAdding = true) {
  if (!db) return;

  try {
    const noteRef = doc(db, "sticky_notes", noteId);
    await updateDoc(noteRef, {
      [`reactions.${reactionKey}`]: increment(isAdding ? 1 : -1),
    });
  } catch (err) {
    console.warn("Reaction update error in Firestore:", err.message);
  }
}

/**
 * Fetch all notes (one-time fetch)
 */
export async function fetchGlobalCloudNotes() {
  return getLocalFallbackNotes();
}

function getLocalFallbackNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveNoteLocally(note) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    const filtered = parsed.filter((n) => n.id !== note.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note, ...filtered]));
  } catch (e) {
    console.warn("Local storage error:", e);
  }
}

function removeNoteLocally(noteId) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    const filtered = parsed.filter((n) => n.id !== noteId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.warn("Local storage error:", e);
  }
}
