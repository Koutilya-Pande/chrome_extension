import json
from scrapegraphai.graphs import SmartScraperGraph

# Define the configuration for the scraping pipeline
graph_config = {
    "llm": {
        "api_key": "sk-Do7ilFLrsfTSAdVhkt4116oYbSr46TwoUag7ktBJwNT3BlbkFJErHaIFzyoMQF2NWTqrfnylLAmvXLr9lbW6PRMUsAEA",  # Replace with your actual OpenAI API key
        "model": "openai/gpt-4o-mini",
    },
    "verbose": True,
    "headless": False,
}

def scrape_company_info(current_url):
    try:
        # Create the SmartScraperGraph instance with the current URL
        smart_scraper_graph = SmartScraperGraph(
            prompt="Analyze the webpage and extract all the neceasaary job requirements for a cover letter. Extract information like summary, job descrition, requirements, minimun qualifitions and section when accordingly. Dont summarize the points, extract as it is. Organize the extracted information clearly under the headings, separating each section. Basically all the information needed to generate the cover letter.",
            source=current_url,  # Use the current URL passed to the function
            config=graph_config
        )

        # Run the pipeline
        result = smart_scraper_graph.run()
        return result  # Return the result for further processing if needed
    except Exception as error:
        print('Error during scraping:', error)
        return None  # Return None if an error occurs

