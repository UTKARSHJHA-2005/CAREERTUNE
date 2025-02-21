// This is page where the user can become a adviser.
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation
import { ToastContainer, toast } from "react-toastify"; // Notifications
import supabase from "../utils/supabase2"; // Supabase
import { useUser } from "@clerk/clerk-react"; // Clerk Auth

export default function ContactForm() {
    const { user } = useUser(); // User from Clerk
    const userId = user?.id; // User ID
    const navigate = useNavigate();
    // Form data
    const [formData, setFormData] = useState({
        Name: "",
        Phone: "",
        Email: "",
        About: "",
        Location: "",
        Company: "",
        Posts: "",
        Help: "",
    });

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if user ID is available
        if (!userId) {
            toast.error("User ID is missing. Please log in again.");
            return;
        }
        // Inserting data in Advisers table.
        try {
            const { error: insertError } = await supabase.from("Advisers").insert([
                {
                    Name: formData.Name,
                    Location: formData.Location,
                    About: formData.About,
                    Phone: formData.Phone ? parseInt(formData.Phone, 10) : null, 
                    Email: formData.Email,
                    Posts: formData.Posts,
                    Thought: formData.Help,
                    Company: formData.Company,
                },
            ]);
            // Error handling in addition
            if (insertError) {
                toast.error("Failed to add. Try again later.");
                console.log(insertError);
            // Success message
            } else {
                toast.success("Congratulations on becoming an Adviser!");
                navigate("/career-advice");
            }
        // Error handling
        } catch (error) {
            toast.warn("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">Become an Adviser</h2>
            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} className="p-2 border rounded w-full" required />
                <input type="tel" name="Phone" placeholder="Phone" value={formData.Phone} onChange={handleChange} className="p-2 border rounded w-full" required />
                <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} className="p-2 border rounded w-full" required />
                <textarea name="About" placeholder="About" value={formData.About} onChange={handleChange} className="p-2 border rounded w-full" />
                <input type="text" name="Location" placeholder="Location" value={formData.Location} onChange={handleChange} className="p-2 border rounded w-full" />
                <input type="text" name="Company" placeholder="Company" value={formData.Company} onChange={handleChange} className="p-2 border rounded w-full" />
                <textarea name="Posts" placeholder="Posts" value={formData.Posts} onChange={handleChange} className="p-2 border rounded w-full" />
                <textarea name="Help" placeholder="How will I help you?" value={formData.Help} onChange={handleChange} className="p-2 border rounded w-full" required />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
}
