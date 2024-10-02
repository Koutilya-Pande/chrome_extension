const fs = require('fs');
const path = require('path');

const projectStructure = {
  'manifest.json': '{}',
  'popup': {
    'popup.html': '',
    'popup.css': '',
    'popup.jsx': '',
  },
  'background': {
    'background.js': '',
  },
  'content': {
    'content.js': '',
  },
  'lib': {
    'ai-service.js': '',
  },
  'assets': {
    'icon16.png': null,
    'icon48.png': null,
    'icon128.png': null,
  },
  'README.md': '',
};

function createDirectoryStructure(basePath, structure) {
  Object.entries(structure).forEach(([name, content]) => {
    const fullPath = path.join(basePath, name);
    if (content === null || typeof content === 'string') {
      // It's a file
      fs.writeFileSync(fullPath, content || '', 'utf8');
      console.log(`Created file: ${fullPath}`);
    } else {
      // It's a directory
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
      createDirectoryStructure(fullPath, content);
    }
  });
}

const projectName = 'ai-cover-letter-extension';
const projectPath = path.join(process.cwd(), projectName);

fs.mkdirSync(projectPath, { recursive: true });
console.log(`Created project directory: ${projectPath}`);

createDirectoryStructure(projectPath, projectStructure);

console.log('Project structure created successfully!');
