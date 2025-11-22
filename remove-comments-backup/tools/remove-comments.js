#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const exts = ['.ts', '.tsx', '.js', '.jsx', '.css'];
const backupDir = path.join(root, 'remove-comments-backup');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'remove-comments-backup') continue;
      files.push(...walk(full));
    } else if (exts.includes(path.extname(e.name))) {
      files.push(full);
    }
  }
  return files;
}

function stripCommentsFromCode(source) {
  // Preserve string and template literals by replacing them with placeholders
  const strings = [];
  const stringRegex = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g;
  const protectedSource = source.replace(stringRegex, match => {
    const key = `__STR_${strings.length}__`;
    strings.push(match);
    return key;
  });

  // Remove block comments
  let result = protectedSource.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove single-line comments
  result = result.replace(/\/\/.*$/gm, '');

  // Restore strings
  result = result.replace(/__STR_(\d+)__/g, (_, n) => strings[Number(n)]);
  return result;
}

function stripCommentsFromCSS(source) {
  // Remove /* ... */ comments
  return source.replace(/\/\*[\s\S]*?\*\//g, '');
}

function ensureBackup(files) {
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  for (const f of files) {
    const rel = path.relative(root, f);
    const dest = path.join(backupDir, rel);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(f, dest);
  }
}

function main() {
  console.log('Scanning for files...');
  const files = walk(root);
  if (files.length === 0) {
    console.log('No files found to process.');
    return;
  }

  console.log(`Found ${files.length} files. Backing up originals to ${backupDir}`);
  ensureBackup(files);

  let changedCount = 0;
  for (const f of files) {
    const ext = path.extname(f);
    const src = fs.readFileSync(f, 'utf8');
    let out;
    if (ext === '.css') out = stripCommentsFromCSS(src);
    else out = stripCommentsFromCode(src);
    if (out !== src) {
      fs.writeFileSync(f, out, 'utf8');
      changedCount++;
      process.stdout.write('.');
    }
  }
  console.log('\nDone. Files modified: ' + changedCount);
  console.log('Original files are saved under:', backupDir);
  console.log('If you want to restore, copy files from the backup directory back into the project.');
}

main();
