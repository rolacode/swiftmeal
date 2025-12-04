// src/pages/BuyerDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, limit, startAfter, onSnapshot, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SaveButton from "../components/SaveButton";

const PAGE_SIZE = 9;

export default function BuyerDashboard() {
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const mounted = useRef(false);

  const navigate = useNavigate();

  // Initial fetch
  useEffect(() => {
    mounted.current = true;
    const q = query(collection(db, "meals"), orderBy("createdAt", "desc"), limit(PAGE_SIZE));
    const unsub = onSnapshot(q, (snap) => {
      if (!mounted.current) return;
      setMeals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLastDoc(snap.docs[snap.docs.length - 1] || null);
      setLoadingMeals(false);
    });
    return () => { mounted.current = false; unsub(); };
  }, []);

  // Load more (pagination)
  const loadMore = async () => {
    if (!lastDoc) return;
    const q = query(collection(db, "meals"), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(PAGE_SIZE));
    const snap = await getDocs(q);
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setMeals(prev => [...prev, ...docs]);
    setLastDoc(snap.docs[snap.docs.length - 1] || null);
  };

  // Search by keyword
  const doSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setSearching(true);
    try {
      const q = query(
        collection(db, "meals"),
        where("keywords", "array-contains", keyword.toLowerCase()),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const snap = await getDocs(q);
      setMeals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLastDoc(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow cursor-pointer" onClick={() => navigate("/buyer/saved-meals")}>
            Saved Meals
          </div>
          <div className="bg-white p-4 rounded shadow cursor-pointer" onClick={() => navigate("/buyer/orders")}>
            Orders
          </div>
          <div className="bg-white p-4 rounded shadow cursor-pointer" onClick={() => navigate("/buyer/profile")}>
            Profile
          </div>
        </div>

        {/* Meal List Section */}
        <div>
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div>
              <h1 className="text-2xl font-bold">Discover Meals</h1>
              <p className="text-sm text-gray-600">Handpicked dishes near you</p>
            </div>

            <form onSubmit={doSearch} className="flex gap-2 w-full sm:w-auto">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search (e.g. jollof, chicken)"
                className="border rounded px-3 py-2 w-64"
              />
              <button className="bg-white border px-3 py-2 rounded" disabled={searching}>
                {searching ? "Searching..." : "Search"}
              </button>
            </form>
          </header>

          {loadingMeals ? (
            <div className="text-center p-6">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal) => (
                  <motion.article
                    key={meal.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-orange-300 rounded-lg shadow overflow-hidden"
                  >
                    {/* Save heart overlay */}
                    <SaveButton meal={meal} />

                    <img src={meal.image} alt={meal.title} className="h-44 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold">{meal.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{meal.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold">₦{meal.price}</span>
                        <button
                          className="bg-orange-600 text-white px-3 py-1 rounded"
                          onClick={() => navigate("/checkout", { state: { meal } })}
                        >
                          Order
                        </button>
                      </div>
                      {meal.location && <p className="text-xs text-gray-500 mt-2">From: {meal.location}</p>}
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="text-center mt-6">
                {lastDoc ? (
                  <button onClick={loadMore} className="px-4 py-2 bg-white border rounded">
                    Load more
                  </button>
                ) : (
                  <div className="text-sm text-gray-500">No more meals</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
