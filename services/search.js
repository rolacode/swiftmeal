import { db } from "../src/firebase";
import { collection, query, where, limit, startAfter, getDocs } from "firebase/firestore";

export async function searchMeals(keyword, lastMeal) {
  let q = query(
    collection(db, "meals"),
    where("keywords", "array-contains", keyword.toLowerCase()),
    limit(10)
  );

  if (lastMeal) q = query(q, startAfter(lastMeal));

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
