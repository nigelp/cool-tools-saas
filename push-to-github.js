import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN'; // Replace with your actual token
const REPO_NAME = 'cool-tools-saas';
const GITHUB_USERNAME = 'nigelp';

const apiClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

async function createRepo() {
  try {
    await apiClient.post('/user/repos', {
      name: REPO_NAME,
      private: false,
      auto_init: true,
    });
    console.log(`Repository ${REPO_NAME} created successfully.`);
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log(`Repository ${REPO_NAME} already exists.`);
    } else {
      throw error;
    }
  }
}

async function uploadFile(filePath, content) {
  const relativePath = path.relative('/home/project', filePath);
  try {
    const response = await apiClient.put(`/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${relativePath}`, {
      message: `Add ${relativePath}`,
      content: Buffer.from(content).toString('base64'),
    });
    console.log(`Uploaded ${relativePath}`);
    return response.data.content.sha;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log(`File ${relativePath} already exists. Updating...`);
      const existingFile = await apiClient.get(`/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${relativePath}`);
      const response = await apiClient.put(`/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${relativePath}`, {
        message: `Update ${relativePath}`,
        content: Buffer.from(content).toString('base64'),
        sha: existingFile.data.sha,
      });
      console.log(`Updated ${relativePath}`);
      return response.data.content.sha;
    } else {
      throw error;
    }
  }
}

async function uploadDirectory(dirPath) {
  const files = await fs.readdir(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await uploadDirectory(filePath);
    } else {
      const content = await fs.readFile(filePath, 'utf8');
      await uploadFile(filePath, content);
    }
  }
}

async function main() {
  try {
    await createRepo();
    await uploadDirectory('/home/project');
    console.log('All files uploaded successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
