// Constants for tax rates - standard
const STANDARD_RATE_BUSINESS = 0.07;
const STANDARD_RATE_INDIVIDUAL = 0.05;
const STANDARD_RATE_SALES = 0.04;
const STANDARD_RATE_INCOME = 0.04;
const STANDARD_CREDIT = -75;

// Constants for tax rates - alternate
const ALTERNATE_RATE_BUSINESS = 0.035;
const ALTERNATE_RATE_INDIVIDUAL = 0.025;
const ALTERNATE_RATE_SALES = 0.02;
const ALTERNATE_RATE_INCOME = 0.02;
const ALTERNATE_CREDIT = -75;

// Constants for top tax
const TOP_TAX_THRESHOLD = 3000;
const TOP_TAX_RATE = 0.1;

function decodeReferenceNumber(referenceNumber) {
    try {
        const decodedString = atob(referenceNumber);

        const [individualTax, businessTax, salesTax, incomeTax, useAlternateRate] = decodedString.split('-');

        const individualTaxValue = parseFloat(individualTax);
        const businessTaxValue = parseFloat(businessTax);
        const salesTaxValue = parseFloat(salesTax);
        const incomeTaxValue = parseFloat(incomeTax);

        const isAlternateRate = useAlternateRate === 'true';
        const individualRate = isAlternateRate ? ALTERNATE_RATE_INDIVIDUAL : STANDARD_RATE_INDIVIDUAL;
        const businessRate = isAlternateRate ? ALTERNATE_RATE_BUSINESS : STANDARD_RATE_BUSINESS;
        const salesRate = isAlternateRate ? ALTERNATE_RATE_SALES : STANDARD_RATE_SALES;
        const incomeRate = isAlternateRate ? ALTERNATE_RATE_INCOME : STANDARD_RATE_INCOME;
        const credit = isAlternateRate ? ALTERNATE_CREDIT : STANDARD_CREDIT;

        const individualTaxAmount = individualTaxValue * individualRate;
        const businessTaxAmount = businessTaxValue * businessRate;
        const salesTaxAmount = salesTaxValue * salesRate;
        const incomeTaxAmount = incomeTaxValue * incomeRate;

        const totalClaimed = individualTaxValue + businessTaxValue + salesTaxValue + incomeTaxValue;

        const topTax = totalClaimed > TOP_TAX_THRESHOLD ? (totalClaimed - TOP_TAX_THRESHOLD) * TOP_TAX_RATE : 0;

        const totalTax = individualTaxAmount + businessTaxAmount + salesTaxAmount + incomeTaxAmount + credit + topTax;

        const breakdown = `
            <p>Total Amount Claimed: ${totalClaimed.toFixed(2)}</p>
            <p>Individual Tax (${(individualRate * 100).toFixed(1)}%): ${individualTaxAmount.toFixed(2)}</p>
            <p>Business Tax (${(businessRate * 100).toFixed(1)}%): ${businessTaxAmount.toFixed(2)}</p>
            <p>Sales Tax (${(salesRate * 100).toFixed(1)}%): ${salesTaxAmount.toFixed(2)}</p>
            <p>Income Tax (${(incomeRate * 100).toFixed(1)}%): ${incomeTaxAmount.toFixed(2)}</p>
            <p>Top Tax (${(TOP_TAX_RATE * 100).toFixed(1)}% on amounts over ${TOP_TAX_THRESHOLD}): ${topTax.toFixed(2)}</p>
            <p>Total Before Credit: ${(individualTaxAmount + businessTaxAmount + salesTaxAmount + incomeTaxAmount + topTax).toFixed(2)}</p>
            <p>Credit: ${credit.toFixed(2)}</p>
            <p>Total Tax Owing/Owed: ${totalTax.toFixed(2)}</p>
        `;

        document.getElementById("decoded-tax-details").innerHTML = breakdown;
    } catch (error) {
        document.getElementById("decoded-tax-details").innerHTML = `<p>Error decoding reference number. Please check the input.</p>`;
        console.error("Error decoding reference number:", error);
    }
}