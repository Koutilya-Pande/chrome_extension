import axios from 'axios';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from .env file
dotenv.config();

// Define constants
const API_KEY = process.env.API_KEY; // Use environment variable for API key
const API_URL_OPENAI = 'https://api.openai.com/v1/chat/completions'; // OpenAI API endpoint for chat completions
const GPT_MODEL = 'gpt-4o-mini'; // Specify the GPT-4.0 Mini model

// Embed your resume content here as a string
const resumeContent = `
Name : KOUTILYA PANDE
Address : New Brunswick, NJ | Contact no: +1 (929) 3785340 | Email ID: koutilyapande26@gmail.com | LinkedIn: https://www.linkedin.com/in/koutilya-pande

EDUCATION:
RUTGERS, THE STATE UNIVERSITY OF NEW JERSEY
Sept'22-Dec'23
Master of Information Technology and Analytics, Major: Data Science

SHRI GOVINDRAM SEKSARIA INSTITUTE OF TECHNOLOGY AND SCIENCE, INDIA
Aug'18-May'22
Bachelor of Technology (B. Tech): Electronics and Telecommunication Engineering

SKILLS:
Languages: C, C++, R, Python (Pandas, NumPy, Matplotlib, TensorFlow, Scikit Learn, Keras), SQL
Functional: Predictive Modelling, Statistical Analysis, Data Visualization, NLP, Gen AI, Langchain, RAG
Database: MS SQL, My SQL, Snowflake, MongoDB
Tools and Platforms: MS Excel, Jupyter Notebook, AWS, GitHub, Tableau, R Studio, PowerBI, APIs, Streamlit, LLMs

EXPERIENCE:
Keelworks Foundation
Data Scientist
Oak Harbor, USA | Mar'24 - Present
- Optimized homepage layout by A/B testing comparing two versions, resulting in a 28% increase in CTR
- Utilized Power BI to transform and merge data, enhancing suitability for analysis in Excel, stream insights generation
- Created mockups of dashboards and data visualizations in MS Excel, refining design concepts and ensuring alignment with project objective
- Presented monthly performance reports to stakeholders using Power BI and Excel, highlighting insights on user behavior that led to a revamp of the homepage layout, improving navigation efficiency by 20%

Korangle
Data Scientist
Indore, India | Dec'21 - Jul'22
- Automated data sampling using Python, reducing processing time by 40% while conducting rigorous statistical analyses on 50,000+ entries for data validation, ensuring data integrity for product development and marketing strategies
- Developed a customer segmentation model using K-Means clustering to find new set of customers
- Assisted with customer journey mapping, Led a Random Forest customer satisfaction model from scratch, synthesizing data from customer(School Directors) surveys, resulting in 12% fewer customer complaints
- Proposed a Tableau tool that prioritized and generated lists of customers with potential pricing improvement allowing the team to contract changes and re-negotiations, build dynamic price models to maximize profits
- Analyzed competitive market data and customer queries, uncovering insights that led to a new feature 'Teacher Rating' for the application, increasing market penetration by 17%

Udemy
Data Scientist (Intern)
Indore, India | May'21 - July'21
- Designed queries, stored procedures, triggers, cursors, tables, and views in SQL Server to provide structured data to generate comprehensive analytical reports
- Optimized ETL by leveraging SQL and Python, 18% reduction in data preparation time, saving 8hr/week for analytic team
- Devised classification models(Logistic Regression, Decision Tree, Random Forest)to predict loan approval outcomes
- Successfully addressed class imbalance in loan approval prediction model by conducting extensive model evaluation (precision, recall, F1 score, AUC-ROC)and fine-tuning to achieve accuracy of 84.06%

PROJECTS:
PDF ChatGenie | GitHub
- Developed a multi-PDF chatbot application using Streamlit and Python, implementing Retrieval-Augmented Generation (RAG) with OpenAI's embedding models for text extraction and vector storage.
- Integrated a conversation chain feature with LangChain, enabling context-aware responses and enhancing user interaction through RAG techniques.

BCG Data Science Job Simulation: Forage | GitHub
- Completed a customer churn analysis simulation on SME customers for PowerCo.
- Engineered and optimized a random forest model, achieving an 85% accuracy rate in predicting customer churn, delivered executive summary to Associate Director

Dodging The Mishap - Pandemic Predictor Web Application | GitHub
- Designed a Django web application powered by an LSTM machine learning model, performed time series analysis on stock prices based on real time financial data from YFinance
- Provided data driven insights (risk vs profit) from COVID-19 stock prices and real-time visualization of predictions through interactive charts and graphs using Plotly and Matplotlib

MoodSync: Speech-Driven Spotify Song Recommendations
- Developed a Recommendation System deploying a Convolutional Neural Network (Multi-Layer Perceptron Classifier) to recognize emotions and recommended Spotify playlists based on identified emotions
- Explored effect of different parameters such as model dimension and number of epochs on classification accuracy through experimentation and came up with an optimal accuracy up to 72%
`;
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
export async function generateCoverLetter(jobDescription) {
    try {
        // Set headers for the axios request
        const config = {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        };

        // Create the message object to send to the API
        const userMessage = {
            role: 'user',
            content: `Write a cover letter for the following job description:\n\n${jobDescription}\n\nUsing the following resume as reference:\n\n${resumeContent}\n\nCover Letter. The cover should follow the below format ${clf}. Whatever you are generating in told put it in between **text**.`,
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
        return null; // Return null if an error occurs
    }
}