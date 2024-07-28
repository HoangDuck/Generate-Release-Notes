const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Get inputs
    const token = core.getInput('token');
    const tag = core.getInput('tag');
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    
    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    // Define the API URL and payload
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
    const payload = {
      tag_name: tag,
      generate_release_notes: true
    };

    // Set up the request headers
    const headers = {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    };

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.message) {
      throw new Error(data.message);
    }
    
    console.log(`Release created with tag: ${tag}`);
    core.setOutput("release", data);

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
