// API for getting the data from Supabase
import supabaseclient, { supabaseUrl } from './supabase';

// Fetching data from Jobs Table in Supabase.
export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseclient(token);
    let query = supabase.from('Jobs').select('*'); // Fetching the data from Jobs Table
    if (location) query = query.eq('location', location);
    if (company_id) query = query.eq('company_id', company_id);
    if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);
    const { data, error } = await query;
    // Handles error
    if (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
    console.log("Fetched Jobs Data:", data);
    return data;
}

// Getting a single data from Jobs Table in Supabase.
export async function getaJob({ job_id }) {
    console.log("API Call: Fetching job with ID:", job_id);
    // If no job id
    if (!job_id) {
        console.error("Error: job_id is missing.");
        return null;
    }
    const supabase = await supabaseclient(); // Ensure Supabase client is initialized
    // Fetching the single data from Jobs and Applications(Foreign Key)
    const { data, error } = await supabase
        .from('Jobs')
        .select(`*,Applications:Applications(*)`) 
        .eq('id', job_id)
        .maybeSingle();
    if (error) {
        console.error("Supabase Error:", error);
        return null;
    }
    console.log("API Response:", data); // Debug log
    return data;
}

// Insertion in Applications Table for applying job.
export async function ApplyJob(supabaseToken, jobData) {
    try {
        // Posting data to Applications Table
        const response = await fetch("https://xyz.supabase.co/rest/v1/Applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${supabaseToken}`,
                "apikey": supabaseToken,
            },
            body: JSON.stringify(jobData),
        });
        // Handles response Error
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to apply to job: ${errorText}`);
        }
        return await response.json();
        // Handles applying error
    } catch (error) {
        console.error("ApplyJob - Fetch Error:", error);
        throw new Error(`Failed to apply to job: ${error.message}`);
    }
}

// Getting Saved Jobs
export async function SavedJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseclient(token);
    let query = supabase.from('Saved Jobs').select('*'); // Fetching the data from Saved Jobs table 
    if (location) query = query.eq('location', location);
    if (company_id) query = query.eq('company_id', company_id);
    if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);
    const { data, error } = await query;
    if (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
    console.log("Fetched Jobs Data:", data);
    return data;
}

// Getting Applications
export async function Applications(token) {
    try {
        const supabase = await supabaseclient(token);
        let query = supabase.from("Applications").select("*"); // Fetching the data from Applications Table
        const { data, error } = await query;
        if (error) {
            throw new Error(error.message);
        }
        console.log("Fetched Job Applications:", data);
        return data;
    } catch (error) {
        console.error("Error fetching Applications:", error.message);
        return [];
    }
}

// Getting a single application
export async function getaApplication(job_id) {
    console.log("Fetching Application for job_id:", job_id);
    // If no job id found
    if (!job_id) {
        console.error("Error: job_id is missing.");
        return null;
    }
    const supabase = await supabaseclient(); // Initializing the supabase
    // Fetching the data from Applucations table and Jobs(foreign Key) 
    const { data, error } = await supabase
        .from("Applications")
        .select("*, Jobs(*)")
        .single();
    // Handles error
    if (error) {
        console.error("Supabase Error:", error);
        return null;
    }
    console.log("Fetched Application Data:", data);
    return data;
}

// Get a single adviser informatipon
export async function getAdviserById(id) {
    console.log("Fetching adviser with ID:", id); 
    // Invalid ID
    if (!id || isNaN(id)) {
        console.error("Error: Invalid adviser ID provided.");
        return null;
    }
    const supabase = await supabaseclient(); // Initializing the supabase client
    // Fetching the single data from Advisers table
    const { data, error } = await supabase
        .from("Advisers")
        .select("*")
        .eq("id", Number(id)) // Convert to number
        .single();
    // Handles error
    if (error) {
        console.error("Supabase Error:", error);
        return null;
    }
    console.log("Fetched Adviser Data:", data);
    return data;
}
