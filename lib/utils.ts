import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// Function to add new user data
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const storeData = async (newData, filename, fs, path) => {

  // Define the file path for the dummy database
  const filePath = path.join(process.cwd(), 'cypress','fixtures','db', `${filename}.json`);
  let data = [];

  // Check if the file exists and is readable
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    try {
      // Parse existing data if the file is not empty
      data = JSON.parse(fileContent);

      // Ensure the parsed data is an array
      if (!Array.isArray(data)) {
        data = [];  // If the parsed data is not an array, reinitialize it as an empty array
      }
    } catch (error) {
      console.error('Error parsing JSON data, initializing as empty array:', error);
      data = []; // Initialize as an empty array if there's a parsing error
    }
  }

  // Append new user data to the array
  data.push(newData);

  // Try writing the updated data back to the file and return success/failure
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); // null, 2 is for pretty formatting
    return { success: true };
  } catch (error) {
    console.error("Error writing to file:", error);
    return { success: false, message: "Failed to store the user data." };
  }
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const storeAndUpdateData = async (newData, filename, fs, path) => {

  // Define the file path for the dummy database
  const filePath = path.join(process.cwd(), 'cypress','fixtures','db', `${filename}.json`);

  // Try writing the updated data back to the file and return success/failure
  try {
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8'); // null, 2 is for pretty formatting
    return { success: true };
  } catch (error) {
    console.error("Error writing to file:", error);
    return { success: false, message: "Failed to store the user data." };
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getData = async (filename, fs, path) => {
  const filePath = path.join(process.cwd(), 'cypress','fixtures','db', `${filename}.json`);
  let data = [];
  // Check if the file exists and is readable
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    try {
      // Parse existing data if the file is not empty
      data = JSON.parse(fileContent);

      /*// Ensure the parsed data is an array
      if (!Array.isArray(data)) {
        data = [];  // If the parsed data is not an array, reinitialize it as an empty array
      }*/
    } catch (error) {
      console.error('Error parsing JSON data, initializing as empty array:', error);
      data = []; // Initialize as an empty array if there's a parsing error
    }
  }

  return data;
}
