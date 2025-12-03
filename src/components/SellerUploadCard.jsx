// src/components/SellerUploadCard.jsx
import React, { useState } from "react";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import LocationPicker from "../components/LocationPicker";

/**
 * Props: none
 * Uses Tailwind for styling. Responsive card suitable for dashboard.
 */

export default function SellerUploadCard({ sellerId }) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [location, setLocation] = useState("");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const submit = async (e) => {
        e.preventDefault();
        if (!title || !price || !file) return alert("Title, price and image required.");
        setUploading(true);
        try {
            const fileRef = ref(storage, `meals/${Date.now()}_${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on("state_changed", (snap) => {
                setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
            }, (err) => {
                throw err;
            }, async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                await addDoc(collection(db, "meals"), {
                    title,
                    description: desc,
                    price: Number(price),
                    category,
                    image: url,
                    sellerId,
                    location,
                    createdAt: serverTimestamp(),
                    keywords: generateKeywords(title, desc, category)
                });
                setTitle(""); setDesc(""); setPrice(""); setCategory(""); setFile(null); setLocation("");
                setProgress(0);
                alert("Meal published");
            });
        } catch (err) {
            alert(err.message);
        } finally {
            setUploading(false);
        }
    };

    // simple keyword generator for search
    function generateKeywords(...parts) {
        const text = parts.join(" ").toLowerCase();
        const words = new Set(text.split(/\W+/).filter(Boolean));
        return Array.from(words).slice(0, 20);
    }

    return (
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Add a Meal</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Meal title" className="border rounded px-3 py-2" />
                <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price (NGN)" type="number" className="border rounded px-3 py-2" />
            </div>

            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Short description" className="w-full border rounded px-3 py-2 mt-3" rows={3} />

            <div className="flex gap-3 mt-3 items-center">
                <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category (e.g., Jollof)" className="flex-1 border rounded px-3 py-2" />
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="text-sm" />
            </div>

            <input value={<LocationPicker onSelect={(p) => setLocation(`${p.formatted_address} | ${p.lat.toFixed(6)},${p.lng.toFixed(6)}`)} />
            } onChange={e => setLocation(e.target.value)} placeholder="Location / address (optional)" className="w-full border rounded px-3 py-2 mt-3" />


            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">{uploading ? `Uploading... ${progress}%` : "Ready to publish"}</div>
                <button disabled={uploading} className="bg-orange-600 text-white px-4 py-2 rounded">
                    {uploading ? "Uploading..." : "Publish"}
                </button>
            </div>
        </motion.form>
    );
}
