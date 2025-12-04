import React, { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function SaveButton({ meal }) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uid, setUid] = useState(null);

  // Track current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUid(user?.uid || null);
    });
    return unsubscribe;
  }, []);

  // Check initial saved state
  useEffect(() => {
    let mounted = true;
    const checkSaved = async () => {
      if (!uid || !meal?.id) return setSaved(false);
      const docRef = doc(db, "savedMeals", `${uid}_${meal.id}`);
      try {
        const snap = await getDoc(docRef);
        if (!mounted) return;
        setSaved(snap.exists());
      } catch (err) {
        console.error("SaveButton check error:", err);
      }
    };
    checkSaved();
    return () => { mounted = false; };
  }, [uid, meal?.id]);

  const handleToggle = async (e) => {
    e?.stopPropagation?.();
    if (!uid) {
      alert("Please sign in to save meals.");
      return;
    }
    setBusy(true);
    const docRef = doc(db, "savedMeals", `${uid}_${meal.id}`);
    try {
      if (!saved) {
        await setDoc(docRef, {
          buyerId: uid,
          mealId: meal.id,
          createdAt: Date.now(),
          mealSnapshot: {
            title: meal.title,
            image: meal.image,
            price: meal.price,
            sellerId: meal.sellerId,
          },
        });
        setSaved(true);
      } else {
        await deleteDoc(docRef);
        setSaved(false);
      }
    } catch (err) {
      console.error("Save toggle error:", err);
      alert("Failed to update saved meals.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={saved}
      title={saved ? "Remove from saved" : "Save meal"}
      className="absolute right-2 top-2 p-1 rounded-full backdrop-blur-sm hover:scale-105 transition-transform"
      disabled={busy}
      style={{ zIndex: 5 }}
    >
      {saved ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white stroke-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.8 7.3a5.5 5.5 0 0 0-8-0L12 7.9l-.8-.6a5.5 5.5 0 0 0-8 8l8 7.2 8-7.2a5.5 5.5 0 0 0 .6-7.2z" />
        </svg>
      )}
    </button>
  );
}
