import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function SavedMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setMeals([]);
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, "savedMeals"), where("buyerId", "==", user.uid));
        const snap = await getDocs(q);
        setMeals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubAuth();
  }, []);

  if (loading) return <div className="p-6">Loading saved meals...</div>;
  if (!meals.length) return <div className="p-6">No saved meals yet.</div>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.map((m) => {
        const meal = m.mealSnapshot || {};
        return (
          <div key={m.id} className="bg-white p-4 rounded shadow">
            <img src={meal.image} alt={meal.title} className="h-40 w-full object-cover rounded" />
            <h3 className="mt-2 font-semibold">{meal.title}</h3>
            <p className="text-gray-500 mt-1">₦{meal.price}</p>
          </div>
        );
      })}
    </div>
  );
}
