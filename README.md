# Image to Text Demo

## 1. Set up Hosting in Frontend: `firebase init`

## 2. Set up Authentication

## 3. Set up Cloud Storage

## 4. Install Extension: [Extract Image Text with Cloud Vision AI](https://extensions.dev/extensions/googlecloud/storage-extract-image-text)

## 5. Enable Firestore and ensure there is a collection named `extractedText`.

- Delete the auto-generated document in this collection.
- Modify Rules in console:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

See Live Demo at https://img-to-text-demo.web.app/
