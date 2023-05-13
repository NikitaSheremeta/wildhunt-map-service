const formidable = require('formidable');
const path = require('path');

const ALLOWED_TYPES = ['jpg', 'jpeg', 'png', 'svg'];
const ONE_B = 1024;
const ONE_MB = ONE_B * ONE_B;

class FileParsingHelper {
  constructor(fieldName = 'file', fileNameRegex = null, mimetypes = ALLOWED_TYPES, maxFileSize = ONE_MB) {
    this.fieldName = fieldName;
    this.fileNameRegex = fileNameRegex;
    this.mimetypes = mimetypes;
    this.maxFileSize = maxFileSize;

    this._form = formidable({});
  }

  set setFieldName(value) {
    if (value) {
      this.fieldName = value;
    }
  }

  set setFileNameRegex(value) {
    if (value) {
      this.fileNameRegex = value;
    }
  }

  set setMimetypes(value) {
    if (value.length) {
      this.mimetypes = value;
    }
  }

  set setMaxFileSize(value) {
    if (value > 0) {
      this.maxFileSize = value;
    }
  }

  _validation(files) {
    if (Object.keys(files).length === 0) {
      return 'Field must not be empty';
    }

    const field = files[this.fieldName];

    if (!field) {
      return `Invalid field name, should be: ${this.fieldName}`;
    }

    if (this.fileNameRegex) {
      const fileName = path.parse(field.originalFilename).name;

      if (!this.fileNameRegex.test(fileName)) {
        return `Invalid file name, should be: ${this.fileNameRegex.source}`;
      }
    }

    const fileType = field.mimetype.split('/').pop();

    if (!this.mimetypes.includes(fileType)) {
      return `Invalid file format allowed: ${this.mimetypes.join(', ')}`;
    }

    if (this.maxFileSize < field.size) {
      return `Invalid file size, allowed: ${this.maxFileSize} bytes`;
    }

    return '';
  }

  file(req, callback) {
    this._form.parse(req, (err, fields, files) => {
      if (err) {
        return callback(new Error(err.message));
      }

      const validation = this._validation(files);

      if (validation) {
        return callback(new Error(validation));
      }

      return callback(null, files[this.fieldName]);
    });
  }
}

module.exports = FileParsingHelper;
