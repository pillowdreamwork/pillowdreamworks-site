const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

function getAllTsxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip node_modules and .next etc.
      if (['node_modules', '.next', '.git', 'public', 'out'].includes(entry.name)) continue;
      files.push(...getAllTsxFiles(fullPath));
    } else if (entry.isFile() && fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function ensureImport(content) {
  const importLine = "import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';";
  if (content.includes('LiquidGlassButton')) return content; // already imported somewhere
  // Find first import statement position
  const importMatch = content.match(/import[^;]+;\s*/g);
  if (importMatch && importMatch.length > 0) {
    const lastImport = importMatch[importMatch.length - 1];
    const insertPos = content.indexOf(lastImport) + lastImport.length;
    return content.slice(0, insertPos) + '\n' + importLine + content.slice(insertPos);
  }
  // fallback: prepend at top
  return importLine + '\n' + content;
}

function replaceButtonsInFile(file) {
  let source = fs.readFileSync(file, 'utf8');
  // Replace opening <button ...> with <LiquidGlassButton ...>
  source = source.replace(/<button(\s[^>]*)>/g, '<LiquidGlassButton$1>');
  // Replace closing </button> with </LiquidGlassButton>
  source = source.replace(/<\/button>/g, '</LiquidGlassButton>');
  source = ensureImport(source);
  fs.writeFileSync(file, source, 'utf8');
  console.log(`Processed ${file}`);
}

const files = getAllTsxFiles(projectRoot);
files.forEach(replaceButtonsInFile);
console.log('All button tags replaced with LiquidGlassButton.');
