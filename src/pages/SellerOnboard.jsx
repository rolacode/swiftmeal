import React, { useState } from "react";
import { storage, db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function SellerOnboarding() {
  const [meal, setMeal] = useState({
    name: "",
    description: "",
    price: "",
    ingredients: "",
    category: "",
    location: "",
    featured: false,
    cryptoEnabled: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMeal(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Upload an image");

    setLoading(true);
    try {
      // Upload image
      const storageRef = ref(storage, `meals/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on("state_changed", null, console.error, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Save meal in Firestore
        await addDoc(collection(db, "meals"), {
          ...meal,
          price: Number(meal.price),
          imageUrl: downloadURL,
          sellerId: "SELLER_UID", // replace with auth.user.uid
          sales: 0,
          createdAt: serverTimestamp(),
        });

        alert("Meal added successfully!");
        setMeal({
          name: "",
          description: "",
          price: "",
          ingredients: "",
          category: "",
          location: "",
          featured: false,
          cryptoEnabled: false,
        });
        setImageFile(null);
      });
    } catch (err) {
      console.error(err);
      alert("Error uploading meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add a New Meal</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="name" value={meal.name} onChange={handleChange} placeholder="Meal Name" className="w-full p-2 border rounded"/>
        <textarea name="description" value={meal.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded"/>
        <input name="price" type="number" value={meal.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded"/>
        <input name="ingredients" value={meal.ingredients} onChange={handleChange} placeholder="Ingredients" className="w-full p-2 border rounded"/>
        <input name="category" value={meal.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded"/>
        <input name="location" value={meal.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded"/>
        <div className="flex gap-4 items-center">
          <label>
            <input type="checkbox" name="featured" checked={meal.featured} onChange={handleChange}/> Featured
          </label>
          <label>
            <input type="checkbox" name="cryptoEnabled" checked={meal.cryptoEnabled} onChange={handleChange}/> Crypto Accepted
          </label>
        </div>
        <input type="file" onChange={handleImage}/>
        <button type="submit" disabled={loading} className="bg-orange-500 text-white px-4 py-2 rounded">
          {loading ? "Uploading..." : "Add Meal"}
        </button>
      </form>
    </div>
  );
}
