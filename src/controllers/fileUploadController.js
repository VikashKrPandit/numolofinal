const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);

const listFiles = async (storageDirectory) => {
  const files = await readdir(storageDirectory);
  return files;
};

const downloadFile = (fileName, storageDirectory) => {
  const file = validateFileName(fileName, storageDirectory);
  // Check if the file exists
  if (!fs.existsSync(file)) {
    throw new Error('File not found');
  }
  return fs.createReadStream(file);
};

const updateFiles = async (directory) => {
  try {
    const files = await fs.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        await fs.rmdir(filePath, { recursive: true });
      } else {
        await fs.unlink(filePath);
      }
    }
    return { success: true, message: 'Files updated successfully' };
  } catch (error) {
    throw new Error('Failed to update files');
  }
};

const deleteFile = async (fileName, storageDirectory, data) => {
  const filePath = path.join(storageDirectory, fileName);
  data && await updateFiles(data.dir);
  try {
    await unlink(filePath);
    return { success: true, message: 'File deleted successfully' };
  } catch (error) {
    console.log('🚀 ~ error:', error);
    throw new Error('Failed to delete file ');
  }
};




const validateFileName = (fileName, storageDirectory) => {
  const resolved = path.resolve(storageDirectory, fileName);
  if (resolved.startsWith(storageDirectory)) return resolved;
  throw new Error(`Invalid file name: ${fileName}`);
};

module.exports = { upload, listFiles, downloadFile, deleteFile };
