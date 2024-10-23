import axios from 'axios';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from .env file
dotenv.config();

// Define constants
const API_KEY = process.env.OPENAI_API_KEY; // Use environment variable for API key
const API_URL_OPENAI = process.env.OPENAI_API_URL; // Use environment variable for API URL
const GPT_MODEL = process.env.GPT_MODEL; // Use environment variable for GPT model


const clf = `
[Name extracted from the given resume(in bold)]
[Address from Resume]  
[Contact number from Resume] 
[Email ID from Resume]  


[Recipient's Name (if known)]  
[Company's Name]  
[Company's Address isf available]  

Dear Hiring Manager,

Introduction Paragraph: 
Specify the job title
Mention where you found the listing
Express enthusiasm for the role and company
Mention referral (if applicable)

Body Paragraph(s):
Highlight relevant skills
Describe work experience
Outline quantifiable achievements
Align qualifications with job requirements

Points Section : [Not in bold letter]Include 3 notable achievement/skills that outcasts other candidates, choose those bullet points with respect to the job role and requirements. Make the points consice and clear. You can make points from experience and project section both.  

Closing Paragraph:
Emphasize potential contributions
Thank the hiring manager
Include a call to action for an interview
7. Professional Sign-off
Closing (e.g., "Sincerely," "Best," "Thank you," "Respectfully,")
Your typed name or electronic signature
8. Formatting Guidelines
One page length (250-400 words)



Warm regards,  
[Name information mentioned in Resume Text]  
[LinkedIn linked extracted from Resume Text] (if applicable)
`;

// Function to generate a cover letter using the GPT-4.0 Mini model
export async function generateCoverLetter(jobDescription, resumeContent) {
    try {
        // Set headers for the axios request
        const config = {
            headers: {
                'Authorization': `Bearer ${API_KEY}`, // Remove quotes and semicolon
                'Content-Type': 'application/json',
            },
        };

        // Create the message object to send to the API
        const userMessage = {
            role: 'user',
            content: `Write a cover letter for the following job description:\n\n${jobDescription}\n\nUsing the following resume as reference:\n\n${JSON.stringify(resumeContent)}\n\nCover Letter. The cover should follow the below format ${clf}. Whatever you are generating in bold put it in between **text**.`,
        };

        // Define the data to send in the request body
        const chatGPTData = {
            model: GPT_MODEL,
            messages: [userMessage], // Send the user message as part of the conversation
        };

        // Send a POST request to the OpenAI API
        const response = await axios.post(API_URL_OPENAI, chatGPTData, config);

        // Extract the message content from the API response
        const message = response?.data?.choices[0]?.message.content; // Get the generated cover letter

        // Return the message content
        return message;
    } catch (error) {
        console.error('Error with OpenAI API:', error); // Log error message
        throw error; // Re-throw the error to be handled by the caller
    }
}