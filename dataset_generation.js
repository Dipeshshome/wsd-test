const fs = require('fs');
const xlsx = require('xlsx');

try {
    // Read JSON file containing trade-specific information
    const tradeData = JSON.parse(fs.readFileSync('trades 1.json', 'utf8'));

    // Read Excel spreadsheet containing product categorization
    const workbook = xlsx.readFile('categories 1.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const excelData = xlsx.utils.sheet_to_json(worksheet);

    // Create a map of product codes to categories                           
    const productCategories = {};
    excelData.forEach(row => {
        productCategories[row.ISIN] = row.type;
    });

    // Function to derive category for uncategorized products
    function deriveCategory(product) {
        // For simplicity, let's just return a default category 'Others'
        return 'Others';
    }

    // Function to generate product name dynamically
    function generateProductName(product) {
        if (product.autocall === 'yes') {
            return 'autocallable';
        } else if (product.issuerCall === 'yes') {
            return 'issuer callable';
        } else {
            return '';
        }
    }

    // Generate training dataset as Vicuna dataset
    const vicunaDataset = [];
    tradeData.products.forEach(product => {
        const productFeatures = Object.keys(product).map(key => `${key}: ${product[key]}`).join(', ');
        const productName = generateProductName(product);
        const category = productCategories[product.productCode] || deriveCategory(product);

        const dialogue = [
            { user: `I have a ${productName} product with ${productFeatures}.` },
            { chatbot: `Based on the provided details, the product category is ${category}.` }
        ];

        vicunaDataset.push({ dialogue });
    });

    // Add follow-up questions for incomplete information
    const followUpQuestions = [
        { chatbot: "Could you please provide more details about the product?" },
        { chatbot: "I need more information to determine the product category. Can you elaborate?" }
    ];
    vicunaDataset.push({ dialogue: followUpQuestions });

    // Write training dataset to a file
    fs.writeFileSync('training_dataset_vicuna_format.json', JSON.stringify(vicunaDataset, null, 2), 'utf8');

    console.log("Training dataset created successfully in Vicuna format.");
} catch (error) {
    console.error("An error occurred:", error.message);
}
