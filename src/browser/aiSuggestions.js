// Make sure to set your variables in the .env file
const endpoint = `${process.env.OPENAI_ENDPOINT}openai/deployments/${process.env.DEPLOYMENT_NAME}/chat/completions?api-version=2023-10-01-preview`;

async function getFixSuggestions(issue) {
    try {
        console.log('Using endpoint:', endpoint);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.OPENAI_API_KEY
            },
            body: JSON.stringify({
                messages: [
                    { "role": "system", "content": "You are a helpful assistant specialized in web accessibility following WCAG 2.2 guidelines. Provide a solution based on the axe accessibility scan issue and the existing code. Make the solution a code suggestion." },
                    // TODO: Pass in the actual code context here, along with the issue description
                    { "role": "user", "content": issue.description }
                ]
            })
        };

        const response = await fetch(endpoint, requestOptions);
        const data = await response.json();

        const choices = data.choices;
        if (choices && choices.length > 0) {
            console.log(choices[0].message.content.trim());
            return choices[0].message.content.trim();
        } else {
            throw new Error("No completion choices returned.");
        }
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return null;
    }
}

module.exports = { getFixSuggestions };