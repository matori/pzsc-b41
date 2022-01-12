const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const yamlDir = './locale';
const destDir = './public/locale';
const dataDir = './src/data';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

const yamlFiles = fs.readdirSync(yamlDir);
const languages = [];

yamlFiles.forEach(file => {
  const extension = path.extname(file);
  const isYaml = /^\.ya?ml$/i.test(extension);
  if (!isYaml) {
    return;
  }
  const targetPath = path.resolve(yamlDir, file);
  const fileName = path.basename(file, extension);

  try {
    const document = yaml.load(fs.readFileSync(targetPath, 'utf8'));
    const languageData = {
      code: document.language_code,
      name: document.language_name,
    };
    languages.push(languageData);
    const data = JSON.stringify(document);
    const outputPath = path.resolve(destDir, `${fileName}.json`);
    fs.writeFileSync(outputPath, data, 'utf8');
    if (fileName === 'en') {
      const dataOutputPath = path.resolve(dataDir, `defaultLanguage.json`);
      fs.writeFileSync(dataOutputPath, data, 'utf8');
    }
  } catch (exception) {
    throw new Error(exception);
  }
});

const sortedLanguagesList = languages.sort((a, b) => a.name.localeCompare(b.name));
const languagesJson = JSON.stringify(sortedLanguagesList);
const languageJsonOutputPath = path.resolve(dataDir, `languages.json`);
fs.writeFileSync(languageJsonOutputPath, languagesJson, 'utf8');

