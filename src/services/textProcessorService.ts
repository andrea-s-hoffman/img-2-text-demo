/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = "img-to-text-demo";
const location = "us"; // Format is 'us' or 'eu'
const processorId = "f5aa97f40b9ed729"; // Create processor in Cloud Console
// const filePath = '/path/to/local/pdf';

import { DocumentProcessorServiceClient } from "@google-cloud/documentai";

// Instantiates a client
const client = new DocumentProcessorServiceClient();

async function processDocument(imageFile: File): Promise<void> {
  // The full resource name of the processor, e.g.:
  // projects/project-id/locations/location/processor/processor-id
  // You must create new processors in the Cloud Console first
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  // Read the file into memory.
  const fs = require("fs").promises;
  const readImg = await fs.readFile(imageFile);

  // Convert the image data to a Buffer and base64 encode it.
  const encodedImage = Buffer.from(readImg).toString("base64");

  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType: "application/pdf",
    },
  };

  // Recognizes text entities in the PDF document
  const [result] = await client.processDocument(request);
  const { document } = result;

  // Get all of the document text as one big string
  const { text } = document as any;

  // Extract shards from the text field
  const getText = (textAnchor: { textSegments: string | any[] }) => {
    if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
      return "";
    }

    // First shard in document doesn't have startIndex property
    const startIndex = textAnchor.textSegments[0].startIndex || 0;
    const endIndex = textAnchor.textSegments[0].endIndex;

    return text.substring(startIndex, endIndex);
  };

  // Read the text recognition output from the processor
  console.log("The document contains the following paragraphs:");
  const [page1] = document?.pages as any;
  const { paragraphs } = page1;

  for (const paragraph of paragraphs) {
    const paragraphText = getText(paragraph.layout.textAnchor);
    console.log(`Paragraph text:\n${paragraphText}`);
  }

  // Form parsing provides additional output about
  // form-formatted PDFs. You  must create a form
  // processor in the Cloud Console to see full field details.
  console.log("\nThe following form key/value pairs were detected:");

  const { formFields } = page1;
  for (const field of formFields) {
    const fieldName = getText(field.fieldName.textAnchor);
    const fieldValue = getText(field.fieldValue.textAnchor);

    console.log("Extracted key value pair:");
    console.log(`\t(${fieldName}, ${fieldValue})`);
  }
}

export default processDocument;
