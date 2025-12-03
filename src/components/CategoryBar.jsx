import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Inline SVG for Chevron Down (used for dropdown)
// const ChevronDownIcon = ({ className }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-5 h-5 ml-2 transition-transform ${className}`}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
//     </svg>
// );

// Inline SVG for Search Icon
const SearchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.303-4.303m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

// Inline SVG for Shopping Cart Icon
const ShoppingCartIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.832l.979 4.394c.139.626.65 1.086 1.3 1.086h12.5c.781 0 1.386-.713 1.3-1.428l-.348-2.614A1.218 1.218 0 0 0 19.103 5H5.83a2.25 2.25 0 0 1-2.244-2.077L2.25 3Zm1.408 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM18.75 16.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
    </svg>
);

const categories = [
    "Fresh Food",
    "Cooked Food",
    "Fruits",
    "Snacks",
    "Vegetables",
    "Meat & Seafood",
    "Beverages",
    "Grains & Tubers",
];

// The modified CategoryBar component
export function CategoryBar({ onLeave }) {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false); // State for toggling search input

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(`Searching for: ${e.target.value} in ${selectedCategory}`);
    };

    // Toggle search visibility
    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
        if (isSearchActive) {
            setSearchTerm(''); // Clear search term when hiding
        }
    };

    return (
        <div className="onMouseLeave={onLeave} bg-white sticky top-0 z-10 py-3 shadow-md border-b border-orange-100">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

                {/* 1. Category Dropdown (Left Side) - Styled as simple text */}
                <div className="relative md:w-auto">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        // Styled to look like text: removed border, background, and minimal padding.
                        className="flex items-center w-full md:w-auto px-1 py-1 text-orange-600 font-semibold hover:text-orange-700 transition-colors focus:outline-none"
                    >
                        <span className="truncate">{selectedCategory}</span>
                        {/* Chevron Icon - Flips based on isDropdownOpen, always Orange */}
                        {/* <ChevronDownIcon
                            className={`${isDropdownOpen ? 'rotate-180' : 'rotate-0'} w-5 h-5 ml-2 text-orange-600`}
                        /> */}
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-full md:min-w-[200px] bg-white border border-orange-200 rounded-lg shadow-xl z-20 overflow-hidden">
                            {categories.map((category) => (
                                <div
                                    key={category}
                                    onClick={() => handleCategorySelect(category)}
                                    className={`px-4 py-2 text-sm text-gray-700 cursor-pointer transition-colors 
                                        ${selectedCategory === category
                                            ? 'bg-orange-100 font-semibold text-orange-700'
                                            : 'hover:bg-orange-50 hover:text-orange-600'
                                        }`}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. Search Input (Conditional Visibility - Center/Expands) */}
                {isSearchActive && (
                    <div className="grow mx-4 max-w-lg">
                        <input
                            type="text"
                            placeholder={`Search ${selectedCategory.toLowerCase() === 'all categories' ? 'all items' : selectedCategory}...`}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                        />
                    </div>
                )}

                {/* 3. Right-Hand Icons (Far Right and close together - space-x-4) */}
                <div className="flex items-center space-x-4">

                    {/* Search Icon (Toggles Input) */}
                    <button
                        onClick={toggleSearch}
                        className={`p-2 transition-all rounded-full ${isSearchActive ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:text-orange-500'}`}
                        aria-label="Toggle Search"
                    >
                        <SearchIcon className="w-6 h-6" />
                    </button>

                    {/* Cart Icon */}
                    <Link to="/cart" className="text-lg font-bold">
                        <ShoppingCartIcon className="w-6 h-6" />
                    </Link>

                </div>

            </div>
        </div>
    );
};
