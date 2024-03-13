# wsd-test

This script is designed to generate a training dataset in Vicuna format for a chatbot that categorizes financial products based on their features. Before running the script, ensure you have Node.js installed on your system along with the required dependencies specified in the package.json file.

### To run the script:
1. Clone this repository or download the script files (generate_dataset.js, package.json) to local machine.
2. Install dependencies by running 'npm install'.
3. Execute the script by running 'node generate_dataset.js'.

### Approach

1. Reading Input Data: The script reads trade-specific information from a JSON file and product categorization from an Excel spreadsheet using the 'fs' and 'xlsx' modules respectively.

2. Creating Product Category Map: It creates a map of product codes to categories from the Excel data.

3. Deriving Category for Uncategorized Products: A function deriveCategory is implemented to derive category for products without a specified category. In this example, a default category 'Others' is returned.

4. Generating Product Name Dynamically: A function generateProductName is implemented to generate product names based on certain features of the products.

5. Generating Dataset in Vicuna format: The script iterates over the trade data, generates product features and names dynamically, assigns categories based on the product code map, and constructs dialogue pairs for the Vicuna dataset.

6. Adding Follow-up Questions: Follow-up questions are added for cases where the product information is incomplete.

7. Writing Dataset to File: Finally, the generated Vicuna format dataset is written to a JSON file.

8. Handles all exception using try-catch with error messaage and logs the information of success.

### Challenges and Solutions

Challenge 1: Parsing Excel Data
Parsing Excel data can be challenging due to the complexity of the format. Using the 'xlsx' module made this task more manageable as it provides functions to read Excel files directly.

Challenge 2: Handling Incomplete Information
Some products may have incomplete information, making it difficult to categorize them accurately. To address this, follow-up questions are added to prompt users for more details.

Challenge 3: Dynamic Generation of Product Names
Generating product names dynamically based on product features required careful implementation. By defining clear logic in the generateProductName function, this challenge was overcome effectively.